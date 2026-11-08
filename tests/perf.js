/* Rendimiento en un móvil modesto: CPU ×4 más lenta y red 4G lenta. node tests/perf.js [--soft]
   Mide FCP, LCP y tiempo bloqueado (tareas largas) de las páginas clave y falla si pasan el presupuesto. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium, devices } = require('playwright');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});
const PAGES = [['index.html', 3500, 600], ['mates.html', 4000, 700], ['problemes.html', 4000, 700], ['revista.html', 4500, 900], ['novetats.html', 4000, 700]];
(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch(); const bad = [];
  for (const [f, lcpMax, tbtMax] of PAGES) {
    const c = await b.newContext({ ...devices['Moto G4'], locale: 'es-ES' }); const p = await c.newPage();
    await c.addInitScript(() => { try { localStorage['mk-wl'] = '1'; } catch (e) { } window.__lt = 0; try { new PerformanceObserver(l => l.getEntries().forEach(e => { window.__lt += Math.max(0, e.duration - 50); })).observe({ type: 'longtask', buffered: true }); } catch (e) { } window.__lcp = 0; try { new PerformanceObserver(l => l.getEntries().forEach(e => { window.__lcp = e.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) { } });
    const cd = await c.newCDPSession(p); await cd.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cd.send('Network.enable'); await cd.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
    await p.goto(base + f, { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const m = await p.evaluate(() => ({ fcp: (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime | 0, lcp: window.__lcp | 0, tbt: window.__lt | 0 }));
    const msg = f.padEnd(16) + 'FCP ' + m.fcp + ' ms · LCP ' + m.lcp + ' ms · bloqueo ' + m.tbt + ' ms'; console.log('  ' + msg);
    if (m.lcp > lcpMax || m.tbt > tbtMax) bad.push(msg + '  (máx LCP ' + lcpMax + ', bloqueo ' + tbtMax + ')');
    await c.close();
  }
  await b.close(); srv.close();
  if (bad.length && !process.argv.includes('--soft')) { console.log('✗ Fuera de presupuesto:\n  ' + bad.join('\n  ')); process.exit(1); }
  console.log(bad.length ? '… fuera de presupuesto (modo suave)' : '✓ rendimiento en móvil modesto dentro de presupuesto');
})().catch(e => { console.error(e); process.exit(1); });
