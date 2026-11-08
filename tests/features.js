/* Pruebas de interfaz de las funciones de estudio: node tests/features.js
   Repaso «Me falló», plan, Revista (lectura, favoritas, continuar), aviso de copia, enlace de sincronización,
   recordatorio y asistente con el teclado abierto en móvil. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium, devices } = require('playwright');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const errs = []; let n = 0;
const ok = (c, m) => { n++; if (!c) errs.push(m); };
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch();
  const page = async (o, init) => { const c = await b.newContext({ locale: 'es-ES', ...o }); await c.addInitScript(() => { try { if (!localStorage['mk-wl']) localStorage['mk-wl'] = '1'; } catch (e) { } }); const p = await c.newPage(); p.on('pageerror', e => errs.push('JS: ' + e.message)); return p; };

  /* ----- Revista: tiempo de lectura, favoritas, continuar ----- */
  let p = await page({ viewport: { width: 420, height: 800 } });
  await p.goto(base + 'revista.html'); await p.waitForTimeout(700);
  ok(await p.evaluate(() => [...document.querySelectorAll('.rv-c:not([hidden]) .rv-min')].every(e => /^\d+ min$/.test(e.textContent)) && document.querySelectorAll('.rv-min').length > 5), 'Revista: tiempo de lectura en cada tarjeta');
  const star = await p.evaluate(() => { const b = document.querySelector('.rv-c:not([hidden]) .rv-fv'); const r = b.getBoundingClientRect(); return { l: !!b.getAttribute('aria-label'), w: r.width, h: r.height, pr: b.getAttribute('aria-pressed') }; });
  ok(star.l && star.w >= 44 && star.h >= 44 && star.pr === 'false', 'Revista: estrella con nombre, 44px y aria-pressed');
  await p.click('.rv-c:not([hidden]) .rv-fv'); ok(await p.evaluate(() => Object.keys(JSON.parse(localStorage['mk-rvf'] || '{}')).length === 1), 'Revista: la favorita se guarda');
  await p.click('.rv-chip[data-f=fav]'); ok(await p.evaluate(() => document.querySelectorAll('.rv-c:not([hidden])').length === 1), 'Revista: el filtro «Favoritas» muestra solo 1');
  await p.click('.rv-chip[data-f=all]');
  await p.click('.rv-c:not([hidden]) .rv-t a'); await p.waitForTimeout(700); await p.evaluate(() => { document.querySelector('.rv-rd').scrollTop = 200; }); await p.waitForTimeout(700);
  await p.goto(base + 'revista.html?x=2'); await p.waitForTimeout(700);
  ok(await p.evaluate(() => { const c = document.querySelector('#rv-cont'); return !c.hidden && /Contin.a leyendo · \d+%/i.test(c.textContent); }), 'Revista: aparece «Continúa leyendo» con porcentaje');
  await p.close();

  /* ----- Repaso «Me falló» ----- */
  p = await page({ viewport: { width: 900, height: 900 } });
  await p.goto(base + 'problemes.html'); await p.evaluate(() => sessionStorage.setItem('mk-pm-go', JSON.stringify({ s: 'm' })));
  await p.goto(base + 'problemes.html?x=1#pau'); await p.waitForTimeout(1500);
  await p.click('[data-act=year]'); await p.waitForTimeout(500); await p.click('[data-act=open]'); await p.waitForTimeout(900);
  await p.click('.pm-miss'); ok(await p.evaluate(() => Object.keys(JSON.parse(localStorage['mk-pmr'] || '{}')).length === 1), 'Repaso: «Me falló» guarda el apartado');
  ok(await p.evaluate(() => document.querySelector('.pm-miss').getAttribute('aria-pressed') === 'true'), 'Repaso: aria-pressed activo');
  await p.evaluate(() => { const r = JSON.parse(localStorage['mk-pmr']); Object.keys(r).forEach(k => r[k].t = Date.now() - 3 * 864e5); localStorage['mk-pmr'] = JSON.stringify(r); });
  await p.evaluate(() => sessionStorage.setItem('mk-pm-go', JSON.stringify({ s: 'm' }))); await p.goto(base + 'problemes.html?x=3#pau'); await p.waitForTimeout(1500);
  ok(await p.evaluate(() => !!document.querySelector('.pm-rc')), 'Repaso: la tarjeta de repaso aparece cuando toca');
  await p.close();

  /* ----- Plan, copia, enlace y recordatorio en Estadísticas ----- */
  p = await page({ viewport: { width: 420, height: 900 } });
  await p.goto(base + 'index.html'); await p.evaluate(() => { localStorage['mk-done'] = JSON.stringify(Object.fromEntries([...Array(30)].map((_, i) => ['m-1-' + i, 1]))); localStorage['mk-pau'] = '2027-06-02'; });
  await p.evaluate(() => window.mkStats.open()); await p.waitForTimeout(1200);
  ok(await p.evaluate(() => !!document.querySelector('#mks-plan [data-pl]')), 'Plan: se pinta con controles');
  ok(await p.evaluate(() => !!document.querySelector('#mks-rem [data-rm=on]')), 'Recordatorio: botón de activar');
  await p.click('[data-lk]'); await p.waitForTimeout(900);
  const url = await p.inputValue('#mks-ta').catch(() => ''); ok(/#mk-sync=1\.[\w-]+$/.test(url), 'Enlace: se genera con datos comprimidos');
  const q = await page({ viewport: { width: 420, height: 900 } });
  await q.goto(url.replace(/^http:\/\/[^/]+\//, base)); await q.waitForTimeout(1500);
  ok(await q.evaluate(() => /30 problemas/.test(document.querySelector('#mks-imp').textContent) && !!document.querySelector('[data-do=merge]')), 'Enlace: el otro dispositivo propone importar 30 problemas');
  await q.click('[data-do=merge]'); await q.waitForTimeout(1800);
  ok(await q.evaluate(() => Object.keys(JSON.parse(localStorage['mk-done'] || '{}')).length === 30 && !location.hash), 'Enlace: importa y limpia el #');
  await q.goto(base + 'index.html?x=9#mk-sync=1.xx'); await q.waitForTimeout(1200);
  ok(await q.evaluate(() => /no és vàlid|no es válido/.test(document.querySelector('#mks-imp').textContent)), 'Enlace: uno roto da un error claro');
  await q.close(); await p.close();

  /* ----- Aviso de copia ----- */
  p = await page({ viewport: { width: 400, height: 800 } });
  await p.goto(base + 'mates.html'); await p.evaluate(() => { localStorage['mk-done'] = JSON.stringify(Object.fromEntries([...Array(8)].map((_, i) => ['a' + i, 1]))); localStorage['mk-since'] = String(Date.now() - 30 * 864e5); });
  await p.goto(base + 'mates.html?x=1'); await p.waitForTimeout(8500);
  ok(await p.isVisible('.mkbk'), 'Copia: el aviso aparece a las 3 semanas'); await p.click('.mkbk button:last-child'); await p.waitForTimeout(600);
  ok(await p.evaluate(() => +localStorage['mk-bkz'] > Date.now() && !document.querySelector('.mkbk')), 'Copia: «Más tarde» lo aplaza una semana');
  await p.goto(base + 'mates.html?x=2'); await p.waitForTimeout(8500); ok(!(await p.isVisible('.mkbk')), 'Copia: no vuelve mientras está aplazado');
  await p.close();

  /* ----- Asistente con el teclado abierto (viewport bajo) ----- */
  p = await page({ ...devices['iPhone 13'] });
  await p.goto(base + 'index.html?ayuda=1'); await p.waitForTimeout(2500);
  for (const h of [700, 430, 340]) {
    await p.setViewportSize({ width: 390, height: h }); await p.waitForTimeout(500);
    const r = await p.evaluate(() => { const a = document.querySelector('.ay-p').getBoundingClientRect(), i = document.querySelector('.ay-in').getBoundingClientRect(); return { t: a.top, b: a.bottom, it: i.top, ib: i.bottom, vh: innerHeight }; });
    ok(r.t >= 0 && r.b <= r.vh && r.it >= 0 && r.ib <= r.vh, 'Asistente: panel e input dentro de la pantalla con ' + h + 'px de alto');
  }
  await p.close();
  await b.close(); srv.close();
  if (errs.length) { console.log('✗ ' + errs.length + ' fallos de ' + n + ':\n  ' + errs.join('\n  ')); process.exit(1); }
  console.log('✓ ' + n + ' comprobaciones de funciones correctas');
})().catch(e => { console.error(e); process.exit(1); });
