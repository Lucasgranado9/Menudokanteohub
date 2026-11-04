/* Prova de fum a WebKit (el motor de Safari / iPhone). Ús: node tests/webkit.js
   Comprova per a cada pàgina: sense errors de JS, sense desbordament horitzontal i barra inferior al mòbil.
   Desa captures a tests/webkit-out/ (la CI les puja com a artefacte). */
const http = require('http'), fs = require('fs'), path = require('path');
const { webkit, devices } = require('playwright');
const ROOT = path.join(__dirname, '..'), OUT = path.join(__dirname, 'webkit-out');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const PAGES = ['index.html', 'mates.html', 'fisica.html', 'filosofia.html', 'problemes.html', 'calculadora.html', 'museu.html', 'novetats.html'];
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  fs.mkdirSync(OUT, { recursive: true });
  const b = await webkit.launch(); const errs = []; let n = 0;
  for (const dev of ['iPhone 13', 'iPad (gen 7)']) {
    const c = await b.newContext({ ...devices[dev], locale: 'es-ES' });
    await c.route(/^https?:\/\/(?!127\.0\.0\.1)/, r => r.abort()); // sense xarxa externa
    for (const p of PAGES) {
      const pg = await c.newPage(); const pe = [];
      pg.on('pageerror', e => pe.push(e.message));
      await pg.goto(base + p, { waitUntil: 'load' }); await pg.waitForTimeout(600);
      const m = await pg.evaluate(() => ({ sw: document.documentElement.scrollWidth, w: innerWidth, hdr: !!document.querySelector('.hdr'), bar: !!document.querySelector('.mkb') && getComputedStyle(document.querySelector('.mkb')).display !== 'none' }));
      n++; const tag = dev + ' ' + p;
      if (pe.length) errs.push(tag + ': error JS: ' + pe[0]);
      if (m.sw > m.w + 1) errs.push(tag + ': desbordament horitzontal (' + m.sw + ' > ' + m.w + ')');
      if (!m.hdr && p !== 'museu.html') errs.push(tag + ': sense capçalera');
      if (m.w <= 640 && !m.bar && p !== 'museu.html') errs.push(tag + ': sense barra inferior');
      await pg.screenshot({ path: path.join(OUT, dev.replace(/\W+/g, '') + '-' + p.replace('.html', '') + '.png') });
      await pg.close();
    }
    await c.close();
  }
  await b.close(); srv.close();
  if (errs.length) { console.log('✗ ' + errs.length + ' errors a WebKit:\n  ' + errs.join('\n  ')); process.exit(1); }
  console.log('✓ ' + n + ' pàgines correctes a WebKit');
})().catch(e => { console.error(e); process.exit(1); });
