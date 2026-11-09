/* Pruebas de la cuenta (Firebase simulado): node tests/cuenta.js
   Entrar con Google, sincronizar el progreso, segundo dispositivo, cambio de cuenta, descarga de datos,
   borrado de la cuenta, indicador de sincronización y estado sin conexión. No usa la red: los módulos de
   Firebase se sustituyen por versiones falsas y «Firestore» vive en memoria. */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => {
  let f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0].split('#')[0])); if (f.endsWith(path.sep)) f += 'index.html';
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end('no'); }
  r.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});

/* ---- Firebase falso (módulos ES) ---- */
const FAKE = {
  'firebase-app.js': `export function initializeApp(c){ return { c }; }`,
  'firebase-auth.js': `
    const K='fake-auth'; let cbs=[];
    const get=()=>{ try{ return JSON.parse(localStorage.getItem(K)); }catch(e){ return null; } };
    const set=u=>{ if(u) localStorage.setItem(K,JSON.stringify(u)); else localStorage.removeItem(K); cbs.forEach(f=>f(u)); };
    export function getAuth(){ return { get currentUser(){ return get(); } }; }
    export function onAuthStateChanged(a,cb){ cbs.push(cb); setTimeout(()=>cb(get()),10); return ()=>{}; }
    export class GoogleAuthProvider {}
    export function signInWithPopup(){ const n=JSON.parse(localStorage.getItem('fake-next')||'null'); if(!n) return Promise.reject({code:'auth/popup-closed-by-user'}); set(n); return Promise.resolve({user:n}); }
    export function reauthenticateWithPopup(){ return Promise.resolve(); }
    export function sendSignInLinkToEmail(a,email){ localStorage.setItem('fake-mail',email); return Promise.resolve(); }
    export function isSignInWithEmailLink(){ return false; }
    export function signInWithEmailLink(){ return Promise.reject({}); }
    export function signOut(){ set(null); return Promise.resolve(); }
    export function deleteUser(){ window.__deleted=(window.__deleted||0)+1; set(null); return Promise.resolve(); }
  `,
  'firebase-firestore.js': `
    export function getFirestore(){ return {}; }
    export function doc(db,col,id){ return col+'/'+id; }
    export function serverTimestamp(){ return Date.now(); }
    export async function getDoc(p){ const v=await window.__fsGet(p); return { exists:()=>v!=null, data:()=>v }; }
    export async function setDoc(p,v){ await window.__fsSet(p,JSON.parse(JSON.stringify(v))); }
    export async function deleteDoc(p){ await window.__fsDel(p); }
  `,
};
const store = {};
const errs = []; let n = 0;
const ok = (c, m) => { n++; if (!c) errs.push(m); };
const U1 = { uid: 'u1', email: 'ana@example.com', displayName: 'Ana Prueba', photoURL: '', providerData: [{ providerId: 'google.com' }], metadata: { creationTime: '2026-11-01T10:00:00Z' } };
const U2 = { uid: 'u2', email: 'bea@example.com', displayName: 'Bea Prueba', photoURL: '', providerData: [{ providerId: 'google.com' }], metadata: { creationTime: '2026-11-02T10:00:00Z' } };

