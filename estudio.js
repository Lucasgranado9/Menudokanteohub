/* Estudio con cuenta · Menudo Kanteo
   Tres herramientas que solo se usan con sesión iniciada: objetivo semanal, repaso por fallos y modo examen.
   Datos (todos en localStorage y sincronizados con la cuenta): «mk-goal», «mk-goalh», «mk-exm», «mk-rvs».
   «mk-exm-run» (examen en curso) es solo local. Lo carga cuenta.js; API: window.mkEstudio. */
(function () {
  "use strict";
  if (window.mkEstudio) return;
  var LS; try { LS = window.localStorage; LS.getItem("mk-x"); } catch (e) { return; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function g(k, d) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function put(k, v) { try { LS.setItem(k, JSON.stringify(v)); } catch (e) { } }
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function signed() { try { return !!LS.getItem("mk-acct"); } catch (e) { return false; } }
  function num(n, d) { return Number(n).toLocaleString(es() ? "es-ES" : "ca-ES", { maximumFractionDigits: d == null ? 2 : d }); }
  var DAY = 864e5, IV = [1, 3, 7, 14, 30];

  /* ───────── objetivo semanal ───────── */
  function weekId(d) { d = d ? new Date(d) : new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function total() {
    var n = Object.keys(g("mk-done", {})).length, pm = g("mk-pm", {});
    Object.keys(pm).forEach(function (k) { if (pm[k] && typeof pm[k] === "object") n += Object.keys(pm[k]).length; });
    return n;
  }
  function goal() { var o = g("mk-goal", null); return o && o.n ? o : null; }
  function tick() {
    if (!signed()) return null;
    var o = goal(); if (!o) return null;
    var wk = weekId(), tt = total();
    if (o.wk !== wk) { o.wk = wk; o.base = tt; o.u = Date.now(); put("mk-goal", o); }
    var p = Math.max(0, tt - (o.base | 0));
    if (p >= o.n) { var h = g("mk-goalh", {}); if (!h[wk]) { h[wk] = 1; put("mk-goalh", h); } }
    return { n: o.n, p: p, wk: wk, weeks: Object.keys(g("mk-goalh", {})).length };
  }
  function setGoal(n) { put("mk-goal", { n: n, wk: weekId(), base: total(), u: Date.now() }); tick(); }

  /* ───────── repaso por fallos ───────── */
  var RE = /^([fh]?)(\d{4})-(\d+)\|(.+)$/;
  function rdue(e) { return (e.t || 0) + IV[Math.min(e.n | 0, IV.length - 1)] * DAY; }
  function queue() {
    var r = g("mk-pmr", {}), out = [];
    Object.keys(r).forEach(function (id) {
      var m = RE.exec(id); if (!m) return; var due = rdue(r[id]);
      out.push({ id: id, k: m[1] || "m", y: +m[2], sid: +m[3], u: m[4], due: due, isDue: Date.now() >= due });
    });
    out.sort(function (a, b) { return a.due - b.due; }); return out;
  }
  function subjName(k) { return k === "f" ? t("Física II", "Física II") : k === "h" ? t("Historia de la Filosofía", "Història de la Filosofia") : t("Matemáticas II", "Matemàtiques II"); }
  function label(x) { return subjName(x.k) + " · PAU " + x.y + " · " + t("Serie ", "Sèrie ") + x.sid + " · " + t("Apartado ", "Apartat ") + x.u.replace(/^([A-Z])\|/, "$1 · "); }
  function rate(id, ok) {
    var r = g("mk-pmr", {}), e0 = r[id], m = RE.exec(id); if (!m) return;
    if (ok) {
      if (!e0 || (e0.n | 0) >= IV.length - 1) {
        delete r[id];
        var pm = g("mk-pm", {}), key = m[1] + m[2] + "-" + m[3], nn = parseInt(m[4].replace(/^[A-Z]\|/, ""), 10) || 1; pm[key] = pm[key] || {}; pm[key][nn] = 1; put("mk-pm", pm);
      } else r[id] = { n: (e0.n | 0) + 1, t: Date.now() };
      put("mk-rvs", (g("mk-rvs", 0) | 0) + 1);
    } else r[id] = { n: 0, t: Date.now() };
    put("mk-pmr", r);
  }
  function goTo(k, rv) { try { sessionStorage.setItem("mk-pm-go", JSON.stringify({ s: k, rv: rv })); } catch (e) { } if (/problemes\.html$/.test(location.pathname)) { if (location.hash === "#pau") location.reload(); else location.hash = "#pau"; } else location.href = "problemes.html#pau"; }

  /* ───────── modo examen ───────── */
  var idxCache = {};
  function loadIdx(k) {
    var u = "data/" + k + "-pau" + (es() ? ".es" : "") + ".json";
    return idxCache[u] || (idxCache[u] = fetch(u).then(function (r) { if (!r.ok) throw new Error(u); return r.json(); }).catch(function (e) { delete idxCache[u]; throw e; }));
  }
  function run() { return g("mk-exm-run", null); }
  function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60); return (h ? h + ":" + ("0" + m).slice(-2) : m) + ":" + ("0" + (s % 60)).slice(-2); }
  function firstId(ex) { var f = ex[0] || {}; if (f.ids && f.ids.length) return f.ids[0]; if (f.opts && f.opts[0] && f.opts[0].ids) return f.opts[0].ids[0]; return "1.1"; }

  /* ───────── estilos ───────── */
  function css() {
    if (document.getElementById("mke-css")) return; var s = document.createElement("style"); s.id = "mke-css";
    s.textContent = ".mke-ov{position:fixed;inset:0;z-index:520;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,.42);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}.mke-ov.on{opacity:1;visibility:visible}" +
      ".mke-sh{position:relative;width:min(520px,100%);max-height:min(88vh,100%);overflow:auto;padding:22px max(20px,env(safe-area-inset-right,0px)) calc(22px + env(safe-area-inset-bottom,0px)) max(20px,env(safe-area-inset-left,0px));border-radius:28px 28px 0 0;background:var(--bg,#fff);color:var(--fg,#111);box-shadow:0 -20px 60px rgba(0,0,0,.25);transform:translateY(24px);transition:transform .45s cubic-bezier(.2,1.1,.3,1)}.mke-ov.on .mke-sh{transform:none}" +
      "@media(min-width:640px){.mke-ov{align-items:center}.mke-sh{border-radius:28px}}" +
      ".mke-x{position:absolute;top:10px;right:10px;width:44px;height:44px;border:0;border-radius:50%;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);color:inherit;font-size:22px;line-height:1;cursor:pointer}" +
      ".mke-sh h2{margin:4px 40px 4px 0;font:700 22px/1.2 inherit;letter-spacing:-.025em}.mke-sh p{margin:0 0 14px;color:var(--muted,#6c6a6a);font-size:14.5px;line-height:1.45}" +
      ".mke-b{display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;margin-top:10px;padding:0 18px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:none;color:inherit;font:600 15.5px/1 inherit;cursor:pointer;text-decoration:none}.mke-b.rd{border:0;color:#fff;background:linear-gradient(180deg,#e8344f,var(--red,#c8102e))}.mke-b:disabled{opacity:.5;cursor:default}" +
      ".mke-ch{display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 14px}.mke-ch button{min-height:44px;min-width:48px;padding:0 14px;border-radius:999px;border:1px solid color-mix(in srgb,var(--fg,#111) 16%,transparent);background:none;color:inherit;font:600 14.5px/1 inherit;cursor:pointer}.mke-ch button[aria-pressed=true]{border-color:transparent;background:var(--red,#c8102e);color:#fff}" +
      ".mke-ring{display:grid;place-items:center;margin:8px auto 4px;width:168px;height:168px;position:relative}.mke-ring svg{position:absolute;inset:0;transform:rotate(-90deg)}.mke-ring circle{fill:none;stroke-width:12;stroke-linecap:round}.mke-ring .bg{stroke:color-mix(in srgb,var(--fg,#111) 9%,transparent)}.mke-ring .fg{stroke:var(--red,#c8102e);transition:stroke-dashoffset .8s cubic-bezier(.2,1,.3,1)}.mke-ring>div{text-align:center}.mke-ring b{font:800 38px/1 inherit;letter-spacing:-.04em;font-variant-numeric:tabular-nums}.mke-ring small{display:block;text-align:center;color:var(--muted,#6c6a6a);font-size:13px;margin-top:4px}" +
      ".mke-sel{width:100%;min-height:50px;padding:0 14px;border-radius:15px;border:1px solid color-mix(in srgb,var(--fg,#111) 14%,transparent);background:color-mix(in srgb,var(--fg,#111) 5%,transparent);color:inherit;font:500 16px/1 inherit}" +
      ".mke-card{padding:16px;border-radius:20px;background:color-mix(in srgb,var(--fg,#111) 5%,transparent);margin:6px 0 4px}.mke-card b{display:block;font-size:16px;letter-spacing:-.01em;line-height:1.35}.mke-card small{display:block;margin-top:4px;color:var(--muted,#6c6a6a);font-size:13px}" +
      ".mke-row{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:12px 2px;border-top:1px solid color-mix(in srgb,var(--fg,#111) 9%,transparent);font-size:14.5px}.mke-row span:last-child{font-weight:700;font-variant-numeric:tabular-nums}" +
      ".mke-gr{display:grid;grid-template-columns:1fr auto;gap:8px 12px;align-items:center;margin:8px 0}.mke-gr input{width:84px;min-height:42px;padding:0 10px;border-radius:12px;border:1px solid color-mix(in srgb,var(--fg,#111) 16%,transparent);background:color-mix(in srgb,var(--fg,#111) 5%,transparent);color:inherit;font:600 16px/1 inherit;text-align:right}" +
      ".mke-fl{grid-column:1/-1;display:flex;align-items:center;gap:10px;min-height:44px;font-size:13.5px;color:var(--muted,#6c6a6a)}.mke-fl input{width:22px;height:22px;accent-color:var(--red,#c8102e)}.mke-big{font:800 52px/1 inherit;letter-spacing:-.05em;text-align:center;margin:10px 0 2px;color:var(--red,#c8102e)}.mke-big+small{display:block;text-align:center;color:var(--muted,#6c6a6a);margin-bottom:6px}" +
      ".mke-pill{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 66px);z-index:430;display:flex;align-items:center;gap:10px;padding:6px 6px 6px 16px;border-radius:999px;background:color-mix(in srgb,var(--bg,#fff) 82%,transparent);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:0 6px 24px rgba(0,0,0,.2),0 0 0 1px color-mix(in srgb,var(--fg,#111) 10%,transparent);color:var(--fg,#111);font:600 14px/1 inherit;transform:translateX(-50%)}.mke-pill time{font-variant-numeric:tabular-nums;font-weight:800;font-size:16px;letter-spacing:-.02em}.mke-pill.lo time{color:var(--red,#c8102e)}.mke-pill button{min-height:44px;padding:0 14px;border:0;border-radius:999px;background:var(--red,#c8102e);color:#fff;font:600 13.5px/1 inherit;cursor:pointer}" +
      "@media(prefers-reduced-motion:reduce){.mke-ov,.mke-sh,.mke-ring .fg{transition:none}}@media(prefers-reduced-transparency:reduce){.mke-pill{background:var(--bg,#fff);-webkit-backdrop-filter:none;backdrop-filter:none}}";
    document.head.appendChild(s);
  }

  /* ───────── panel ───────── */
  var ov = null, view = "", sel = { k: "m", dur: 90, exam: "" }, rq = null, ri = 0, last = null;
  function shell() {
    css(); if (ov) return;
    ov = document.createElement("div"); ov.className = "mke-ov";
    ov.innerHTML = '<div class="mke-sh" role="dialog" aria-modal="true"><button type="button" class="mke-x" aria-label="' + t("Cerrar", "Tanca") + '">×</button><div class="mke-in"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener("click", function (e) {
      if (e.target === ov || e.target.closest(".mke-x")) return close();
      var b = e.target.closest("[data-e]"); if (b) act(b.getAttribute("data-e"), b);
    });
    ov.addEventListener("input", function (e) {
      if (e.target.classList.contains("mke-gi")) { sumGrade(); var c = ov.querySelector('.mke-gf[data-n="' + e.target.getAttribute("data-n") + '"]'); if (c && !c.getAttribute("data-t")) c.checked = (parseFloat(String(e.target.value).replace(",", ".")) || 0) < (parseFloat(e.target.getAttribute("data-max")) || 2.5) * 0.6; }
      else if (e.target.classList.contains("mke-gf")) e.target.setAttribute("data-t", "1");
    });
    addEventListener("keydown", function (e) {
      if (!ov.classList.contains("on")) return;
      if (e.key === "Escape") { e.preventDefault(); return close(); }
      if (e.key !== "Tab") return;
      var f = [].filter.call(ov.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),select:not([disabled])"), function (x) { return x.offsetParent !== null; });
      if (!f.length) return; var a = f[0], z = f[f.length - 1], c = document.activeElement;
      if (!ov.contains(c)) { e.preventDefault(); a.focus(); } else if (e.shiftKey && c === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && c === z) { e.preventDefault(); a.focus(); }
    });
  }
  function body() { return ov.querySelector(".mke-in"); }
  function close() {
    if (!ov) return; ov.classList.remove("on");
    var tgt = last && last.isConnected && (last.checkVisibility ? last.checkVisibility({ visibilityProperty: true }) : last.offsetParent !== null) ? last : document.querySelector(".mk-acc");
    tgt && tgt.focus && tgt.focus({ preventScroll: true });
  }
  function open(kind) {
    if (!signed()) return false;
    shell(); last = document.activeElement; view = kind; if (kind === "rev") { rq = null; ri = 0; }
    paint(); ov.getBoundingClientRect(); ov.classList.add("on");
    var f = ov.querySelector(".mke-b,.mke-ch button,.mke-x"); f && f.focus({ preventScroll: true });
    return true;
  }
  function ring(p, n) {
    var C = 2 * Math.PI * 70, f = Math.min(1, n ? p / n : 0);
    return '<div class="mke-ring" role="img" aria-label="' + p + t(" de ", " de ") + n + t(" problemas esta semana", " problemes aquesta setmana") + '"><svg viewBox="0 0 168 168"><circle class="bg" cx="84" cy="84" r="70"/><circle class="fg" cx="84" cy="84" r="70" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - f)).toFixed(1) + '"/></svg><div><b>' + p + "/" + n + "</b><small>" + t("esta semana", "aquesta setmana") + "</small></div></div>";
  }
  function paint() {
    var h = "";
    if (view === "goal") {
      var o = tick(), n = o ? o.n : 0;
      h = "<h2>" + t("Objetivo semanal", "Objectiu setmanal") + "</h2><p>" + t("Elige cuántos problemas quieres hacer cada semana (de lunes a domingo). Cuenta lo que marcas como hecho.", "Tria quants problemes vols fer cada setmana (de dilluns a diumenge). Compta el que marques com a fet.") + "</p>" +
        (o ? ring(o.p, o.n) + '<p style="text-align:center;margin-top:6px">' + (o.p >= o.n ? "🎯 " + t("¡Objetivo cumplido!", "Objectiu assolit!") : t("Te faltan ", "Et falten ") + (o.n - o.p) + t(" para cumplirlo.", " per assolir-lo.")) + " " + t("Semanas cumplidas: ", "Setmanes assolides: ") + o.weeks + "</p>" : "") +
        '<div class="mke-ch" role="group" aria-label="' + t("Problemas por semana", "Problemes per setmana") + '">' + [5, 10, 15, 20, 30].map(function (v) { return '<button type="button" data-e="goal" data-n="' + v + '" aria-pressed="' + (v === n) + '">' + v + "</button>"; }).join("") + "</div>" +
        '<p style="font-size:13px">' + t("Cumplir semanas desbloquea logros nuevos.", "Assolir setmanes desbloqueja assoliments nous.") + "</p>";
    } else if (view === "rev") {
      if (!rq) { rq = queue(); var du = rq.filter(function (x) { return x.isDue; }); if (du.length) rq = du; else rq.all = 1; ri = 0; }
      h = "<h2>" + t("Repaso por fallos", "Repàs per errors") + "</h2>";
      if (!rq.length) h += "<p>" + t("No tienes apartados marcados como «Me falló». Márcalos en los problemas PAU y volverán aquí con repaso espaciado (1, 3, 7, 14 y 30 días).", "No tens apartats marcats com a «M’ha fallat». Marca’ls als problemes PAU i tornaran aquí amb repàs espaiat (1, 3, 7, 14 i 30 dies).") + '</p><a class="mke-b rd" href="problemes.html#pau">' + t("Ir a los problemas PAU", "Ves als problemes PAU") + "</a>";
      else if (ri >= rq.length) h += '<div class="mke-big">✓</div><small>' + t("Sesión terminada", "Sessió acabada") + "</small><p style=\"text-align:center\">" + t("Has repasado ", "Has repassat ") + rq.length + t(" apartados. Los fallados volverán antes.", " apartats. Els fallats tornaran abans.") + '</p><button type="button" class="mke-b rd" data-e="done">' + t("Listo", "Fet") + "</button>";
      else {
        var x = rq[ri];
        h += "<p>" + (rq.all ? t("Hoy no toca nada; practica igualmente.", "Avui no toca res; practica igualment.") : t("Toca repasar hoy.", "Toca repassar avui.")) + " " + (ri + 1) + "/" + rq.length + '</p><div class="mke-card"><b>' + esc(label(x)) + "</b><small>" + t("Intenta resolverlo sin mirar la solución y valora cómo te ha ido.", "Intenta resoldre’l sense mirar la solució i valora com t’ha anat.") + '</small></div><button type="button" class="mke-b" data-e="rvopen">' + t("Abrir el apartado", "Obre l’apartat") + '</button><button type="button" class="mke-b rd" data-e="rvok">' + t("Ya lo sé", "Ja ho sé") + '</button><button type="button" class="mke-b" data-e="rvno">' + t("Aún no", "Encara no") + "</button>";
      }
    } else if (view === "exm") {
      var r0 = run(); if (r0) { h = examRunning(r0); } else h = examHome();
    } else if (view === "grade") h = gradeHtml();
    var ae = document.activeElement, sig = ae && ov.contains(ae) && ae.getAttribute ? ["data-e", "data-n", "data-k"].map(function (k) { return ae.getAttribute(k); }) : null;
    body().innerHTML = h;
    var hd = body().querySelector("h2"); if (hd) { hd.id = "mke-t"; hd.tabIndex = -1; ov.querySelector(".mke-sh").setAttribute("aria-labelledby", "mke-t"); }
    if (sig && sig[0]) { var m0 = [].filter.call(body().querySelectorAll("[data-e]"), function (x) { return x.getAttribute("data-e") === sig[0] && x.getAttribute("data-n") === sig[1] && x.getAttribute("data-k") === sig[2]; })[0]; if (m0) m0.focus({ preventScroll: true }); else if (sig && hd) hd.focus({ preventScroll: true }); }
    else if (sig && hd) hd.focus({ preventScroll: true });
    if (view === "exm" && !run()) fillExams();
    if (view === "grade") sumGrade();
  }
  function examRunning(r0) {
    return "<h2>" + t("Examen en curso", "Examen en curs") + "</h2><div class=\"mke-card\"><b>" + esc(r0.label) + "</b><small>" + t("Tiempo restante: ", "Temps restant: ") + clock(r0.start + r0.dur * 6e4 - Date.now()) + '</small></div><button type="button" class="mke-b" data-e="rvopen2">' + t("Volver al examen", "Torna a l’examen") + '</button><button type="button" class="mke-b rd" data-e="finish">' + t("Terminar y ponerme nota", "Acabar i posar-me nota") + '</button><button type="button" class="mke-b" data-e="abandon">' + t("Abandonar sin guardar", "Abandona sense desar") + "</button>";
  }
  function hist() { return g("mk-exm", []).slice().sort(function (a, b) { return b.t - a.t; }); }
  function examHome() {
    var hs = hist(), best = hs.reduce(function (m, x) { return Math.max(m, x.n || 0); }, 0);
    var mm = sel.msg ? '<p role="status" style="color:#1a7f37;font-weight:600">' + esc(sel.msg) + "</p>" : ""; sel.msg = "";
    return "<h2>" + t("Modo examen", "Mode examen") + "</h2>" + mm + "<p>" + t("Elige un examen PAU y resuélvelo contrarreloj. Al acabar te pones la nota con la pauta y queda en tu historial. Evita abrir las soluciones hasta terminar.", "Tria un examen PAU i resol-lo contrarellotge. En acabar, et poses la nota amb la pauta i queda al teu historial. Evita obrir les solucions fins acabar.") + "</p>" +
      '<div class="mke-ch" role="group" aria-label="' + t("Asignatura", "Assignatura") + '">' + [["m", "Matemáticas II"], ["f", "Física II"]].map(function (a) { return '<button type="button" data-e="subj" data-k="' + a[0] + '" aria-pressed="' + (sel.k === a[0]) + '">' + a[1] + "</button>"; }).join("") + "</div>" +
      '<select class="mke-sel" id="mke-ex" aria-label="' + t("Examen", "Examen") + '"><option>…</option></select>' +
      '<div class="mke-ch" style="margin-top:12px" role="group" aria-label="' + t("Duración", "Durada") + '">' + [60, 90, 120].map(function (v) { return '<button type="button" data-e="dur" data-n="' + v + '" aria-pressed="' + (sel.dur === v) + '">' + v + " min</button>"; }).join("") + "</div>" +
      '<button type="button" class="mke-b rd" data-e="start" id="mke-go" disabled>' + t("Empezar examen", "Comença l’examen") + "</button>" +
      (hs.length ? '<h2 style="font-size:17px;margin-top:22px">' + t("Tu historial", "El teu historial") + '</h2><div class="mke-row"><span>' + t("Mejor nota", "Millor nota") + "</span><span>" + num(best) + "</span></div>" + hs.slice(0, 5).map(function (x) { return '<div class="mke-row"><span>' + esc(x.l) + "</span><span>" + num(x.n) + "</span></div>"; }).join("") : "");
  }
  function fillExams() {
    var s = ov.querySelector("#mke-ex"), go = ov.querySelector("#mke-go"); if (!s) return;
    loadIdx(sel.k).then(function (d) {
      var o = []; (d.years || []).forEach(function (y) { (y.series || []).forEach(function (se) { o.push('<option value="' + y.y + "-" + se.id + '">PAU ' + y.y + " · " + t("Serie ", "Sèrie ") + se.id + "</option>"); }); });
      if (!ov.querySelector("#mke-ex")) return; s.innerHTML = o.join("") || "<option>—</option>"; if (sel.exam && s.querySelector('[value="' + sel.exam + '"]')) s.value = sel.exam; sel.exam = s.value; s.onchange = function () { sel.exam = s.value; }; go.disabled = !o.length;
    }).catch(function () { s.innerHTML = "<option>" + t("Sin conexión", "Sense connexió") + "</option>"; });
  }
  function start() {
    var v = (ov.querySelector("#mke-ex") || {}).value || "", m = /^(\d{4})-(\d+)$/.exec(v); if (!m) return;
    loadIdx(sel.k).then(function (d) {
      var y = (d.years || []).filter(function (a) { return a.y === +m[1]; })[0], se = y && y.series.filter(function (a) { return a.id === +m[2]; })[0]; if (!se) return;
      var pf = sel.k === "m" ? "" : sel.k, id = pf + v + "|" + firstId(se.ex);
      put("mk-exm-run", { k: sel.k, id: v, l: subjName(sel.k) + " · PAU " + v.replace("-", " · " + t("Serie ", "Sèrie ")), label: subjName(sel.k) + " · PAU " + m[1] + " · " + t("Serie ", "Sèrie ") + m[2], start: Date.now(), dur: sel.dur, ex: se.ex.map(function (e) { return [e.n, e.pts || 2.5, e.ids || (e.opts && e.opts[0] && e.opts[0].ids) || []]; }), go: id, s: sel.k });
      close(); pill(); goTo(sel.k, id);
    });
  }
  function gradeHtml() {
    var r0 = run(); if (!r0) return "";
    return "<h2>" + t("Ponte nota", "Posa’t nota") + "</h2><p>" + t("Corrige con la pauta y escribe cuántos puntos has sacado en cada problema (0 si no lo hiciste). La nota máxima es 10.", "Corregeix amb la pauta i escriu quants punts has tret a cada problema (0 si no l’has fet). La nota màxima és 10.") + '</p><div class="mke-gr">' +
      r0.ex.map(function (e) { return '<label for="mke-g' + e[0] + '">' + t("Problema ", "Problema ") + e[0] + " <small>(" + num(e[1]) + " " + t("pts", "pts") + ')</small></label><input class="mke-gi" id="mke-g' + e[0] + '" type="number" inputmode="decimal" min="0" max="' + e[1] + '" step="0.25" value="0" data-max="' + e[1] + '" data-n="' + e[0] + '">' + ((e[2] || []).length ? '<label class="mke-fl"><input type="checkbox" class="mke-gf" data-n="' + e[0] + '"> ' + t("Me falló: añadir a Fallados para repasarlo", "M’ha fallat: afegeix-ho a Fallats per repassar-ho") + "</label>" : ""); }).join("") + '</div><div class="mke-big" id="mke-sum" role="status" aria-live="polite">0</div><small>' + t("nota sobre 10", "nota sobre 10") + '</small><button type="button" class="mke-b rd" data-e="save">' + t("Guardar en mi historial", "Desa al meu historial") + "</button>";
  }
  function sumGrade() {
    var tot = 0; [].forEach.call(ov.querySelectorAll(".mke-gi"), function (i) { var v = parseFloat(String(i.value).replace(",", ".")) || 0, m = parseFloat(i.getAttribute("data-max")) || 2.5; tot += Math.max(0, Math.min(m, v)); });
    tot = Math.min(10, Math.round(tot * 100) / 100); var s = ov.querySelector("#mke-sum"); if (s) { s.textContent = num(tot); s.setAttribute("data-v", tot); }
  }
  function act(a, b) {
    if (a === "goal") { setGoal(+b.getAttribute("data-n")); paint(); notify(); }
    else if (a === "done") close();
    else if (a === "rvopen" || a === "rvopen2") { var x = a === "rvopen" ? rq[ri] : null; if (x) { close(); goTo(x.k, x.id); } else { var r0 = run(); if (r0) { close(); goTo(r0.s, r0.go); } } }
    else if (a === "rvok" || a === "rvno") { rate(rq[ri].id, a === "rvok"); ri++; paint(); notify(); }
    else if (a === "subj") { sel.k = b.getAttribute("data-k"); sel.exam = ""; paint(); }
    else if (a === "dur") { sel.dur = +b.getAttribute("data-n"); paint(); }
    else if (a === "start") start();
    else if (a === "finish") { view = "grade"; paint(); }
    else if (a === "abandon") { LS.removeItem("mk-exm-run"); pill(); close(); }
    else if (a === "save") {
      var r1 = run(); if (!r1) return close(); sumGrade(); var v = parseFloat((ov.querySelector("#mke-sum") || {}).getAttribute("data-v")) || 0;
      var fl = 0, pr = g("mk-pmr", {}); if (Array.isArray(pr)) pr = {}; var pf = r1.k === "m" ? "" : r1.k;
      [].forEach.call(ov.querySelectorAll(".mke-gf:checked"), function (c) { var ex = r1.ex.filter(function (e) { return String(e[0]) === c.getAttribute("data-n"); })[0]; (ex && ex[2] || []).forEach(function (u) { var id = pf + r1.id + "|" + u; if (!pr[id]) { pr[id] = { n: 0, t: Date.now() }; fl++; } }); });
      if (fl) put("mk-pmr", pr); sel.msg = fl ? fl + t(" apartados añadidos a Fallados para repasarlos.", " apartats afegits a Fallats per repassar-los.") : "";
      var h = g("mk-exm", []); h.push({ t: Date.now(), k: r1.k, l: r1.l || r1.label, n: v, m: Math.min(r1.dur, Math.max(1, Math.round((Date.now() - r1.start) / 6e4))) }); put("mk-exm", h.slice(-60));
      LS.removeItem("mk-exm-run"); pill(); view = "exm"; paint(); notify();
      try { window.mkAch && window.mkAch.check(); } catch (e) { }
    }
  }
  function notify() { try { document.dispatchEvent(new CustomEvent("mk-estudio")); window.mkAch && window.mkAch.check(); } catch (e) { } }

  /* ───────── cronómetro flotante ───────── */
  var pl = null, tm = 0, ended = false;
  function pill() {
    var r0 = run();
    if (!r0 || !signed()) { if (pl) { pl.remove(); pl = null; } clearInterval(tm); return; }
    css(); if (!pl) {
      pl = document.createElement("div"); pl.className = "mke-pill"; pl.setAttribute("role", "timer"); pl.innerHTML = '<span>' + t("Examen", "Examen") + '</span><time></time><button type="button" aria-label="' + t("Terminar el examen", "Acaba l’examen") + '">' + t("Terminar", "Acabar") + "</button>";
      document.body.appendChild(pl); pl.querySelector("button").addEventListener("click", function () { shell(); last = pl.querySelector("button"); view = "exm"; paint(); ov.classList.add("on"); });
    }
    clearInterval(tm); ended = false;
    function up() {
      var rr = run(); if (!rr) return pill(); var left = rr.start + rr.dur * 6e4 - Date.now();
      pl.querySelector("time").textContent = clock(left); pl.classList.toggle("lo", left < 6e5);
      if (left <= 0 && !ended) { ended = true; shell(); view = "grade"; paint(); ov.classList.add("on"); }
    }
    up(); tm = setInterval(up, 1000);
  }

  /* ───────── API ───────── */
  window.mkEstudio = {
    open: open,
    info: function () {
      var o = tick(), q = signed() ? queue() : [], r0 = run();
      return { goal: o, due: q.filter(function (x) { return x.isDue; }).length, queued: q.length, run: !!r0, exams: g("mk-exm", []).length };
    },
    tick: tick, weekId: weekId, total: total, setGoal: function (n) { if (!signed()) return false; setGoal(n); notify(); return true; }, note: function (txt) { return window.mkStats && window.mkStats.notes ? window.mkStats.notes.add(txt) : null; }
  };
  function boot() { pill(); tick(); document.addEventListener("mk-auth", function () { pill(); tick(); notify(); }); addEventListener("storage", function () { pill(); }); setInterval(function () { if (document.visibilityState === "visible") tick(); }, 20000); }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
