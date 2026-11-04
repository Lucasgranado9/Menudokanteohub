/* Menudo Kanteo — envoltorio de escritorio (Electron).
   Carga el portal publicado: siempre está al día y el service worker lo deja disponible sin conexión
   después del primer arranque. No expone Node a la web (sandbox + aislamiento de contexto). */
const { app, BrowserWindow, shell, session, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const APP_URL = 'https://lucasgranado9.github.io/Menudokanteohub/index.html';
const ORIGIN = new URL(APP_URL).origin;

if (!app.requestSingleInstanceLock()) { app.quit(); }

let win;
const stateFile = () => path.join(app.getPath('userData'), 'ventana.json');
function loadState() { try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch { return {}; } }
function saveState() { try { if (win && !win.isMinimized() && !win.isMaximized() && !win.isFullScreen()) fs.writeFileSync(stateFile(), JSON.stringify({ b: win.getBounds(), max: win.isMaximized() })); } catch {} }

const OFFLINE = 'data:text/html;charset=utf-8,' + encodeURIComponent(`<!doctype html><meta charset=utf-8><title>Menudo Kanteo</title>
<style>body{font:16px/1.5 system-ui,sans-serif;display:grid;place-items:center;height:100vh;margin:0;background:#fff;color:#161618}
@media(prefers-color-scheme:dark){body{background:#161618;color:#f2f2f4}}
main{max-width:360px;text-align:center;padding:24px}h1{font-size:22px;margin:0 0 8px}p{opacity:.7;margin:0 0 20px}
button{font:inherit;font-weight:600;padding:10px 20px;border-radius:12px;border:0;background:#c8102e;color:#fff;cursor:pointer}</style>
<main><h1>Sin conexión</h1><p>No se ha podido cargar Menudo Kanteo. Comprueba tu conexión e inténtalo de nuevo.</p><button onclick="location.href='${APP_URL}'">Reintentar</button></main>`);

function create() {
  const st = loadState();
  win = new BrowserWindow({
    width: 1240, height: 820, minWidth: 380, minHeight: 560, ...(st.b || {}),
    backgroundColor: '#ffffff', show: false, title: 'Menudo Kanteo', autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false, spellcheck: false },
  });
  if (st.max) win.maximize();
  win.once('ready-to-show', () => win.show());
  win.loadURL(APP_URL);
  win.webContents.on('did-fail-load', (_e, code, _d, url, main) => { if (main && code !== -3 && url.startsWith('http')) win.loadURL(OFFLINE); });
  // enlaces: lo del portal se queda dentro; el resto, al navegador
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(ORIGIN)) return { action: 'allow' };
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(ORIGIN) && !url.startsWith('data:')) { e.preventDefault(); if (/^https?:\/\//.test(url)) shell.openExternal(url); } });
  win.on('resize', saveState); win.on('move', saveState); win.on('close', saveState);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  // permisos mínimos: notificaciones y portapapeles
  session.defaultSession.setPermissionRequestHandler((_wc, perm, cb) => cb(['notifications', 'clipboard-sanitized-write', 'fullscreen'].includes(perm)));
  create();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) create(); });
});
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
