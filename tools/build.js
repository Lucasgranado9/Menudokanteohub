#!/usr/bin/env node
/* Compilación del portal (sin dependencias).
 *
 *   node tools/build.js          aplica los cambios
 *   node tools/build.js --check  no escribe nada; sale con error si hay algo por regenerar (CI)
 *
 * 1. Extrae a a/<md5-10>.css|js los bloques <style>/<script> en línea idénticos (>=3000 bytes, >=3 páginas).
 * 2. Borra de a/ los ficheros que ya no usa ninguna página.
 * 3. Añade al CORE de sw.js los ficheros locales que cargan las páginas (css/js/a/*).
 * 4. Recalcula CACHE de sw.js a partir del contenido del CORE: cambia solo si cambia algo.
 * 5. Genera sitemap.xml y robots.txt a partir de las páginas indexables.
 */
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');
const MIN = 3000, PAGES_MIN = 3;
const md5 = b => crypto.createHash('md5').update(b).digest('hex');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const changes = [];
function out(f, s) { const full = path.join(ROOT, f); if (fs.existsSync(full) && fs.readFileSync(full, 'utf8') === s) return; changes.push(f); if (!CHECK) { fs.mkdirSync(path.dirname(full), { recursive: true }); fs.writeFileSync(full, s); } }

const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '404.html'); // 404 se sirve en rutas arbitrarias
const html = Object.fromEntries(pages.map(p => [p, rd(p)]));

/* 1 · bloques en línea repetidos */
const RE = [
  { re: /<style(?![^>]*\bsrc\b)>([\s\S]*?)<\/style>/g, ext: 'css', tag: u => `<link rel="stylesheet" href="${u}">` },
  { re: /<script(?![^>]*\b(?:src|type)\b)>([\s\S]*?)<\/script>/g, ext: 'js', tag: u => `<script src="${u}"></script>` },
];
for (const { re, ext, tag } of RE) {
  const seen = new Map();
  for (const p of pages) for (const m of html[p].matchAll(re)) {
    if (Buffer.byteLength(m[1]) < MIN) continue;
    const k = md5(m[1]);
    (seen.get(k) || seen.set(k, { body: m[1], pages: new Set() }).get(k)).pages.add(p);
  }
  for (const [k, v] of seen) {
    if (v.pages.size < PAGES_MIN) continue;
    const name = `a/${k.slice(0, 10)}.${ext}`;
    // el CSS pasa a a/: las rutas relativas de url() deben subir un nivel
    out(name, ext === 'css' ? v.body.replace(/url\((['"]?)(?!data:|#|https?:|\/|\.\.\/)([^)'"]+)\1\)/g, 'url($1../$2$1)') : v.body);
    for (const p of pages) html[p] = html[p].replace(re, (all, body) => md5(body) === k ? tag(name) : all);
  }
}
for (const p of pages) out(p, html[p]);

/* 2 · a/ huérfanos */
const used = new Set();
for (const p of pages) for (const m of html[p].matchAll(/(?:href|src)="(a\/[\w-]+\.(?:css|js))"/g)) used.add(m[1]);
const adir = path.join(ROOT, 'a');
if (fs.existsSync(adir)) for (const f of fs.readdirSync(adir)) if (!used.has('a/' + f)) { changes.push('a/' + f + ' (huérfano)'); if (!CHECK) fs.unlinkSync(path.join(adir, f)); }

/* 3 · CORE de sw.js */
let sw = rd('sw.js');
const coreM = sw.match(/const CORE=(\[[\s\S]*?\]);/);
if (!coreM) { console.error('sw.js: no encuentro CORE'); process.exit(2); }
let core = JSON.parse(coreM[1]);
core = core.filter(f => f === './' || fs.existsSync(path.join(ROOT, f))); // fuera lo que ya no existe
const local = new Set();
for (const p of pages) for (const m of html[p].matchAll(/(?:href|src)="([a-z0-9_-]+(?:\/[a-z0-9_.-]+)*\.(?:css|js))"/gi)) if (!/^(https?:)?\/\//.test(m[1])) local.add(m[1]);
for (const f of local) if (fs.existsSync(path.join(ROOT, f)) && !core.includes(f)) core.push(f);
core = core.filter(f => !f.startsWith('a/') || used.has(f));
sw = sw.replace(coreM[0], 'const CORE=' + JSON.stringify(core).replace(/","/g, '", "') + ';');

/* 4 · versión de caché = hash del contenido del CORE */
const h = crypto.createHash('md5');
for (const f of core.slice().sort()) { const full = path.join(ROOT, f === './' ? 'index.html' : f); if (fs.existsSync(full)) h.update(f).update(fs.readFileSync(full)); }
const ver = 'mk-' + h.digest('hex').slice(0, 10);
sw = sw.replace(/const CACHE='mk-[0-9a-f]{10}'/, `const CACHE='${ver}'`);
out('sw.js', sw);

/* 5 · SEO: sitemap.xml y robots.txt (sin fechas, para que --check sea estable) */
const BASE = 'https://lucasgranado9.github.io/Menudokanteohub/';
const PRI = { 'index.html': '1.0', 'mates.html': '0.9', 'fisica.html': '0.9', 'filosofia.html': '0.9', 'problemes.html': '0.8', 'calculadora.html': '0.7' };
const smPages = pages.filter(p => !/name="robots" content="[^"]*noindex/.test(html[p])).sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : (PRI[b] || '0.5') - (PRI[a] || '0.5') || a.localeCompare(b)));
out('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + smPages.map(p => `  <url><loc>${BASE}${p === 'index.html' ? '' : p}</loc><priority>${PRI[p] || '0.5'}</priority></url>`).join('\n') + '\n</urlset>\n');
out('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${BASE}sitemap.xml\n`);

if (changes.length) {
  console.log((CHECK ? 'Por regenerar:\n  ' : 'Actualizado:\n  ') + changes.join('\n  '));
  if (CHECK) { console.error('\nEjecuta "npm run build" y sube los cambios.'); process.exit(1); }
} else console.log('Todo al día (' + ver + ')');
