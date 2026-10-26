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

const PAGES = ['index.html', 'mates.html', 'fisica.html', 'filosofia.html', 'novetats.html', 'sobre.html', 'preguntes.html', 'calculadora.html', 'avis-legal.html', 'privacitat.html'];

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
  // castellà: dades traduïdes amb la mateixa estructura que les catalanes
  const probEs = JSON.parse(read('data/m-prob.es.json'));
  ok(Object.keys(probEs).length === 12 && Object.keys(prob).every(k => (probEs[k] || []).length === prob[k].length), 'm-prob.es.json no té els mateixos problemes que m-prob.json');
  ok(Object.keys(prob).every(k => prob[k].every((q, i) => probEs[k][i] && probEs[k][i].num === q.num && probEs[k][i].pts !== undefined)), 'm-prob.es.json: números de problema diferents');
  for (let i = 1; i <= 11; i++) { const ca = JSON.parse(read('data/f-t' + i + '.json')), es = JSON.parse(read('data/f-p' + i + '.es.json')); ok(es.list.length === ca.pr.list.length && es.list.every((q, j) => !!q.stmt && (!ca.pr.list[j].sol || /Soluci[oó]n/.test(q.stmt))), 'f-p' + i + '.es.json no coincideix amb els problemes de Física del tema ' + i); }
  const exC = JSON.parse(read('data/extra.es.json')); ok(Object.keys(exC.quiz).length === 8 && exC.glos.length >= 40 && exC.sim.length === 4 && exC.comp.length >= 6, 'extra.es.json incomplet');
  const dict = JSON.parse(read('data/i18n.es.json')); ok(Object.keys(dict).length > 500 && Object.values(dict).every(v => typeof v === 'string' && v.length), 'data/i18n.es.json no és un diccionari vàlid');
  ok(Object.keys(dict).every(k => (k.match(/#/g) || []).length === (dict[k].match(/#/g) || []).length), 'diccionari castellà: marcadors # diferents entre català i castellà');
  ok(JSON.parse(read('buscador-titols.json')).length >= 100, 'l\'índex de cerca és massa curt');
  notes.push('problemes: Mates ' + nM + ', Física ' + nF);
}

/* ---------- 2. Rendiment (pressupostos de pes) ---------- */
function perfChecks() {
  section('2. Pesos (gzip) i càrrega');
  const budget = { 'index.html': 70, 'mates.html': 110, 'fisica.html': 110, 'filosofia.html': 90, 'novetats.html': 60, 'sobre.html': 60, 'preguntes.html': 60, 'calculadora.html': 60, 'avis-legal.html': 60, 'privacitat.html': 60 };
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
  ['mates.html#formulari', 'Mates formulari'],
  ['fisica.html', 'Física'], ['fisica.html#t5', 'Física tema'], ['fisica.html#t5-prob', 'Física problemes'], ['fisica.html#formulari', 'Física formulari'],
  ['filosofia.html', 'Filosofia'], ['filosofia.html#a1', 'Autor'], ['filosofia.html#a5-s5', 'Examen Kant'], ['filosofia.html#a8-s3', 'Apartat Nussbaum'],
  ['filosofia.html#cronologia', 'Cronologia'], ['filosofia.html#comparativa', 'Comparativa'], ['filosofia.html#glossari', 'Glossari'], ['filosofia.html#test', 'Test'],
  ['filosofia.html#desenvolupament', 'Redacció'],
  ['novetats.html', 'Novetats'], ['sobre.html', 'Sobre'], ['preguntes.html', 'Preguntes'], ['calculadora.html', 'Calculadora'], ['avis-legal.html', 'Avís legal'], ['privacitat.html', 'Privacitat']
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
  await p.goto(base + '/mates.html#problemes'); await p.waitForSelector('.pacc');
  ok(await p.locator('.pacc').count() === 12 && await p.locator('.prob:visible').count() === 0, 'Mates: la llista de problemes ha d\'arrencar plegada (12 temes)');
  await p.click('#pt3 > summary'); await p.waitForTimeout(300); ok(await p.locator('#pt3 .prob:visible').count() > 0 && await p.locator('#pt3 .pnm').first().innerText().then(t => /Problema 3\.1/.test(t)), 'Mates: en obrir un tema no es veuen els problemes amb el seu número');
  ok(await p.locator('#pt3 .pk').first().innerText().then(t => /Tema 3/i.test(t)), 'Mates: el problema no indica a quin tema pertany');
  ok(await p.locator('.pn').count() === 0, 'encara hi ha les bombolles P1, P2…');
  await p.click('.ptall'); await p.waitForTimeout(300);
  const nOpen = await p.locator('details.sol[open]').count();
  ok(nOpen >= 77 && nOpen === await p.locator('.prob').count(), 'Mostra totes les solucions no obre totes les solucions (' + nOpen + ')');
  await p.click('.ptall'); ok(await p.locator('details.sol[open]').count() === 0, 'Amaga totes les solucions no les tanca');
  await p.goto(base + '/mates.html#problemes-t5'); await p.waitForSelector('#pt5[open]', { timeout: 4000 }).catch(() => { });
  ok(await p.locator('#pt5[open] .prob').count() > 0 && await p.locator('#pt4[open]').count() === 0, 'Mates: #problemes-t5 ha d\'obrir només el tema 5');
  await p.goto(base + '/fisica.html#problemes'); await p.waitForSelector('.pacc', { timeout: 8000 });
  ok(await p.locator('.pacc').count() === 11, 'Física: falta la llista de problemes per temes');
  await p.click('#pt2 > summary'); await p.waitForTimeout(200);
  ok(await p.locator('#pt2 .prob').count() >= 5 && /Problema 2\.1/.test(await p.locator('#pt2 .pnm').first().innerText()), 'Física: problemes del tema 2 sense número');
  await p.click('.ptall'); await p.waitForTimeout(300);
  ok(await p.locator('.prob details[open]').count() >= 85, 'Física: Mostra totes les solucions no funciona');
  await p.goto(base + '/mates.html#problemes'); await p.waitForSelector('.pacc'); await p.click('.ptall'); await p.waitForTimeout(300);
  ok(await p.locator('.mk-psh, .mk-share').count() === 0, 'encara hi ha botons de compartir');
  const p2 = await ctx.newPage(); await p2.goto(base + '/mates.html?p=m3.7#problemes'); await p2.waitForSelector('.mk-hl', { timeout: 6000 }).catch(() => { });
  ok(await p2.locator('.mk-hl[data-pid="m3.7"]').count() === 1, 'l\'enllaç directe no ressalta el problema');
  // problema: la solució s'obre i es renderitza amb KaTeX
  await p.locator('[data-pid="m1.1"] details.sol summary').click();
  ok(await p.locator('[data-pid="m1.1"] details.sol .katex').count() > 0, 'la solució del problema 1.1 no mostra fórmules');
  // secció d'autor (dades carregades sota demanda)
  await p.goto(base + '/filosofia.html#a2-s2'); await p.waitForSelector('.prose', { timeout: 6000 }).catch(() => { });
  ok(await p.locator('.prose').first().innerText().then(t => t.length > 200).catch(() => false), 'l\'apartat de Filosofia no carrega el text');
  // tema fosc persistent
  // engranatge: descàrrega del temari en PDF
  await p.goto(base + '/index.html'); await p.click('.mk-gear');
  ok(/Descarrega el temari/i.test(await p.locator('.mk-dl > summary').innerText()), 'falta «Descarrega el temari» a l\'engranatge');
  await p.click('.mk-dl > summary'); await p.click('.mk-dl2 > summary');
  ok(await p.locator('.mk-dl a.mk-ob').count() === 9, 'el desplegable del temari no té els PDF esperats');
  for (const h of await p.locator('.mk-dl a.mk-ob').evaluateAll(a => a.map(x => x.getAttribute('href')))) { const r = await ctx.request.get(base + '/' + h); ok(r.status() === 200, 'PDF no disponible: ' + h); }
  await p.keyboard.press('Escape');
  await p.goto(base + '/index.html'); await p.click('.mk-gear'); await p.click('.mk-gp [data-k=theme][data-v=dark]'); const th = await p.evaluate(() => document.documentElement.getAttribute('data-theme')); ok(th === 'dark' || th === 'light', 'la configuració no canvia el tema');
  // laboratori 3D: carrega three.js sota demanda i pinta un canvas
  await p.goto(base + '/mates.html#t6-s1');
  await p.waitForSelector('.inlab,[data-lab3]', { timeout: 6000 }).catch(() => { });
  const labs = await p.locator('[data-lab3]').count();
  if (labs) { await p.locator('[data-lab3]').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(500); const go = p.locator('[data-lab3] .labgo').first(); if (await go.count()) await go.click(); notes.push('laboratoris 3D a t6-s1: ' + labs + ' (només es comprova que no hi hagi errors)'); }
  ok(!pe.length, 'errors de JavaScript durant les interaccions: ' + pe.slice(0, 2).join(' | '));
  await ctx.close();
  /* idioma: el català és el predeterminat i el peu permet passar al castellà */
  section('5. Idioma');
  const cx = await b.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: 'block' });
  await cx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const q = await cx.newPage(); const qe = []; q.on('pageerror', e => qe.push(e.message));
  await q.goto(base + '/index.html'); await q.waitForSelector('.mk-gear');
  const setLang = async (pg, v) => { await pg.click('.mk-gear'); await pg.click('.mk-gp [data-k=lang][data-v=' + v + ']'); };
  ok(await q.evaluate(() => document.documentElement.lang) === 'ca', 'la llengua per defecte ha de ser el català');
  await q.click('.mk-gear'); ok(await q.locator('.mk-gp [data-k=lang]').count() === 2 && await q.locator('.mk-gp [data-k=lang][aria-pressed=true]').getAttribute('data-v') === 'ca', 'falta el selector d\'idioma a la configuració o no marca el català'); ok(await q.locator('.ft-lang').count() === 0, 'el selector d’idioma ja no ha de ser al peu'); await q.click('.mk-gear');
  await setLang(q, 'es'); await q.waitForFunction(() => document.documentElement.lang === 'es' && !document.documentElement.classList.contains('mk-i18n-wait'));
  await q.waitForTimeout(300);
  const CATWORDS = /\b(Matemàtiques|Història|Reporta|Assignatures|Contacte|Sobre el projecte|Avís legal|Privacitat|Novetats)\b/;
  const bodyEs = () => q.evaluate(() => { const w = document.createTreeWalker(document.body, 5, { acceptNode: n => n.nodeType === 1 ? (n.closest('script,style,[data-notes],[translate=no]') ? 2 : 3) : (n.parentNode.closest('script,style,[data-notes],[translate=no]') ? 2 : 1) }); let t = [], n; while ((n = w.nextNode())) t.push(n.data); return t.join(' '); });
  const tIdx = await bodyEs();
  ok(!CATWORDS.test(tIdx), 'la portada en castellà conserva text de la interfície en català: ' + (CATWORDS.exec(tIdx) || [''])[0]);
  ok(/Asignaturas/.test(tIdx) && /Aviso legal/.test(tIdx), 'la portada en castellà no mostra «Asignaturas» / «Aviso legal»');
  await q.reload(); await q.waitForSelector('.mk-gear', { timeout: 6000 }); await q.click('.mk-gear');
  ok(await q.locator('.mk-gp [data-k=lang][aria-pressed=true]').getAttribute('data-v') === 'es', 'l\'idioma triat no es recorda en recarregar');
  // problemes en castellà (Mates i Física)
  await q.goto(base + '/mates.html#problemes'); await q.waitForSelector('.ptall'); await q.click('.ptall'); await q.waitForSelector('[data-pid="m1.1"]'); await q.waitForTimeout(400);
  ok(/Muestra|Oculta/.test(await q.locator('.ptall').innerText()) && !/Mostra|Amaga/.test(await q.locator('.ptall').innerText()), 'el botó de solucions no està en castellà');
  const pm = await q.locator('[data-pid="m1.1"]').innerText();
  ok(/Estudio del crecimiento/.test(pm) && !/Estudi del creixement/.test(pm), 'el problema 1.1 de Mates no està en castellà');
  await q.goto(base + '/fisica.html#t1-prob'); await q.waitForSelector('[data-pid]'); await q.waitForTimeout(400);
  const pf = await q.locator('[data-pid="f1.1"]').innerText();
  ok(/Un satélite de 500 kg/.test(pf), 'el problema 1 de Física no està en castellà');
  await q.goto(base + '/filosofia.html#test'); await q.waitForTimeout(600);
  const tf = await bodyEs(); ok(/Tests por autor/.test(tf), 'els tests de Filosofia no estan en castellà');
  await q.goto(base + '/filosofia.html#glossari'); await q.waitForTimeout(600);
  ok(/Dóxa y epistéme/.test(await bodyEs()), 'el glossari de Filosofia no està en castellà');
  // apunts de teoria: continuen en català i avisen
  await q.goto(base + '/mates.html#t1-s1'); await q.waitForSelector('.prose[data-notes]', { timeout: 6000 }).catch(() => { });
  ok(await q.locator('.mk-langnote').count() === 1, 'falta l\'avís que els apunts de teoria són en català');
  // enllaç compartit amb ?lang=es
  const q2 = await cx.newPage(); await q2.goto(base + '/mates.html?lang=ca'); await q2.waitForTimeout(300);
  ok(await q2.evaluate(() => document.documentElement.lang) === 'ca', '?lang=ca no canvia a català');
  await q2.goto(base + '/mates.html?lang=es#inici'); await q2.waitForTimeout(500);
  ok(await q2.evaluate(() => document.documentElement.lang) === 'es', '?lang=es no canvia a castellà');
  // tornar al català
  await setLang(q2, 'ca'); await q2.waitForFunction(() => document.documentElement.lang === 'ca'); await q2.waitForTimeout(300);
  ok(/Preguntes freqüents/.test(await q2.evaluate(() => document.querySelector('footer').innerText)), 'en tornar al català el peu no mostra «Preguntes freqüents»');
  ok(!qe.length, 'errors de JavaScript en mode castellà: ' + qe.slice(0, 2).join(' | '));


  section('6b. Progrés i Seccions a Mates');
  {
    const q = await cx.newPage(); const qe = []; q.on('pageerror', e => qe.push(e.message));
    await q.addInitScript(() => { try { localStorage.setItem('mk-lang', 'ca'); } catch (e) { } });
    await q.setViewportSize({ width: 1280, height: 900 });
    for (const [pg, n] of [['filosofia.html', 6], ['mates.html', 3], ['fisica.html', 3]]) {
      for (const lg of ['ca', 'es']) {
        await q.evaluate(l => { try { localStorage.setItem('mk-lang', l); } catch (e) { } }, lg);
        await q.goto(base + '/' + pg); await q.waitForSelector('.mk-sec', { timeout: 8000 }).catch(() => { }); await q.waitForTimeout(600);
        ok(await q.locator('.mk-sec .ddp a').count() >= n, 'el desplegable Seccions de ' + pg + ' és buit en ' + lg);
      }
    }
    await q.evaluate(() => { try { localStorage.setItem('mk-lang', 'ca'); } catch (e) { } });
    /* filtres del cercador i dates d'actualització */
    await q.goto(base + '/index.html'); await q.waitForSelector('.mk-hsb', { timeout: 8000 }).catch(() => { });
    await q.evaluate(() => window.mkSearch.open('camp')); await q.waitForTimeout(900);
    await q.click('.mk-fg[data-g="s"] button[data-v="f"]'); await q.waitForTimeout(400);
    let sm = await q.locator('.mk-sl a small').allInnerTexts();
    ok(sm.length > 3 && sm.every(t => /^Física II/.test(t)), 'el filtre d\'assignatura del cercador no filtra');
    await q.click('.mk-fg[data-g="s"] button[data-v=""]'); await q.fill('.mk-so input', 'derivada'); await q.click('.mk-fg[data-g="t"] button[data-v="p"]'); await q.waitForTimeout(500);
    sm = await q.locator('.mk-sl a small').allInnerTexts();
    ok(sm.length > 0 && sm.every(t => /Problemes/.test(t)), 'el filtre de tipus del cercador no filtra');
    await q.keyboard.press('Escape');
    await q.goto(base + '/mates.html#t3'); await q.waitForSelector('.mk-ud', { timeout: 8000 }).catch(() => { });
    ok(/^Actualitzat el \d{1,2} d.*20\d\d$/.test((await q.locator('.mk-ud').innerText().catch(() => '')).trim()), 'el tema no mostra la data d\'actualització');
    ok(await q.locator('.mk-fud').count() === 1, 'el peu no mostra la data d\'actualització');
    await q.evaluate(() => { try { localStorage.setItem('mk-lang', 'es'); } catch (e) { } });
    await q.goto(base + '/filosofia.html?lang=es#a2'); await q.waitForSelector('.mk-ud', { timeout: 8000 }).catch(() => { }); await q.waitForTimeout(800);
    ok(/^Actualizado el /.test((await q.locator('.mk-ud').innerText().catch(() => '')).trim()), 'la data d\'actualització no es tradueix al castellà');
    await q.evaluate(() => { try { localStorage.setItem('mk-lang', 'ca'); } catch (e) { } });
    await q.goto(base + '/fisica.html'); await q.waitForSelector('.bcard', { timeout: 8000 }).catch(() => { });
    ok(await q.locator('.bcard').count() === 4 && await q.locator('.bcard img').count() === 4, 'el menú de Física no té 4 blocs amb imatge');
    await q.click('.bcard >> nth=2'); await q.waitForSelector('a.trow', { timeout: 4000 }).catch(() => { });
    ok(/#bloc3$/.test(q.url()) && await q.locator('a.trow').count() === 4 && await q.locator('details.tema').count() === 0 && await q.locator('.bjump').count() === 0 && await q.locator('a.trow .mk-ic').count() === 4, 'el bloc 3 de Física no mostra els temes 5-8 com a llista d’enllaços amb icona');
    await q.click('a.trow >> nth=0'); await q.waitForTimeout(500); ok(/#t5$/.test(q.url()), 'un tema del bloc no obre el tema');
    await q.goto(base + '/mates.html'); await q.waitForSelector('.bcard', { timeout: 8000 }).catch(() => { });
    ok(await q.locator('.bcard').count() === 4 && await q.locator('.bcard img').count() === 4 && await q.locator('.mcard').count() === 0, 'el menú de Mates no té 4 blocs amb imatge');
    await q.click('.bcard >> nth=0'); await q.waitForSelector('a.trow', { timeout: 4000 }).catch(() => { });
    ok(/#bloc1$/.test(q.url()) && await q.locator('a.trow').count() === 5 && await q.locator('a.trow .mk-ic').count() === 0 && await q.locator('.bjump').count() === 0, 'un bloc no mostra els seus temes');
    await q.goto(base + '/mates.html#t3-s1'); await q.waitForSelector('.mk-sec', { timeout: 8000 }).catch(() => { });
    ok(await q.locator('.mk-sec').count() === 1 && !(await q.locator('nav.main').isVisible()), 'Mates no té el desplegable Seccions');
    ok(await q.locator('.mk-fin').count() === 0 && await q.locator('.toc a.mk-done').count() === 0, 'ja no ha d’haver-hi el botó «Marca com a fet»');
    await q.goto(base + '/mates.html#problemes'); await q.waitForTimeout(800);
    ok(await q.locator('.mk-pdn').count() === 0, 'els problemes ja no han de tenir el botó «Fet»');
    await q.goto(base + '/index.html'); await q.waitForTimeout(800);
    ok(await q.locator('.mk-pgc').count() === 0, 'la portada no ha de mostrar barres de progrés');
    ok(qe.length === 0, 'errors JS a Progrés: ' + qe.join('|'));
    /* qualitat: mòbil, títols, avisos i vista prèvia */
    await q.setViewportSize({ width: 390, height: 800 });
    await q.goto(base + '/filosofia.html#glossari'); await q.waitForSelector('.mk-tabs', { timeout: 8000 }).catch(() => { }); await q.waitForTimeout(500);
    ok(await q.evaluate(() => { const b = document.querySelector('.mk-tabs'); return b && b.classList.contains('mk-sc') && b.scrollWidth > b.clientWidth && [...b.querySelectorAll('a')].every(a => a.getBoundingClientRect().width >= 60); }), 'la barra inferior de Filosofia talla les pestanyes');
    ok(await q.evaluate(() => { const b = document.querySelector('.mk-tabs'), c = b.querySelector('[aria-current]'); if (!c) return true; const r = c.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1; }), 'la pestanya activa no és visible a la barra inferior');
    for (const u of ['mates.html#t3-s1', 'fisica.html#t5', 'filosofia.html#a2', 'filosofia.html#comparativa', 'mates.html#problemes']) {
      await q.goto(base + '/' + u); await q.waitForTimeout(900);
      ok(await q.evaluate(() => { const hs = [...document.querySelectorAll('h1,h2,h3,h4')].filter(h => h.getBoundingClientRect().height > 0); let p = 0; for (const h of hs) { const l = +h.tagName[1]; if (p && l > p + 1) return false; p = l; } return true; }), 'salts de nivell de títol a ' + u);
    }
    await q.setViewportSize({ width: 1280, height: 800 });
    await q.goto(base + '/mates.html#t99'); await q.waitForSelector('.mk-nf', { timeout: 6000 }).catch(() => { });
    ok(await q.locator('.mk-nf').count() === 1, 'un enllaç inexistent no mostra l’avís');
    await q.goto(base + '/mates.html#t3'); await q.waitForTimeout(700);
    ok(await q.locator('.mk-nf').count() === 0, 'l’avís apareix en un enllaç vàlid');
    for (const [pg, k] of [['mates.html', 'og-mates'], ['fisica.html', 'og-fisica'], ['filosofia.html', 'og-filosofia']]) {
      const h = read(pg);
      ok(h.includes('rel="canonical"') && h.includes('twitter:image:alt') && h.includes('icons/' + k + '.png') && !/og:image:alt" content="Menudo Kanteo — apunts/.test(h), 'vista prèvia incompleta a ' + pg);
    }
    ok(read('index.html').includes('application/ld+json'), 'la portada no té dades estructurades');
    ok(read('preguntes.html').includes('"@type": "FAQPage"'), 'la pàgina de preguntes no té dades estructurades FAQPage');
    await q.goto(base + '/preguntes.html'); await q.waitForSelector('.faq details');
    ok(await q.locator('.faq details').count() >= 10, 'falten preguntes freqüents');
    await q.click('.faq details:first-child summary'); ok(await q.locator('.faq details:first-child[open]').count() === 1, 'una pregunta no s’obre');
    for (const lg of ['ca', 'es']) {
      await q.goto(base + '/calculadora.html' + (lg === 'es' ? '?lang=es' : '')); await q.waitForSelector('#nmb'); await q.waitForTimeout(500);
      await q.fill('#nmb', '7,5'); const ex = [6, 7, 5, 8, 4]; for (let i = 0; i < 5; i++) await q.locator('.ex').nth(i).fill(String(ex[i]));
      await q.fill('#v1', '8'); await q.fill('#v2', '6'); await q.selectOption('#w2', '0.1'); await q.fill('#v3', '4,9'); await q.fill('#tgt', '8');
      const t = await q.locator('#res').innerText(), tt = await q.locator('#tres').innerText();
      ok(/6,900/.test(t) && /9,100/.test(t) && /6,000/.test(t), 'calculadora (' + lg + '): resultat incorrecte: ' + t.replace(/\n/g, ' '));
      ok(/8,750/.test(tt), 'calculadora (' + lg + '): nota objectiu incorrecta: ' + tt);
      if (lg === 'es') ok(/acceso/i.test(t) && !/accés|d’admissió/i.test(t + tt), 'calculadora en castellà amb text català');
      await q.fill('.ex >> nth=4', '3'); ok(/4/.test(await q.locator('#res .msg').innerText()) , 'calculadora: no avisa de fase d’accés < 4');
    }
    await q.setViewportSize({ width: 360, height: 800 });
    for (const u of ['index.html', 'mates.html#t3-s1', 'fisica.html#bloc2', 'fisica.html#t2-s1', 'filosofia.html#a3', 'calculadora.html', 'preguntes.html', 'novetats.html']) {
      await q.goto(base + '/' + u); await q.waitForTimeout(800);
      ok(await q.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'a 360 px la pàgina ' + u + ' té scroll horitzontal');
    }
    await q.setViewportSize({ width: 1280, height: 900 });
    for (const u of ['mates.html', 'fisica.html', 'filosofia.html', 'novetats.html', 'calculadora.html']) {
      await q.goto(base + '/' + u); await q.waitForSelector('.hdr .mk-gear'); await q.waitForTimeout(500);
      const gx = await q.evaluate(() => { const r = document.querySelector('.hdr .mk-gear').getBoundingClientRect(); return innerWidth - r.right; });
      ok(gx < 140, 'la rodeta de ' + u + ' no és a dalt a la dreta (' + Math.round(gx) + ' px)');
    }
    await q.setViewportSize({ width: 1280, height: 900 });
    for (const u of ['preguntes.html', 'calculadora.html', 'mates.html', 'mates.html#bloc1', 'mates.html#bloc3', 'fisica.html', 'fisica.html#bloc2', 'fisica.html#bloc4', 'novetats.html']) {
      const [pg, hs] = u.split('#'); await q.goto(base + '/' + pg + '?lang=es' + (hs ? '#' + hs : '')); await q.waitForTimeout(1200);
      const cat = await q.evaluate(() => (document.body.innerText.replace(/Català/g, '').match(/[^\s]*[àèòçïÀÈÒ’][^\s]*|\b(apartats|laboratoris|problemes|temes)\b/g) || []).slice(0, 6));
      ok(!cat.length, 'castellà amb text català a ' + u + ': ' + cat.join(', '));
    }
    await q.goto(base + '/index.html'); await q.waitForSelector('.mk-gear'); await q.click('.mk-gear'); await q.click('.mk-gp [data-k=class][data-v=on]');
    ok(await q.evaluate(() => document.documentElement.classList.contains('mk-class')) && await q.locator('.mk-cx').isVisible(), 'el mode classe no s’activa');
    await q.reload(); await q.waitForSelector('.mk-cx', { state: 'visible', timeout: 6000 }).catch(() => { });
    ok(await q.locator('.mk-cx').isVisible(), 'el mode classe no es recorda');
    await q.click('.mk-cx'); ok(await q.evaluate(() => !document.documentElement.classList.contains('mk-class')) && !(await q.locator('.mk-cx').isVisible()), 'no es pot sortir del mode classe');
    await q.close();
  }

  section('6. Portada i cerca');
  const w = await cx.newPage(); const we = []; w.on('pageerror', e => we.push(e.message));
  await w.addInitScript(() => { try { localStorage.setItem('mk-lang', 'ca'); } catch (e) { } });
  await w.goto(base + '/index.html'); await w.waitForSelector('.mk-hsb', { timeout: 6000 }).catch(() => { });
  ok(await w.locator('.mk-hsb').count() === 1 && await w.locator('.mk-chip').count() === 0, 'la portada no té el cercador gran o encara té els accessos ràpids');
  await w.click('.mk-hsb'); await w.waitForSelector('.mk-so:not([hidden])', { timeout: 3000 }).catch(() => { });
  ok(await w.locator('.mk-so input').count() === 1, 'el cercador gran no obre la cerca');
  await w.fill('.mk-so input', 'gravedad'); await w.waitForTimeout(500);
  ok(/Gravitatori/i.test(await w.locator('.mk-sl').innerText()), 'el cercador no entén sinònims en castellà («gravedad»)');
  await w.fill('.mk-so input', 'derivdas'); await w.waitForTimeout(500);
  ok(/Derivada/i.test(await w.locator('.mk-sl').innerText()), 'el cercador no corregeix una errada de teclat');
  await w.locator('.mk-sl a[href]:not(.mk-rq)').first().click(); await w.waitForTimeout(300);
  await w.evaluate(() => window.mkSearch.open('')); await w.waitForTimeout(300);
  ok(/derivdas/i.test(await w.locator('.mk-sl').innerText()), 'el cercador no guarda les cerques recents');
  await w.goto(base + '/index.html'); await w.waitForSelector('.mk-live', { timeout: 6000 }).catch(() => { });
  ok(await w.locator('.mk-live').count() === 2, 'les targetes de la portada no tenen la vista prèvia viva');
  await w.keyboard.press('?'); await w.waitForTimeout(200);
  ok(await w.evaluate(() => { const k = document.querySelector('.mk-kb'); return !!k && !k.hidden; }), '«?» no obre les dreceres de teclat');
  await w.keyboard.press('Escape');
  ok(/Dreceres de teclat/.test(await w.evaluate(() => document.querySelector('footer').innerText)), 'falta l\'enllaç «Dreceres de teclat» al peu');
  await w.keyboard.press('g'); await w.keyboard.press('f'); await w.waitForURL(/fisica\.html/, { timeout: 4000 }).catch(() => { });
  ok(/fisica\.html/.test(w.url()), '«g f» no porta a Física');
  await w.goto(base + '/mates.html#t3-s1'); await w.waitForSelector('.pager a.nx', { timeout: 6000 }).catch(() => { });
  await w.keyboard.press('n'); await w.waitForTimeout(400);
  ok(/#t3-s2$/.test(w.url()), '«n» no passa a l\'apartat següent');
  await w.goto(base + '/mates.html#t5'); await w.waitForTimeout(800);
  ok(await w.locator('.mk-art').count() === 0, 'el tema de Mates no hauria de tenir il·lustració');
  await w.goto(base + '/filosofia.html#a2'); await w.waitForTimeout(800);
  ok(await w.locator('.mk-art').count() === 0, 'Filosofia no ha de tenir il·lustracions als autors');
  await w.goto(base + '/index.html'); await w.waitForSelector('.mk-gear', { timeout: 6000 }).catch(() => { });
  await w.click('.mk-gear'); await w.click('.mk-gp [data-k=theme][data-v=dark]');
  ok(await w.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'la configuració no canvia al tema fosc');
  await w.click('.mk-gp [data-k=motion][data-v=off]');
  ok(await w.evaluate(() => document.documentElement.getAttribute('data-motion')) === 'reduced', 'la configuració no redueix les animacions');
  await w.click('.mk-gp [data-a=kb]'); await w.waitForTimeout(200);
  ok(await w.evaluate(() => { const k = document.querySelector('.mk-kb'); return !!k && !k.hidden; }), 'la configuració no obre les dreceres');
  await w.keyboard.press('Escape');
  await w.click('.mk-gear'); await w.click('.mk-gp [data-k=theme][data-v=auto]'); await w.click('.mk-gp [data-k=motion][data-v=on]');
  await w.goto(base + '/filosofia.html#inici'); await w.waitForSelector('.mk-sec', { timeout: 6000 }).catch(() => { });
  ok(await w.locator('nav.main').isHidden(), 'a Filosofia encara es veu la fila de pestanyes');
  await w.click('.mk-sec .ddb'); await w.click('.mk-sec .ddp a[href="#cronologia"]'); await w.waitForTimeout(400);
  ok(/#cronologia$/.test(w.url()), 'el desplegable de seccions no porta a Cronologia');
  ok(await w.locator('#th').isHidden(), 'el botó de tema clar/fosc encara és visible');
  await w.evaluate(() => window.mkSearch.open('')); await w.waitForTimeout(200);
  ok(!/Suggeriment/.test(await w.locator('.mk-sl').innerText()), 'el cercador encara mostra suggeriments');
  await w.keyboard.press('Escape');
  await w.goto(base + '/mates.html#t3-s1'); await w.waitForSelector('.mk-ix:not([hidden])', { timeout: 6000 }).catch(() => { });
  ok(await w.locator('.mk-ix:not([hidden])').count() === 1 && await w.locator('.mk-ixl').count() >= 4, 'els apunts llargs no tenen l\'índex flotant');
  await w.click('.mk-ix'); await w.click('.mk-ixl >> nth=5'); await w.waitForTimeout(700);
  ok(/Asímptota/.test(await w.locator('.mk-ixl.on').innerText().catch(() => '')), 'l\'índex flotant no marca l\'apartat actual');
  ok(!/#t3-s1$/.test('x') && /#t3-s1$/.test(w.url()), 'l\'índex flotant ha canviat la ruta');
  await w.keyboard.press('Escape');
  ok(!/img\/prev-/.test(read('index.html')), 'queden referències a les imatges antigues');
  for (const pg of ['mates', 'fisica', 'filosofia', 'novetats']) ok(new RegExp('og-' + pg + '\\.png').test(read(pg + '.html')), 'falta la targeta de compartir pròpia de ' + pg);
  ok(!we.length, 'errors de JavaScript a la portada i al cercador: ' + we.slice(0, 2).join(' | '));
  await cx.close(); await b.close();
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
