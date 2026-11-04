/* Paleta de comandos ⌘K · Menudo Kanteo
   Un solo sitio para buscar, abrir tus favoritos y lanzar acciones.
   Atajo: ⌘K / Ctrl+K. En el móvil: mantén pulsada la lupa de la cabecera. */
(function () {
  "use strict";
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} return null; }
  function norm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’‘']/g, " "); }
  var CSS = ".mkk-ov{position:fixed;inset:0;z-index:2147482100;background:rgba(0,0,0,.32);opacity:0;transition:opacity .22s}.mkk-ov.on{opacity:1}" +
    ".mkk{position:fixed;z-index:2147482101;left:50%;top:max(12px,10vh);width:min(620px,calc(100vw - 24px));max-height:min(540px,calc(100dvh - 24px));display:flex;flex-direction:column;overflow:hidden;transform:translate(-50%,-10px) scale(.96);opacity:0;transform-origin:50% 0;background:color-mix(in srgb,var(--bg,#fff) 80%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);color:var(--fg,#111);border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:20px;box-shadow:0 30px 80px rgba(0,0,0,.35);font:15px/1.4 -apple-system,system-ui,sans-serif;transition:transform .5s cubic-bezier(.2,1.15,.3,1),opacity .2s}" +
    ".mkk.on{transform:translate(-50%,0) scale(1);opacity:1}.mkk-in{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid color-mix(in srgb,currentColor 10%,transparent)}.mkk-in svg{flex:none;opacity:.55}.mkk-in input{flex:1;min-width:0;border:0!important;background:transparent!important;color:inherit;font:inherit;font-size:17px;outline:none!important;box-shadow:none!important;padding:2px 0!important}.mkk-in kbd{font:600 11px/1 inherit;opacity:.55;border:1px solid color-mix(in srgb,currentColor 25%,transparent);border-radius:6px;padding:3px 6px}" +
    ".mkk-ls{overflow:auto;overscroll-behavior:contain;padding:6px 8px 8px}.mkk-h{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.55;padding:10px 10px 4px}.mkk-r{display:flex;align-items:center;gap:12px;min-height:46px;padding:6px 10px;border-radius:12px;cursor:pointer;text-decoration:none;color:inherit}.mkk-r[aria-selected=true]{background:color-mix(in srgb,var(--ac,#0a66ff) 16%,transparent)}.mkk-r i{flex:none;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-style:normal;font-size:14px;background:color-mix(in srgb,currentColor 9%,transparent)}.mkk-r span{flex:1;min-width:0}.mkk-r b{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mkk-r em{display:block;font-style:normal;font-size:12.5px;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mkk-r kbd{font:600 11px/1 inherit;opacity:.5}.mkk-e{padding:28px 16px;text-align:center;opacity:.6}" +
    ".mkk-ft{display:flex;gap:14px;padding:8px 16px;font-size:12px;opacity:.55;border-top:1px solid color-mix(in srgb,currentColor 10%,transparent)}" +
    "@media(max-width:640px){.mkk{top:auto;bottom:max(8px,env(safe-area-inset-bottom,0px));transform:translate(-50%,24px) scale(.98);transform-origin:50% 100%;max-height:min(78dvh,620px);border-radius:24px}.mkk-ft{display:none}.mkk-in input{font-size:16px}}" +
    "@media(prefers-reduced-motion:reduce){.mkk{transition:opacity .15s;transform:translate(-50%,0)!important}}@media(prefers-reduced-transparency:reduce){.mkk{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}@media(prefers-contrast:more){.mkk{background:var(--bg,#fff);border-color:currentColor}.mkk-r[aria-selected=true]{outline:2px solid currentColor}}";
  var st = document.createElement("style"); st.textContent = CSS;
  var cache = {};
  function get(f) { return cache[f] || (cache[f] = fetch(es() && f === "buscador.json" ? "buscador.es.json" : f).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })); }

  function actions() {
    var p = location.pathname.split("/").pop() || "index.html", snd = ls("mk-snd") === "1";
    var A = [
      { i: "★", n: t("Guardar esta página en favoritos", "Desar aquesta pàgina als favorits"), k: "fav", f: function () { window.mkFav && window.mkFav.page(); } },
      { i: "⚑", n: t("Guardar un marcador aquí", "Desar un marcador aquí"), k: "marcador punto", f: function () { window.mkFav && window.mkFav.mark(); } },
      { i: "☆", n: t("Abrir favoritos", "Obrir favorits"), k: "favoritos marcadores", f: function () { window.mkFav && window.mkFav.open("fav"); } },
      { i: "▶", n: t("Seguir leyendo", "Continuar llegint"), k: "continuar", f: function () { var l = window.mkFav && window.mkFav.last()[0]; location.href = l ? l.u : "index.html"; } },
      { i: "⏱", n: t("Modo examen PAU", "Mode examen PAU"), k: "examen cronometro problemas", f: function () { location.href = "problemes.html#pau"; } },
      { i: "∑", n: t("Calculadora de nota", "Calculadora de nota"), k: "nota calculadora", f: function () { location.href = "calculadora.html"; } },
      { i: "◐", n: t("Cambiar tema claro/oscuro", "Canviar tema clar/fosc"), k: "tema oscuro claro", f: function () { var h = document.documentElement, dk = h.getAttribute("data-theme") === "dark" || (!h.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches), n = dk ? "light" : "dark"; h.setAttribute("data-theme", n); ls("mk-theme", n); } },
      { i: "文", n: t("Cambiar idioma", "Canviar idioma") + " (" + (es() ? "Català" : "Castellano") + ")", k: "idioma lengua catala castellano", f: function () { window.MKL && window.MKL.set(es() ? "ca" : "es"); } },
      { i: "♪", n: snd ? t("Desactivar sonidos y vibración", "Desactivar sons i vibració") : t("Activar sonidos y vibración", "Activar sons i vibració"), k: "sonido vibracion haptica", f: function () { ls("mk-snd", snd ? "0" : "1"); if (!snd) window.mkFx && window.mkFx.fb("done"); } },
      { i: "?", n: t("Ayuda y soporte", "Ajuda i suport"), k: "ayuda soporte faq", f: function () { window.mkFav && window.mkFav.open("help"); } },
      { i: "⌨", n: t("Atajos de teclado", "Dreceres de teclat"), k: "atajos teclado", f: function () { window.mkKb && window.mkKb.open(); } },
      { i: "⌂", n: t("Ir a la portada", "Anar a la portada"), k: "inicio portada home", f: function () { location.href = "index.html"; } }
    ];
    return A;
  }
  var ov, box, inp, ls_, items = [], sel = 0, last = null, seq = 0;
  function row(it, k) { var r = document.createElement(it.u ? "a" : "div"); r.className = "mkk-r"; r.setAttribute("role", "option"); r.id = "mkk" + k; if (it.u) r.href = it.u; r.innerHTML = "<i></i><span><b></b><em></em></span>" + (it.kb ? "<kbd></kbd>" : ""); r.querySelector("i").textContent = it.i; r.querySelector("b").textContent = it.n; r.querySelector("em").textContent = it.s || ""; if (it.kb) r.querySelector("kbd").textContent = it.kb; if (!it.s) r.querySelector("em").remove(); r.addEventListener("pointermove", function () { pick(k, true); }); r.addEventListener("click", function (e) { e.preventDefault(); run(it); }); return r; }
  function pick(k, nos) { sel = k; [].forEach.call(ls_.querySelectorAll(".mkk-r"), function (r, j) { r.setAttribute("aria-selected", j === k ? "true" : "false"); }); inp.setAttribute("aria-activedescendant", "mkk" + k); var e = ls_.querySelectorAll(".mkk-r")[k]; if (e && !nos) e.scrollIntoView({ block: "nearest" }); }
  function run(it) { close(); setTimeout(function () { if (it.f) it.f(); else if (it.u) location.href = it.u; }, 60); }
  function render(groups) {
    ls_.innerHTML = ""; items = []; var k = 0;
    groups.forEach(function (g) { if (!g.l.length) return; var h = document.createElement("div"); h.className = "mkk-h"; h.setAttribute("role", "presentation"); h.textContent = g.h; ls_.appendChild(h); g.l.forEach(function (it) { items.push(it); ls_.appendChild(row(it, k++)); }); });
    if (!items.length) { var e = document.createElement("div"); e.className = "mkk-e"; e.textContent = t("Sin resultados. Prueba con otra palabra.", "Sense resultats. Prova amb una altra paraula."); ls_.appendChild(e); }
    else pick(0, true);
  }
  function query(q) {
    var id = ++seq, n = norm(q).trim(), toks = n.split(/\s+/).filter(Boolean);
    var fav = (window.mkFav ? window.mkFav.list() : []).map(function (x) { return { i: x.k === "mark" ? "⚑" : x.k === "prob" ? "∑" : "★", n: x.t, s: x.s, u: x.u }; });
    var acts = actions();
    if (!toks.length) {
      var lastR = (window.mkFav && window.mkFav.last ? window.mkFav.last() : []).slice(0, 2).map(function (x) { return { i: "▶", n: x.t, s: t("Seguir leyendo", "Continuar llegint") + " · " + Math.round((x.y || 0) * 100) + " %", u: x.u }; });
      render([{ h: t("Recientes", "Recents"), l: lastR }, { h: t("Favoritos", "Favorits"), l: fav.slice(0, 3) }, { h: t("Acciones", "Accions"), l: acts }]); return;
    }
    function ok(s) { s = norm(s); return toks.every(function (w) { return s.indexOf(w) >= 0; }); }
    var A = acts.filter(function (a) { return ok(a.n + " " + a.k); }), F = fav.filter(function (a) { return ok(a.n + " " + (a.s || "")); });
    render([{ h: t("Acciones", "Accions"), l: A.slice(0, 4) }, { h: t("Favoritos", "Favorits"), l: F.slice(0, 3) }]);
    Promise.all([get("buscador-titols.json"), get("buscador.json")]).then(function (r) {
      if (id !== seq) return; var seen = {}, T = [], X = [];
      (r[0] || []).forEach(function (e) { if (T.length < 6 && ok(e[0] + " " + e[1])) { seen[e[2]] = 1; T.push({ i: "§", n: e[0], s: e[1], u: e[2] }); } });
      (r[1] || []).forEach(function (e) { if (X.length < 5 && !seen[e[2]] && ok(e[0] + " " + e[1] + " " + e[3])) { seen[e[2]] = 1; X.push({ i: "≡", n: e[0], s: e[1], u: e[2] }); } });
      render([{ h: t("Acciones", "Accions"), l: A.slice(0, 4) }, { h: t("Favoritos", "Favorits"), l: F.slice(0, 3) }, { h: t("Páginas", "Pàgines"), l: T }, { h: t("En el contenido", "Dins del contingut"), l: X }]);
    });
  }
  function open(q) {
    if (box) return; last = document.activeElement;
    if (window.mkSearch && document.querySelector(".mk-so:not([hidden])")) return;
    ov = document.createElement("div"); ov.className = "mkk-ov"; box = document.createElement("div"); box.className = "mkk"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", t("Paleta de comandos", "Paleta d’ordres"));
    box.innerHTML = '<div class="mkk-in"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="text" role="combobox" aria-expanded="true" aria-controls="mkk-ls" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="go"><kbd>esc</kbd></div><div class="mkk-ls" id="mkk-ls" role="listbox"></div><div class="mkk-ft"><span>↑↓ ' + t("mover", "moure") + '</span><span>↵ ' + t("abrir", "obrir") + '</span><span>esc ' + t("cerrar", "tancar") + '</span></div>';
    inp = box.querySelector("input"); ls_ = box.querySelector(".mkk-ls"); inp.placeholder = t("Busca, abre favoritos o lanza una acción…", "Cerca, obre favorits o llança una acció…"); inp.setAttribute("aria-label", inp.placeholder);
    document.body.appendChild(ov); document.body.appendChild(box); ov.addEventListener("click", close);
    inp.addEventListener("input", function () { query(inp.value); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); pick(Math.min(items.length - 1, sel + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); pick(Math.max(0, sel - 1)); }
      else if (e.key === "Enter") { e.preventDefault(); if (items[sel]) run(items[sel]); }
      else if (e.key === "Tab") { e.preventDefault(); inp.focus(); }
    });
    inp.value = q || ""; query(inp.value);
    requestAnimationFrame(function () { ov.classList.add("on"); box.classList.add("on"); inp.focus(); });
    window.mkFx && window.mkFx.fb("open");
  }
  function close() { if (!box) return; var b = box, o = ov; box = ov = null; b.classList.remove("on"); o.classList.remove("on"); setTimeout(function () { b.remove(); o.remove(); }, 260); try { last && last.focus && last.focus({ preventScroll: true }); } catch (e) {} }
  window.mkCmd = { open: open, close: close };
  function boot() {
    document.head.appendChild(st);
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") { e.preventDefault(); e.stopImmediatePropagation(); box ? close() : open(""); }
    }, true);
    /* móvil: pulsación larga en la lupa */
    var tm = 0, sx = 0, sy = 0, fired = false;
    document.addEventListener("pointerdown", function (e) {
      var b = e.target.closest && e.target.closest(".mk-sb"); if (!b) return; fired = false; sx = e.clientX; sy = e.clientY;
      tm = setTimeout(function () { fired = true; open(""); }, 450);
    }, true);
    document.addEventListener("pointermove", function (e) { if (tm && Math.hypot(e.clientX - sx, e.clientY - sy) > 9) { clearTimeout(tm); tm = 0; } }, true);
    ["pointerup", "pointercancel"].forEach(function (n) { document.addEventListener(n, function () { clearTimeout(tm); tm = 0; }, true); });
    document.addEventListener("click", function (e) { if (fired && e.target.closest && e.target.closest(".mk-sb")) { e.preventDefault(); e.stopImmediatePropagation(); fired = false; } }, true);
    document.addEventListener("contextmenu", function (e) { if (e.target.closest && e.target.closest(".mk-sb") && fired) e.preventDefault(); }, true);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
