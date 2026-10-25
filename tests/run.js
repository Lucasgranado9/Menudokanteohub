/* Proves automàtiques de Menudo Kanteo.
   Es llegeix el portal tal com es publica (arrel del repositori), s'hi aixeca un servidor local amb
   gzip i es comprova: fitxers i enllaços, dades, pesos, errors de JavaScript, desbordaments en mòbil,
   accessibilitat bàsica (noms, etiquetes, contrast) i unes quantes interaccions clau. */
const fs = require('fs'), path = require('path'), http = require('http'), zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..');
const fails = [], notes = [];
let nChecks = 0;
function ok(cond, msg) { nChecks++; if (!cond) { fails.push(msg); console.log('  ✗ ' + msg); } }
function section(t) { console.log('\n' + t); }
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const exists = f => fs.existsSync(path.join(ROOT, f));
const gz = f => zlib.gzipSync(fs.readFileSync(path.join(ROOT, f))).length;

const PAGES = ['index.html', 'mates.html', 'fisica.html', 'filosofia.html', 'novetats.html', 'sobre.html', 'avis-legal.html', 'privacitat.html'];

/* ---------- 1. Fitxers, enllaços i dades ---------- */
function staticChecks() {
  section('1. Fitxers, enllaços i dades');
  const refs = new Set();
  const grab = (s, from) => {
    const re = /(?:href|src)=\\?"([^"\\#?][^"\\]*)/g; let m;
    while ((m = re.exec(s))) {
      const u = m[1];
      if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(u)) continue;
      if (/['+(){}$ ]/.test(u) || !/\.[a-z0-9]{2,5}$/i.test(u.split('#')[0].split('?')[0])) continue; // fragments de codi JavaScript
      refs.add(u.split('#')[0].split('?')[0] + '\u0000' + from);
    }
    const cu = /url\(([^)]+)\)/g;
    while ((m = cu.exec(s))) { const u = m[1].replace(/["'\\]/g, ''); if (!/^(https?:|data:)/.test(u) && u) refs.add(u.split('#')[0].split('?')[0] + '\u0000' + from); }
  };
  PAGES.forEach(p => { ok(exists(p), 'falta ' + p); if (exists(p)) grab(read(p), p); });
  const dataFiles = fs.readdirSync(path.join(ROOT, 'data'));
  const bad = [];
  dataFiles.forEach(f => {
    const raw = read('data/' + f);
    try { JSON.parse(raw); } catch (e) { bad.push(f); }
    ok(!/katex-error|ParseError/.test(raw), 'fórmula amb error a data/' + f);
    grab(raw, 'data/' + f);
  });
  ok(!bad.length, 'JSON no vàlid: ' + bad.join(', '));
  ['buscador.json', 'buscador-titols.json', 'manifest.webmanifest'].forEach(f => { try { JSON.parse(read(f)); ok(true); } catch (e) { ok(false, f + ' no és JSON vàlid'); } });
  PAGES.forEach(p => ok(!/katex-error|ParseError/.test(read(p)), 'fórmula amb error a ' + p));
  const missing = [...refs].filter(r => { const [u] = r.split('\u0000'); return u && !exists(u.replace(/^\.\//, '')) && !(u === './' || u === '/'); });
  ok(!missing.length, 'enllaços o recursos que no existeixen: ' + missing.slice(0, 8).map(r => r.replace('\u0000', ' ← ')).join('; '));
  // service worker: tot el que precarrega ha d'existir i ha de ser petit
  const sw = read('sw.js'); const core = JSON.parse(/const CORE=(\[.*?\]);/s.exec(sw)[1]);
  const miss2 = core.filter(u => u !== './' && !exists(u)); ok(!miss2.length, 'sw.js precarrega fitxers inexistents: ' + miss2.join(', '));
  const isTxt = u => /\.(html|json|js|css|svg|webmanifest)$/.test(u);
  const coreBytes = core.filter(u => u !== './' && exists(u)).reduce((a, u) => a + (isTxt(u) ? gz(u) : fs.statSync(path.join(ROOT, u)).size), 0);
  ok(coreBytes < 1.2e6, 'el service worker precarrega massa (' + Math.round(coreBytes / 1024) + ' KB transferits; màxim 1200 KB)');
  notes.push('precàrrega del SW: ' + Math.round(coreBytes / 1024) + ' KB, ' + core.length + ' fitxers');
  // contingut mínim esperat (els nombres només poden pujar)
  const prob = JSON.parse(read('data/m-prob.json')); const nM = Object.values(prob).reduce((a, v) => a + v.length, 0);
  ok(nM >= 77, 'Mates ha de tenir ≥ 77 problemes (n\'hi ha ' + nM + ')');
  ok(Object.keys(prob).length === 12, 'Mates ha de tenir problemes de 12 temes');
  let nF = 0, nT = 0; for (let i = 1; i <= 11; i++) { const c = JSON.parse(read('data/f-t' + i + '.json')); nT++; nF += (c.pr && c.pr.list ? c.pr.list.length : 0); }
  ok(nT === 11, 'Física ha de tenir 11 temes'); ok(nF >= 85, 'Física ha de tenir ≥ 85 problemes (n\'hi ha ' + nF + ')');
  for (let i = 1; i <= 8; i++) { ok(exists('data/a' + i + '.json'), 'falta data/a' + i + '.json (autor ' + i + ')'); if (exists('data/a' + i + '.json')) ok(JSON.parse(read('data/a' + i + '.json')).h.every(x => x.length > 200), 'apartat buit a l\'autor ' + i); }
  ok(JSON.parse(read('buscador-titols.json')).length >= 100, 'l\'índex de cerca és massa curt');
  notes.push('problemes: Mates ' + nM + ', Física ' + nF);
}

/* ---------- 2. Rendiment (pressupostos de pes) ---------- */
function perfChecks() {
  section('2. Pesos (gzip) i càrrega');
  const budget = { 'index.html': 70, 'mates.html': 110, 'fisica.html': 110, 'filosofia.html': 90, 'novetats.html': 60, 'sobre.html': 60, 'avis-legal.html': 60, 'privacitat.html': 60 };
  PAGES.forEach(p => { const k = Math.round(gz(p) / 1024); notes.push(p + ': ' + k + ' KB gz'); ok(k <= budget[p], p + ' pesa ' + k + ' KB (gzip); el límit és ' + budget[p] + ' KB'); });
  PAGES.forEach(p => {
    const s = read(p);
    ok(!/<script[^>]+src=["']https?:/.test(s), p + ' carrega un script extern que bloqueja el pintat (three.js ha de carregar-se sota demanda)');
    const fl = (s.replace(/<noscript>.*?<\/noscript>/gs, '').match(/<link[^>]+rel="stylesheet"[^>]+fonts\.googleapis[^>]*>/g) || []);
    ok(fl.every(l => /media="print"/.test(l)), p + ' té les tipografies com a full d\'estil bloquejant');
    ok(!/data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]{60000,}/.test(s), p + ' porta una imatge enorme incrustada');
  });
  const big = []; ['img', 'filo', 'figs', 'figm'].forEach(d => fs.readdirSync(path.join(ROOT, d)).forEach(f => { const sz = fs.statSync(path.join(ROOT, d, f)).size; if (sz > 200 * 1024) big.push(d + '/' + f + ' ' + Math.round(sz / 1024) + ' KB'); }));
  ok(!big.length, 'imatges de més de 200 KB: ' + big.join(', '));
}

/* ---------- 3. Navegador ---------- */
const ROUTES = [
  ['index.html', 'Portada'], ['mates.html', 'Mates'], ['mates.html#t3', 'Mates tema'], ['mates.html#t3-s1', 'Mates apartat'], ['mates.html#problemes', 'Mates problemes'],
  ['mates.html#simulacre', 'Mates simulacre'], ['mates.html#formulari', 'Mates formulari'],
  ['fisica.html', 'Física'], ['fisica.html#t5', 'Física tema'], ['fisica.html#t5-prob', 'Física problemes'], ['fisica.html#simulacre', 'Física simulacre'], ['fisica.html#formulari', 'Física formulari'],
  ['filosofia.html', 'Filosofia'], ['filosofia.html#a1', 'Autor'], ['filosofia.html#a5-s5', 'Examen Kant'], ['filosofia.html#a8-s3', 'Apartat Nussbaum'],
  ['filosofia.html#cronologia', 'Cronologia'], ['filosofia.html#comparativa', 'Comparativa'], ['filosofia.html#glossari', 'Glossari'], ['filosofia.html#test', 'Test'],
  ['filosofia.html#desenvolupament', 'Redacció'], ['filosofia.html#simulacre', 'Simulacre Filosofia'],
  ['novetats.html', 'Novetats'], ['sobre.html', 'Sobre'], ['avis-legal.html', 'Avís legal'], ['privacitat.html', 'Privacitat']
];
function audit() {
  const q = s => [...document.querySelectorAll(s)]; const out = {};
  const name = e => (e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.textContent || e.getAttribute('title') || '').trim();
  out.lang = document.documentElement.lang;
  out.noAlt = q('img:not([alt])').length;
  out.btnNoName = q('button,[role=button]').filter(e => !name(e) && !e.querySelector('img[alt]')).map(e => e.outerHTML.slice(0, 90));
  out.aNoName = q('a[href]').filter(e => !name(e) && !e.querySelector('img[alt]')).map(e => e.outerHTML.slice(0, 90));
  out.inputNoLabel = q('input,select,textarea').filter(e => e.type !== 'hidden' && !(e.labels && e.labels.length) && !e.getAttribute('aria-label') && !e.getAttribute('aria-labelledby')).map(e => e.outerHTML.slice(0, 90));
  out.main = q('main,[role=main]').length; out.h1 = q('h1').length; out.skip = !!q('.mk-skip').length;
  out.loading = q('.sk,[aria-busy=true]').length;
  const lum = c => { const a = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2]; };
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).map(Number); return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 }; };
  const bg = e => { let x = e; while (x) { const c = parse(getComputedStyle(x).backgroundColor); if (c && c.a > .9) return c.c; x = x.parentElement; } return [255, 255, 255]; };
  const bad = [];
  for (const e of q('p,li,a,span,button,td,th,dd,dt,small,em,b,strong,h1,h2,h3,h4,label,summary')) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const f = parse(cs.color); if (!f) continue; const B = bg(e);
    const L1 = lum(f.c), L2 = lum(B), cr = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
    const fs_ = parseFloat(cs.fontSize), big = fs_ >= 24 || (fs_ >= 18.66 && +cs.fontWeight >= 700);
    if (cr < (big ? 3 : 4.5)) bad.push(cr.toFixed(2) + ' ' + e.tagName + ' ' + e.textContent.trim().slice(0, 30));
  }
  out.contrast = bad.slice(0, 4); out.nBad = bad.length;
  out.overflow = document.documentElement.scrollWidth - innerWidth;
  out.h1text = (q('h1')[0] || {}).textContent || '';
  return out;
}
async function browserChecks(base) {
  const { chromium } = require('playwright');
  const b = await chromium.launch(); const errs = [];
  const cfgs = [{ n: 'mòbil clar', w: 390, h: 844, th: 'light' }, { n: 'escriptori fosc', w: 1280, h: 900, th: 'dark' }];
  for (const c of cfgs) {
    section('3. Navegador · ' + c.n);
    const ctx = await b.newContext({ viewport: { width: c.w, height: c.h }, colorScheme: c.th, serviceWorkers: 'block', permissions: ['clipboard-read', 'clipboard-write'] });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
    await ctx.route(/cdnjs\.cloudflare\.com/, r => r.continue().catch(() => r.abort()));
    const p = await ctx.newPage(); const pe = [];
    p.on('pageerror', e => pe.push(e.message)); p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::ERR|googleapis|cloudflare/.test(m.text())) pe.push(m.text()); });
    for (const [u, label] of ROUTES) {
      pe.length = 0;
      await p.goto(base + '/' + u, { waitUntil: 'load' });
      await p.waitForFunction(() => !document.querySelector('.sk,[aria-busy=true]') && document.querySelector('h1'), null, { timeout: 8000 }).catch(() => { });
      await p.waitForTimeout(350);
      const r = await p.evaluate(audit);
      const tag = c.n + ' · ' + label + ' (' + u + ')';
      ok(!pe.length, tag + ': errors de JavaScript: ' + pe.slice(0, 2).join(' | '));
      ok(r.h1 >= 1 && r.h1text.trim().length > 0 && !/^Carregant/.test(r.h1text.trim()), tag + ': no té títol h1 o no ha acabat de carregar');
      ok(r.loading === 0, tag + ': encara mostra «carregant»');
      ok(r.overflow <= 0, tag + ': desbordament horitzontal de ' + r.overflow + 'px');
      ok(r.lang === 'ca', tag + ': falta lang="ca"');
      ok(r.noAlt === 0, tag + ': imatges sense alt');
      ok(!r.btnNoName.length, tag + ': botons sense nom: ' + r.btnNoName[0]);
      ok(!r.aNoName.length, tag + ': enllaços sense nom: ' + r.aNoName[0]);
      ok(!r.inputNoLabel.length, tag + ': camps sense etiqueta: ' + r.inputNoLabel[0]);
      ok(r.main === 1 && r.skip, tag + ': falta main o l\'enllaç «Salta al contingut»');
      ok(r.nBad === 0, tag + ': contrast insuficient (' + r.nBad + '): ' + r.contrast.join(' | '));
    }
    await ctx.close();
  }
  /* interaccions clau */
  section('4. Interaccions');
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block', permissions: ['clipboard-read', 'clipboard-write'] });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const p = await ctx.newPage(); const pe = []; p.on('pageerror', e => pe.push(e.message));
  // cerca
  await p.goto(base + '/mates.html'); await p.waitForSelector('.mk-sb'); await p.click('.mk-sb'); await p.fill('.mk-so input', 'derivada'); await p.waitForSelector('.mk-sl a', { timeout: 5000 }).catch(() => { });
  ok(await p.locator('.mk-sl a').count() > 0, 'la cerca de «derivada» no troba res');
  await p.keyboard.press('Escape');
  // compartir enllaç d'una pàgina i d'un problema
  await p.goto(base + '/mates.html#problemes'); await p.waitForSelector('[data-pid]'); 
  await p.evaluate(() => window.__pfill && window.__pfill()); await p.waitForTimeout(300);
  ok(await p.locator('.mk-psh').count() >= 77, 'falten botons de compartir als problemes');
  await p.click('[data-pid="m3.7"] .mk-psh'); await p.waitForTimeout(250);
  const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => 'ERR'));
  ok(/\?p=m3\.7#problemes$/.test(clip), 'l\'enllaç copiat d\'un problema no és correcte: ' + clip);
  const p2 = await ctx.newPage(); await p2.goto(base + '/mates.html?p=m3.7#problemes'); await p2.waitForSelector('.mk-hl', { timeout: 6000 }).catch(() => { });
  ok(await p2.locator('.mk-hl[data-pid="m3.7"]').count() === 1, 'l\'enllaç directe no ressalta el problema');
  // problema: la solució s'obre i es renderitza amb KaTeX
  await p.locator('[data-pid="m1.1"] details.sol summary').click();
  ok(await p.locator('[data-pid="m1.1"] details.sol .katex').count() > 0, 'la solució del problema 1.1 no mostra fórmules');
  // simulacre de Filosofia: cronòmetre, text desat i rúbrica
  await p.goto(base + '/filosofia.html#simulacre'); await p.waitForSelector('#smts'); await p.click('#smts'); await p.fill('#a1', 'prova'); await p.click('#smc button:nth-child(2)'); await p.click('#smc button:nth-child(1)');
  ok((await p.inputValue('#a1')) === 'prova', 'el simulacre de Filosofia no desa l\'esborrany');
  await p.click('#smev'); await p.click('.smr label input'); ok(/\d \/ 10/.test(await p.textContent('#smsc')), 'la rúbrica del simulacre no calcula la nota');
  // secció d'autor (dades carregades sota demanda)
  await p.goto(base + '/filosofia.html#a2-s2'); await p.waitForSelector('.prose', { timeout: 6000 }).catch(() => { });
  ok(await p.locator('.prose').first().innerText().then(t => t.length > 200).catch(() => false), 'l\'apartat de Filosofia no carrega el text');
  // tema fosc persistent
  await p.goto(base + '/index.html'); await p.click('#th'); const th = await p.evaluate(() => document.documentElement.getAttribute('data-theme')); ok(th === 'dark' || th === 'light', 'el botó de tema no canvia res');
  // laboratori 3D: carrega three.js sota demanda i pinta un canvas
  await p.goto(base + '/mates.html#t6-s1');
  await p.waitForSelector('.inlab,[data-lab3]', { timeout: 6000 }).catch(() => { });
  const labs = await p.locator('[data-lab3]').count();
  if (labs) { await p.locator('[data-lab3]').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(500); const go = p.locator('[data-lab3] .labgo').first(); if (await go.count()) await go.click(); notes.push('laboratoris 3D a t6-s1: ' + labs + ' (només es comprova que no hi hagi errors)'); }
  ok(!pe.length, 'errors de JavaScript durant les interaccions: ' + pe.slice(0, 2).join(' | '));
  await ctx.close(); await b.close();
}

