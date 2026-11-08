/* Auditoría de accesibilidad (teclado + lector de pantalla) con Chromium: node tests/a11y.js
   Comprueba nombres accesibles, roles, trampa de foco, Escape y retorno del foco en barra inferior,
   hojas (Más, Favoritos, Estadísticas), paleta ⌘K y estrellas; y busca controles sin nombre en cada página. */
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
  const ctx = async (o) => { const c = await b.newContext({ locale: 'es-ES', ...o }); await c.addInitScript(() => { try { localStorage['mk-wl'] = '1'; localStorage['mk-lang'] = 'es'; localStorage['mk-streak'] = JSON.stringify({ n: 2, b: 2, h: [], m: 0, d: new Date().toISOString().slice(0, 10) }); } catch (e) {} }); await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort()); return c; };
  const name = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); if (!e) return null; return (e.getAttribute('aria-label') || (e.getAttribute('aria-labelledby') && document.getElementById(e.getAttribute('aria-labelledby').split(' ')[0])?.textContent) || e.textContent || '').trim(); }, sel);
  const inside = (p, sel) => p.evaluate(s => { const e = document.querySelector(s); return !!e && e.contains(document.activeElement); }, sel);

  /* ----- móvil: barra inferior y hojas ----- */
  const m = await ctx({ ...devices['iPhone 13'] }); const p = await m.newPage(); const pe = []; p.on('pageerror', e => pe.push(e.message));
  await p.goto(base + 'index.html'); await p.waitForTimeout(900);
  ok(await p.evaluate(() => { const n = document.querySelector('.mkb'); return !!n && (n.tagName === 'NAV' || n.getAttribute('role') === 'navigation') && !!n.getAttribute('aria-label'); }), 'Barra inferior: debe ser <nav> con aria-label');
  const tabs = await p.evaluate(() => [...document.querySelectorAll('.mkb button, .mkb a')].map(e => ({ n: (e.getAttribute('aria-label') || e.textContent).trim(), h: e.getBoundingClientRect().height, w: e.getBoundingClientRect().width })));
  ok(tabs.length >= 4 && tabs.every(t => t.n), 'Barra inferior: todas las pestañas con nombre'); ok(tabs.every(t => t.h >= 44 && t.w >= 44), 'Barra inferior: objetivos táctiles de 44 px');
  // Más: abrir, foco dentro, Tab atrapado, Escape y retorno
  await p.focus('.mkb [data-k=mas], .mkb button:last-of-type'); const mas = await p.evaluate(() => document.activeElement.outerHTML.slice(0, 80));
  await p.keyboard.press('Enter'); await p.waitForTimeout(600);
  ok(await p.evaluate(() => { const s = document.querySelector('.mkb-sh'); return !!s && /dialog/.test(s.getAttribute('role') || '') && s.getAttribute('aria-modal') === 'true' && !!(s.getAttribute('aria-label') || s.getAttribute('aria-labelledby')); }), 'Hoja «Más»: role=dialog, aria-modal y nombre');
  ok(await inside(p, '.mkb-sh'), 'Hoja «Más»: el foco entra en la hoja');
  for (let i = 0; i < 40; i++) await p.keyboard.press('Tab'); ok(await inside(p, '.mkb-sh'), 'Hoja «Más»: Tab no se escapa de la hoja');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  ok(await p.evaluate(() => !document.querySelector('.mkb-sh.on')), 'Hoja «Más»: Escape la cierra'); ok(await p.evaluate(() => document.activeElement && document.activeElement.closest('.mkb') !== null), 'Hoja «Más»: el foco vuelve a la barra');
  // Estadísticas
  await p.evaluate(() => window.mkStats.open()); await p.waitForTimeout(700);
  ok(await p.evaluate(() => { const s = document.querySelector('.mks-sh'); return s.getAttribute('role') === 'dialog' && s.getAttribute('aria-modal') === 'true' && !!document.getElementById(s.getAttribute('aria-labelledby')).textContent; }), 'Estadísticas: dialog con nombre');
  ok(await inside(p, '.mks-sh'), 'Estadísticas: el foco entra');
  for (let i = 0; i < 60; i++) await p.keyboard.press('Tab'); ok(await inside(p, '.mks-sh'), 'Estadísticas: Tab atrapado');
  ok(await p.evaluate(() => [...document.querySelectorAll('.mks-sh [role=progressbar]')].every(e => e.getAttribute('aria-label') && e.hasAttribute('aria-valuenow'))), 'Estadísticas: barras con nombre y valor');
  ok(await p.evaluate(() => [...document.querySelectorAll('.mks-sh button, .mks-sh a, .mks-sh input')].filter(e => e.getClientRects().length && e.getAttribute('aria-hidden') !== 'true').every(e => (e.getAttribute('aria-label') || e.textContent || (e.labels && e.labels[0] && e.labels[0].textContent) || '').trim())), 'Estadísticas: controles con nombre');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400); ok(await p.evaluate(() => !document.querySelector('.mks-ov.on')), 'Estadísticas: Escape cierra');
  // Favoritos
  await p.evaluate(() => window.mkFav.open('fav')); await p.waitForTimeout(700);
  ok(await p.evaluate(() => { const s = document.querySelector('.mkp-sh'); return s && s.getAttribute('role') === 'dialog' && s.getAttribute('aria-modal') === 'true'; }), 'Favoritos: dialog modal'); ok(await inside(p, '.mkp-sh'), 'Favoritos: el foco entra');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400); ok(await p.evaluate(() => !document.querySelector('.mkp-ov.on')), 'Favoritos: Escape cierra');
  ok(pe.length === 0, 'Errores JS en móvil: ' + pe.join('|')); await m.close();

  /* ----- escritorio: paleta ⌘K, estrellas, teclado ----- */
  const d = await ctx({ viewport: { width: 1280, height: 860 } }); const q = await d.newPage(); await q.goto(base + 'problemes.html'); await q.waitForTimeout(2500);
  await q.keyboard.press('Control+k'); await q.waitForTimeout(500);
  ok(await q.evaluate(() => { const o = document.querySelector('.mkk-ov,.mkk-b,[class*=mkk]'); const dlg = document.querySelector('[role=dialog][class*=mkk], .mkk-b[role=dialog], [class*=mkk][role=dialog]'); return !!dlg; }), 'Paleta ⌘K: role=dialog');
  ok(await q.evaluate(() => { const i = document.querySelector('[class*=mkk] input'); return !!i && !!(i.getAttribute('aria-label') || i.labels?.length) && /combobox/.test(i.getAttribute('role') || '') ; }), 'Paleta ⌘K: campo combobox con etiqueta');
  ok(await q.evaluate(() => { const l = document.querySelector('[class*=mkk] [role=listbox]'); return !!l; }), 'Paleta ⌘K: lista con role=listbox');
  await q.keyboard.type('fav'); await q.keyboard.press('ArrowDown'); await q.waitForTimeout(200);
  ok(await q.evaluate(() => { const i = document.querySelector('[class*=mkk] input'); const a = i.getAttribute('aria-activedescendant'); return !!a && !!document.getElementById(a); }), 'Paleta ⌘K: aria-activedescendant válido');
  await q.keyboard.press('Escape'); await q.waitForTimeout(400); ok(await q.evaluate(() => !document.querySelector('.mkk-ov.on,.mkk-b.on,[class*=mkk].on')), 'Paleta ⌘K: Escape cierra');
  const st = await q.evaluate(() => [...document.querySelectorAll('.mkp-sar')].map(b => ({ n: b.getAttribute('aria-label'), p: b.getAttribute('aria-pressed'), h: b.getBoundingClientRect().height })));
  ok(st.length > 0 && st.every(s => s.n && (s.p === 'true' || s.p === 'false')), 'Estrellas: nombre y aria-pressed');
  ok(await q.evaluate(() => { const sk = document.querySelector('.mk-skip'); return !!sk; }), 'Enlace «saltar al contenido»');
  await d.close();

  /* ----- asistente (chat) y buscador de problemas PAU ----- */
  const ay = await ctx({ viewport: { width: 1280, height: 860 }, locale: 'es-ES' }); const ap = await ay.newPage(); const ape = []; ap.on('pageerror', e => ape.push(e.message));
  await ap.goto(base + 'mates.html'); await ap.waitForTimeout(900);
  ok(await name(ap, '.ay-fab') === 'Abre el asistente', 'asistente: el botón no tiene nombre «Abre el asistente»');
  ok(await ap.getAttribute('.ay-fab', 'aria-expanded') === 'false', 'asistente: aria-expanded inicial debe ser false');
  await ap.focus('.ay-fab'); await ap.keyboard.press('Enter'); await ap.waitForSelector('.ay-p.on', { timeout: 4000 });
  ok(await ap.getAttribute('.ay-fab', 'aria-expanded') === 'true', 'asistente: aria-expanded debe ser true al abrir');
  ok(await ap.getAttribute('.ay-p', 'role') === 'dialog' && !!(await ap.getAttribute('.ay-p', 'aria-label')), 'asistente: el panel necesita role=dialog y nombre');
  ok(await ap.getAttribute('.ay-lg', 'role') === 'log', 'asistente: la conversación debe ser role=log (se anuncia a lectores de pantalla)');
  ok(!!(await name(ap, '.ay-in')) && !!(await name(ap, '.ay-s')) && !!(await name(ap, '.ay-ib')), 'asistente: campo, enviar y cerrar necesitan nombre accesible');
  await ap.waitForTimeout(200); ok(await inside(ap, '.ay-p'), 'asistente: al abrir el foco debe entrar en el panel');
  await ap.fill('.ay-in', 'problemas de integrales'); await ap.keyboard.press('Enter'); await ap.waitForTimeout(1600);
  ok((await ap.$$('.ay-c')).length >= 1, 'asistente: «problemas de integrales» debe devolver resultados');
  ok(await ap.evaluate(() => [...document.querySelectorAll('.ay-c,.ay-l,.ay-ch')].every(e => e.getBoundingClientRect().height >= 32)), 'asistente: objetivos táctiles de menos de 32 px');
  await ap.fill('.ay-in', '2^10 + 3'); await ap.keyboard.press('Enter'); await ap.waitForTimeout(1200);
  ok((await ap.evaluate(() => [...document.querySelectorAll('.ay-big')].pop().textContent)) === '1027', 'asistente: 2^10 + 3 debe dar 1027');
  await ap.keyboard.press('Escape'); await ap.waitForTimeout(400);
  ok(await ap.getAttribute('.ay-fab', 'aria-expanded') === 'false' && await ap.getAttribute('.ay-p', 'inert') !== null, 'asistente: Escape debe cerrarlo y dejarlo inerte');
  ok(await ap.evaluate(() => document.activeElement && document.activeElement.classList.contains('ay-fab')), 'asistente: al cerrar con Escape el foco debe volver al botón');
  await ap.goto(base + 'problemes.html#pau'); await ap.waitForTimeout(900); await ap.click('.pau-c'); await ap.waitForSelector('#pm-q', { timeout: 5000 });
  ok(!!(await name(ap, '#pm-q')), 'buscador PAU: el campo necesita nombre accesible');
  ok(await ap.evaluate(() => !!document.querySelector('.pm-fd[role=search]') && document.querySelectorAll('.pm-fx[aria-pressed]').length >= 9), 'buscador PAU: filtros con aria-pressed y landmark search');
  await ap.fill('#pm-q', 'integral'); await ap.waitForTimeout(900);
  ok(await ap.getAttribute('#pm-fc', 'role') === 'status', 'buscador PAU: el recuento de resultados debe ser role=status');
  ok((await ap.$$('.pm-tc')).length > 3, 'buscador PAU: «integral» debe devolver varios problemas');
  await ap.fill('#pm-q', 'zzzzqq'); await ap.waitForTimeout(700);
  ok((await ap.textContent('#pm-fc')).includes('Sin resultados') && !!(await ap.$('[data-act=fclear]')), 'buscador PAU: sin resultados debe ofrecer quitar filtros');
  ok(!ape.length, 'asistente/buscador: errores de JavaScript → ' + ape.join(' | '));
  await ay.close();

  /* ----- todas las páginas: controles sin nombre, imágenes sin alt, ids duplicados, idioma, main ----- */
  const all = await ctx({ viewport: { width: 390, height: 800 }, isMobile: true }); const pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '404.html');
  for (const f of pages) {
    const pg = await all.newPage(); await pg.goto(base + f); await pg.waitForTimeout(700);
    const r = await pg.evaluate(() => {
      const vis = e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden';
      const nm = e => (e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') && document.getElementById(e.getAttribute('aria-labelledby').split(' ')[0])?.textContent || e.title || e.textContent || (e.labels && e.labels[0] && e.labels[0].textContent) || e.querySelector('img[alt]')?.alt || '').trim();
      const bad = [...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,[role=button]')].filter(e => vis(e) && !e.closest('[aria-hidden=true]') && !nm(e)).map(e => e.tagName + '.' + (e.className + '').slice(0, 24));
      const imgs = [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length;
      const ids = {}; document.querySelectorAll('[id]').forEach(e => ids[e.id] = (ids[e.id] || 0) + 1); const dup = Object.keys(ids).filter(k => ids[k] > 1);
      return { bad: bad.slice(0, 4), imgs, dup: dup.slice(0, 4), lang: document.documentElement.lang, main: !!document.querySelector('main,[role=main]'), h1: document.querySelectorAll('h1').length };
    });
    ok(!r.bad.length, f + ': controles sin nombre accesible → ' + r.bad.join(', ')); ok(r.imgs === 0, f + ': ' + r.imgs + ' imágenes sin atributo alt'); ok(!r.dup.length, f + ': ids duplicados → ' + r.dup.join(', '));
    ok(!!r.lang, f + ': falta lang en <html>'); ok(r.main, f + ': falta landmark main'); ok(r.h1 >= 1, f + ': falta h1');
    await pg.close();
  }
  await b.close(); srv.close();
  if (errs.length) { console.log('✗ ' + errs.length + ' problemas de accesibilidad de ' + n + ' comprobaciones:\n  ' + errs.join('\n  ')); process.exit(1); }
  console.log('✓ ' + n + ' comprobaciones de accesibilidad correctas');
})().catch(e => { console.error(e); process.exit(1); });
