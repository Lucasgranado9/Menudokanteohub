/* Menudo Kanteo — plan de estudio hasta la PAU. Se descarga al abrir Estadísticas.
   Reparte los ejercicios PAU que te quedan (y los repasos de «Me falló») en los días que faltan,
   según las horas diarias que elijas. Todo en local: «mk-plan» (horas y materias), «mk-pau» (fecha),
   «mk-pm» (apartados hechos) y «mk-pmr» (repaso). */
(function () {
  "use strict";
  if (window.mkPlan) return;
  var LS; try { LS = window.localStorage; LS.getItem("mk-x"); } catch (e) { LS = null; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function g(k, d) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function s(k, v) { try { LS.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); } catch (e) { } }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var DAY = 864e5, IV = [1, 3, 7, 14, 30];
  var SJ = { m: ["Matemáticas II", "Matemàtiques II", "#ff375f"], f: ["Física II", "Física II", "#0a84ff"], h: ["Filosofía", "Filosofia", "#ff9f0a"] };
  function cfg() { var c = g("mk-plan", {}); return { h: c.h >= .5 && c.h <= 6 ? c.h : 1, s: Array.isArray(c.s) && c.s.length ? c.s.filter(function (x) { return SJ[x]; }) : ["m"] }; }
  function day0(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x.getTime(); }
  function nf(x) { return String(x).replace(".", ","); }

  var IDX = {};
  function load(sj) {
    var f = "data/" + sj + "-pau" + (es() ? ".es.json" : ".json");
    return IDX[f] || (IDX[f] = fetch(f).then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function () { delete IDX[f]; return null; }));
  }
  /* un ejercicio = una pieza del plan; si es de elegir (A/B) cuenta la mejor opción */
  function units(sj, idx) {
    var done = g("mk-pm", {}), th = {}, out = []; (idx.th || []).forEach(function (x) { th[x.id] = x.t; });
    idx.years.forEach(function (y) {
      y.series.forEach(function (se) {
        var key = (sj === "m" ? "" : sj) + y.y + "-" + se.id, sd = done[key] || {}, qw = se.ex.length > 4 ? t("Cuestión", "Qüestió") : t("Ejercicio", "Exercici");
        se.ex.forEach(function (e) {
          var alts = e.opts ? e.opts.map(function (o) { return o.ids; }) : [e.ids], best = null;
          alts.forEach(function (ids) { var rem = ids.filter(function (i) { return !sd[i]; }); if (!best || rem.length < best.rem.length) best = { ids: ids, rem: rem }; });
          if (!best || !best.ids.length) return;
          var tags = (e.tags || (e.opts && e.opts[0].tags) || []).map(function (i) { return th[i] || i; }), parts = best.rem.length;
          out.push({ sj: sj, y: y.y, sid: se.id, n: e.n, key: key, first: best.rem[0] || best.ids[0], done: !parts, mins: Math.max(12, Math.min(45, parts * 11)), lab: "PAU " + y.y + " · " + t("Serie ", "Sèrie ") + se.id + " · " + qw + " " + e.n, th: tags.join(" · ") || e.topic || "" });
        });
      });
    });
    out.sort(function (a, b) { return b.y - a.y || a.sid - b.sid || a.n - b.n; });
    return out;
  }
  function reviews() {
    var r = g("mk-pmr", {}), out = [];
    Object.keys(r).forEach(function (id) {
      var m = /^([fh]?)(\d{4})-(\d+)\|(.+)$/.exec(id); if (!m) return; var e = r[id];
      out.push({ id: id, sj: m[1] || "m", y: +m[2], sid: +m[3], u: m[4], due: (e.t || 0) + IV[Math.min(e.n | 0, IV.length - 1)] * DAY });
    });
    out.sort(function (a, b) { return a.due - b.due; }); return out;
  }
  function build(U, R, c, days) {
    var plan = [], q = {}, rr = 0, left = {}; c.s.forEach(function (sj) { q[sj] = (U[sj] || []).filter(function (u) { return !u.done; }); });
    var pend = c.s.reduce(function (a, sj) { return a + q[sj].length; }, 0), need = c.s.reduce(function (a, sj) { return a + q[sj].reduce(function (b, u) { return b + u.mins; }, 0); }, 0) + R.length * 8;
    var rq = R.slice(), today = day0(Date.now()), sched = 0;
    for (var d = 0; d < days; d++) {
      var dt = today + d * DAY, budget = c.h * 60, tasks = [];
      for (var i = 0; i < rq.length && tasks.length < 3;) { if (rq[i].due < dt + DAY) { var r = rq.splice(i, 1)[0]; tasks.push({ k: "r", r: r, mins: 8 }); budget -= 8; } else i++; }
      var guard = 0, empty = 0;
      while (budget >= 10 && guard++ < 30 && empty < c.s.length) {
        var sj = c.s[rr % c.s.length]; rr++;
        if (!q[sj].length) { empty++; continue; } empty = 0;
        var u = q[sj][0]; if (u.mins > budget && budget < c.h * 60 - 8 * tasks.filter(function (x) { return x.k === "r"; }).length - 5 && u.mins > budget * 1.3) break;
        q[sj].shift(); tasks.push({ k: "u", u: u, mins: u.mins }); budget -= u.mins; sched++;
      }
      plan.push({ dt: dt, tasks: tasks });
    }
    var left2 = c.s.reduce(function (a, sj) { return a + q[sj].length; }, 0);
    return { plan: plan, pend: pend, sched: sched, left: left2, need: need };
  }
  function dayLabel(dt, i) {
    if (i === 0) return t("Hoy", "Avui"); if (i === 1) return t("Mañana", "Demà");
    return new Intl.DateTimeFormat(es() ? "es-ES" : "ca-ES", { weekday: "long", day: "numeric", month: "short" }).format(new Date(dt));
  }
  function hlabel(h) { return nf(h) + " h"; }

  function css() {
    if (document.getElementById("mkpl-css")) return; var st = document.createElement("style"); st.id = "mkpl-css";
    st.textContent = ".mkpl{display:flex;flex-direction:column;gap:14px}.mkpl-sum{display:flex;flex-direction:column;gap:4px}.mkpl-sum b{font:800 22px/1.15 var(--disp,var(--sans,inherit));letter-spacing:-.03em}.mkpl-sum span{color:var(--muted,#6c6a6a);font-size:14px;line-height:1.4}" +
      ".mkpl-ct{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center}.mkpl-st{display:inline-flex;align-items:center;gap:2px;padding:3px;border-radius:999px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent)}.mkpl-st button{width:40px;height:40px;border:0;border-radius:50%;background:var(--bg,#fff);color:var(--fg,#111);font:700 20px/1 var(--sans,system-ui);cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.14);transition:transform .35s cubic-bezier(.3,1.4,.5,1)}.mkpl-st button:active{transform:scale(.9)}.mkpl-st button:disabled{opacity:.35;cursor:default}.mkpl-st output{min-width:84px;text-align:center;font:700 16px var(--sans,system-ui);font-variant-numeric:tabular-nums}" +
      ".mkpl-sj{display:flex;flex-wrap:wrap;gap:6px}.mkpl-sj button{min-height:40px;padding:0 14px;border:0;border-radius:999px;background:color-mix(in srgb,var(--fg,#111) 8%,transparent);color:var(--fg,#111);font:650 14px var(--sans,system-ui);cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:transform .35s cubic-bezier(.3,1.4,.5,1),background .2s}.mkpl-sj button:active{transform:scale(.94)}.mkpl-sj button:before{content:'';width:9px;height:9px;border-radius:50%;background:var(--c);opacity:.45}.mkpl-sj button[aria-pressed=true]{background:var(--fg,#111);color:var(--bg,#fff)}.mkpl-sj button[aria-pressed=true]:before{opacity:1}" +
      ".mkpl-d{display:flex;flex-direction:column;gap:6px;padding:12px 12px 8px;border-radius:20px;background:color-mix(in srgb,var(--fg,#111) 5.5%,transparent)}.mkpl-d.now{box-shadow:inset 0 0 0 1.5px #ff9f0a;background:color-mix(in srgb,#ff9f0a 9%,transparent)}.mkpl-dh{display:flex;justify-content:space-between;gap:10px;align-items:baseline;padding:0 4px}.mkpl-dh b{font:700 15px var(--sans,system-ui);text-transform:capitalize}.mkpl-dh span{color:var(--muted,#6c6a6a);font-size:13px;font-variant-numeric:tabular-nums}" +
      ".mkpl-tk{display:flex;align-items:center;gap:10px;width:100%;min-height:52px;padding:6px 10px;border:0;border-radius:14px;background:color-mix(in srgb,var(--bg,#fff) 70%,transparent);color:inherit;text-align:left;cursor:pointer;font:inherit;transition:transform .35s cubic-bezier(.3,1.4,.5,1)}.mkpl-tk:active{transform:scale(.985)}.mkpl-tk:focus-visible,.mkpl-st button:focus-visible,.mkpl-sj button:focus-visible{outline:3px solid var(--fg,#111);outline-offset:2px}.mkpl-dot{flex:none;width:10px;height:10px;border-radius:50%;background:var(--c)}.mkpl-tk span{flex:1;min-width:0}.mkpl-tk b{display:block;font:650 14.5px/1.3 var(--sans,system-ui)}.mkpl-tk small{display:block;color:var(--muted,#6c6a6a);font-size:12.5px;line-height:1.3;margin-top:1px}.mkpl-tk em{flex:none;font:600 12.5px var(--sans,system-ui);font-style:normal;color:var(--muted,#6c6a6a);font-variant-numeric:tabular-nums}.mkpl-tk.dn{opacity:.55}.mkpl-tk.dn b{text-decoration:line-through}" +
      ".mkpl-e{margin:0 4px 4px;color:var(--muted,#6c6a6a);font-size:13.5px}.mkpl-w{color:#b35a00;font-weight:600}:root[data-theme=dark] .mkpl-w{color:#ffb454}@media(prefers-color-scheme:dark){:root:not([data-theme=light]) .mkpl-w{color:#ffb454}}" +
      "@media(prefers-reduced-motion:reduce){.mkpl-st button,.mkpl-sj button,.mkpl-tk{transition:none}}";
    document.head.appendChild(st);
  }

  function render(el) {
    var c = cfg(), pau = "", left = null; try { pau = LS.getItem("mk-pau") || ""; } catch (e) { }
    if (/^\d{4}-\d{2}-\d{2}$/.test(pau)) { var p = pau.split("-"); left = Math.round((new Date(+p[0], p[1] - 1, +p[2]).getTime() - day0(Date.now())) / DAY); }
    var days = left != null && left >= 0 ? Math.min(left + 1, 150) : 14;
    Promise.all(c.s.map(function (sj) { return load(sj).then(function (idx) { return [sj, idx]; }); })).then(function (rs) {
      var U = {}; rs.forEach(function (r) { U[r[0]] = r[1] ? units(r[0], r[1]) : []; });
      var R = reviews(), B = build(U, R, c, days), shown = B.plan.slice(0, 7), total = c.s.reduce(function (a, sj) { return a + (U[sj] || []).length; }, 0), nd = total - B.pend;
      var head, sub;
      if (left != null && left < 0) { head = t("La fecha ya pasó", "La data ja ha passat"); sub = t("Elige la fecha de tu próximo examen arriba para recalcular el plan.", "Tria la data del teu proper examen a dalt per recalcular el pla."); }
      else if (!B.pend) { head = t("¡Todos los ejercicios hechos!", "Tots els exercicis fets!"); sub = t("Dedica el tiempo a repasar lo que te falló y a simular exámenes con el cronómetro.", "Dedica el temps a repassar el que t’ha fallat i a simular exàmens amb el cronòmetre."); }
      else {
        head = B.left ? t("Con ", "Amb ") + hlabel(c.h) + t(" al día harás ", " al dia faràs ") + B.sched + t(" de ", " de ") + B.pend + t(" ejercicios", " exercicis") : t("Con ", "Amb ") + hlabel(c.h) + t(" al día llegas a todo", " al dia arribes a tot");
        sub = (left != null ? t("Quedan ", "Queden ") + left + (left === 1 ? t(" día", " dia") : t(" días", " dies")) + t(" hasta la PAU. ", " fins a la PAU. ") : t("Elige la fecha de tu examen arriba para repartirlo hasta ese día. ", "Tria la data del teu examen a dalt per repartir-ho fins aquell dia. ")) + nd + (nd === 1 ? t(" ejercicio ya hecho.", " exercici ja fet.") : t(" ejercicios ya hechos.", " exercicis ja fets."));
        if (B.left && left != null) { var h2 = Math.min(6, Math.ceil(B.need / (days * 60) * 2) / 2); sub += ' <span class="mkpl-w">' + t("Para llegar a todo necesitas unas ", "Per arribar a tot necessites unes ") + hlabel(h2) + t(" al día.", " al dia.") + "</span>"; }
      }
      var h = '<div class="mkpl"><div class="mkpl-sum"><b>' + esc(head) + "</b><span>" + sub + '</span></div><div class="mkpl-ct"><div class="mkpl-st" role="group" aria-label="' + esc(t("Horas de estudio al día", "Hores d’estudi al dia")) + '"><button type="button" data-pl="h-" aria-label="' + esc(t("Menos tiempo", "Menys temps")) + '"' + (c.h <= .5 ? " disabled" : "") + '>−</button><output aria-live="polite">' + hlabel(c.h) + t(" al día", " al dia") + '</output><button type="button" data-pl="h+" aria-label="' + esc(t("Más tiempo", "Més temps")) + '"' + (c.h >= 6 ? " disabled" : "") + '>+</button></div>' +
        '<div class="mkpl-sj" role="group" aria-label="' + esc(t("Materias del plan", "Matèries del pla")) + '">' + Object.keys(SJ).map(function (k) { return '<button type="button" data-pl="s:' + k + '" aria-pressed="' + (c.s.indexOf(k) >= 0) + '" style="--c:' + SJ[k][2] + '">' + esc(es() ? SJ[k][0] : SJ[k][1]) + "</button>"; }).join("") + "</div></div>";
      shown.forEach(function (d, i) {
        var mins = d.tasks.reduce(function (a, x) { return a + x.mins; }, 0);
        h += '<div class="mkpl-d' + (i === 0 ? " now" : "") + '"><div class="mkpl-dh"><b>' + esc(dayLabel(d.dt, i)) + "</b><span>" + (d.tasks.length ? "~" + mins + " min" : "") + "</span></div>";
        if (!d.tasks.length) h += '<p class="mkpl-e">' + t("Día libre. Un repaso corto de lo que fallaste siempre suma.", "Dia lliure. Un repàs curt del que has fallat sempre suma.") + "</p>";
        d.tasks.forEach(function (x) {
          if (x.k === "r") { var r = x.r; h += '<button type="button" class="mkpl-tk" data-go="' + esc(r.sj + "|" + r.id) + '" style="--c:#ff9f0a"><i class="mkpl-dot"></i><span><b>' + t("Repaso · ", "Repàs · ") + "PAU " + r.y + " · " + t("Serie ", "Sèrie ") + r.sid + " · " + esc(r.u.replace(/^([A-Z])\|/, "$1 · ")) + "</b><small>" + t("Apartado que te falló", "Apartat que t’ha fallat") + "</small></span><em>~8 min</em></button>"; }
          else { var u = x.u; h += '<button type="button" class="mkpl-tk' + (u.done ? " dn" : "") + '" data-go="' + esc(u.sj + "|" + u.key + "|" + u.first) + '" style="--c:' + SJ[u.sj][2] + '"><i class="mkpl-dot"></i><span><b>' + esc(u.lab) + "</b><small>" + esc((es() ? SJ[u.sj][0] : SJ[u.sj][1]) + (u.th ? " · " + u.th : "")) + "</small></span><em>~" + u.mins + " min</em></button>"; }
        });
        h += "</div>";
      });
      el.innerHTML = h + "</div>";
    });
  }
  function mount(el) {
    css(); if (!el.__pl) { el.__pl = 1;
      el.addEventListener("click", function (e) {
        var b = e.target.closest("[data-pl],[data-go]"); if (!b) return;
        if (b.hasAttribute("data-go")) {
          var p = b.getAttribute("data-go").split("|"), sj = p[0], id = p[1] + "|" + p.slice(2).join("|");
          if (p.length > 3 || /^\d{4}-\d+$/.test(p[1])) id = p[1] + "|" + p.slice(2).join("|");
          try { sessionStorage.setItem("mk-pm-go", JSON.stringify({ s: sj, rv: id })); } catch (x) { }
          if (window.mkStats && window.mkStats.close) window.mkStats.close();
          if (/problemes\.html$/.test(location.pathname)) { if (location.hash === "#pau") location.reload(); else location.hash = "#pau"; } else location.href = "problemes.html#pau"; return;
        }
        var a = b.getAttribute("data-pl"), c = cfg();
        if (a === "h+") c.h = Math.min(6, c.h + .5); else if (a === "h-") c.h = Math.max(.5, c.h - .5);
        else if (a.indexOf("s:") === 0) { var k = a.slice(2), i = c.s.indexOf(k); if (i >= 0) { if (c.s.length > 1) c.s.splice(i, 1); } else c.s.push(k); }
        s("mk-plan", c); var y = el.closest(".mks-bd"); var top = y ? y.scrollTop : 0; render(el); if (y) setTimeout(function () { y.scrollTop = top; }, 0);
      });
    }
    render(el);
  }
  window.mkPlan = { mount: mount, build: build };
})();
