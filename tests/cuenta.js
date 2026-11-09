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
    const PU={uid:'u3',email:'pw@example.com',displayName:'',photoURL:'',providerData:[{providerId:'password'}],metadata:{creationTime:'2026-11-05T10:00:00Z'}};
    export function signInWithEmailAndPassword(a,e,p){ if(p==='mala123') return Promise.reject({code:'auth/invalid-credential'}); set({...PU,email:e}); return Promise.resolve({user:PU}); }
    export function createUserWithEmailAndPassword(a,e,p){ if(e==='dup@example.com') return Promise.reject({code:'auth/email-already-in-use'}); set({...PU,email:e}); return Promise.resolve({user:PU}); }
    export function sendPasswordResetEmail(a,e){ localStorage.setItem('fake-reset',e); return Promise.resolve(); }
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

  /* ----- Contraseña + herramientas de estudio (solo con cuenta) ----- */
  const D = await device(); const d = D.p;
  await open(d); await sheet(d);
  ok(await d.evaluate(() => document.querySelectorAll('.mkac-ov.on .mkac-er.lk').length === 3), 'Estudio: sin sesión se ven 3 herramientas bloqueadas');
  await d.click('.mkac-er.lk >> nth=0'); await d.waitForTimeout(200);
  ok(await d.evaluate(() => !document.querySelector('.mke-ov.on') && /Entra con tu cuenta/.test(document.querySelector('.mkac-m').textContent)), 'Estudio: sin sesión, una herramienta bloqueada pide entrar y no se abre');
  ok(await d.evaluate(() => { const a = window.mkAch.all().filter(x => ['gw1', 'ex1', 'nt5'].includes(x.id)); return a.length === 3 && a.every(x => !x.ok); }), 'Logros: los de la cuenta están bloqueados sin sesión');
  await d.click('[data-a=mode][data-m=pw]'); await d.waitForTimeout(200);
  ok(await d.evaluate(() => !!document.querySelector('.mkac-pw') && !!document.querySelector('[data-a=signup]') && !!document.querySelector('[data-a=reset]')), 'Contraseña: aparece el campo, «Crear cuenta» y «Olvidaste»');
  await d.fill('.mkac-in[type=email]', 'pw@example.com'); await d.fill('.mkac-pw', 'mala123'); await d.click('.mkac-ov.on form button[type=submit]'); await d.waitForTimeout(500);
  ok(await d.evaluate(() => /incorrectos/.test(document.querySelector('.mkac-m').textContent)), 'Contraseña: un error de credenciales se explica');
  await d.fill('.mkac-in[type=email]', 'pw@example.com'); await d.click('[data-a=reset]'); await d.waitForTimeout(400);
  ok(await d.evaluate(() => localStorage['fake-reset'] === 'pw@example.com'), 'Contraseña: «Olvidaste» envía el correo de recuperación');
  await d.fill('.mkac-pw', 'buena123'); await d.click('.mkac-ov.on form button[type=submit]'); await d.waitForTimeout(1800);
  ok(await d.evaluate(() => document.querySelector('.mk-acc').classList.contains('in') && !!localStorage['mk-acct']), 'Contraseña: entrar con correo y contraseña inicia sesión');
  await sheet(d);
  ok(await d.evaluate(() => document.querySelectorAll('.mkac-ov.on .mkac-er:not(.lk)').length === 3), 'Estudio: con sesión las 3 herramientas están activas');
  /* objetivo semanal */
  await d.click('.mkac-er[data-e=goal]'); await d.waitForSelector('.mke-ov.on .mke-ch button', { timeout: 3000 });
  await d.click('.mke-ch button[data-n="5"]'); await d.waitForTimeout(300);
  ok(await d.evaluate(() => { const g = JSON.parse(localStorage['mk-goal'] || 'null'); return g && g.n === 5; }), 'Objetivo: se guarda el objetivo semanal');
  ok(await d.evaluate(() => /0\/5/.test(document.querySelector('.mke-ring').textContent)), 'Objetivo: el anillo muestra 0/5');
  await d.evaluate(() => { const o = {}; for (let i = 1; i <= 5; i++) o['m9.' + i] = 1; localStorage['mk-done'] = JSON.stringify(Object.assign(JSON.parse(localStorage['mk-done'] || '{}'), o)); window.mkEstudio.tick(); window.mkAch.check(); });
  ok(await d.evaluate(() => Object.keys(JSON.parse(localStorage['mk-goalh'] || '{}')).length === 1 && window.mkAch.all().find(x => x.id === 'gw1').ok), 'Objetivo: al cumplirlo se anota la semana y se desbloquea el logro');
  await d.keyboard.press('Escape'); await d.waitForTimeout(300);
  /* repaso por fallos */
  await d.evaluate(() => { localStorage['mk-pmr'] = JSON.stringify({ '2026-1|1.1': { n: 0, t: Date.now() - 3 * 864e5 } }); });
  await sheet(d); await d.click('.mkac-er[data-e=rev]'); await d.waitForSelector('.mke-ov.on .mke-card', { timeout: 3000 });
  ok(await d.evaluate(() => /PAU 2026/.test(document.querySelector('.mke-card').textContent)), 'Repaso: muestra el apartado fallado que toca');
  await d.click('[data-e=rvok]'); await d.waitForTimeout(300);
  ok(await d.evaluate(() => JSON.parse(localStorage['mk-pmr'])['2026-1|1.1'].n === 1 && localStorage['mk-rvs'] === '1' && /Sesión terminada/.test(document.querySelector('.mke-sh').textContent)), 'Repaso: «Ya lo sé» avanza la etapa, cuenta el repaso y termina la sesión');
  await d.keyboard.press('Escape'); await d.waitForTimeout(300);
  /* modo examen */
  await sheet(d); await d.click('.mkac-er[data-e=exm]'); await d.waitForFunction(() => document.querySelectorAll('#mke-ex option').length > 3, null, { timeout: 5000 });
  ok(await d.evaluate(() => !document.querySelector('#mke-go').disabled), 'Examen: lista los exámenes PAU disponibles');
  await Promise.all([d.waitForNavigation({ timeout: 8000 }).catch(() => { }), d.click('#mke-go')]); await d.waitForSelector('.mke-pill', { timeout: 6000 });
  ok(await d.evaluate(() => /problemes\.html/.test(location.pathname) && !!JSON.parse(localStorage['mk-exm-run']).ex.length && /\d+:\d\d/.test(document.querySelector('.mke-pill time').textContent)), 'Examen: arranca, abre el examen y muestra el cronómetro');
  await d.click('.mke-pill button'); await d.waitForSelector('.mke-ov.on [data-e=finish]', { timeout: 3000 }); await d.click('[data-e=finish]');
  await d.fill('.mke-gi >> nth=0', '2.5'); await d.fill('.mke-gi >> nth=1', '1.5'); await d.waitForTimeout(200);
  ok(await d.evaluate(() => document.querySelector('#mke-sum').getAttribute('data-v') === '4'), 'Examen: la nota se suma de los problemas (2,5 + 1,5 = 4)');
  await d.click('[data-e=save]'); await d.waitForTimeout(500);
  ok(await d.evaluate(() => { const h = JSON.parse(localStorage['mk-exm'] || '[]'); return h.length === 1 && h[0].n === 4 && !localStorage['mk-exm-run'] && !document.querySelector('.mke-pill'); }), 'Examen: la nota se guarda en el historial y se quita el cronómetro');
  ok(await d.evaluate(() => window.mkAch.all().find(x => x.id === 'ex1').ok && !window.mkAch.all().find(x => x.id === 'nt5').ok), 'Logros: «Primer simulacro» sí; «Aprobado» no con un 4');
  await d.waitForTimeout(11500);
  ok(!!(store['usuarios/u3'] && store['usuarios/u3'].data['mk-goal'] && store['usuarios/u3'].data['mk-exm']), 'Sync: objetivo e historial de exámenes se suben a la cuenta');
  await D.c.close();

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
