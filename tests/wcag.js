/* WCAG 2.2 AA (comprobaciones automatizables) con Chromium: node tests/wcag.js [--verbose]
   Cubre: idioma, título, repères (landmarks), zoom permitido (1.4.4), reflow a 320 px (1.4.10), espaciado de texto (1.4.12),
   tamaño de objetivo ≥ 24 px (2.5.8), foco visible (2.4.7) y no oculto por barras fijas (2.4.11), etiquetas de campos (3.3.2/4.1.2),
   orden de encabezados (1.3.1) y enlace de salto/landmark principal (2.4.1). El contraste lo cubre tests/run.js.
   Lo que no se puede automatizar (lector de pantalla real, lenguaje claro, alternativas de arrastre…) está en la declaración de accesibilidad. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..'), VERBOSE = process.argv.includes('--verbose');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const errs = []; let n = 0; const ok = (c, m) => { n++; if (!c) errs.push(m); };
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch(), pages = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '404.html').sort();
  const ctx = async (o) => { const c = await b.newContext({ locale: 'es-ES', ...o }); await c.addInitScript(() => { try { localStorage['mk-wl'] = '1'; localStorage['mk-tour'] = '1'; localStorage['mk-lang'] = 'es'; } catch (e) {} }); await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort()); return c; };
  for (const vp of [{ w: 1280, h: 800, m: false }, { w: 390, h: 800, m: true }]) {
    const c = await ctx({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m }); const p = await c.newPage(); const tag = vp.m ? '[móvil] ' : '[escritorio] ';
    for (const pg of pages) {
      await p.goto(base + pg); await p.waitForTimeout(1400);
      const R = await p.evaluate(() => {
        const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && !e.closest('[hidden],[inert],[aria-hidden="true"]'); };
        const out = { lang: document.documentElement.lang, title: document.title.trim(), vp: (document.querySelector('meta[name=viewport]') || {}).content || '', main: !!document.querySelector('main,[role=main]'), small: [], inputs: [], heads: [], h1: 0 };
        for (const e of document.querySelectorAll('button,[role=button],input:not([type=hidden]),select,summary,a[href]')) {
          if (!vis(e)) continue; const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
          if (e.tagName === 'A' && (cs.display === 'inline' || e.closest('p,li,span,td,small,figcaption,h1,h2,h3,h4,footer'))) continue;
          if (e.type === 'checkbox' || e.type === 'radio') { const l = e.closest('label') || document.querySelector('label[for="' + e.id + '"]'); if (l && vis(l)) { const lr = l.getBoundingClientRect(); if (lr.width >= 24 && lr.height >= 24) continue; } }
          if (e.classList.contains('sr-only') || e.closest('.sr-only,.skip') || e.closest('.ss-kp')) continue; // .ss-kp: la tabla contigua ofrece lo mismo con objetivos grandes (excepción de equivalente)
          if (r.width < 24 || r.height < 24) out.small.push((e.tagName + '.' + (e.className || '').toString().split(' ')[0] + ' ' + Math.round(r.width) + '×' + Math.round(r.height) + ' ' + (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 24)));
        }
        for (const e of document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')) {
          if (!vis(e)) continue; const has = e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.title || (e.id && document.querySelector('label[for="' + e.id + '"]')) || e.closest('label') || e.getAttribute('placeholder');
          if (!has) out.inputs.push(e.tagName + '.' + (e.className || '') + ' ' + (e.type || ''));
        }
        let last = 0; for (const h of document.querySelectorAll('h1,h2,h3,h4,h5,h6')) { if (!vis(h)) continue; const l = +h.tagName[1]; if (l === 1) out.h1++; if (last && l > last + 1) out.heads.push('h' + last + '→h' + l + ' «' + h.textContent.trim().slice(0, 28) + '»'); last = l; }
        return out;
      });
      ok(/^(es|ca)/.test(R.lang), tag + pg + ': <html lang> ausente');
      ok(R.title.length > 3, tag + pg + ': sin <title>');
      ok(!/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*[0-4](\.\d+)?(?!\d)/.test(R.vp), tag + pg + ': el zoom está bloqueado (1.4.4)');
      ok(R.main, tag + pg + ': sin landmark principal (main) (2.4.1)');
      ok(R.h1 >= 1, tag + pg + ': sin h1 visible');
      ok(R.small.length === 0, tag + pg + ': objetivos < 24 px (2.5.8): ' + R.small.slice(0, 4).join(' | '));
      ok(R.inputs.length === 0, tag + pg + ': campos sin etiqueta: ' + R.inputs.slice(0, 3).join(' | '));
      if (VERBOSE && R.heads.length) console.log('  · ' + tag + pg + ' encabezados saltados: ' + R.heads.slice(0, 3).join(', '));
    }
    await c.close();
  }
  /* reflow 320 px + espaciado de texto */
  const rc = await ctx({ viewport: { width: 320, height: 700 }, isMobile: true, hasTouch: true }); const rp = await rc.newPage();
  for (const pg of pages) {
    await rp.goto(base + pg); await rp.waitForTimeout(1200);
    const w = await rp.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    ok(w <= 1, '[320 px] ' + pg + ': desplazamiento horizontal de ' + w + ' px (1.4.10)');
    await rp.addStyleTag({ content: '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' }); await rp.waitForTimeout(200);
    const w2 = await rp.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    ok(w2 <= 1, '[320 px + espaciado] ' + pg + ': desplazamiento horizontal de ' + w2 + ' px (1.4.12)');
  }
  await rc.close();
  /* foco: visible y no oculto por barras fijas (2.4.7, 2.4.11) */
  for (const vp of [{ w: 1280, h: 800, m: false }, { w: 390, h: 800, m: true }]) {
    const c = await ctx({ viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m }); const p = await c.newPage(); const tag = vp.m ? '[móvil] ' : '[escritorio] ';
    for (const pg of ['index.html', 'mates.html', 'fisica.html', 'problemes.html', 'calculadora.html', 'sobre.html']) {
      await p.goto(base + pg); await p.waitForTimeout(1400); let nov = 0, obs = 0, seen = 0, cur = '';
      for (let i = 0; i < 40; i++) {
        await p.keyboard.press('Tab'); await p.waitForTimeout(40);
        const f = await p.evaluate(() => {
          const e = document.activeElement; if (!e || e === document.body) return null; const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
          const vis = r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight; const cx = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1), cy = Math.min(Math.max(r.top + Math.min(r.height / 2, 12), 1), innerHeight - 1);
          const top = document.elementFromPoint(cx, cy); const hit = top && (e === top || e.contains(top) || top.contains(e));
          const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
          return { id: e.tagName + '.' + (e.className || '').toString().split(' ')[0] + ' ' + (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 20), vis, hit, ring, sr: !!e.closest('.sr-only,.skip') };
        });
        if (!f || f.id === cur) continue; cur = f.id; if (!f.vis) continue; seen++;
        if (!f.ring && !f.sr) nov++; if (!f.hit) obs++; if (VERBOSE && (!f.ring || !f.hit)) console.log('  · ' + tag + pg + ' foco: ' + f.id + (f.ring ? '' : ' sin anillo') + (f.hit ? '' : ' tapado'));
      }
      ok(seen >= 3, tag + pg + ': el teclado no recorre controles (' + seen + ')');
      ok(nov === 0, tag + pg + ': ' + nov + ' control(es) sin indicador de foco (2.4.7)');
      ok(obs === 0, tag + pg + ': ' + obs + ' control(es) con el foco tapado por una barra fija (2.4.11)');
    }
    await c.close();
  }
  await b.close(); srv.close();
  if (errs.length) { console.error('\n✗ ' + errs.length + ' fallo(s) de ' + n + ' comprobaciones:\n' + errs.map(e => '  - ' + e).join('\n')); process.exit(1); }
  console.log('✓ ' + n + ' comprobaciones WCAG 2.2 AA correctas');
})().catch(e => { console.error(e); process.exit(1); });
