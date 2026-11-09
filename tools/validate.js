#!/usr/bin/env node
/* Validador de contenido (sin dependencias): node tools/validate.js [--strict]
 * Errores (salida 1): enlaces/recursos locales rotos, <img> sin alt, ids duplicados, JSON inválido, SEO básico
 * (título, descripción, canonical, og:image) y sitemap/robots sin las páginas.
 * Avisos: anclas internas que no existen en el HTML estático, claves de traducción obsoletas y textos estáticos
 * sin traducción al castellano (con --strict también fallan). */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), STRICT = process.argv.includes('--strict');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
const errors = [], warns = [], DYN = /^#(contacte|error|inici|\d{4}-\d{2}-\d{2})$/;  // anclas que crea el JS
const E = (p, m) => errors.push(p + ': ' + m), W = (p, m) => warns.push(p + ': ' + m);
const html = Object.fromEntries(pages.map(p => [p, rd(p)]));
const ids = Object.fromEntries(pages.map(p => [p, new Set([...html[p].matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))]));
const exists = u => fs.existsSync(path.join(ROOT, u.split('#')[0].split('?')[0]));
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');

for (const p of pages) {
  const h = html[p], body = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  /* enlaces y recursos locales */
  for (const m of body.matchAll(/\s(?:href|src)="([^"#][^"]*|#[^"]+)"/g)) {
    const u = m[1]; if (/^(https?:|mailto:|tel:|data:|javascript:|blob:|\/\/)/.test(u) || u.startsWith('#')) {
      if (u.startsWith('#') && u.length > 1 && !ids[p].has(u.slice(1)) && !DYN.test(u)) W(p, 'ancla sin destino en el HTML estático: ' + u); continue;
    }
    if (!exists(u)) { E(p, 'enlace o recurso roto: ' + u); continue; }
    const a = u.split('#')[1]; const t = u.split('#')[0].split('?')[0];
    if (a && ids[t] && !ids[t].has(a) && t.endsWith('.html') && !DYN.test('#' + a)) W(p, 'ancla sin destino en ' + t + ': #' + a);
  }
  /* imágenes con texto alternativo */
  for (const m of body.matchAll(/<img\b[^>]*>/g)) if (!/\salt=/.test(m[0])) E(p, '<img> sin alt: ' + m[0].slice(0, 90));
  /* ids duplicados */
  const seen = new Set(); for (const m of body.matchAll(/\sid="([^"]+)"/g)) { if (seen.has(m[1])) E(p, 'id duplicado: ' + m[1]); seen.add(m[1]); }
  if (p === '404.html') continue;
  /* SEO */
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1], desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!title) E(p, 'falta <title>'); else if (title.length > 70) W(p, 'título largo (' + title.length + ' caracteres)');
  if (!desc) E(p, 'falta meta description'); else if (desc.length < 50 || desc.length > 180) W(p, 'descripción de ' + desc.length + ' caracteres (ideal 70–160)');
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(h)) E(p, 'falta canonical');
  const og = (h.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  if (og && /Menudokanteohub\/(icons\/[^"]+)$/.test(og) && !exists(og.match(/Menudokanteohub\/(.+)$/)[1])) E(p, 'og:image no existe: ' + og);
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch (e) { E(p, 'JSON-LD inválido'); } }
}
/* acoplamiento al título: la página se identifica por su dirección, no por el <title> */
for (const f of [...fs.readdirSync(ROOT).filter(f => f.endsWith('.js')).map(f => f), ...fs.readdirSync(path.join(ROOT, 'a')).filter(f => f.endsWith('.js')).map(f => 'a/' + f)]) {
  const js = rd(f); if (f === 'sw.js') continue;
  if (/\b(?:document|f|d|doc)\.title\b/.test(js) && /\.test\(\s*[A-Za-z_$][\w$]*\s*\)/.test(js) && /\/\^(?:Mates|F[ií]sica|Filosofia)/.test(js) && !/location\.pathname/.test(js)) E(f, 'identifica la página por el título (usa location.pathname)');
}
/* JSON de datos y manifest */
(function walk(d) { for (const f of fs.readdirSync(path.join(ROOT, d))) { const r = d + '/' + f; const st = fs.statSync(path.join(ROOT, r)); if (st.isDirectory()) { if (!/^(node_modules|desktop|\.git)$/.test(f)) walk(r); } else if (f.endsWith('.json') || f.endsWith('.webmanifest')) { try { JSON.parse(rd(r)); } catch (e) { E(r, 'JSON inválido: ' + e.message); } } } })('.');
try { const man = JSON.parse(rd('manifest.webmanifest')); for (const i of man.icons || []) if (!exists(i.src)) E('manifest', 'icono inexistente: ' + i.src); } catch (e) { }
/* sitemap y robots */
if (!fs.existsSync(path.join(ROOT, 'sitemap.xml'))) E('sitemap.xml', 'no existe (ejecuta npm run build)'); else { const sm = rd('sitemap.xml'); for (const p of pages) if (p !== '404.html' && !sm.includes(p === 'index.html' ? 'Menudokanteohub/<' : '/' + p + '<')) E('sitemap.xml', 'falta ' + p); }
if (!fs.existsSync(path.join(ROOT, 'robots.txt'))) E('robots.txt', 'no existe');
/* traducciones (castellano): claves obsoletas y texto estático sin traducir */
let glob = {}; try { glob = JSON.parse(rd('data/i18n.es.json')); } catch (e) { }
for (const p of pages) {
  const f = 'data/i18n.es.' + p.replace('.html', '') + '.json'; let loc = {}; try { loc = JSON.parse(rd(f)); } catch (e) { }
  const dict = Object.assign({}, glob, loc), vis = decode(html[p].replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, ''));
  const texts = new Set(); for (const m of vis.matchAll(/>([^<>]{14,})</g)) { const s = m[1].replace(/\s+/g, ' ').trim(); if (/\s/.test(s) && /[a-zàèéíòóúïüç·]/i.test(s)) texts.add(s); }
  const norm = s => s.replace(/\d+/g, '#'); const keys = new Set(Object.keys(dict).map(norm));
  const missing = [...texts].filter(s => !keys.has(norm(s)) && !/^[\d\s.,:;()\/\-–—·%+=<>×÷^_a-zA-Z]*$/.test(s) && /[àèéíòóúïüç·]|\b(el|la|els|les|per|amb|que|del|dels|una|un)\b/i.test(s) && !/^(Última actualización|Ultima actualitzaci)/.test(s) && !(/\b(the|and|of)\b/.test(s)));
  if (missing.length) W(p, missing.length + ' texto(s) estático(s) sin traducir al castellano, p. ej.: «' + missing.slice(0, 2).map(s => s.slice(0, 60)).join('» · «') + '»');
}
for (const w of warns) console.log('! ' + w);
for (const e of errors) console.error('✗ ' + e);
const bad = errors.length + (STRICT ? warns.length : 0);
console.log(bad ? `\n${errors.length} error(es), ${warns.length} aviso(s).` : `✓ Contenido válido (${pages.length} páginas, ${warns.length} aviso(s)).`);
process.exit(bad ? 1 : 0);
