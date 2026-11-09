/* Cuenta · Menudo Kanteo
   Botón «Entrar» (píldora roja) a la derecha de Ajustes + hoja de inicio de sesión con Firebase Auth.
   · Google y enlace por correo (sin contraseñas). Firebase se carga solo al abrir la hoja o si ya hay sesión.
   · Sin configuración (cuenta-config.js) el botón queda oculto; vista previa con ?cuenta=1. */
(function () {
  "use strict";
  if (window.__mkCuenta) return; window.__mkCuenta = 1;
  var V = "10.14.1", CDN = "https://www.gstatic.com/firebasejs/" + V + "/";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { } return null; }

  var preview = /[?&]cuenta=1/.test(location.search); if (preview) ls("mk-cuenta-pv", "1"); preview = preview || ls("mk-cuenta-pv") === "1";
  var cfg = window.MK_FIREBASE || null;
  if (!cfg && !preview) return;
  (function () { var e = document.createElement("script"); e.src = "estudio.js"; e.async = true; document.head.appendChild(e); })();

  var IC = {
    tg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/></svg>',
    rp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3l3 3-3 3"/><path d="M4 11V9a3 3 0 0 1 3-3h13M7 21l-3-3 3-3"/><path d="M20 13v2a3 3 0 0 1-3 3H4"/></svg>',
    tm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l2.5 1.5M9.5 3h5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.2c.9-3.7 3.9-5.7 7.5-5.7s6.6 2 7.5 5.7"/></svg>',
    g: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.2H12v4.3h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A11.5 11.5 0 0 0 12 23.5z"/><path fill="#FBBC05" d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z"/><path fill="#EA4335" d="M12 5.4c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3C6.5 7.4 9 5.4 12 5.4z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 8 8 6 8-6"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.2 4.2 0 0 1-.5 8.5z"/><path d="m9.5 13.5 2 2 3.5-4"/></svg>'
  };

  /* ---------- estilos ---------- */
  var st = el("style");
  st.textContent =
    ".mk-acc{appearance:none;flex:none;display:inline-flex;align-items:center;gap:7px;height:36px;min-height:40px;padding:0 15px 0 11px;margin-left:6px;border-radius:999px;border:0;cursor:pointer;color:#fff;font:650 13.5px/1 -apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif;letter-spacing:-.005em;white-space:nowrap;max-width:150px;" +
    "background:linear-gradient(180deg,#e8344f 0%,var(--red,#c8102e) 100%);box-shadow:0 1px 0 #ffffff55 inset,0 8px 18px -8px color-mix(in srgb,var(--red,#c8102e) 80%,transparent);transition:transform .45s cubic-bezier(.2,1.4,.3,1),box-shadow .25s,filter .2s;-webkit-tap-highlight-color:transparent}" +
    ".mk-acc svg{width:18px;height:18px;flex:none}.mk-acc span{overflow:hidden;text-overflow:ellipsis}" +
    "@media(hover:hover){.mk-acc:hover{filter:brightness(1.06);transform:translateY(-1px)}}.mk-acc:active{transform:scale(.95);transition-duration:.1s}.mk-acc:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}" +
    ".mk-acc.in{padding-left:5px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);color:var(--fg,#111);box-shadow:none}" +
    ".mk-acc .av{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;flex:none;overflow:hidden;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));font:750 12.5px/1 var(--sans,system-ui)}.mk-acc .av img{width:100%;height:100%;object-fit:cover}" +
    "@media(max-width:520px){.mk-acc{padding:0;width:36px;justify-content:center;max-width:none}.mk-acc>span{display:none}.mk-acc.in{padding:0;width:36px}.mk-acc .av{width:30px;height:30px}}" +
    "@media(max-width:520px){body.mk-hasacc .hdr .mk-qr{display:none}}@media(max-width:420px){.mk-acc{width:34px;height:34px;min-height:0;margin-left:4px}}@media(max-width:340px){.mk-acc{width:30px;height:30px}}" +
    ".mkac-ov{position:fixed;inset:0;z-index:460;display:flex;align-items:flex-end;justify-content:center;padding:16px max(16px,env(safe-area-inset-right,0px)) max(16px,env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));background:#0000;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);visibility:hidden;transition:background .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s,visibility 0s .45s}" +
    ".mkac-ov.on{background:#0a08087a;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);visibility:visible;transition-delay:0s}@media(min-width:641px){.mkac-ov{align-items:center}}" +
    ".mkac-sh{width:min(420px,100%);border-radius:28px;padding:26px 22px 20px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 92%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 40px 90px -30px #000000a6,0 1px 0 #ffffff55 inset;transform:translateY(40px) scale(.97);opacity:0;transition:transform .5s cubic-bezier(.2,1.2,.3,1),opacity .3s;position:relative;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif}" +
    ".mkac-sh{max-height:calc(100vh - 32px);max-height:calc(100dvh - 32px);overflow-y:auto;overscroll-behavior:contain}.mkac-ov.on .mkac-sh{transform:none;opacity:1}.mkac-x{position:absolute;top:14px;right:14px;appearance:none;border:0;width:32px;height:32px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);font:400 20px/1 var(--sans,system-ui)}" +
    ".mkac-ic{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));box-shadow:0 14px 28px -14px var(--red,#c8102e);margin-bottom:14px}.mkac-ic svg{width:30px;height:30px}" +
    ".mkac-sh h2{margin:0 0 6px;font:800 26px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.03em}.mkac-sh p{margin:0 0 18px;color:var(--muted,#6c6a6a);font-size:15px;line-height:1.45}" +
    ".mkac-b{appearance:none;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;min-height:50px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:var(--bg,#fff);color:var(--fg,#111);font:650 15px var(--sans,system-ui);cursor:pointer;transition:transform .3s cubic-bezier(.2,1.25,.3,1),opacity .2s}.mkac-b:active{transform:scale(.97)}.mkac-b svg{width:20px;height:20px}.mkac-b[disabled]{opacity:.55;cursor:default}" +
    ".mkac-b.rd{border:0;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e))}.mkac-or{display:flex;align-items:center;gap:12px;margin:14px 0;color:var(--muted,#6c6a6a);font:600 12px var(--sans,system-ui)}.mkac-or:before,.mkac-or:after{content:'';flex:1;height:1px;background:color-mix(in srgb,var(--fg,#111) 12%,transparent)}" +
    ".mkac-in{width:100%;min-height:50px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:color-mix(in srgb,var(--fg,#111) 5%,transparent);color:inherit;padding:0 14px;font:500 16px var(--sans,system-ui);outline:0;margin-bottom:10px;box-sizing:border-box}.mkac-in:focus{border-color:var(--red,#c8102e);box-shadow:0 0 0 3px color-mix(in srgb,var(--red,#c8102e) 22%,transparent)}" +
    ".mkac-tb{display:flex;gap:4px;padding:3px;border-radius:13px;background:color-mix(in srgb,var(--fg,#111) 7%,transparent);margin:0 0 10px}.mkac-tb button{flex:1;min-height:36px;border:0;border-radius:10px;background:none;color:inherit;font:600 14px/1 inherit;cursor:pointer}.mkac-tb button[aria-pressed=true]{background:var(--bg,#fff);box-shadow:0 1px 4px rgba(0,0,0,.14)}.mkac-pw{margin-top:8px}.mkac-pl{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:10px}.mkac-lk{border:0;background:none;padding:6px 2px;color:var(--red,#c8102e);font:600 13.5px/1.2 inherit;cursor:pointer}" +
    ".mkac-es{display:flex;flex-direction:column;gap:2px;margin:0 0 12px;padding:4px;border-radius:20px;background:color-mix(in srgb,var(--fg,#111) 5%,transparent)}.mkac-es h3{margin:8px 12px 2px;font:700 12.5px/1.2 inherit;letter-spacing:.04em;text-transform:uppercase;color:var(--muted,#6c6a6a)}.mkac-er{display:flex;align-items:center;gap:12px;width:100%;min-height:56px;padding:8px 12px;border:0;border-radius:16px;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}.mkac-er:hover{background:color-mix(in srgb,var(--fg,#111) 6%,transparent)}.mkac-er i{flex:none;width:34px;height:34px;border-radius:11px;display:grid;place-items:center;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e))}.mkac-er i svg{width:19px;height:19px}.mkac-er span{flex:1;min-width:0}.mkac-er b{display:block;font-size:15.5px;letter-spacing:-.01em}.mkac-er small{display:block;color:var(--muted,#6c6a6a);font-size:13px}.mkac-er.lk i{background:color-mix(in srgb,var(--fg,#111) 22%,transparent)}.mkac-er.lk b{opacity:.75}" +
    ".mkac-m{min-height:20px;margin:12px 2px 0;font-size:13.5px;color:var(--muted,#6c6a6a)}.mkac-m.er{color:var(--red,#c8102e)}.mkac-m.ok{color:#1a7f37}.mkac-lg{margin:14px 2px 0;font-size:12.5px;color:var(--muted,#6c6a6a);line-height:1.4}.mkac-lg a{color:inherit}" +
    ".mkac-me{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:color-mix(in srgb,var(--fg,#111) 6%,transparent);margin-bottom:12px}.mkac-me .av{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;overflow:hidden;color:#fff;font:750 18px var(--sans,system-ui);background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));flex:none}.mkac-me .av img{width:100%;height:100%;object-fit:cover}.mkac-me b{display:block;font-size:15.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkac-me small{color:var(--muted,#6c6a6a);font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}.mkac-me div{min-width:0}" +
    ".mkac-sy{display:flex;align-items:center;gap:8px;margin:0 2px 14px;color:var(--muted,#6c6a6a);font-size:13.5px}.mkac-sy svg{width:18px;height:18px;color:#1a7f37;flex:none}" +

    ".mk-acc .av{position:relative}.mk-acc .av:after{content:'';position:absolute;right:-2px;bottom:-2px;width:10px;height:10px;border-radius:50%;box-sizing:border-box;border:2px solid var(--bg,#fff);background:transparent;opacity:0;transform:scale(.4);transition:opacity .25s,transform .35s cubic-bezier(.2,1.5,.3,1)}" +
    ".mk-acc[data-sy=busy] .av:after{opacity:1;transform:none;background:#0a84ff;animation:mkacP 1.1s ease-in-out infinite}.mk-acc[data-sy=ok] .av:after{opacity:1;transform:none;background:#30b350}.mk-acc[data-sy=err] .av:after{opacity:1;transform:none;background:#ff9f0a}.mk-acc[data-sy=off] .av:after{opacity:1;transform:none;background:#8e8e93}@keyframes mkacP{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){.mk-acc[data-sy=busy] .av:after{animation:none}}" +
    ".mkac-st{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 12px}.mkac-st div{padding:11px 12px;border-radius:14px;background:color-mix(in srgb,var(--fg,#111) 6%,transparent)}.mkac-st b{display:block;font:800 22px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.02em}.mkac-st small{color:var(--muted,#6c6a6a);font-size:12.5px}" +
    ".mkac-sy.err svg{color:#ff9f0a}.mkac-sy.off svg{color:#8e8e93}.mkac-ls{display:flex;flex-direction:column;gap:6px;margin-top:10px}.mkac-b.sm{min-height:44px;font-weight:600;font-size:14.5px}.mkac-b.dg{color:#d70015;border-color:color-mix(in srgb,#d70015 35%,transparent)}.mkac-b.dr{border:0;color:#fff;background:#d70015}.mkac-cf{padding:14px;border-radius:16px;background:color-mix(in srgb,#d70015 9%,transparent);margin-top:10px}.mkac-cf p{margin:0 0 12px;font-size:14px;color:var(--fg,#111)}.mkac-cf .row{display:grid;grid-template-columns:1fr 1fr;gap:8px}" +
    ".mkac-me small.mk{display:block;margin-top:2px;font-size:12px}" +
    "@media(prefers-reduced-motion:reduce){.mkac-sh,.mk-acc,.mkac-b{transition:opacity .2s}}";
  document.head.appendChild(st);

  /* ---------- Firebase (carga diferida) ---------- */
  var fb = null, user = null, lastErr = "", fbApp = null;
  function load() {
    if (fb) return fb;
    if (!cfg) return (fb = Promise.reject(new Error("nocfg")));
    fb = Promise.all([import(CDN + "firebase-app.js"), import(CDN + "firebase-auth.js")]).then(function (m) {
      var app = m[0].initializeApp(cfg), A = m[1], auth = A.getAuth(app); fbApp = app;
      try { auth.languageCode = es() ? "es" : "ca"; } catch (e) { }
      A.onAuthStateChanged(auth, function (u) { user = u; ls("mk-acct", u ? "1" : null); paint(); if (u) startSync(u); else stopSync(); if (u) { try { document.dispatchEvent(new CustomEvent("mk-auth", { detail: { uid: u.uid, user: u } })); } catch (e) { } } else { try { document.dispatchEvent(new CustomEvent("mk-auth", { detail: null })); } catch (e) { } } });
      return { A: A, auth: auth };
    });
    return fb;
  }
  function finishLink() {
    if (!cfg) return;
    load().then(function (f) {
      if (!f.A.isSignInWithEmailLink(f.auth, location.href)) return;
      var em = ls("mk-acct-em"); if (!em) em = prompt(t("Escribe tu correo para terminar de entrar", "Escriu el teu correu per acabar d’entrar")); if (!em) return;
      return f.A.signInWithEmailLink(f.auth, em, location.href).then(function () { ls("mk-acct-em", null); history.replaceState(null, "", location.pathname + location.hash); }).catch(function () { });
    }).catch(function () { });
  }


  /* ---------- sincronización del progreso (Firestore: usuarios/{uid}) ---------- */
  var SYNC_KEYS = ["mk-done", "mk-fav", "mk-pos", "mk-time", "mk-ach", "mk-pm", "mk-pmr", "mk-rv", "mk-rvf", "mk-streak", "mk-pau", "mk-rem", "mk-goal", "mk-goalh", "mk-exm", "mk-rvs"];
  var fs = null, syncUid = null, lastHash = "", pushT = 0, pollT = 0, busyPush = false, status = "";
  function local() { var o = {}; SYNC_KEYS.forEach(function (k) { var v = ls(k); if (v != null) o[k] = v; }); return o; }
  function hash(o) { var s = JSON.stringify(o), h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return h + ":" + s.length; }
  function fire() { try { document.dispatchEvent(new CustomEvent("mk-sync", { detail: { status: status } })); } catch (e) { } }
  var lastOk = 0, okT = 0;
  function setStatus(s) {
    if (s === "ok") { lastOk = Date.now(); clearTimeout(okT); okT = setTimeout(function () { if (status === "ok") { status = ""; paintSy(); } }, 2600); }
    status = s; paintSy(); fire(); refreshSheet();
  }
  function refreshSheet() { if (ov && ov.classList.contains("on") && user) { var n = ov.querySelector(".mkac-sy"); if (n) { n.className = "mkac-sy " + (netOff() ? "off" : status); n.querySelector("span").textContent = syncTxt(); } } }
  function netOff() { return navigator.onLine === false; }
  function paintSy() {
    if (!btn) return; var s = user ? (netOff() ? "off" : status === "busy" || status === "err" || status === "ok" ? status : "") : "";
    if (s) btn.setAttribute("data-sy", s); else btn.removeAttribute("data-sy");
    var base = user ? t("Cuenta de ", "Compte de ") + (user.email || "") : "";
    btn.title = !user ? "" : s === "busy" ? t("Sincronizando…", "Sincronitzant…") : s === "err" ? t("No se pudo sincronizar", "No s’ha pogut sincronitzar") : s === "off" ? t("Sin conexión: se guardará al volver", "Sense connexió: es desarà en tornar") : s === "ok" ? t("Guardado en tu cuenta", "Desat al teu compte") : base;
  }
  function hhmm(ts) { var d = new Date(ts); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
  function syncTxt() {
    if (netOff()) return t("Sin conexión. Se guardará al volver.", "Sense connexió. Es desarà en tornar.");
    if (status === "err") return t("No se pudo sincronizar. Se reintentará.", "No s’ha pogut sincronitzar. Es tornarà a provar.");
    if (status === "busy") return t("Sincronizando…", "Sincronitzant…");
    return t("Guardado en tu cuenta", "Desat al teu compte") + (lastOk ? t(" · última vez ", " · última vegada ") + hhmm(lastOk) : "");
  }
  addEventListener("online", function () { paintSy(); if (user) schedule(); refreshSheet(); });
  addEventListener("offline", function () { paintSy(); refreshSheet(); });
  function fsLoad() { return fs || (fs = import(CDN + "firebase-firestore.js").then(function (F) { return { F: F, db: F.getFirestore(fbApp) }; })); }
  function waitMerge(n) { return new Promise(function (res) { (function w(i) { if (window.mkSync) return res(window.mkSync); if (i > 40) return res(null); setTimeout(function () { w(i + 1); }, 150); })(0); }); }
  function pull(u) {
    return Promise.all([fsLoad(), waitMerge()]).then(function (r) {
      var F = r[0].F, db = r[0].db, mg = r[1]; if (!mg) throw new Error("nomerge");
      return F.getDoc(F.doc(db, "usuarios", u.uid)).then(function (snap) {
        if (!snap.exists()) return false;
        var d = snap.data() || {}, inc = {}; SYNC_KEYS.forEach(function (k) { if (d.data && typeof d.data[k] === "string") inc[k] = d.data[k]; });
        return mg.merge(inc);
      });
    });
  }
  function push(u) {
    if (busyPush || !u) return Promise.resolve();
    var o = local(), h = hash(o); if (h === lastHash) return Promise.resolve();
    if (JSON.stringify(o).length > 900000) { setStatus("err"); return Promise.resolve(); }
    busyPush = true; setStatus("busy");
    return fsLoad().then(function (r) {
      return r.F.setDoc(r.F.doc(r.db, "usuarios", u.uid), { v: 1, data: o, updated: r.F.serverTimestamp() });
    }).then(function () { lastHash = h; setStatus("ok"); }).catch(function () { setStatus("err"); }).then(function () { busyPush = false; });
  }
  function schedule() { clearTimeout(pushT); pushT = setTimeout(function () { user && push(user); }, 1500); }
  function startSync(u) {
    if (syncUid === u.uid) return; syncUid = u.uid;
    var prev = ls("mk-acct-uid");
    if (prev && prev !== u.uid) { SYNC_KEYS.forEach(function (k) { ls(k, null); }); }   /* otra persona en este navegador: parte de cero */
    ls("mk-acct-uid", u.uid); setStatus("busy");
    pull(u).then(function (changed) {
      return push(u).then(function () { if (changed && !sessionStorage.getItem("mk-synced-" + u.uid)) { try { sessionStorage.setItem("mk-synced-" + u.uid, "1"); } catch (e) { } location.reload(); } });
    }).catch(function () { setStatus("err"); });
    clearInterval(pollT); pollT = setInterval(function () { if (user && hash(local()) !== lastHash) schedule(); }, 8000);
    document.addEventListener("visibilitychange", onVis);
  }
  function onVis() {
    if (!user) return;
    if (document.visibilityState === "hidden") { clearTimeout(pushT); push(user); }
    else pull(user).then(function (ch) { if (ch) { lastHash = ""; push(user); } }).catch(function () { });
  }
  function stopSync() { syncUid = null; clearInterval(pollT); clearTimeout(pushT); document.removeEventListener("visibilitychange", onVis); lastHash = ""; }

  /* ---------- botón ---------- */
  var btn, ov;
  function initial() { var n = (user && (user.displayName || user.email)) || "?"; return esc(n.trim().charAt(0).toUpperCase()); }
  function avatar() { return user && user.photoURL ? '<img src="' + esc(user.photoURL) + '" alt="" referrerpolicy="no-referrer">' : initial(); }
  function paint() {
    if (!btn) return; paintSy();
    if (user) {
      var nm = (user.displayName || user.email || "").split(/[\s@]/)[0];
      btn.className = "mk-acc in"; btn.innerHTML = '<i class="av">' + avatar() + "</i><span>" + esc(nm) + "</span>";
      btn.setAttribute("aria-label", t("Cuenta de ", "Compte de ") + (user.email || nm));
    } else {
      btn.className = "mk-acc"; btn.innerHTML = IC.user + "<span>" + t("Entrar", "Entra") + "</span>";
      btn.setAttribute("aria-label", t("Iniciar sesión o registrarse", "Inicia sessió o registra’t"));
    }
    if (ov && ov.classList.contains("on")) render();
  }
  function mount() {
    var gear = document.querySelector(".mk-gear"); if (!gear) return false;
    if (document.querySelector(".mk-acc")) return true;
    btn = el("button", "mk-acc"); btn.type = "button"; btn.setAttribute("aria-haspopup", "dialog");
    gear.parentNode.insertBefore(btn, gear.nextSibling); paint();
    btn.addEventListener("click", openSheet);
    if (cfg && (ls("mk-acct") === "1" || /[?&]apiKey=|oobCode/.test(location.search))) { load().catch(function () { }); }
    finishLink(); [0, 400, 1500].forEach(function (d) { setTimeout(fit, d); }); fit();
    return true;
  }

  /* Si la cabecera no cabe (móvil), se oculta el icono de compartir (sigue en la barra inferior). */
  function fit() {
    var b = document.body; b.classList.remove("mk-hasacc");
    if (innerWidth <= 520 && document.documentElement.scrollWidth > innerWidth + 1) b.classList.add("mk-hasacc");
  }
  addEventListener("resize", function () { setTimeout(fit, 80); });


  /* ---------- perfil, exportación y borrado ---------- */
  function jp(k, d) { try { var v = JSON.parse(ls(k)); return v == null ? d : v; } catch (e) { return d; } }
  function myStats() {
    var sk = jp("mk-streak", {}), done = jp("mk-done", {}), tm = jp("mk-time", {}), secs = 0;
    Object.keys(tm).forEach(function (d) { Object.keys(tm[d] || {}).forEach(function (a) { secs += tm[d][a] | 0; }); });
    var ac = 0; try { ac = window.mkAch && window.mkAch.count ? (window.mkAch.count()[0] | 0) : 0; } catch (e) { }
    return { streak: Math.max(sk.n | 0, 0), nd: Object.keys(done).length, hours: Math.round(secs / 360) / 10, ach: ac };
  }
  function doExport() {
    var o = local(), snap = { app: "menudo-kanteo", v: 1, t: new Date().toISOString(), account: { email: user && user.email || "", uid: user && user.uid || "" }, data: o };
    var fn = "menudo-kanteo-" + new Date().toISOString().slice(0, 10) + ".json";
    try {
      var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(snap, null, 1)], { type: "application/json" })); a.download = fn; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800); ls("mk-bk", String(Date.now()));
      msg(t("Datos descargados. Puedes importarlos en Estadísticas → Importar.", "Dades descarregades. Pots importar-les a Estadístiques → Importa."), "ok");
    } catch (e) { msg(t("No se pudo descargar.", "No s’ha pogut descarregar."), "er"); }
  }
  function askDelete() {
    var m = ov.querySelector(".mkac-m"); if (!m || ov.querySelector(".mkac-cf")) return;
    var d = el("div", "mkac-cf", "<p><b>" + t("¿Eliminar tu cuenta?", "Eliminar el teu compte?") + "</b> " + t("Se borrarán tu progreso guardado en la nube y tu cuenta. No se puede deshacer. Lo que tienes en este dispositivo se conserva.", "S’esborraran el teu progrés desat al núvol i el teu compte. No es pot desfer. El que tens en aquest dispositiu es conserva.") + '</p><div class="row"><button type="button" class="mkac-b sm" data-a="delc">' + t("Cancelar", "Cancel·la") + '</button><button type="button" class="mkac-b sm dr" data-a="delok">' + t("Eliminar", "Elimina") + "</button></div>");
    m.parentNode.insertBefore(d, m); d.querySelector("button").focus();
  }
  function doDelete() {
    var u = user; if (!u) return; busy(true); msg(t("Eliminando…", "Eliminant…"));
    stopSync();
    Promise.all([load(), fsLoad()]).then(function (r) {
      var f = r[0], F = r[1].F, db = r[1].db;
      return F.deleteDoc(F.doc(db, "usuarios", u.uid)).then(function () {
        return f.A.deleteUser(f.auth.currentUser).catch(function (er) {
          if (er && er.code === "auth/requires-recent-login") {
            var g = (u.providerData || []).some(function (p) { return p.providerId === "google.com"; });
            if (!g) { var x = new Error("relogin"); x.code = "relogin"; throw x; }
            return f.A.reauthenticateWithPopup(f.auth.currentUser, new f.A.GoogleAuthProvider()).then(function () { return f.A.deleteUser(f.auth.currentUser); });
          }
          throw er;
        });
      });
    }).then(function () {
      ls("mk-acct", null); ls("mk-acct-uid", null); closeSheet(); user = null; paint(); stopSync();
    }).catch(function (er) {
      busy(false); user && startSync(user);
      msg(er && er.code === "relogin" ? t("Por seguridad, cierra sesión, vuelve a entrar con el enlace del correo y repite el borrado.", "Per seguretat, tanca la sessió, torna a entrar amb l’enllaç del correu i repeteix l’esborrat.") : errTxt(er), "er");
    });
  }
  function doInstall() {
    if (window.mkInstall && /iPad|iPhone|iPod|Android/.test(navigator.userAgent)) { closeSheet(); window.mkInstall(); return; }
    if (window.MKI && MKI.go) { MKI.go(function (j) { msg(es() ? j[1] : j[0]); }); return; }
    msg(t("Abre el portal desde su dirección web (https) para poder instalarlo.", "Obre el portal des de la seva adreça web (https) per poder-lo instal·lar."));
  }

  /* ---------- hoja ---------- */
  function msg(txt, cls) { var m = ov && ov.querySelector(".mkac-m"); if (m) { m.textContent = txt || ""; m.className = "mkac-m" + (cls ? " " + cls : ""); } }
  function errTxt(e) {
    var c = (e && e.code) || (e && e.message) || "";
    if (/popup-closed|cancelled-popup/.test(c)) return "";
    if (/popup-blocked/.test(c)) return t("El navegador bloqueó la ventana. Prueba con el enlace por correo.", "El navegador ha bloquejat la finestra. Prova amb l’enllaç per correu.");
    if (/requires-recent-login/.test(c)) return t("Por seguridad, vuelve a iniciar sesión y repite la acción.", "Per seguretat, torna a iniciar sessió i repeteix l’acció.");
    if (/invalid-credential|wrong-password|user-not-found/.test(c)) return t("Correo o contraseña incorrectos. Si no tienes cuenta, pulsa «Crear cuenta nueva».", "Correu o contrasenya incorrectes. Si no tens compte, prem «Crea un compte nou».");
    if (/email-already-in-use/.test(c)) return t("Ese correo ya tiene cuenta. Pulsa «Entrar» o recupera la contraseña.", "Aquest correu ja té compte. Prem «Entra» o recupera la contrasenya.");
    if (/weak-password/.test(c)) return t("La contraseña es muy corta: usa al menos 6 caracteres.", "La contrasenya és massa curta: fes servir almenys 6 caràcters.");
    if (/too-many-requests/.test(c)) return t("Demasiados intentos. Espera un poco y vuelve a probar.", "Massa intents. Espera una mica i torna-ho a provar.");
    if (/invalid-email/.test(c)) return t("Ese correo no parece válido.", "Aquest correu no sembla vàlid.");
    if (/network/.test(c)) return t("Sin conexión. Inténtalo de nuevo.", "Sense connexió. Torna-ho a provar.");
    if (/unauthorized-domain/.test(c)) return t("Este dominio aún no está autorizado en Firebase.", "Aquest domini encara no està autoritzat a Firebase.");
    if (/nocfg/.test(c)) return t("El inicio de sesión se está terminando de configurar.", "L’inici de sessió s’està acabant de configurar.");
    return t("No se pudo completar. Inténtalo de nuevo.", "No s’ha pogut completar. Torna-ho a provar.");
  }
  var pwMode = false;
  /* herramientas de estudio (solo con cuenta); estudio.js las implementa */
  function estRows(on) {
    var I = (window.mkEstudio && window.mkEstudio.info) ? window.mkEstudio.info() : {}, go = I.goal;
    var rows = [
      ["goal", IC.tg, t("Objetivo semanal", "Objectiu setmanal"), on ? (go ? go.p + "/" + go.n + t(" problemas esta semana", " problemes aquesta setmana") : t("Fija cuántos problemas harás por semana", "Fixa quants problemes faràs per setmana")) : t("Anillo de progreso y logros semanales", "Anell de progrés i assoliments setmanals")],
      ["rev", IC.rp, t("Repaso por fallos", "Repàs per errors"), on ? (I.due ? I.due + t(" para repasar hoy", " per repassar avui") : (I.queued ? t("Al día · practica igualmente", "Al dia · practica igualment") : t("Marca apartados que te fallen", "Marca apartats que et fallin"))) : t("Repasa lo que fallaste, con intervalos", "Repassa el que has fallat, amb intervals")],
      ["exm", IC.tm, t("Modo examen", "Mode examen"), on ? (I.run ? t("Examen en curso", "Examen en curs") : t("Simulacro PAU con reloj y nota", "Simulacre PAU amb rellotge i nota")) : t("Simulacros PAU con reloj y nota", "Simulacres PAU amb rellotge i nota")]
    ];
    return '<div class="mkac-es"><h3>' + (on ? t("Estudio", "Estudi") : t("Solo con cuenta", "Només amb compte")) + "</h3>" + rows.map(function (r) {
      return '<button type="button" class="mkac-er' + (on ? "" : " lk") + '" data-a="est" data-e="' + r[0] + '"><i>' + (on ? r[1] : IC.lock) + "</i><span><b>" + r[2] + "</b><small>" + r[3] + "</small></span></button>";
    }).join("") + "</div>";
  }
  function render() {
    var sh = ov.querySelector(".mkac-sh"), keep = sh.querySelector(".mkac-x");
    if (user) {
      var S = myStats(), since = user.metadata && user.metadata.creationTime ? new Date(user.metadata.creationTime) : null;
      var inst = !(window.mkStandalone && window.mkStandalone());
      sh.innerHTML = '<div class="mkac-me"><i class="av">' + avatar() + "</i><div><b>" + esc(user.displayName || t("Tu cuenta", "El teu compte")) + "</b><small>" + esc(user.email || "") + "</small>" +
        (since && !isNaN(since) ? '<small class="mk">' + t("Miembro desde ", "Membre des de ") + esc(since.toLocaleDateString(es() ? "es-ES" : "ca-ES", { month: "long", year: "numeric" })) + "</small>" : "") + "</div></div>" +
        '<div class="mkac-st">' +
        "<div><b>" + S.streak + "</b><small>" + t("días de racha", "dies de ratxa") + "</small></div>" +
        "<div><b>" + S.nd + "</b><small>" + t("problemas hechos", "problemes fets") + "</small></div>" +
        "<div><b>" + S.hours.toLocaleString(es() ? "es-ES" : "ca-ES") + "</b><small>" + t("h de estudio", "h d’estudi") + "</small></div>" +
        "<div><b>" + S.ach + "</b><small>" + t("logros", "assoliments") + "</small></div></div>" +
        '<div class="mkac-sy ' + (netOff() ? "off" : status) + '">' + IC.cloud + "<span>" + syncTxt() + "</span></div>" +
        '<button type="button" class="mkac-b sm" data-a="stats">' + t("Ver estadísticas completas", "Veure estadístiques completes") + "</button>" + estRows(true) +
        '<div class="mkac-ls">' +
        (inst ? '<button type="button" class="mkac-b sm" data-a="inst">' + t("Instalar la app", "Instal·la l’app") + "</button>" : "") +
        '<button type="button" class="mkac-b sm" data-a="export">' + t("Descargar mis datos", "Descarrega les meves dades") + "</button>" +
        '<button type="button" class="mkac-b sm" data-a="out">' + t("Cerrar sesión", "Tanca la sessió") + "</button>" +
        '<button type="button" class="mkac-b sm dg" data-a="del">' + t("Eliminar mi cuenta", "Elimina el meu compte") + "</button></div>" +
        '<div class="mkac-m" aria-live="polite"></div>';
    } else {
      sh.innerHTML = '<div class="mkac-ic">' + IC.user + "</div><h2>" + t("Guarda tu progreso", "Desa el teu progrés") + "</h2>" +
        "<p>" + t("Entra para conservar lo que has hecho y seguir desde cualquier dispositivo.", "Entra per conservar el que has fet i continuar des de qualsevol dispositiu.") + "</p>" +
        '<button type="button" class="mkac-b" data-a="google">' + IC.g + t("Continuar con Google", "Continua amb Google") + "</button>" +
        '<div class="mkac-or">' + t("o con tu correo", "o amb el teu correu") + "</div>" +
        '<div class="mkac-tb" role="group" aria-label="' + t("Método con correo", "Mètode amb correu") + '"><button type="button" data-a="mode" data-m="link" aria-pressed="' + (!pwMode) + '">' + t("Enlace", "Enllaç") + '</button><button type="button" data-a="mode" data-m="pw" aria-pressed="' + pwMode + '">' + t("Contraseña", "Contrasenya") + "</button></div>" +
        '<form data-a="mail" novalidate><input class="mkac-in" type="email" inputmode="email" autocomplete="email" required placeholder="' + t("tu@correo.com", "el-teu@correu.com") + '" aria-label="' + t("Correo electrónico", "Correu electrònic") + '">' +
        (pwMode ? '<input class="mkac-in mkac-pw" type="password" autocomplete="current-password" minlength="6" required placeholder="' + t("Contraseña (mín. 6 caracteres)", "Contrasenya (mín. 6 caràcters)") + '" aria-label="' + t("Contraseña", "Contrasenya") + '">' +
          '<button type="submit" class="mkac-b rd">' + IC.mail + t("Entrar", "Entra") + "</button>" +
          '<div class="mkac-pl"><button type="button" class="mkac-lk" data-a="signup">' + t("Crear cuenta nueva", "Crea un compte nou") + '</button><button type="button" class="mkac-lk" data-a="reset">' + t("¿Olvidaste la contraseña?", "Has oblidat la contrasenya?") + "</button></div>"
          : '<button type="submit" class="mkac-b rd">' + IC.mail + t("Enviarme un enlace", "Envia’m un enllaç") + "</button>") + "</form>" +
        '<div class="mkac-m" aria-live="polite"></div><p class="mkac-lg">' + (pwMode ? "" : t("Sin contraseñas. ", "Sense contrasenyes. ")) + t("Solo guardamos tu correo y tu progreso. ", "Només desem el teu correu i el teu progrés. ") + '<a href="privacitat.html">' + t("Privacidad", "Privacitat") + "</a></p>" + estRows(false);
    }
    sh.insertBefore(keep, sh.firstChild);
  }
  function busy(on) { [].forEach.call(ov.querySelectorAll(".mkac-b"), function (b) { b.disabled = on; }); }
  /* correo y contraseña: a = "in" (entrar), "signup" (crear) o "reset" (recuperar) */
  function pwAction(a) {
    var inp = ov.querySelector(".mkac-in"), pw = ov.querySelector(".mkac-pw"), em = (inp.value || "").trim();
    if (!/^\S+@\S+\.\S+$/.test(em)) { msg(t("Escribe un correo válido.", "Escriu un correu vàlid."), "er"); inp.focus(); return; }
    if (a !== "reset" && (!pw || (pw.value || "").length < 6)) { msg(t("La contraseña debe tener al menos 6 caracteres.", "La contrasenya ha de tenir almenys 6 caràcters."), "er"); pw && pw.focus(); return; }
    busy(true); msg("");
    load().then(function (f) {
      if (a === "reset") return f.A.sendPasswordResetEmail(f.auth, em).then(function () { msg(t("Si ese correo tiene cuenta, te hemos enviado un enlace para crear una contraseña nueva.", "Si aquest correu té compte, t’hem enviat un enllaç per crear una contrasenya nova."), "ok"); });
      var p = a === "signup" ? f.A.createUserWithEmailAndPassword(f.auth, em, pw.value) : f.A.signInWithEmailAndPassword(f.auth, em, pw.value);
      return p.then(closeSheet);
    }).catch(function (er) { msg(errTxt(er), "er"); }).then(function () { busy(false); });
  }
  function openSheet() {
    if (!ov) {
      ov = el("div", "mkac-ov"); ov.innerHTML = '<div class="mkac-sh" role="dialog" aria-modal="true" aria-label="' + t("Cuenta", "Compte") + '"><button type="button" class="mkac-x" aria-label="' + t("Cerrar", "Tanca") + '">×</button></div>';
      document.body.appendChild(ov);
      ov.addEventListener("click", function (e) {
        if (e.target === ov || e.target.closest(".mkac-x")) return closeSheet();
        var b = e.target.closest("[data-a]"); if (!b || b.tagName === "FORM") return; var a = b.getAttribute("data-a");
        if (a === "google") {
          busy(true); msg("");
          load().then(function (f) { return f.A.signInWithPopup(f.auth, new f.A.GoogleAuthProvider()); }).then(closeSheet).catch(function (er) { msg(errTxt(er), "er"); }).then(function () { busy(false); });
        } else if (a === "est") { if (user && window.mkEstudio && window.mkEstudio.open) { var kd = b.getAttribute("data-e"); closeSheet(); window.mkEstudio.open(kd); } else msg(t("Entra con tu cuenta para desbloquearlo.", "Entra amb el teu compte per desbloquejar-ho."), "er");
        } else if (a === "mode") { pwMode = b.getAttribute("data-m") === "pw"; var em0 = (ov.querySelector(".mkac-in") || {}).value || ""; render(); var i0 = ov.querySelector(".mkac-in"); if (i0) { i0.value = em0; } 
        } else if (a === "signup" || a === "reset") { pwAction(a);
        } else if (a === "export") { doExport();
        } else if (a === "stats") { closeSheet(); window.mkStats && window.mkStats.open && window.mkStats.open();
        } else if (a === "inst") { doInstall();
        } else if (a === "del") { askDelete();
        } else if (a === "delc") { var cf = ov.querySelector(".mkac-cf"); cf && cf.remove();
        } else if (a === "delok") { doDelete();
        } else if (a === "out") {
          load().then(function (f) { return f.A.signOut(f.auth); }).then(closeSheet).catch(function (er) { msg(errTxt(er), "er"); });
        }
      });
      ov.addEventListener("submit", function (e) {
        e.preventDefault(); if (pwMode) return pwAction("in");
        var inp = ov.querySelector(".mkac-in"), em = (inp.value || "").trim();
        if (!/^\S+@\S+\.\S+$/.test(em)) { msg(t("Escribe un correo válido.", "Escriu un correu vàlid."), "er"); inp.focus(); return; }
        busy(true); msg("");
        load().then(function (f) {
          return f.A.sendSignInLinkToEmail(f.auth, em, { url: location.origin + location.pathname, handleCodeInApp: true }).then(function () {
            ls("mk-acct-em", em); msg(t("Listo: revisa tu correo y toca el enlace para entrar.", "Fet: revisa el correu i toca l’enllaç per entrar."), "ok");
          });
        }).catch(function (er) { msg(errTxt(er), "er"); }).then(function () { busy(false); });
      });
      addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.classList.contains("on")) { closeSheet(); btn && btn.focus(); } });
    }
    render(); ov.getBoundingClientRect(); ov.classList.add("on");
    if (cfg) load().catch(function () { });
    else msg(t("Vista previa: falta pegar la configuración de Firebase en cuenta-config.js.", "Vista prèvia: falta enganxar la configuració de Firebase a cuenta-config.js."), "er");
    setTimeout(function () { var f = ov.querySelector(".mkac-b"); f && f.focus(); }, 60);
  }
  function closeSheet() { ov && ov.classList.remove("on"); }

  window.mkCuenta = { user: function () { return user; }, open: openSheet };
  if (preview && !cfg) window.mkCuenta._set = function (u) { user = u; paint(); };  /* solo vista previa sin configuración */
  if (!mount()) { var mo = new MutationObserver(function () { if (mount()) mo.disconnect(); }); mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 8000); }
})();
