/* Capturas del manifiesto (ficha de instalación). Requiere el sitio servido en :8098 y «playwright».
   Uso: python3 -m http.server 8098 & node tools/make-shots.js */
const { chromium } = require('playwright'), path = require('path'), out = path.join(__dirname, '..', 'icons', 'shots');
const base = process.env.BASE || 'http://localhost:8098';
const W = [['wide-portada', 'index.html?lang=ca', 0], ['wide-apunts', 'mates.html?lang=ca#t1-s1', 0]];
const N = [['narrow-portada', 'index.html?lang=ca', 0], ['narrow-apunts', 'mates.html?lang=ca#t1-s1', 0], ['narrow-calculadora', 'calculadora.html?lang=ca', 0]];
(async () => {
  const b = await chromium.launch();
  for (const [vp, list, mobile] of [[{ width: 1280, height: 720 }, W, false], [{ width: 390, height: 844 }, N, true]]) {
    const c = await b.newContext({ viewport: vp, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, colorScheme: 'light', reducedMotion: 'reduce' });
    const p = await c.newPage();
    for (const [n, u] of list) {
      await p.addInitScript(() => { try { localStorage.setItem('mk-seen', '1'); } catch (e) {} });
      await p.goto(base + '/' + u); await p.waitForTimeout(2600);
      await p.screenshot({ path: path.join(out, n + '.png') }); console.log(n);
    }
    await c.close();
  }
  await b.close();
})();
