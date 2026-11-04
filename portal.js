/* Portal · Menudo Kanteo
   · Botón de idioma en la cabecera (entre la lupa y la configuración)
   · Favoritos (páginas y problemas marcados con ★), guardados solo en este navegador («mk-fav»)
   · Ayuda y soporte (preguntas frecuentes, sobre el proyecto, reportar error, atajos)  */
(function () {
  "use strict";
  var LS = null, K = "mk-fav", reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  try { LS = window.localStorage; LS.getItem(K); } catch (e) { LS = null; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function base() { return (location.pathname.split("/").pop() || "index.html"); }

  /* ---------- favoritos ---------- */
  function read() { try { var a = JSON.parse(LS.getItem(K) || "[]"); return Array.isArray(a) ? a.filter(function (x) { return x && typeof x.u === "string" && typeof x.t === "string"; }).slice(0, 200) : []; } catch (e) { return []; } }
  function write(a) { try { LS.setItem(K, JSON.stringify(a.slice(0, 200))); } catch (e) {} sync(); }
  function has(u) { return read().some(function (x) { return x.u === u; }); }
  function toggle(u, title, sub) {
    var a = read(), i = -1; a.forEach(function (x, j) { if (x.u === u) i = j; });
    if (i >= 0) a.splice(i, 1); else a.unshift({ u: u, t: title, s: sub || "", d: Date.now() });
    write(a); return i < 0;
  }
  function pageTitle() { var h = document.querySelector("h1:not(.sr-only)"); var x = h && h.textContent.trim(); return x && x.length < 60 ? x : (document.title || "Menudo Kanteo").split(/\s[·|—–-]\s/)[0].trim(); }
  function pageUrl() { return base() + location.search.replace(/[?&]lang=(ca|es)\b/, "").replace(/^&/, "?") ; }
  window.mkFav = { has: has, toggle: toggle, list: read };

  /* ---------- estilos ---------- */
  var CSS = ".mkp-pop{position:fixed;z-index:420;min-width:178px;padding:6px;border-radius:16px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 84%,transparent);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 13%,transparent);box-shadow:0 22px 50px -18px #00000080,0 1px 0 #ffffff40 inset;font:500 14px/1.3 var(--sans,system-ui,sans-serif);transform-origin:top right;transform:scale(.86) translateY(-6px);opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.2,1.25,.3,1),opacity .2s}.mkp-pop.on{transform:none;opacity:1;pointer-events:auto}" +
    ".mkp-pop button{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;appearance:none;border:0;background:none;color:inherit;font:inherit;font-weight:600;text-align:left;padding:10px 12px;border-radius:11px;cursor:pointer;min-height:40px}.mkp-pop button:hover,.mkp-pop button:focus-visible{background:color-mix(in srgb,var(--fg,#111) 8%,transparent);outline:0}.mkp-pop button:active{transform:scale(.97)}.mkp-pop svg{width:16px;height:16px;flex:none;color:var(--accent,#0a60d6)}.mkp-pop small{color:var(--muted,#6c6a6a);font-weight:500;font-size:12px}" +
    ".mk-lang svg{width:18px;height:18px}.mk-lang b{position:absolute;right:-1px;bottom:-1px;font:800 8px/1 var(--mono,monospace);letter-spacing:.02em;padding:2px 3px;border-radius:5px;background:var(--fg,#111);color:var(--bg,#fff);pointer-events:none}.mk-lang{position:relative}" +
    ".mkp-ov{position:fixed;inset:0;z-index:410;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) 16px max(16px,env(safe-area-inset-bottom,0px));background:#0000;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);visibility:hidden;transition:background .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s,visibility 0s .45s}.mkp-ov.on{background:#00000059;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);visibility:visible;transition-delay:0s}" +
    ".mkp-sh{width:min(480px,100%);max-height:min(84vh,680px);display:flex;flex-direction:column;border-radius:28px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 90%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 40px 90px -30px #000000a6,0 1px 0 #ffffff40 inset;font:500 15px/1.4 var(--sans,system-ui,sans-serif);transform:translateY(24px) scale(.94);opacity:0;transition:transform .55s cubic-bezier(.2,1.15,.3,1),opacity .3s;overflow:hidden}.mkp-ov.on .mkp-sh{transform:none;opacity:1}" +
    ".mkp-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 20px 8px 24px}.mkp-hd h2{margin:0;font:800 24px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.03em}.mkp-x{appearance:none;border:0;width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);font:400 20px/1 var(--sans,system-ui);flex:none}.mkp-x:active{transform:scale(.92)}" +
    ".mkp-bd{overflow:auto;padding:4px 14px 18px;display:flex;flex-direction:column;gap:6px;overscroll-behavior:contain}.mkp-p{margin:0 10px 6px;color:var(--muted,#6c6a6a);font-size:14px}" +
    ".mkp-r{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;color:inherit;text-decoration:none;background:none;border:0;width:100%;appearance:none;text-align:left;font:inherit;cursor:pointer;min-height:56px;transition:background .2s,transform .3s cubic-bezier(.2,1.25,.3,1)}a.mkp-r:hover,button.mkp-r:hover,.mkp-r:focus-visible{background:color-mix(in srgb,var(--fg,#111) 7%,transparent);outline:0}a.mkp-r:active,button.mkp-r:active{transform:scale(.98)}" +
    ".mkp-r i{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:var(--c,#0a60d6);font-style:normal}.mkp-r i svg{width:20px;height:20px}.mkp-r span{display:flex;flex-direction:column;min-width:0;flex:1}.mkp-r b{font-weight:650;font-size:15.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkp-r small{color:var(--muted,#6c6a6a);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkp-r em{color:var(--muted,#6c6a6a);font-style:normal;font-size:20px;flex:none}" +
    ".mkp-fr{display:flex;align-items:center;gap:2px}.mkp-fr .mkp-r{flex:1;min-width:0}.mkp-rm{appearance:none;border:0;flex:none;width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:none;font:400 18px/1 var(--sans,system-ui)}.mkp-rm:hover,.mkp-rm:focus-visible{background:color-mix(in srgb,var(--fg,#111) 9%,transparent);outline:0}" +
    ".mkp-cta{margin:6px 6px 0;appearance:none;border:0;border-radius:15px;cursor:pointer;min-height:48px;font:650 15px var(--sans,system-ui);color:#fff;background:var(--accent,#0a60d6);transition:transform .3s cubic-bezier(.2,1.25,.3,1),background .2s}.mkp-cta:active{transform:scale(.97)}.mkp-cta.on{color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent)}" +
    ".mkp-em{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:26px 18px 14px;color:var(--muted,#6c6a6a)}.mkp-em svg{width:44px;height:44px;color:#ffb340}.mkp-em b{color:var(--fg,#111);font-size:17px}" +
    ".mkp-sar{appearance:none;border:1px solid var(--line,#0002);background:transparent;color:var(--muted,#6c6a6a);width:34px;height:34px;border-radius:50%;cursor:pointer;display:inline-grid;place-items:center;flex:none;margin-left:6px;vertical-align:middle;transition:transform .35s cubic-bezier(.2,1.5,.3,1),color .2s,background .2s,border-color .2s}.mkp-sar svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round}.mkp-sar:active{transform:scale(.88)}.mkp-sar[aria-pressed=true]{color:#b36b00;background:#ffb34029;border-color:#ffb340}.mkp-sar[aria-pressed=true] svg{fill:#ffb340;stroke:#e08800}" +
    ".mkp-hl{animation:mkphl 1.8s ease-out}@keyframes mkphl{0%,30%{box-shadow:0 0 0 3px #ffb340}100%{box-shadow:0 0 0 3px #ffb34000}}" +
    ".mk-mgfav small{margin-left:8px;font:700 11px/1 var(--mono,monospace);padding:3px 7px;border-radius:999px;background:#ffb34033;color:#8a5200;vertical-align:middle}" +
    "@media(max-width:420px){.hdr .ico{width:34px!important;height:34px!important;min-width:0!important}.hdr .wrap:has(.dd:not([hidden])) .logo{width:40px!important}.hdr .wrap:has(.dd:not([hidden])) .ddb{padding-inline:10px;gap:6px}.hdr .wrap:has(.dd:not([hidden])){gap:6px}.mk-lang b{right:-3px;bottom:-3px}}" +
    "@media(max-width:640px){.mkp-ov{align-items:flex-end;padding-inline:0;padding-bottom:0}.mkp-sh{border-radius:28px 28px 0 0;width:100%;max-height:88vh;padding-bottom:env(safe-area-inset-bottom,0px)}}" +
    "@media(prefers-reduced-motion:reduce){.mkp-pop,.mkp-sh,.mkp-ov{transition:opacity .2s;transform:none}.mkp-sh{transform:none}.mkp-hl{animation:none}}" +
    "@media(prefers-reduced-transparency:reduce){.mkp-pop,.mkp-sh{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}.mkp-ov.on{-webkit-backdrop-filter:none;backdrop-filter:none}}" +
    "@media(prefers-contrast:more){.mkp-pop,.mkp-sh{border:2px solid var(--fg,#111)}}@media print{.mkp-pop,.mkp-ov{display:none!important}}";
  var st = el("style"); st.textContent = CSS;
  function addCss() { document.head.appendChild(st); }

  var IC = {
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.300 6.300-3.900 9c-2.600-2.700-3.900-5.700-3.900-9S9.400 5.700 12 3z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.200l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17.200l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9z"/></svg>',
    q: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.400 9.300a2.700 2.700 0 1 1 3.800 2.500c-.8.400-1.200 1-1.200 1.900M12 17.100v.1"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5.500M12 7.700v.1"/></svg>',
    bug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8c-2.800 0-4 1.800-4 4.500S9.200 18 12 18s4-2.800 4-5.500S14.800 8 12 8zM9 8.500 7 6.500M15 8.500l2-2M8 13H4m16 0h-4M8.500 17 6 19m9.500-2 2.500 2M12 8V6.500"/></svg>',
    kb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6.500" width="18" height="11" rx="2.500"/><path d="M7 10.500h.1M10.500 10.500h.1M14 10.500h.1M17 10.500h.1M8 14h8"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.500" width="18" height="13" rx="2.500"/><path d="m4 8 8 5.500L20 8"/></svg>',
    news: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4.500" width="16" height="15" rx="2.500"/><path d="M8 9h8M8 12.500h8M8 16h4.500"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16.500V11a6 6 0 0 1 12 0v5.500l1.500 1.500h-15zM10 20.500a2.200 2.200 0 0 0 4 0"/></svg>',
    page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3.500h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z"/><path d="M14 3.500V8h4"/></svg>',
    prob: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h5M7.500 4.500v5M14 8h5M5 17h5M14 15.500l5 3M19 15.500l-5 3"/></svg>'
  };

  /* ---------- hoja (sheet) ---------- */
  var ov, sh, bd, ttl, lastFocus, open = null;
  function ensureSheet() {
    if (ov) return;
    ov = el("div", "mkp-ov"); ov.setAttribute("aria-hidden", "true");
    sh = el("div", "mkp-sh"); sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
    var hd = el("div", "mkp-hd"); ttl = el("h2"); ttl.id = "mkp-t"; sh.setAttribute("aria-labelledby", "mkp-t");
    var x = el("button", "mkp-x", "×"); x.type = "button"; x.setAttribute("aria-label", t("Cerrar", "Tanca"));
    hd.appendChild(ttl); hd.appendChild(x); bd = el("div", "mkp-bd"); sh.appendChild(hd); sh.appendChild(bd); ov.appendChild(sh); document.body.appendChild(ov);
    x.addEventListener("click", closeSheet);
    ov.addEventListener("pointerdown", function (e) { if (e.target === ov) closeSheet(); });
    addEventListener("keydown", function (e) {
      if (!open) return;
      if (e.key === "Escape") { e.preventDefault(); closeSheet(); }
      if (e.key === "Tab") {
        var f = [].slice.call(sh.querySelectorAll("a[href],button:not([disabled])")).filter(function (n) { return n.offsetParent !== null; });
        if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    });
  }
  function openSheet(kind) {
    ensureSheet(); open = kind; lastFocus = document.activeElement;
    render(); ov.setAttribute("aria-hidden", "false"); ov.getBoundingClientRect(); ov.classList.add("on");
    setTimeout(function () { var f = sh.querySelector(".mkp-x"); f && f.focus({ preventScroll: true }); }, 60);
  }
  function closeSheet() {
    if (!open) return; open = null; ov.classList.remove("on"); ov.setAttribute("aria-hidden", "true");
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  function row(href, ic, c, title, sub, extra) {
    return '<a class="mkp-r" href="' + esc(href) + '"' + (extra || "") + '><i style="--c:' + c + '">' + IC[ic] + "</i><span><b>" + esc(title) + "</b><small>" + esc(sub) + "</small></span><em aria-hidden=\"true\">›</em></a>";
  }
  function render() {
    if (open === "fav") renderFav(); else if (open === "help") renderHelp();
  }
  function renderFav() {
    var a = read(), u = pageUrl(), on = has(u), h = "";
    ttl.textContent = t("Favoritos", "Favorits");
    if (!a.length) h += '<div class="mkp-em">' + IC.star + "<b>" + t("Aún no tienes favoritos", "Encara no tens favorits") + "</b><span>" + t("Guarda esta página o marca con ★ los problemas que quieras repasar.", "Desa aquesta pàgina o marca amb ★ els problemes que vulguis repassar.") + "</span></div>";
    else {
      h += '<p class="mkp-p">' + a.length + " " + (a.length === 1 ? t("guardado", "desat") : t("guardados", "desats")) + "</p>";
      a.forEach(function (x, i) {
        var prob = /[?&]p=/.test(x.u);
        h += '<div class="mkp-fr"><a class="mkp-r" href="' + esc(MKL_url(x.u)) + '"><i style="--c:' + (prob ? "#ff9f0a" : "#0a84ff") + '">' + IC[prob ? "prob" : "page"] + "</i><span><b>" + esc(x.t) + "</b><small>" + esc(x.s || x.u.split(/[?#]/)[0]) + '</small></span></a><button type="button" class="mkp-rm" data-i="' + i + '" aria-label="' + t("Quitar de favoritos", "Treu dels favorits") + ": " + esc(x.t) + '">×</button></div>';
      });
    }
    h += '<button type="button" class="mkp-cta' + (on ? " on" : "") + '" data-cur>' + (on ? t("Quitar esta página de favoritos", "Treu aquesta pàgina dels favorits") : t("Guardar esta página", "Desa aquesta pàgina") + ": " + pageTitle()) + "</button>";
    bd.innerHTML = h;
  }
  function renderHelp() {
    ttl.textContent = t("Ayuda y soporte", "Ajuda i suport");
    bd.innerHTML = '<p class="mkp-p">' + t("Todo lo que necesitas si algo no queda claro.", "Tot el que necessites si alguna cosa no queda clara.") + "</p>" +
      row(MKL_url("preguntes.html"), "q", "#0a84ff", t("Preguntas frecuentes", "Preguntes freqüents"), t("Respuestas rápidas sobre el portal", "Respostes ràpides sobre el portal")) +
      row(MKL_url("sobre.html"), "info", "#30b0c7", t("Sobre el proyecto", "Sobre el projecte"), t("Quién hay detrás y cómo funciona", "Qui hi ha al darrere i com funciona")) +
      '<button type="button" class="mkp-r" data-act="err"><i style="--c:#ff453a">' + IC.bug + "</i><span><b>" + t("Reportar un error", "Reporta un error") + "</b><small>" + t("¿Algo no va bien? Cuéntanoslo", "Alguna cosa no va bé? Explica-ho") + "</small></span><em aria-hidden=\"true\">›</em></button>" +
      '<button type="button" class="mkp-r" data-act="kb"><i style="--c:#8e8e93">' + IC.kb + "</i><span><b>" + t("Atajos de teclado", "Dreceres de teclat") + "</b><small>" + t("Navega más rápido", "Navega més ràpid") + "</small></span><em aria-hidden=\"true\">›</em></button>" +
      row("mailto:menudokanteo@outlook.com", "mail", "#34c759", t("Escríbenos", "Escriu-nos"), "menudokanteo@outlook.com");
  }
  function MKL_url(u) { return window.MKL && MKL.url ? MKL.url(u) : u; }
  document.addEventListener("click", function (e) {
    var tg = e.target;
    if (!tg.closest) return;
    var fav = tg.closest(".mk-mgfav"), help = tg.closest(".mk-mghelp");
    if (fav || help) { var m = document.querySelector(".mk-mg"); if (m && m.getAttribute("aria-expanded") === "true") m.click(); setTimeout(function () { openSheet(fav ? "fav" : "help"); }, 80); return; }
    if (!open) return;
    var rm = tg.closest(".mkp-rm"), cur = tg.closest("[data-cur]"), act = tg.closest("[data-act]");
    if (rm) { var a = read(); a.splice(+rm.getAttribute("data-i"), 1); write(a); renderFav(); var f = bd.querySelector(".mkp-rm,.mkp-cta"); f && f.focus(); }
    else if (cur) { toggle(pageUrl(), pageTitle(), ""); renderFav(); var c = bd.querySelector("[data-cur]"); c && c.focus(); }
    else if (act) {
      var k = act.getAttribute("data-act"); closeSheet();
      setTimeout(function () {
        if (k === "kb") window.mkKb && window.mkKb.open();
        else { var r = document.querySelector('[data-rp="error"]'); r && r.click(); }
      }, 120);
    }
  });

  /* contador junto a «Favorits» */
  function sync() {
    var b = document.querySelector(".mk-mgfav"); if (!b) return;
    var n = read().length, s = b.querySelector("small");
    if (n) { if (!s) { s = el("small"); b.appendChild(s); } s.textContent = n; } else if (s) s.remove();
    b.querySelector("span") && (b.querySelector("span").textContent = t("Favoritos", "Favorits"));
    var h = document.querySelector(".mk-mghelp span"); h && (h.textContent = t("Ayuda y soporte", "Ajuda i suport"));
    [].forEach.call(document.querySelectorAll(".mkp-sar"), function (s0) { s0.setAttribute("aria-pressed", String(has(s0.getAttribute("data-u")))); });
  }

  /* ---------- ★ en los problemas ---------- */
  function stars() {
    [].forEach.call(document.querySelectorAll(".prob[data-pid]:not([data-mkp])"), function (p) {
      p.setAttribute("data-mkp", "1");
      var h3 = p.querySelector("header h3"), pk = p.querySelector(".pk"); if (!h3) return;
      var pid = p.getAttribute("data-pid"), u = base() + "?p=" + encodeURIComponent(pid) + (location.hash && !/^#pau$/.test(location.hash) ? location.hash : "");
      var title = [].map.call(h3.children, function (c) { return c.classList.contains("mkp-sar") ? "" : c.textContent; }).join(" ").replace(/\s+/g, " ").trim(), sub = pk ? pk.textContent.replace(/\s+/g, " ").trim() : "";
      var b = el("button", "mkp-sar", IC.star); b.type = "button"; b.setAttribute("data-u", u);
      b.setAttribute("aria-label", t("Marcar como favorito", "Marca com a favorit")); b.setAttribute("aria-pressed", String(has(u)));
      b.addEventListener("click", function (ev) { ev.preventDefault(); ev.stopPropagation(); var on = toggle(u, title, sub); b.setAttribute("aria-pressed", String(on)); });
      h3.appendChild(b);
    });
  }
  function deep() {
    var m = /[?&]p=([^&#]+)/.exec(location.search); if (!m) return;
    var pid = decodeURIComponent(m[1]), tries = 0;
    (function look() {
      var p = null; [].forEach.call(document.querySelectorAll(".prob[data-pid]"), function (x) { if (x.getAttribute("data-pid") === pid) p = x; });
      if (p) { p.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" }); p.classList.add("mkp-hl"); return; }
      if (++tries < 40) setTimeout(look, 250);
    })();
  }

  /* ---------- idioma ---------- */
  var pop, langBtn;
  function langInit() {
    var gear = document.querySelector(".mk-gear");
    if (!gear || document.querySelector(".mk-lang")) return !!gear;
    langBtn = el("button", "ico mk-lang", IC.globe + "<b>" + (es() ? "ES" : "CA") + "</b>"); langBtn.type = "button";
    langBtn.setAttribute("aria-haspopup", "menu"); langBtn.setAttribute("aria-expanded", "false"); langBtn.setAttribute("aria-label", t("Idioma: Castellano", "Idioma: Català")); langBtn.title = t("Idioma", "Idioma");
    gear.parentNode.insertBefore(langBtn, gear);
    pop = el("div", "mkp-pop"); pop.setAttribute("role", "menu"); pop.setAttribute("aria-label", t("Idioma", "Idioma"));
    var cur = es() ? "es" : "ca";
    pop.innerHTML = [["ca", "Català", "Valencià · Catalan"], ["es", "Castellano", "Español"]].map(function (l) {
      return '<button type="button" role="menuitemradio" aria-checked="' + (l[0] === cur) + '" data-l="' + l[0] + '"><span>' + l[1] + "</span>" + (l[0] === cur ? IC.check : "") + "</button>";
    }).join("");
    document.body.appendChild(pop);
    langBtn.addEventListener("click", function (e) { e.stopPropagation(); pop.classList.contains("on") ? closePop() : openPop(); });
    pop.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-l]"); if (!b) return;
      var l = b.getAttribute("data-l"); closePop();
      if (l !== cur && window.MKL && MKL.set) MKL.set(l);
    });
    pop.addEventListener("keydown", function (e) {
      var bs = [].slice.call(pop.querySelectorAll("button")), i = bs.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); bs[(i + bs.length - 1) % bs.length].focus(); }
    });
    document.addEventListener("pointerdown", function (e) { if (pop.classList.contains("on") && !pop.contains(e.target) && !langBtn.contains(e.target)) closePop(); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && pop.classList.contains("on")) { closePop(); langBtn.focus(); } });
    addEventListener("resize", closePop); addEventListener("scroll", closePop, { passive: true });
    return true;
  }
  function openPop() {
    var r = langBtn.getBoundingClientRect();
    pop.style.top = Math.round(r.bottom + 8) + "px"; pop.style.right = Math.max(12, Math.round(innerWidth - r.right)) + "px";
    pop.getBoundingClientRect(); pop.classList.add("on"); langBtn.setAttribute("aria-expanded", "true");
    var c = pop.querySelector('[aria-checked="true"]'); c && c.focus({ preventScroll: true });
  }
  function closePop() { if (!pop || !pop.classList.contains("on")) return; pop.classList.remove("on"); langBtn.setAttribute("aria-expanded", "false"); }


  /* ---------- «Más del portal» dentro de Configuración (también en móvil) ---------- */
  function portalSec() {
    var body = document.querySelector(".mk-gp .mk-gbody");
    if (!body || body.querySelector(".mkp-sec")) return !!body;
    var sec = el("section", "mk-g mkp-sec");
    sec.innerHTML = "<h3>" + t("Más del portal", "Més del portal") + '</h3><div class="mk-gc">' +
      row(MKL_url("revista.html"), "news", "#ff375f", t("Revista", "Revista"), t("Artículos y curiosidades", "Articles i curiositats")) +
      row(MKL_url("novetats.html"), "bell", "#0a84ff", t("Novedades y avisos", "Novetats i avisos"), t("Lo último del portal", "Lo darrer del portal")) +
      '<button type="button" class="mkp-r" data-gs="fav"><i style="--c:#ff9f0a">' + IC.star + "</i><span><b>" + t("Favoritos", "Favorits") + "</b><small>" + t("Tus páginas y problemas marcados", "Les teves pàgines i problemes marcats") + '</small></span><em aria-hidden="true">›</em></button>' +
      '<button type="button" class="mkp-r" data-gs="help"><i style="--c:#30b0c7">' + IC.q + "</i><span><b>" + t("Ayuda y soporte", "Ajuda i suport") + "</b><small>" + t("Preguntas, el proyecto y contacto", "Preguntes, el projecte i contacte") + '</small></span><em aria-hidden="true">›</em></button></div>';
    var rc = body.querySelector(".mkst-sec");
    body.insertBefore(sec, rc ? rc.nextSibling : body.firstChild);
    sec.addEventListener("click", function (e) {
      var b = e.target.closest("[data-gs]"); if (!b) return;
      var x = document.querySelector(".mk-gp .mk-gtop button"); x && x.click();
      setTimeout(function () { openSheet(b.getAttribute("data-gs")); }, 120);
    });
    return true;
  }

  /* ---------- arranque ---------- */
  function boot() {
    addCss(); sync();
    if (!portalSec()) { var mo3 = new MutationObserver(function () { if (portalSec()) mo3.disconnect(); }); mo3.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo3.disconnect(); }, 8000); }
    if (!langInit()) { var mo = new MutationObserver(function () { if (langInit()) { mo.disconnect(); sync(); } }); mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 6000); }
    if (document.getElementById("cl-list") || /mates|fisica|problemes/.test(base())) {
      stars(); var q = 0, mo2 = new MutationObserver(function () { if (!q) q = requestAnimationFrame(function () { q = 0; stars(); }); });
      mo2.observe(document.body, { childList: true, subtree: true }); deep();
    }
    var mg = new MutationObserver(function () { sync(); }); mg.observe(document.body, { childList: true }); setTimeout(sync, 400); setTimeout(sync, 1500);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