/* ---------- servidor local (gzip + cau com GitHub Pages) ---------- */
function serve() {
  const T = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };
  const Z = new Set(['.html', '.json', '.js', '.css', '.svg', '.webmanifest']);
  return new Promise(res => {
    const s = http.createServer((q, r) => {
      let u = decodeURIComponent(q.url.split('?')[0]); if (u.endsWith('/')) u += 'index.html';
      fs.readFile(path.join(ROOT, u), (e, b) => {
        if (e) { r.writeHead(404); return r.end('404'); }
        const x = path.extname(u), h = { 'content-type': T[x] || 'application/octet-stream', 'cache-control': 'max-age=600' };
        if (Z.has(x) && /gzip/.test(q.headers['accept-encoding'] || '')) { h['content-encoding'] = 'gzip'; b = zlib.gzipSync(b); }
        h['content-length'] = b.length; r.writeHead(200, h); r.end(b);
      });
    }).listen(0, () => res({ s, base: 'http://localhost:' + s.address().port }));
  });
}

(async () => {
  const only = process.argv[2];
  staticChecks(); perfChecks();
  if (only !== '--static') { const { s, base } = await serve(); try { await browserChecks(base); } finally { s.close(); } }
  console.log('\n' + notes.map(n => '  · ' + n).join('\n'));
  console.log('\n' + (fails.length ? '✗ ' + fails.length + ' errors en ' + nChecks + ' comprovacions' : '✓ ' + nChecks + ' comprovacions correctes'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
