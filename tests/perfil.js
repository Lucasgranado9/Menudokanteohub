/* Pruebas del perfil (cuestionario tras crear la cuenta): node tests/perfil.js
   Sale tras entrar, 4 pasos según la modalidad, guarda «mk-perfil», filtra las asignaturas (portada, menús, pie),
   «ver todas», no aparece sin sesión ni tras «Más tarde» dos veces, teclado (Esc, flechas) y cambio desde Mi cuenta. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (f.endsWith(path.sep) || f.endsWith('/')) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
let n = 0, bad = 0; const ok = (c, m) => { n++; if (!c) { bad++; console.log('✗ ' + m); } };
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch(); const errs = [];
  async function page(init, vp) {
    const c = await b.newContext({ locale: 'es-ES', viewport: vp || { width: 900, height: 900 } });
    await c.route('https://www.gstatic.com/firebasejs/**', r => r.abort()); await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort());
    await c.addInitScript(i => { try { ['mk-wl', 'mk-ob', 'mk-on', 'mk-tour'].forEach(k => { if (!localStorage[k]) localStorage[k] = '1'; }); Object.keys(i || {}).forEach(k => { if (!localStorage[k]) localStorage[k] = i[k]; }); } catch (e) { } }, init);
    const p = await c.newPage(); p.on('pageerror', e => errs.push(e.message)); return { c, p };
  }
  const wake = p => p.evaluate(() => { document.dispatchEvent(new CustomEvent('mk-auth', { detail: {} })); setTimeout(() => document.dispatchEvent(new CustomEvent('mk-sync', { detail: { status: 'ok' } })), 450); });
  const vis = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); return e ? getComputedStyle(e).display !== 'none' : null; }, sel);

  /* 1 · sin sesión: nada */
  let { c, p } = await page({}); await p.goto(base + 'index.html'); await p.waitForTimeout(1500); await wake(p); await p.waitForTimeout(1800);
  ok(!(await p.$('.mkpf')), 'sin sesión no debe salir el cuestionario'); await c.close();

  /* 2 · con sesión y sin perfil: sale, 4 pasos, guarda y filtra */
  ({ c, p } = await page({ 'mk-acct': '1' })); await p.goto(base + 'index.html'); await p.waitForTimeout(1500); await wake(p);
  await p.waitForSelector('.mkpf.on', { timeout: 8000 }); await p.waitForTimeout(700);
  ok(await p.$$eval('.mkpf-o', a => a.length) === 4, 'el paso 1 ofrece 4 modalidades');
  ok(await p.$eval('.mkpf', e => e.getAttribute('role') === 'dialog' && e.getAttribute('aria-modal') === 'true'), 'es un diálogo modal');
  ok(await p.$eval('.mkpf-o', e => e.getAttribute('role') === 'radio'), 'las opciones son radios accesibles');
  ok(await p.evaluate(() => document.activeElement.classList.contains('mkpf-o')), 'el foco entra en la primera opción');
  await p.click('.mkpf-o >> nth=2'); await p.waitForTimeout(900);   /* sociales */
  const t2 = await p.$$eval('.mkpf-o b', a => a.map(x => x.textContent).join('|'));
  ok(/Economía/.test(t2) && !/Ingeniería/.test(t2), 'el paso 2 depende de la modalidad: ' + t2);
  await p.click('.mkpf-bk'); await p.waitForTimeout(700); ok(await p.$eval('.mkpf-o[aria-checked=true]', e => /sociales/.test(e.textContent)), 'volver conserva la elección');
  await p.click('.mkpf-o >> nth=1'); await p.waitForTimeout(900);   /* tecnológico: cambia las respuestas del paso 2 */
  ok(/Ingeniería/.test(await p.$$eval('.mkpf-o b', a => a.map(x => x.textContent).join('|'))), 'al cambiar de modalidad cambian las preguntas');
  await p.click('.mkpf-o >> nth=0'); await p.waitForTimeout(900); await p.click('.mkpf-o >> nth=1'); await p.waitForTimeout(900); await p.click('.mkpf-o >> nth=2'); await p.waitForTimeout(1000);
  ok(await p.$('.mkpf-go') && (await p.$$eval('.mkpf-sj div', a => a.length)) === 3, 'el final lista las 3 asignaturas del tecnológico');
  await p.click('.mkpf-go'); await p.waitForTimeout(600);
  const pf = await p.evaluate(() => JSON.parse(localStorage['mk-perfil'] || 'null'));
  ok(pf && pf.b === 'te' && pf.c === 'ing' && pf.y === '2' && pf.o === 'pau', 'guarda el perfil: ' + JSON.stringify(pf));
  ok(!(await p.$('.mkpf')), 'se cierra al empezar');
  ok(await vis(p, '.sc-ma') && await vis(p, '.sc-ph') && await vis(p, '.sc-fi'), 'el tecnológico ve Mates, Física y Filosofía');

  /* 3 · humanidades: solo Filosofía en portada, menú superior, menú móvil y pie */
  await p.evaluate(() => window.mkPerfil.open()); await p.waitForTimeout(500);
  await p.click('.mkpf-o >> nth=3'); await p.waitForTimeout(900); await p.click('.mkpf-o >> nth=0'); await p.waitForTimeout(900); await p.click('.mkpf-o >> nth=1'); await p.waitForTimeout(900); await p.click('.mkpf-o >> nth=3'); await p.waitForTimeout(1000);
  ok(/Historia de la Filosofía/.test(await p.$eval('.mkpf-sj', e => e.textContent)) && (await p.$$eval('.mkpf-sj div', a => a.length)) === 1, 'humanidades: una asignatura de momento');
  await p.click('.mkpf-go'); await p.waitForTimeout(600);
  ok(!(await vis(p, '.sc-ma')) && !(await vis(p, '.sc-ph')) && (await vis(p, '.sc-fi')), 'humanidades oculta Mates y Física en la portada');
  ok(await p.evaluate(() => [...document.querySelectorAll('footer .ft-cols a[href="mates.html"],footer .ft-cols a[href="fisica.html"]')].every(a => getComputedStyle(a).display === 'none')), 'el pie oculta las asignaturas de otros itinerarios');
  ok(await p.evaluate(() => [...document.querySelectorAll('.mk-mgc1 li')].filter(l => l.querySelector('a[href="mates.html"],a[href="fisica.html"]')).every(l => getComputedStyle(l).display === 'none')), 'el menú «Asignaturas» las oculta');
  /* ver todas */
  await p.evaluate(() => window.mkPerfil.showAll(true)); await p.waitForTimeout(200);
  ok(await vis(p, '.sc-ma') && await vis(p, '.sc-ph'), '«ver todas» las devuelve');
  /* el perfil se sincroniza con la cuenta */
  await c.close();

  /* 4 · «Más tarde»: Esc cuenta como omitir; a la segunda no vuelve a insistir */
  ({ c, p } = await page({ 'mk-acct': '1' })); await p.goto(base + 'index.html'); await p.waitForTimeout(1500); await wake(p);
  await p.waitForSelector('.mkpf.on', { timeout: 8000 }); await p.keyboard.press('ArrowDown'); await p.keyboard.press('Escape'); await p.waitForTimeout(600);
  ok(!(await p.$('.mkpf')) && await p.evaluate(() => localStorage['mk-pf-sk']) === '1', 'Esc omite y lo recuerda');
  await c.close();
  ({ c, p } = await page({ 'mk-acct': '1', 'mk-pf-sk': '2' })); await p.goto(base + 'index.html'); await p.waitForTimeout(1500); await wake(p); await p.waitForTimeout(2200);
  ok(!(await p.$('.mkpf')), 'tras omitirlo dos veces no insiste'); await c.close();

  /* 5 · perfil ya guardado (otro dispositivo): no pregunta y filtra al cargar */
  ({ c, p } = await page({ 'mk-acct': '1', 'mk-perfil': JSON.stringify({ v: 1, b: 'so', u: 5 }) })); await p.goto(base + 'index.html'); await p.waitForTimeout(1500); await wake(p); await p.waitForTimeout(1800);
  ok(!(await p.$('.mkpf')), 'con perfil no vuelve a preguntar'); ok(!(await vis(p, '.sc-ma')) && (await vis(p, '.sc-fi')), 'ciencias sociales: solo Filosofía');
  /* 6 · móvil: la hoja cabe y se cambia desde Mi cuenta */
  await c.close();
  ({ c, p } = await page({ 'mk-acct': '1', 'mk-perfil': JSON.stringify({ v: 1, b: 'cs', c: 'med', u: 5 }) }, { width: 360, height: 640 })); await p.goto(base + 'index.html'); await p.waitForTimeout(1500);
  await p.evaluate(() => window.mkStats.open('cuenta')); await p.waitForTimeout(800);
  const tab = await p.$('[data-tab="cuenta"]'); tab && await tab.click(); await p.waitForTimeout(500);
  ok(await p.$('[data-pf]') && /Científico/.test(await p.$eval('[data-pf]', e => e.closest('.mks-c').textContent)), 'Mi cuenta muestra el perfil y «Cambiar»');
  await p.click('[data-pf]'); await p.waitForSelector('.mkpf.on', { timeout: 4000 }); await p.waitForTimeout(700);
  const r = await p.$eval('.mkpf-sh', e => e.getBoundingClientRect()); ok(r.width <= 360 && r.bottom <= 640 && r.top >= 0, 'la hoja cabe en 360×640: ' + JSON.stringify([r.width, r.top, r.bottom]));
  ok(await p.$eval('.mkpf-o[aria-checked=true]', e => /Científico/.test(e.textContent)), 'al editar, parte de lo guardado');
  await c.close();
  ok(!errs.length, 'sin errores JS: ' + errs.join(' | '));
  await b.close(); srv.close(); console.log(bad ? '✗ ' + bad + ' fallos de ' + n : '✓ ' + n + ' comprobaciones del perfil correctas'); process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