(async () => {
  await new Promise(r => srv.listen(0, '127.0.0.1', r)); const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const b = await chromium.launch();
  const device = async (opts) => {
    const c = await b.newContext({ locale: 'es-ES', viewport: { width: 700, height: 900 }, acceptDownloads: true, ...opts });
    await c.addInitScript(() => { try { ['mk-wl', 'mk-ob', 'mk-on', 'mk-tour'].forEach(k => { if (!localStorage[k]) localStorage[k] = '1'; }); } catch (e) { } });
    await c.exposeFunction('__fsGet', p => store[p] == null ? null : store[p]);
    await c.exposeFunction('__fsSet', (p, v) => { store[p] = v; });
    await c.exposeFunction('__fsDel', p => { delete store[p]; });
    await c.route('https://www.gstatic.com/firebasejs/**', r => {
      const f = r.request().url().split('/').pop(); const body = FAKE[f];
      if (!body) return r.abort();
      r.fulfill({ status: 200, contentType: 'text/javascript', headers: { 'access-control-allow-origin': '*' }, body });
    });
    const p = await c.newPage(); p.on('pageerror', e => errs.push('JS: ' + e.message)); return { c, p };
  };
  const open = async (p) => { await p.goto(base + 'index.html'); await p.waitForSelector('.mk-acc', { timeout: 8000 }); await p.waitForTimeout(400); };
  const sheet = async (p) => { await p.click('.mk-acc'); await p.waitForSelector('.mkac-ov.on .mkac-sh', { timeout: 4000 }); await p.waitForTimeout(500); };

  /* ----- Dispositivo A: entrar y sincronizar ----- */
  const A = await device(); const a = A.p;
  await a.addInitScript(() => { try { if (!localStorage['mk-done']) localStorage['mk-done'] = JSON.stringify({ 'm1.1': 1, 'm1.2': 1 }); localStorage['fake-next'] = JSON.stringify({ uid: 'u1', email: 'ana@example.com', displayName: 'Ana Prueba', photoURL: '', providerData: [{ providerId: 'google.com' }], metadata: { creationTime: '2026-11-01T10:00:00Z' } }); } catch (e) { } });
  await open(a);
  ok(await a.evaluate(() => /Entrar/.test(document.querySelector('.mk-acc').textContent)), 'Cuenta: el botón «Entrar» es visible con la configuración puesta');
  await sheet(a);
  ok(await a.evaluate(() => !!document.querySelector('.mkac-ov.on [data-a=google]') && !!document.querySelector('.mkac-ov.on input[type=email]')), 'Cuenta: la hoja ofrece Google y correo');
  await a.click('[data-a=google]'); await a.waitForTimeout(1500);
  ok(await a.evaluate(() => document.querySelector('.mk-acc').classList.contains('in')), 'Cuenta: tras entrar, el botón muestra la sesión');
  await a.waitForTimeout(1500);
  ok(!!(store['usuarios/u1'] && store['usuarios/u1'].data && store['usuarios/u1'].data['mk-done']), 'Sync: el progreso local se sube a usuarios/u1');
  ok(!store['usuarios/u1'].data['mk-theme'], 'Sync: no se suben preferencias del dispositivo (tema)');
  await sheet(a).catch(async () => { await a.click('.mk-acc'); });
  const txt = await a.evaluate(() => document.querySelector('.mkac-sh') && document.querySelector('.mkac-sh').innerText);
  ok(/Ana Prueba/.test(txt) && /ana@example.com/.test(txt), 'Perfil: nombre y correo en la hoja');
  ok(/2\s*\n?problemas hechos/.test(txt), 'Perfil: cuenta los 2 problemas hechos');
  ok(/Guardado en tu cuenta/.test(txt), 'Sync: la hoja indica que está guardado');

  /* ----- Descarga de datos ----- */
  const [dl] = await Promise.all([a.waitForEvent('download', { timeout: 5000 }), a.click('[data-a=export]')]);
  const js = JSON.parse(fs.readFileSync(await dl.path(), 'utf8'));
  ok(js.app === 'menudo-kanteo' && js.account.email === 'ana@example.com' && !!js.data['mk-done'], 'Exportar: el JSON trae app, cuenta y progreso');

  /* ----- Indicador sin conexión ----- */
  await A.c.setOffline(true); await a.waitForTimeout(400);
  ok(await a.evaluate(() => document.querySelector('.mk-acc').getAttribute('data-sy') === 'off'), 'Indicador: gris sin conexión');
  await A.c.setOffline(false); await a.waitForTimeout(400);
  ok(await a.evaluate(() => document.querySelector('.mk-acc').getAttribute('data-sy') !== 'off'), 'Indicador: vuelve al reconectar');

  /* ----- Dispositivo B: misma cuenta, progreso vacío → se recupera ----- */
  const B = await device(); const bp = B.p;
  await bp.addInitScript(() => { try { localStorage['fake-next'] = JSON.stringify({ uid: 'u1', email: 'ana@example.com', displayName: 'Ana Prueba', photoURL: '', providerData: [{ providerId: 'google.com' }], metadata: { creationTime: '2026-11-01T10:00:00Z' } }); } catch (e) { } });
  await open(bp); await sheet(bp); await bp.click('[data-a=google]'); await bp.waitForTimeout(2500);
  await bp.waitForSelector('.mk-acc.in', { timeout: 6000 }).catch(() => { });
  ok(await bp.evaluate(() => { try { return Object.keys(JSON.parse(localStorage['mk-done'] || '{}')).length === 2; } catch (e) { return false; } }), 'Sync: un segundo dispositivo recupera el progreso de la nube');
  await B.c.close();

  /* ----- Cambio de cuenta en el mismo navegador ----- */
  await sheet(a).catch(() => { }); await a.click('[data-a=out]'); await a.waitForTimeout(800);
  ok(await a.evaluate(() => /Entrar/.test(document.querySelector('.mk-acc').textContent)), 'Cuenta: cerrar sesión devuelve «Entrar»');
  await a.evaluate(() => { localStorage['fake-next'] = JSON.stringify({ uid: 'u2', email: 'bea@example.com', displayName: 'Bea Prueba', photoURL: '', providerData: [{ providerId: 'google.com' }], metadata: { creationTime: '2026-11-02T10:00:00Z' } }); });
  await sheet(a); await a.click('[data-a=google]'); await a.waitForTimeout(3000);
  ok(await a.evaluate(() => !localStorage['mk-done'] || Object.keys(JSON.parse(localStorage['mk-done'])).length === 0), 'Cambio de cuenta: el progreso de la otra persona no se arrastra');
  ok(!store['usuarios/u2'] || !store['usuarios/u2'].data['mk-done'], 'Cambio de cuenta: la segunda cuenta no hereda el progreso de la primera');
  ok(!!store['usuarios/u1'], 'Cambio de cuenta: la primera cuenta conserva su documento');

  /* ----- Borrado de la cuenta ----- */
  await a.evaluate(() => { localStorage['mk-fav'] = JSON.stringify([{ u: 'mates.html', t: 'x', s: '', d: 1, k: 'page' }]); });
  await a.waitForTimeout(500);
  await sheet(a).catch(() => { }); await a.waitForSelector('[data-a=del]', { timeout: 4000 }); await a.click('[data-a=del]');
  ok(await a.evaluate(() => !!document.querySelector('.mkac-cf [data-a=delok]')), 'Borrado: pide confirmación antes de borrar');
  await a.click('[data-a=delc]'); ok(await a.evaluate(() => !document.querySelector('.mkac-cf')), 'Borrado: «Cancelar» cierra la confirmación');
  ok(!!store['usuarios/u2'] || !store['usuarios/u2'] && false, 'Borrado: nada se borra sin confirmar');
  await a.click('[data-a=del]'); await a.click('[data-a=delok]'); await a.waitForTimeout(1500);
  ok(!store['usuarios/u2'], 'Borrado: se elimina el documento de Firestore');
  ok(await a.evaluate(() => window.__deleted === 1), 'Borrado: se elimina el usuario');
  ok(await a.evaluate(() => /Entrar/.test(document.querySelector('.mk-acc').textContent)), 'Borrado: el botón vuelve a «Entrar»');
  ok(await a.evaluate(() => !!localStorage['mk-fav']), 'Borrado: el progreso local del dispositivo se conserva');
  await A.c.close();

  /* ----- Público: sin configuración el botón no aparece ----- */
  const C = await device(); const cp = C.p;
  await cp.route('**/cuenta-config.js', r => r.fulfill({ contentType: 'text/javascript', body: 'window.MK_FIREBASE = null;' }));
  await cp.goto(base + 'index.html'); await cp.waitForTimeout(2200);
  ok(await cp.evaluate(() => !document.querySelector('.mk-acc')), 'Público: sin configuración el botón de cuenta permanece oculto');
  await C.c.close();

  await b.close(); srv.close();
  if (errs.length) { console.log('✗ ' + errs.length + ' errores en ' + n + ' comprobaciones:\n  ' + errs.join('\n  ')); process.exit(1); }
  console.log('✓ ' + n + ' comprobaciones de la cuenta correctas');
})().catch(e => { console.error(e); process.exit(1); });
