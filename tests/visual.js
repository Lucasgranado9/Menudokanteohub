/* Pruebas visuales: capturas de referencia por página, en claro/escritorio y oscuro/móvil.
   node tests/visual.js            compara con tests/visual/*.png (falla si cambia más del 0,6 % de los píxeles)
   node tests/visual.js --update   regenera las de referencia (tras un cambio de diseño intencionado)
   Sin dependencias: la comparación se hace en el propio navegador. Las diferencias se guardan en tests/visual/_diff/. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..'), DIR = path.join(__dirname, 'visual'), UPDATE = process.argv.includes('--update'), LIMIT = 0.006;
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const PAGES = ['index', 'mates', 'fisica', 'filosofia', 'problemes', 'calculadora', 'sobre', 'novetats'];
const VPS = [{ id: 'esc-claro', w: 1280, h: 800, scheme: 'light', m: false }, { id: 'mov-oscuro', w: 390, h: 800, scheme: 'dark', m: true }];
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  fs.mkdirSync(DIR, { recursive: true }); fs.mkdirSync(path.join(DIR, '_diff'), { recursive: true });
  const b = await chromium.launch(), bad = [], made = []; let n = 0;
  const cmp = await b.newPage();
  for (const vp of VPS) {
    const c = await b.newContext({ locale: 'es-ES', viewport: { width: vp.w, height: vp.h }, isMobile: vp.m, hasTouch: vp.m, colorScheme: vp.scheme, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await c.addInitScript(() => { try { localStorage['mk-wl'] = '1'; localStorage['mk-tour'] = '1'; localStorage['mk-lang'] = 'es'; localStorage['mk-nr'] = '4'; localStorage['mk-theme'] = localStorage['mk-theme'] || ''; } catch (e) {} });
    await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort());
    const p = await c.newPage(); await p.clock.install({ time: new Date('2026-11-09T10:00:00') });
    for (const pg of PAGES) {
      await p.goto(base + pg + '.html'); await p.waitForTimeout(1600);
      await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}video{visibility:hidden!important}.mk-upd,.mk-inst,.mkt-cd,.mkt-rg{display:none!important}' }); await p.waitForTimeout(250);
      const file = path.join(DIR, pg + '.' + vp.id + '.png'), buf = await p.screenshot({ animations: 'disabled' }); n++;
      if (UPDATE || !fs.existsSync(file)) { fs.writeFileSync(file, buf); made.push(path.basename(file)); continue; }
      const r = await cmp.evaluate(async ([a, c2]) => {
        const load = s => new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = 'data:image/png;base64,' + s; });
        const [A, B] = await Promise.all([load(a), load(c2)]); const w = Math.max(A.width, B.width), h = Math.max(A.height, B.height);
        const g = (I) => { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const x = cv.getContext('2d', { willReadFrequently: true }); x.drawImage(I, 0, 0); return x.getImageData(0, 0, w, h); };
        const da = g(A), db = g(B), out = new ImageData(w, h); let diff = 0;
        for (let i = 0; i < da.data.length; i += 4) { const d = Math.abs(da.data[i] - db.data[i]) + Math.abs(da.data[i + 1] - db.data[i + 1]) + Math.abs(da.data[i + 2] - db.data[i + 2]); if (d > 48) { diff++; out.data[i] = 255; out.data[i + 1] = 0; out.data[i + 2] = 80; out.data[i + 3] = 255; } else { out.data[i] = db.data[i]; out.data[i + 1] = db.data[i + 1]; out.data[i + 2] = db.data[i + 2]; out.data[i + 3] = 70; } }
        const cv = document.createElement('canvas'); cv.width = w; cv.height = h; cv.getContext('2d').putImageData(out, 0, 0);
        return { ratio: diff / (w * h), size: A.width !== B.width || A.height !== B.height, png: cv.toDataURL('image/png').split(',')[1] };
      }, [fs.readFileSync(file).toString('base64'), buf.toString('base64')]);
      if (r.size || r.ratio > LIMIT) { bad.push(pg + '.' + vp.id + ' · ' + (r.ratio * 100).toFixed(2) + ' % distinto' + (r.size ? ' (cambia el tamaño)' : '')); fs.writeFileSync(path.join(DIR, '_diff', pg + '.' + vp.id + '.png'), Buffer.from(r.png, 'base64')); fs.writeFileSync(path.join(DIR, '_diff', pg + '.' + vp.id + '.nuevo.png'), buf); }
    }
    await c.close();
  }
  await b.close(); srv.close();
  if (made.length) console.log('· referencias ' + (UPDATE ? 'actualizadas' : 'creadas') + ': ' + made.length);
  if (bad.length) { console.error('\n✗ ' + bad.length + ' captura(s) cambian respecto a la referencia (tests/visual/_diff/):\n' + bad.map(e => '  - ' + e).join('\n') + '\n  Si el cambio es intencionado: node tests/visual.js --update'); process.exit(1); }
  console.log('✓ ' + (n - made.length) + ' capturas coinciden con la referencia');
})().catch(e => { console.error(e); process.exit(1); });
