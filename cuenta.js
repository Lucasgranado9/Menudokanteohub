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

  var IC = {
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
    ".mkac-ov.on .mkac-sh{transform:none;opacity:1}.mkac-x{position:absolute;top:14px;right:14px;appearance:none;border:0;width:32px;height:32px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);font:400 20px/1 var(--sans,system-ui)}" +
    ".mkac-ic{width:56px;height:56px;border-radius:18px;display:grid;place-items:center;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));box-shadow:0 14px 28px -14px var(--red,#c8102e);margin-bottom:14px}.mkac-ic svg{width:30px;height:30px}" +
    ".mkac-sh h2{margin:0 0 6px;font:800 26px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.03em}.mkac-sh p{margin:0 0 18px;color:var(--muted,#6c6a6a);font-size:15px;line-height:1.45}" +
    ".mkac-b{appearance:none;width:100%;display:flex;align-items:center;justify-content:center;gap:10px;min-height:50px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:var(--bg,#fff);color:var(--fg,#111);font:650 15px var(--sans,system-ui);cursor:pointer;transition:transform .3s cubic-bezier(.2,1.25,.3,1),opacity .2s}.mkac-b:active{transform:scale(.97)}.mkac-b svg{width:20px;height:20px}.mkac-b[disabled]{opacity:.55;cursor:default}" +
    ".mkac-b.rd{border:0;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e))}.mkac-or{display:flex;align-items:center;gap:12px;margin:14px 0;color:var(--muted,#6c6a6a);font:600 12px var(--sans,system-ui)}.mkac-or:before,.mkac-or:after{content:'';flex:1;height:1px;background:color-mix(in srgb,var(--fg,#111) 12%,transparent)}" +
    ".mkac-in{width:100%;min-height:50px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:color-mix(in srgb,var(--fg,#111) 5%,transparent);color:inherit;padding:0 14px;font:500 16px var(--sans,system-ui);outline:0;margin-bottom:10px;box-sizing:border-box}.mkac-in:focus{border-color:var(--red,#c8102e);box-shadow:0 0 0 3px color-mix(in srgb,var(--red,#c8102e) 22%,transparent)}" +
    ".mkac-m{min-height:20px;margin:12px 2px 0;font-size:13.5px;color:var(--muted,#6c6a6a)}.mkac-m.er{color:var(--red,#c8102e)}.mkac-m.ok{color:#1a7f37}.mkac-lg{margin:14px 2px 0;font-size:12.5px;color:var(--muted,#6c6a6a);line-height:1.4}.mkac-lg a{color:inherit}" +
    ".mkac-me{display:flex;align-items:center;gap:12px;padding:12px;border-radius:16px;background:color-mix(in srgb,var(--fg,#111) 6%,transparent);margin-bottom:12px}.mkac-me .av{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;overflow:hidden;color:#fff;font:750 18px var(--sans,system-ui);background:linear-gradient(180deg,#e8344f,var(--red,#c8102e));flex:none}.mkac-me .av img{width:100%;height:100%;object-fit:cover}.mkac-me b{display:block;font-size:15.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkac-me small{color:var(--muted,#6c6a6a);font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}.mkac-me div{min-width:0}" +
    ".mkac-sy{display:flex;align-items:center;gap:8px;margin:0 2px 14px;color:var(--muted,#6c6a6a);font-size:13.5px}.mkac-sy svg{width:18px;height:18px;color:#1a7f37;flex:none}" +
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
  var SYNC_KEYS = ["mk-done", "mk-fav", "mk-pos", "mk-time", "mk-ach", "mk-pm", "mk-pmr", "mk-rv", "mk-rvf", "mk-streak", "mk-pau", "mk-rem"];
  var fs = null, syncUid = null, lastHash = "", pushT = 0, pollT = 0, busyPush = false, status = "";
  function local() { var o = {}; SYNC_KEYS.forEach(function (k) { var v = ls(k); if (v != null) o[k] = v; }); return o; }
  function hash(o) { var s = JSON.stringify(o), h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return h + ":" + s.length; }
  function fire() { try { document.dispatchEvent(new CustomEvent("mk-sync", { detail: { status: status } })); } catch (e) { } }
  function setStatus(s) { status = s; fire(); if (ov && ov.classList.contains("on") && user) { var n = ov.querySelector(".mkac-sy span"); if (n) n.textContent = syncTxt(); } }
  function syncTxt() { return status === "err" ? t("No se pudo sincronizar. Se reintentará.", "No s’ha pogut sincronitzar. Es tornarà a provar.") : status === "busy" ? t("Sincronizando…", "Sincronitzant…") : t("Tu progreso se guarda en tu cuenta.", "El teu progrés es desa al teu compte."); }
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
    if (!btn) return;
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

  /* ---------- hoja ---------- */
  function msg(txt, cls) { var m = ov && ov.querySelector(".mkac-m"); if (m) { m.textContent = txt || ""; m.className = "mkac-m" + (cls ? " " + cls : ""); } }
  function errTxt(e) {
    var c = (e && e.code) || (e && e.message) || "";
    if (/popup-closed|cancelled-popup/.test(c)) return "";
    if (/invalid-email/.test(c)) return t("Ese correo no parece válido.", "Aquest correu no sembla vàlid.");
    if (/network/.test(c)) return t("Sin conexión. Inténtalo de nuevo.", "Sense connexió. Torna-ho a provar.");
    if (/unauthorized-domain/.test(c)) return t("Este dominio aún no está autorizado en Firebase.", "Aquest domini encara no està autoritzat a Firebase.");
    if (/nocfg/.test(c)) return t("El inicio de sesión se está terminando de configurar.", "L’inici de sessió s’està acabant de configurar.");
    return t("No se pudo completar. Inténtalo de nuevo.", "No s’ha pogut completar. Torna-ho a provar.");
  }
  function render() {
    var sh = ov.querySelector(".mkac-sh"), keep = sh.querySelector(".mkac-x");
    if (user) {
      sh.innerHTML = '<div class="mkac-me"><i class="av">' + avatar() + "</i><div><b>" + esc(user.displayName || t("Tu cuenta", "El teu compte")) + "</b><small>" + esc(user.email || "") + "</small></div></div>" +
        '<div class="mkac-sy">' + IC.cloud + "<span>" + syncTxt() + "</span></div>" +
        '<button type="button" class="mkac-b" data-a="out">' + t("Cerrar sesión", "Tanca la sessió") + '</button><div class="mkac-m" aria-live="polite"></div>';
    } else {
      sh.innerHTML = '<div class="mkac-ic">' + IC.user + "</div><h2>" + t("Guarda tu progreso", "Desa el teu progrés") + "</h2>" +
        "<p>" + t("Entra para conservar lo que has hecho y seguir desde cualquier dispositivo.", "Entra per conservar el que has fet i continuar des de qualsevol dispositiu.") + "</p>" +
        '<button type="button" class="mkac-b" data-a="google">' + IC.g + t("Continuar con Google", "Continua amb Google") + "</button>" +
        '<div class="mkac-or">' + t("o con tu correo", "o amb el teu correu") + "</div>" +
        '<form data-a="mail" novalidate><input class="mkac-in" type="email" inputmode="email" autocomplete="email" required placeholder="' + t("tu@correo.com", "el-teu@correu.com") + '" aria-label="' + t("Correo electrónico", "Correu electrònic") + '">' +
        '<button type="submit" class="mkac-b rd">' + IC.mail + t("Enviarme un enlace", "Envia’m un enllaç") + "</button></form>" +
        '<div class="mkac-m" aria-live="polite"></div><p class="mkac-lg">' + t("Sin contraseñas. Solo guardamos tu correo y tu progreso. ", "Sense contrasenyes. Només desem el teu correu i el teu progrés. ") + '<a href="privacitat.html">' + t("Privacidad", "Privacitat") + "</a></p>";
    }
    sh.insertBefore(keep, sh.firstChild);
  }
  function busy(on) { [].forEach.call(ov.querySelectorAll(".mkac-b"), function (b) { b.disabled = on; }); }
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
        } else if (a === "out") {
          load().then(function (f) { return f.A.signOut(f.auth); }).then(closeSheet).catch(function (er) { msg(errTxt(er), "er"); });
        }
      });
      ov.addEventListener("submit", function (e) {
        e.preventDefault(); var inp = ov.querySelector(".mkac-in"), em = (inp.value || "").trim();
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
  if (!mount()) { var mo = new MutationObserver(function () { if (mount()) mo.disconnect(); }); mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 8000); }
})();
