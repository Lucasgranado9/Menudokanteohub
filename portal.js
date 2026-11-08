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

  /* ---------- favoritos / marcadores ---------- */
  var KL = "mk-pos";
  function norm(a) { return Array.isArray(a) ? a.filter(function (x) { return x && typeof x.u === "string" && typeof x.t === "string"; }).slice(0, 300) : []; }
  function read() { try { return norm(JSON.parse(LS.getItem(K) || "[]")); } catch (e) { return []; } }
  function write(a) { try { LS.setItem(K, JSON.stringify(a.slice(0, 300))); } catch (e) {} sync(); if (open === "fav") renderFav(); }
  function has(u) { return read().some(function (x) { return x.u === u; }); }
  function kind(x) { return x.k || (/[?&]p=/.test(x.u) ? "prob" : "page"); }
  function toggle(u, title, sub, k) {
    var a = read(), i = -1; a.forEach(function (x, j) { if (x.u === u) i = j; });
    if (i >= 0) a.splice(i, 1); else a.unshift({ u: u, t: title, s: sub || "", d: Date.now(), k: k || "page" });
    write(a); return i < 0;
  }
  function pageTitle() { var h = document.querySelector("h1:not(.sr-only)"); var x = h && h.textContent.trim(); return x && x.length < 60 ? x : (document.title || "Menudo Kanteo").split(/\s[·|—–-]\s/)[0].trim(); }
  function qs() { return location.search.replace(/([?&])(lang|mky)=[^&]*&?/g, "$1").replace(/[?&]$/, ""); }
  function pageUrl() { var h = location.hash; if (/^#(pau)?$/.test(h)) h = ""; return base() + qs() + h; }
  function doc() { return Math.max(1, document.documentElement.scrollHeight - innerHeight); }
  function frac() { return Math.max(0, Math.min(1, scrollY / doc())); }
  function nearest() {
    var best = null, lim = innerHeight * .4;
    [].forEach.call(document.querySelectorAll("main h2[id],main h3[id],main section[id],main article[id],#view h2[id],#view h3[id]"), function (h) { var r = h.getBoundingClientRect(); if (r.top <= lim && r.height > 0) best = h; });
    return best;
  }
  function ago(ts) {
    var d = (Date.now() - ts) / 1000, f;
    try { f = new Intl.RelativeTimeFormat(es() ? "es" : "ca", { numeric: "auto" }); } catch (e) { return ""; }
    if (d < 60) return f.format(0, "second"); if (d < 3600) return f.format(-Math.round(d / 60), "minute"); if (d < 86400) return f.format(-Math.round(d / 3600), "hour"); if (d < 2592000) return f.format(-Math.round(d / 86400), "day"); return f.format(-Math.round(d / 2592000), "month");
  }
  function haptic(n) { try { window.mkFx && window.mkFx.fb(typeof n === "string" ? n : n === 12 ? "swipe" : n === 6 ? "tap" : "fav"); } catch (e) {} }
  function readLast() { try { var a = JSON.parse(LS.getItem(KL) || "[]"); return Array.isArray(a) ? a.filter(function (x) { return x && typeof x.u === "string"; }) : []; } catch (e) { return []; } }
  var lt = 0;
  function track() {
    if (lt) return; lt = setTimeout(function () {
      lt = 0; var f = frac(); if (base() === "index.html" || f < .04 || document.hidden) return;
      var u = pageUrl(), a = readLast().filter(function (x) { return x.u !== u; });
      a.unshift({ u: u, t: pageTitle(), y: +f.toFixed(3), ts: Date.now() }); try { LS.setItem(KL, JSON.stringify(a.slice(0, 5))); } catch (e) {}
    }, 900);
  }
  function mark() {
    var h = nearest(), f = frac(), u, title, sub = pageTitle();
    if (h) { u = base() + qs() + "#" + h.id; title = (h.querySelector("h1,h2,h3") || h).textContent.replace(/\s+/g, " ").trim().slice(0, 90) || sub; }
    else { u = base() + qs() + (qs() ? "&" : "?") + "mky=" + f.toFixed(3) + (/^#(pau)?$/.test(location.hash) ? "" : location.hash); title = sub + " · " + Math.round(f * 100) + " %"; }
    var a = read(); a = a.filter(function (x) { return x.u !== u; }); a.unshift({ u: u, t: title, s: sub, d: Date.now(), k: "mark" }); write(a); haptic("mark");
    note(t("Punto guardado", "Punt desat") + " · " + title, t("Ver", "Veure"), function () { openSheet("fav"); });
  }
  window.mkFav = { has: has, toggle: toggle, list: read, mark: mark, open: function (k) { openSheet(k || "fav"); }, page: function () { var on = toggle(pageUrl(), pageTitle(), "", "page"); haptic(on ? "fav" : "unfav"); note(on ? t("Página guardada", "Pàgina desada") : t("Quitada de favoritos", "Treta dels favorits")); return on; }, last: readLast };

  /* ---------- aviso flotante ---------- */
  var nt, ntt;
  function note(msg, label, fn) {
    if (!nt) { nt = el("div", "mkp-tt"); nt.setAttribute("role", "status"); nt.setAttribute("aria-live", "polite"); document.body.appendChild(nt); }
    clearTimeout(ntt); nt.innerHTML = "<span></span>" + (label ? '<button type="button"></button>' : ""); nt.firstChild.textContent = msg;
    if (label) { var b = nt.querySelector("button"); b.textContent = label; b.onclick = function () { nt.classList.remove("on"); fn && fn(); }; }
    (open ? ov : document.body).appendChild(nt); nt.getBoundingClientRect(); nt.classList.add("on"); ntt = setTimeout(function () { nt.classList.remove("on"); }, label ? 5200 : 2400);
  }

  /* ---------- estilos ---------- */
  var CSS = ".mkp-pop{position:fixed;z-index:420;min-width:178px;padding:6px;border-radius:16px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 84%,transparent);-webkit-backdrop-filter:blur(26px) saturate(180%);backdrop-filter:blur(26px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 13%,transparent);box-shadow:0 22px 50px -18px #00000080,0 1px 0 #ffffff40 inset;font:500 14px/1.3 var(--sans,system-ui,sans-serif);transform-origin:top right;transform:scale(.86) translateY(-6px);opacity:0;pointer-events:none;transition:transform .45s cubic-bezier(.2,1.25,.3,1),opacity .2s}.mkp-pop.on{transform:none;opacity:1;pointer-events:auto}" +
    ".mkp-pop button{display:flex;align-items:center;justify-content:space-between;gap:14px;width:100%;appearance:none;border:0;background:none;color:inherit;font:inherit;font-weight:600;text-align:left;padding:10px 12px;border-radius:11px;cursor:pointer;min-height:40px}.mkp-pop button:hover,.mkp-pop button:focus-visible{background:color-mix(in srgb,var(--fg,#111) 8%,transparent);outline:0}.mkp-pop button:active{transform:scale(.97)}.mkp-pop svg{width:16px;height:16px;flex:none;color:var(--accent,#0a60d6)}.mkp-pop small{color:var(--muted,#6c6a6a);font-weight:500;font-size:12px}" +
    ".mk-lang svg{width:18px;height:18px}.mk-lang b{position:absolute;right:-1px;bottom:-1px;font:800 8px/1 var(--mono,monospace);letter-spacing:.02em;padding:2px 3px;border-radius:5px;background:var(--fg,#111);color:var(--bg,#fff);pointer-events:none}.mk-lang{position:relative}" +
    ".mkp-ov{position:fixed;inset:0;z-index:410;display:flex;align-items:center;justify-content:center;padding:max(16px,env(safe-area-inset-top,0px)) 16px max(16px,env(safe-area-inset-bottom,0px));background:#0000;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);visibility:hidden;transition:background .35s,backdrop-filter .35s,-webkit-backdrop-filter .35s,visibility 0s .45s}.mkp-ov.on{background:#00000059;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);visibility:visible;transition-delay:0s}" +
    ".mkp-sh{width:min(480px,100%);max-height:min(84vh,680px);display:flex;flex-direction:column;border-radius:28px;color:var(--fg,#111);background:color-mix(in srgb,var(--bg,#fff) 90%,transparent);-webkit-backdrop-filter:blur(30px) saturate(180%);backdrop-filter:blur(30px) saturate(180%);border:1px solid color-mix(in srgb,var(--fg,#111) 12%,transparent);box-shadow:0 40px 90px -30px #000000a6,0 1px 0 #ffffff40 inset;font:500 15px/1.4 var(--sans,system-ui,sans-serif);transform:translateY(24px) scale(.94);opacity:0;transition:transform .55s cubic-bezier(.2,1.15,.3,1),opacity .3s;overflow:hidden}.mkp-ov.on .mkp-sh{transform:none;opacity:1}" +
    ".mkp-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 20px 8px 24px}.mkp-hd h2{margin:0;font:800 24px/1.1 var(--disp,var(--sans,inherit));letter-spacing:-.03em}.mkp-x{appearance:none;border:0;width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);font:400 20px/1 var(--sans,system-ui);flex:none}.mkp-x:active{transform:scale(.92)}" +
    ".mkp-bd{overflow:auto;padding:4px 14px 18px;display:flex;flex-direction:column;gap:6px;overscroll-behavior:contain}.mkp-p{margin:0 10px 6px;color:var(--muted,#6c6a6a);font-size:14px}" +
    ".mk-gp .mkp-sec .mkp-r,.mk-gp .mkp-sec .mkp-r b,.mk-gp .mkp-sec .mkp-r small,.mk-gp .mkp-sec .mkp-r em{text-transform:none!important;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',var(--sans,system-ui),sans-serif!important;font-style:normal;font-variant:normal}.mk-gp .mkp-sec .mkp-r{color:var(--fg,#111)!important;letter-spacing:0!important;font-weight:400!important;opacity:1!important}.mk-gp .mkp-sec .mkp-r b{color:var(--fg,#111)!important;font-weight:600!important;font-size:15.5px!important;letter-spacing:-.012em!important;line-height:1.25}.mk-gp .mkp-sec .mkp-r small{color:var(--muted,#6c6a6a)!important;font-weight:400!important;font-size:13px!important;letter-spacing:-.003em!important;line-height:1.3}" +
    ".mkp-r{display:flex;align-items:center;gap:12px;padding:10px;border-radius:16px;color:inherit;text-decoration:none;background:none;border:0;width:100%;appearance:none;text-align:left;font:inherit;cursor:pointer;min-height:56px;transition:background .2s,transform .3s cubic-bezier(.2,1.25,.3,1)}a.mkp-r:hover,button.mkp-r:hover,.mkp-r:focus-visible{background:color-mix(in srgb,var(--fg,#111) 7%,transparent);outline:0}a.mkp-r:active,button.mkp-r:active{transform:scale(.98)}" +
    ".mkp-r i{flex:none;width:38px;height:38px;border-radius:12px;display:grid;place-items:center;color:#fff;background:var(--c,#0a60d6);font-style:normal}.mkp-r i svg{width:20px;height:20px}.mkp-r span{display:flex;flex-direction:column;min-width:0;flex:1}.mkp-r b{font-weight:650;font-size:15.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkp-r small{color:var(--muted,#6c6a6a);font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkp-r em{color:var(--muted,#6c6a6a);font-style:normal;font-size:20px;flex:none}" +
    ".mkp-fr{display:flex;align-items:center;gap:2px}.mkp-fr .mkp-r{flex:1;min-width:0}.mkp-rm{appearance:none;border:0;flex:none;width:34px;height:34px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:none;font:400 18px/1 var(--sans,system-ui)}.mkp-rm:hover,.mkp-rm:focus-visible{background:color-mix(in srgb,var(--fg,#111) 9%,transparent);outline:0}" +
    ".mkp-cta{margin:6px 6px 0;appearance:none;border:0;border-radius:15px;cursor:pointer;min-height:48px;font:650 15px var(--sans,system-ui);color:#fff;background:var(--accent,#0a60d6);transition:transform .3s cubic-bezier(.2,1.25,.3,1),background .2s}.mkp-cta:active{transform:scale(.97)}.mkp-cta.on{color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent)}" +
    ".mkp-em{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:26px 18px 14px;color:var(--muted,#6c6a6a)}.mkp-em svg{width:44px;height:44px;color:#ffb340}.mkp-em b{color:var(--fg,#111);font-size:17px}" +
    ".mkp-sar{appearance:none;border:1px solid var(--line,#0002);background:transparent;color:var(--muted,#6c6a6a);width:34px;height:34px;border-radius:50%;cursor:pointer;display:inline-grid;place-items:center;flex:none;margin-left:6px;vertical-align:middle;transition:transform .35s cubic-bezier(.2,1.5,.3,1),color .2s,background .2s,border-color .2s}.mkp-sar svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round}.mkp-sar:active{transform:scale(.88)}.mkp-sar[aria-pressed=true]{color:#b36b00;background:#ffb34029;border-color:#ffb340}.mkp-sar[aria-pressed=true] svg{fill:#ffb340;stroke:#e08800}" +
    ".mkp-sar{position:relative}.mkp-sar:after{content:'';position:absolute;inset:-2px;border-radius:50%;border:2px solid #ffb340;opacity:0;transform:scale(.6);pointer-events:none}.mkp-sar:before{content:'';position:absolute;inset:-6px}.mkp-sar.mkp-hit svg{animation:mkpPop .6s cubic-bezier(.2,1.4,.3,1)}.mkp-sar.mkp-hit:after{animation:mkpRing .55s ease-out}@keyframes mkpPop{0%{transform:scale(1)}35%{transform:scale(1.5) rotate(-14deg)}70%{transform:scale(.92) rotate(4deg)}100%{transform:scale(1)}}@keyframes mkpRing{0%{opacity:.9;transform:scale(.7)}100%{opacity:0;transform:scale(1.7)}}" +
    ".mkp-sst{width:30px;height:30px;margin-left:10px;vertical-align:.12em;opacity:.7}.mkp-sst:hover,.mkp-sst:focus-visible,.mkp-sst[aria-pressed=true]{opacity:1}.mkp-sst svg{width:16px;height:16px}.mkp-sar:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}@media(prefers-reduced-motion:reduce){.mkp-sar.mkp-pop svg,.mkp-sar.mkp-hit:after{animation:none}}" +
    "@media(prefers-color-scheme:dark){:root:not([data-theme=light]) .mkp-fb button.on,:root:not([data-theme=light]) .mkp-sar[aria-pressed=true]{color:#ffcf70}:root:not([data-theme=light]) .mkp-sar[aria-pressed=true] svg{fill:#ffb340;stroke:#ffcf70}}:root[data-theme=dark] .mkp-fb button.on,:root[data-theme=dark] .mkp-sar[aria-pressed=true]{color:#ffcf70}:root[data-theme=dark] .mkp-sar[aria-pressed=true] svg{fill:#ffb340;stroke:#ffcf70}" +
    ".mkp-sub{flex:none;display:none;flex-direction:column;gap:10px;padding:2px 16px 10px}.mkp-sub.on{display:flex}.mkp-q{position:relative}.mkp-q input{width:100%;min-height:40px;border-radius:12px;border:0;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);color:inherit;padding:0 12px 0 36px;font:500 15px var(--sans,system-ui);outline:0}.mkp-q input:focus-visible{box-shadow:0 0 0 2px var(--accent,#0a60d6)}.mkp-q svg{position:absolute;left:11px;top:50%;width:16px;height:16px;transform:translateY(-50%);color:var(--muted,#6c6a6a);pointer-events:none}.mkp-sg{position:relative;display:flex;padding:3px;border-radius:999px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);isolation:isolate}.mkp-sg i{position:absolute;z-index:-1;top:3px;bottom:3px;left:0;width:var(--w,0);transform:translate(var(--x,0));border-radius:999px;background:var(--bg,#fff);box-shadow:0 1px 3px #0000002e,0 4px 10px -6px #0000004d;transition:transform .45s cubic-bezier(.3,1.25,.5,1),width .45s cubic-bezier(.3,1.25,.5,1)}.mkp-sg button{flex:1;appearance:none;border:0;background:none;color:var(--muted,#6c6a6a);font:600 13px/1 var(--sans,system-ui);padding:8px 6px;border-radius:999px;cursor:pointer;min-height:34px;white-space:nowrap}.mkp-sg button[aria-checked=true]{color:var(--fg,#111)}" +
    ".mkp-ft{flex:none;display:none;flex-direction:column;gap:8px;padding:10px 16px calc(14px + env(safe-area-inset-bottom,0px));border-top:1px solid color-mix(in srgb,var(--fg,#111) 9%,transparent)}.mkp-ft.on{display:flex}.mkp-fb{display:grid;grid-template-columns:1fr 1fr;gap:8px}.mkp-fb button{appearance:none;border:0;border-radius:14px;min-height:46px;font:650 14.5px var(--sans,system-ui);cursor:pointer;color:var(--fg,#111);background:color-mix(in srgb,var(--fg,#111) 9%,transparent);display:inline-flex;gap:7px;align-items:center;justify-content:center;transition:transform .3s cubic-bezier(.2,1.25,.3,1),background .2s}.mkp-fb button svg{width:17px;height:17px;flex:none}.mkp-fb button.p{color:#fff;background:#0a60d6}.mkp-fb button.on{background:#ffb34033;color:#8a5200}.mkp-fb button:active{transform:scale(.96)}.mkp-fl{display:flex;justify-content:center;gap:18px}.mkp-fl button{appearance:none;border:0;background:none;color:var(--muted,#6c6a6a);font:600 12.5px var(--sans,system-ui);padding:6px 4px;cursor:pointer;min-height:30px}.mkp-fl button:hover{color:var(--fg,#111)}" +
    ".mkp-sec{margin:10px 8px 2px;font:700 11px var(--mono,monospace);letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#6c6a6a)}.mkp-cont{display:flex;align-items:center;gap:12px;margin:4px 2px 6px;padding:12px 14px;border-radius:20px;color:#fff;text-decoration:none;background:linear-gradient(135deg,#0a84ff,#5e5ce6);box-shadow:0 14px 30px -18px #0a84ff;transition:transform .35s cubic-bezier(.2,1.25,.3,1)}.mkp-cont:active{transform:scale(.97)}.mkp-cont:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}.mkp-cont span{display:flex;flex-direction:column;min-width:0;flex:1}.mkp-cont small{font:700 10.5px var(--mono,monospace);letter-spacing:.08em;text-transform:uppercase;opacity:.88}.mkp-cont b{font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mkp-cont em{font-style:normal;font:700 13px var(--mono,monospace);background:#ffffff2e;padding:5px 9px;border-radius:999px}" +
    ".mkp-sw{position:relative;border-radius:16px;overflow:hidden;touch-action:pan-y}.mkp-ac{position:absolute;inset:0;display:flex;align-items:center;padding:0 22px;font:700 13px var(--sans,system-ui);color:#fff;opacity:0}.mkp-ac.l{background:#ff9f0a;justify-content:flex-start}.mkp-ac.r{background:#ff453a;justify-content:flex-end}.mkp-sw.dl .mkp-ac.l,.mkp-sw.dr .mkp-ac.r{opacity:1}.mkp-sw.dl .mkp-ra,.mkp-sw.dr .mkp-ra,.mkp-sw.dl .mkp-pnb,.mkp-sw.dr .mkp-pnb{opacity:0!important}.mkp-sc{-webkit-user-drag:none;position:relative;background:var(--bg,#fff);will-change:transform;touch-action:pan-y;user-select:none;-webkit-user-select:none}.mkp-sw.go{transition:height .35s cubic-bezier(.3,1.1,.4,1),opacity .25s,margin .35s}.mkp-sw .mkp-sc.sn{transition:transform .5s cubic-bezier(.2,1.25,.3,1)}" +
    ".mkp-sw .mkp-r{padding-right:46px}.mkp-ra{position:absolute;top:50%;transform:translateY(-50%);right:8px;display:flex;gap:2px;opacity:0;transition:opacity .2s}@media(hover:none){.mkp-ra{pointer-events:none}}.mkp-sw:focus-within .mkp-ra{opacity:1;pointer-events:auto}@media(hover:hover){.mkp-sw:hover .mkp-ra{opacity:1;pointer-events:auto}.mkp-sw:hover .mkp-pnb{opacity:0}}.mkp-ra button{appearance:none;border:0;width:30px;height:30px;border-radius:50%;cursor:pointer;color:var(--muted,#6c6a6a);background:color-mix(in srgb,var(--fg,#111) 8%,transparent);display:grid;place-items:center}.mkp-ra button:hover,.mkp-ra button:focus-visible{color:var(--fg,#111);outline:0;background:color-mix(in srgb,var(--fg,#111) 15%,transparent)}.mkp-ra svg{width:15px;height:15px}.mkp-pnb{position:absolute;right:12px;top:10px;color:#ff9f0a;width:14px;height:14px;pointer-events:none}.mkp-pnb svg{width:14px;height:14px;fill:currentColor}.mkp-sw:focus-within .mkp-pnb{opacity:0}" +
    ".mkp-tt{position:fixed;z-index:440;left:50%;bottom:calc(84px + env(safe-area-inset-bottom,0px));max-width:min(92vw,440px);display:flex;align-items:center;gap:14px;padding:11px 12px 11px 18px;border-radius:999px;background:#1c1c1e;color:#f5f5f7;font:600 13.5px/1.3 var(--sans,system-ui);box-shadow:0 16px 40px -12px #000000a0;transform:translate(-50%,160%);opacity:0;pointer-events:none;transition:transform .55s cubic-bezier(.2,1.2,.3,1),opacity .25s}.mkp-tt.on{transform:translate(-50%,0);opacity:1;pointer-events:auto}.mkp-tt span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.mkp-tt button{flex:none;appearance:none;border:0;border-radius:999px;padding:7px 14px;font:700 13px var(--sans,system-ui);color:#0a1830;background:#7fb8ff;cursor:pointer}.mkp-ov .mkp-tt{position:absolute;bottom:calc(20px + env(safe-area-inset-bottom,0px))}" +
    "@media(min-width:641px){.mkp-tt{bottom:28px}}@media(prefers-reduced-motion:reduce){.mkp-tt,.mkp-sg i,.mkp-sw .mkp-sc.sn{transition:opacity .2s}}" +
    ".mkp-hl{animation:mkphl 1.8s ease-out}@keyframes mkphl{0%,30%{box-shadow:0 0 0 3px #ffb340}100%{box-shadow:0 0 0 3px #ffb34000}}" +
    ".mk-mgfav small{margin-left:8px;font:700 11px/1 var(--mono,monospace);padding:3px 7px;border-radius:999px;background:#ffb34033;color:#8a5200;vertical-align:middle}" +
    "@media(max-width:420px){.hdr .ico{width:34px!important;height:34px!important;min-width:0!important}.hdr .wrap:has(.dd:not([hidden])) .logo{width:40px!important}.hdr .wrap:has(.dd:not([hidden])) .ddb{padding-inline:10px;gap:6px}.hdr .wrap:has(.dd:not([hidden])){gap:6px}.mk-lang b{right:-3px;bottom:-3px}}" +
    "@media(max-width:340px){.hdr .ico{width:30px!important;height:30px!important}.hdr .wrap{gap:4px!important}.hdr .wrap:has(.dd:not([hidden])) .logo{width:30px!important}.hdr .wrap:has(.dd:not([hidden])) .ddb{padding-inline:8px;gap:4px;font-size:13px}.hdr .wrap:has(.dd:not([hidden])) .mk-bk{display:none}}" +
    "@media(max-width:640px){.mkp-ov{align-items:flex-end;padding-inline:0;padding-bottom:0}.mkp-sh{border-radius:28px 28px 0 0;width:100%;max-height:88vh;padding-bottom:env(safe-area-inset-bottom,0px)}}" +
    "@media(prefers-reduced-motion:reduce){.mkp-pop,.mkp-sh,.mkp-ov{transition:opacity .2s;transform:none}.mkp-sh{transform:none}.mkp-hl{animation:none}}" +
    "@media(prefers-reduced-transparency:reduce){.mkp-pop,.mkp-sh{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}.mkp-ov.on{-webkit-backdrop-filter:none;backdrop-filter:none}}" +
    "@media(prefers-contrast:more){.mkp-pop,.mkp-sh{border:2px solid var(--fg,#111)}}@media print{.mkp-pop,.mkp-ov{display:none!important}}";
  var st = el("style"); st.textContent = CSS;
  function addCss() { document.head.appendChild(st); }

  var IC = {
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
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
    mark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4.500h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.500a1 1 0 0 1 1-1z"/></svg>',
    page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3.500h7l4 4V20a.5.5 0 0 1-.5.5h-10A.5.5 0 0 1 7 20z"/><path d="M14 3.500V8h4"/></svg>',
    prob: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 7h5M7.500 4.500v5M14 8h5M5 17h5M14 15.500l5 3M19 15.500l-5 3"/></svg>'
  };

  /* ---------- hoja (sheet) ---------- */
  var ov, sh, bd, ttl, sb, ft, lastFocus, open = null, ff = "all", fq = "";
  function ensureSheet() {
    if (ov) return;
    ov = el("div", "mkp-ov"); ov.setAttribute("aria-hidden", "true");
    sh = el("div", "mkp-sh"); sh.setAttribute("role", "dialog"); sh.setAttribute("aria-modal", "true");
    var hd = el("div", "mkp-hd"); ttl = el("h2"); ttl.id = "mkp-t"; sh.setAttribute("aria-labelledby", "mkp-t");
    var x = el("button", "mkp-x", "×"); x.type = "button"; x.setAttribute("aria-label", t("Cerrar", "Tanca"));
    hd.appendChild(ttl); hd.appendChild(x); sb = el("div", "mkp-sub"); bd = el("div", "mkp-bd"); ft = el("div", "mkp-ft"); sh.appendChild(hd); sh.appendChild(sb); sh.appendChild(bd); sh.appendChild(ft); ov.appendChild(sh); document.body.appendChild(ov);
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
    sb.classList.toggle("on", open === "fav"); ft.classList.toggle("on", open === "fav");
    if (open === "fav") { buildFav(); renderFav(); } else if (open === "help") renderHelp();
  }
  var TY = { page: ["#0a84ff", "page"], prob: ["#ff9f0a", "prob"], mark: ["#bf5af2", "mark"] }, FL = [["all", "Todo", "Tot"], ["page", "Páginas", "Pàgines"], ["prob", "Problemas", "Problemes"], ["mark", "Puntos", "Punts"]], undo = null;
  function buildFav() {
    ttl.textContent = t("Favoritos", "Favorits");
    sb.innerHTML = '<div class="mkp-q"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.500"/><path d="m16 16 4 4"/></svg><input type="search" placeholder="' + t("Buscar en favoritos", "Cerca als favorits") + '" aria-label="' + t("Buscar en favoritos", "Cerca als favorits") + '" value="' + esc(fq) + '" autocomplete="off" enterkeyhint="search"></div><div class="mkp-sg" role="radiogroup" aria-label="' + t("Tipo", "Tipus") + '"><i aria-hidden="true"></i>' + FL.map(function (f) { return '<button type="button" role="radio" data-f="' + f[0] + '" aria-checked="' + (f[0] === ff) + '">' + t(f[1], f[2]) + "</button>"; }).join("") + "</div>";
    var on = has(pageUrl());
    ft.innerHTML = '<div class="mkp-fb"><button type="button" data-cur class="' + (on ? "on" : "p") + '">' + IC.star.replace("<svg", '<svg style="fill:currentColor"') + "<span>" + (on ? t("Guardada", "Desada") : t("Guardar página", "Desa la pàgina")) + '</span></button><button type="button" data-mark>' + IC.mark + "<span>" + t("Marcar este punto", "Marca aquest punt") + '</span></button></div><div class="mkp-fl"><button type="button" data-copy>' + t("Copiar lista", "Copia la llista") + '</button><button type="button" data-clear>' + t("Vaciar", "Buida") + "</button></div>";
    sb.querySelector("input").addEventListener("input", function (e) { fq = e.target.value; renderFav(); });
    requestAnimationFrame(segPos);
  }
  function segPos() { var g = sb.querySelector(".mkp-sg"), b = g && g.querySelector('[aria-checked="true"]'); if (b && b.offsetWidth) { g.style.setProperty("--x", b.offsetLeft + "px"); g.style.setProperty("--w", b.offsetWidth + "px"); } }
  function favRow(x, i) {
    var k = kind(x), ty = TY[k] || TY.page, sub = x.s || x.u.split(/[?#]/)[0], pin = x.p ? '<span class="mkp-pnb" aria-hidden="true">' + IC.star + "</span>" : "";
    return '<div class="mkp-sw" data-i="' + i + '"><div class="mkp-ac l" aria-hidden="true">' + (x.p ? t("Soltar", "Deixa de fixar") : t("Fijar", "Fixa")) + '</div><div class="mkp-ac r" aria-hidden="true">' + t("Quitar", "Treu") + '</div><a class="mkp-r mkp-sc" href="' + esc(MKL_url(x.u)) + '"><i style="--c:' + ty[0] + '">' + IC[ty[1]] + "</i><span><b>" + esc(x.t) + "</b><small>" + esc(sub) + (x.d ? " · " + esc(ago(x.d)) : "") + "</small></span></a>" + pin +
      '<div class="mkp-ra"><button type="button" data-pin aria-label="' + (x.p ? t("Soltar", "Deixa de fixar") : t("Fijar arriba", "Fixa a dalt")) + ": " + esc(x.t) + '"><svg viewBox="0 0 24 24" fill="' + (x.p ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3.200l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17.200l-5.400 2.900 1-6.100-4.400-4.300 6.100-.9z"/></svg></button><button type="button" data-rm aria-label="' + t("Quitar de favoritos", "Treu dels favorits") + ": " + esc(x.t) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div></div>';
  }
  function renderFav() {
    if (open !== "fav" || !bd) return;
    var all = read(), q = fq.trim().toLowerCase(), cnt = { all: all.length, page: 0, prob: 0, mark: 0 }, h = "", list;
    all.forEach(function (x) { cnt[kind(x)]++; });
    [].forEach.call(sb.querySelectorAll(".mkp-sg button"), function (b) { var f = b.getAttribute("data-f"), n = cnt[f], base0 = FL.filter(function (z) { return z[0] === f; })[0]; b.textContent = t(base0[1], base0[2]) + (n ? " " + n : ""); b.setAttribute("aria-checked", String(f === ff)); });
    segPos();
    list = all.map(function (x, i) { return [x, i]; }).filter(function (z) { return (ff === "all" || kind(z[0]) === ff) && (!q || (z[0].t + " " + (z[0].s || "")).toLowerCase().indexOf(q) >= 0); });
    var lastv = readLast().filter(function (x) { return x.u !== pageUrl(); })[0];
    if (lastv && !q && ff === "all") {
      var pu = lastv.u + (lastv.u.indexOf("?") < 0 ? "?" : "&") + "mky=" + lastv.y;
      h += '<a class="mkp-cont" href="' + esc(MKL_url(pu)) + '"><span><small>' + t("Seguir leyendo", "Continua llegint") + "</small><b>" + esc(lastv.t) + "</b></span><em>" + Math.round(lastv.y * 100) + " %</em></a>";
    }
    if (!all.length) h += '<div class="mkp-em">' + IC.star + "<b>" + t("Aún no tienes favoritos", "Encara no tens favorits") + "</b><span>" + t("Guarda una página, marca con ★ un problema o deja un punto de lectura para volver justo donde lo dejaste.", "Desa una pàgina, marca amb ★ un problema o deixa un punt de lectura per tornar just on ho vas deixar.") + "</span></div>";
    else if (!list.length) h += '<div class="mkp-em"><b>' + t("Sin resultados", "Sense resultats") + "</b><span>" + t("Prueba con otra palabra o cambia el filtro.", "Prova amb una altra paraula o canvia el filtre.") + "</span></div>";
    else {
      var pins = list.filter(function (z) { return z[0].p; }), rest = list.filter(function (z) { return !z[0].p; });
      if (pins.length) { h += '<p class="mkp-sec">' + t("Fijados", "Fixats") + "</p>"; pins.forEach(function (z) { h += favRow(z[0], z[1]); }); }
      if (rest.length) { if (pins.length) h += '<p class="mkp-sec">' + t("Guardados", "Desats") + "</p>"; rest.forEach(function (z) { h += favRow(z[0], z[1]); }); }
    }
    bd.innerHTML = h;
    var cur = ft.querySelector("[data-cur]"); if (cur) { var on = has(pageUrl()); cur.className = on ? "on" : "p"; cur.querySelector("span").textContent = on ? t("Guardada", "Desada") : t("Guardar página", "Desa la pàgina"); }
  }
  function removeAt(i, noUndo) {
    var a = read(), it = a.splice(i, 1)[0]; if (!it) return; write(a);
    if (!noUndo) { undo = { it: it, i: i }; note(t("Quitado de favoritos", "Tret dels favorits"), t("Deshacer", "Desfés"), function () { if (!undo) return; var b = read(); b.splice(Math.min(undo.i, b.length), 0, undo.it); undo = null; write(b); }); }
  }
  function pinAt(i) { var a = read(); if (!a[i]) return; a[i].p = a[i].p ? 0 : 1; write(a); haptic("pin"); }
  /* deslizar: izquierda = quitar, derecha = fijar */
  var sw = null;
  document.addEventListener("pointerdown", function (e) {
    if (open !== "fav" || e.button > 0) return;
    var c = e.target.closest && e.target.closest(".mkp-sc"); if (!c || e.target.closest(".mkp-ra")) return;
    var w = c.parentNode; sw = { c: c, w: w, x: e.clientX, y: e.clientY, dx: 0, on: false, id: e.pointerId, i: +w.getAttribute("data-i"), t: Date.now() }; c.classList.remove("sn");
  });
  document.addEventListener("pointermove", function (e) {
    if (!sw || e.pointerId !== sw.id) return;
    var dx = e.clientX - sw.x, dy = e.clientY - sw.y;
    if (!sw.on) { if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { sw = null; return; } if (Math.abs(dx) < 8) return; sw.on = true; try { sw.c.setPointerCapture(e.pointerId); } catch (x) {} }
    var lim = 120, r = Math.abs(dx) > lim ? lim + (Math.abs(dx) - lim) * .25 : Math.abs(dx); sw.dx = dx < 0 ? -r : r;
    sw.c.style.transform = "translateX(" + sw.dx + "px)"; sw.w.classList.toggle("dl", sw.dx > 6); sw.w.classList.toggle("dr", sw.dx < -6);
  });
  function endSwipe(e) {
    if (!sw || (e && e.pointerId !== sw.id)) return;
    var s0 = sw, v = s0.dx / Math.max(1, Date.now() - s0.t); sw = null;
    if (!s0.on) return;
    s0.c.addEventListener("click", function (ev) { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
    var big = Math.abs(s0.dx) > 90 || Math.abs(v) > .6 && Math.abs(s0.dx) > 40;
    if (big && s0.dx < 0) {
      haptic(12); s0.c.classList.add("sn"); s0.c.style.transform = "translateX(-110%)"; var h0 = s0.w.offsetHeight; s0.w.style.height = h0 + "px"; s0.w.classList.add("go");
      setTimeout(function () { s0.w.style.height = "0px"; s0.w.style.opacity = "0"; s0.w.style.marginBlock = "-1px"; }, 160); setTimeout(function () { removeAt(s0.i); }, 420);
    } else if (big && s0.dx > 0) { s0.c.classList.add("sn"); s0.c.style.transform = ""; s0.w.classList.remove("dl"); pinAt(s0.i); }
    else { s0.c.classList.add("sn"); s0.c.style.transform = ""; s0.w.classList.remove("dl", "dr"); }
  }
  document.addEventListener("dragstart", function (e) { if (e.target.closest && e.target.closest(".mkp-sc")) e.preventDefault(); });
  document.addEventListener("pointerup", endSwipe); document.addEventListener("pointercancel", endSwipe);
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
    var cur = tg.closest("[data-cur]"), act = tg.closest("[data-act]"), sg = tg.closest(".mkp-sg button"), rmb = tg.closest("[data-rm]"), pnb = tg.closest("[data-pin]"), mk = tg.closest("[data-mark]"), cp = tg.closest("[data-copy]"), cl = tg.closest("[data-clear]");
    if (sg) { ff = sg.getAttribute("data-f"); renderFav(); haptic(6); }
    else if (rmb) { removeAt(+rmb.closest(".mkp-sw").getAttribute("data-i")); }
    else if (pnb) { pinAt(+pnb.closest(".mkp-sw").getAttribute("data-i")); }
    else if (cur) { var on0 = toggle(pageUrl(), pageTitle(), "", "page"); haptic(on0 ? "fav" : "unfav"); note(on0 ? t("Página guardada", "Pàgina desada") : t("Quitada de favoritos", "Treta dels favorits")); }
    else if (mk) { mark(); }
    else if (cp) { var tx = read().map(function (x) { return "• " + x.t + (x.s ? " (" + x.s + ")" : "") + " — " + new URL(x.u, location.href).href; }).join("\n"); try { navigator.clipboard.writeText(tx).then(function () { note(t("Lista copiada", "Llista copiada")); }, function () { note(t("No se pudo copiar", "No s’ha pogut copiar")); }); } catch (x) { note(t("No se pudo copiar", "No s’ha pogut copiar")); } }
    else if (cl) { var all0 = read(); if (!all0.length) return; write([]); undo = null; note(t("Favoritos vaciados", "Favorits buidats"), t("Deshacer", "Desfés"), function () { write(all0); }); }
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
    [].forEach.call(document.querySelectorAll(".mkp-sar"), function (s0) { if (s0.hasAttribute("data-pg")) s0.setAttribute("data-u", pageUrl()); s0.setAttribute("aria-pressed", String(has(s0.getAttribute("data-u")))); });
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
      b.addEventListener("click", function (ev) { ev.preventDefault(); ev.stopPropagation(); var on = toggle(u, title, sub, "prob"); b.setAttribute("aria-pressed", String(on)); popStar(b, on); haptic(on ? "fav" : "unfav"); note(on ? t("Guardado en favoritos", "Desat als favorits") : t("Quitado de favoritos", "Tret dels favorits"), on ? t("Ver", "Veure") : "", function () { openSheet("fav"); }); });
      h3.appendChild(b);
    });
  }
  function popStar(b, on) { b.classList.remove("mkp-hit"); if (on && !reduce) { void b.offsetWidth; b.classList.add("mkp-hit"); } }
  /* ★ en cada apartado: junto al título de la página y de cada sección con ancla */
  function clean(h) { var c = h.cloneNode(true); [].forEach.call(c.querySelectorAll(".mkp-sar,.sr-only,.num,.sech-n"), function (x) { x.remove(); }); return c.textContent.replace(/^\s*[\d.]+\s*/, "").replace(/\s+/g, " ").trim().slice(0, 90); }
  function secStar(h, pageLevel) {
    if (h.getAttribute("data-mkps")) return; var txt = clean(h); if (!txt) return; h.setAttribute("data-mkps", "1");
    var b = el("button", "mkp-sar mkp-sst", IC.star); b.type = "button"; if (pageLevel) b.setAttribute("data-pg", "1");
    var uu = function () { return pageLevel ? pageUrl() : base() + qs() + "#" + h.id; };
    b.setAttribute("data-u", uu()); b.setAttribute("aria-label", t("Guardar este apartado en favoritos", "Desa aquest apartat als favorits") + ": " + txt); b.setAttribute("aria-pressed", String(has(uu())));
    b.addEventListener("click", function (ev) {
      ev.preventDefault(); ev.stopPropagation(); var u = uu(), top = document.querySelector("#view .pg-title,#view h1"), sub = pageLevel ? (document.querySelector("#view h1") && document.querySelector("#view h1") !== h ? clean(document.querySelector("#view h1")) : pageTitle()) : (top ? clean(top) : pageTitle());
      var on = toggle(u, txt, sub, pageLevel ? "page" : "mark"); b.setAttribute("data-u", u); b.setAttribute("aria-pressed", String(on)); popStar(b, on); haptic(on ? "fav" : "unfav");
      note(on ? t("Guardado en favoritos", "Desat als favorits") : t("Quitado de favoritos", "Tret dels favorits"), on ? t("Ver", "Veure") : t("Deshacer", "Desfés"), function () { if (on) openSheet("fav"); else { toggle(u, txt, sub, pageLevel ? "page" : "mark"); b.setAttribute("aria-pressed", "true"); popStar(b, true); } });
    });
    h.appendChild(b);
  }
  function secStars() {
    var v = document.getElementById("view"); if (!v || base() === "index.html") return;
    var pt = v.querySelector(".pg-title"), h1 = v.querySelector("h1");
    if (pt) secStar(pt, true); else if (h1 && location.hash && !/^#(pau)?$/.test(location.hash)) secStar(h1, true);
    [].forEach.call(v.querySelectorAll("h2[id],h3[id]"), function (h) { if (!h.closest(".prob") && !h.closest("details")) secStar(h, false); });
  }
  function deep() {
    if (/[?&]cont=1/.test(location.search) && base() === "index.html") { var l0 = readLast()[0]; if (l0 && l0.u && !/^[a-z]+:|^\/\//i.test(l0.u)) { location.replace(l0.u); return; } }
    if (/[?&]fav=1/.test(location.search)) setTimeout(function () { openSheet("fav"); }, 350);
    var my = /[?&]mky=([\d.]+)/.exec(location.search);
    if (my) { var yy = parseFloat(my[1]), n0 = 0; (function go() { if (doc() < 300 && ++n0 < 30) return setTimeout(go, 250); setTimeout(function () { scrollTo({ top: yy * doc(), behavior: reduce ? "auto" : "smooth" }); }, 300); })(); }
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
      '<button type="button" class="mkp-r" data-gs="stats"><i style="--c:#30d158">' + IC.chart + "</i><span><b>" + t("Estadísticas", "Estadístiques") + "</b><small>" + t("Progreso, repaso y copia de datos", "Progrés, repàs i còpia de dades") + '</small></span><em aria-hidden="true">›</em></button>' +
      '<button type="button" class="mkp-r" data-gs="share"><i style="--c:#ff375f"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2.5v2.5H14zM19.5 14v2M14 19.5h2M18 18h2.5v2.5H18z"/></svg></i><span><b>' + t("Compartir con QR", "Comparteix amb QR") + "</b><small>" + t("Un código para abrir el portal", "Un codi per obrir el portal") + '</small></span><em aria-hidden="true">›</em></button>' +
      '<button type="button" class="mkp-r" data-gs="help"><i style="--c:#30b0c7">' + IC.q + "</i><span><b>" + t("Ayuda y soporte", "Ajuda i suport") + "</b><small>" + t("Preguntas, el proyecto y contacto", "Preguntes, el projecte i contacte") + '</small></span><em aria-hidden="true">›</em></button></div>';
    var rc = body.querySelector(".mkst-sec");
    body.insertBefore(sec, rc ? rc.nextSibling : body.firstChild);
    sec.addEventListener("click", function (e) {
      var b = e.target.closest("[data-gs]"); if (!b) return;
      var x = document.querySelector(".mk-gp .mk-gtop button"); x && x.click();
      setTimeout(function () { var k = b.getAttribute("data-gs"); if (k === "stats") { window.mkStats && window.mkStats.open(); } else if (k === "share") { window.mkLoadShare && window.mkLoadShare(); } else openSheet(k); }, 120);
    });
    return true;
  }

  /* ---------- arranque ---------- */
  function boot() {
    addCss(); sync();
    if (!portalSec()) { var mo3 = new MutationObserver(function () { if (portalSec()) mo3.disconnect(); }); mo3.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo3.disconnect(); }, 8000); }
    if (!langInit()) { var mo = new MutationObserver(function () { if (langInit()) { mo.disconnect(); sync(); } }); mo.observe(document.body, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 6000); }
    addEventListener("hashchange", function () { setTimeout(sync, 60); });
    var hasP = document.getElementById("cl-list") || /mates|fisica|problemes/.test(base()), hasV = !!document.getElementById("view");
    if (hasP || hasV) {
      if (hasP) stars(); secStars(); var q = 0, mo2 = new MutationObserver(function () { if (!q) q = requestAnimationFrame(function () { q = 0; if (hasP) stars(); secStars(); }); });
      mo2.observe(document.body, { childList: true, subtree: true });
    }
    addEventListener("scroll", track, { passive: true }); deep();
    addEventListener("storage", function (e) { if (e.key === K) { sync(); open === "fav" && renderFav(); } });
    var mg = new MutationObserver(function () { sync(); }); mg.observe(document.body, { childList: true }); setTimeout(sync, 400); setTimeout(sync, 1500);
  }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
