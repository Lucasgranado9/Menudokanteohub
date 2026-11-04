/* Detalles de sistema · Menudo Kanteo
   · Sonido y vibración con criterio (solo si «Sonidos» está activado en Configuración)
   · Transición entre páginas: la tarjeta pulsada se convierte en la cabecera de la página
   · Tamaño de texto del sistema (Dynamic Type en Safari) y contraste alto si el sistema lo pide
   · Cambio de tema suave
   · Insignia con tu racha en el icono de la app instalada  */
(function () {
  "use strict";
  var root = document.documentElement, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function es() { return window.MKL ? !!window.MKL.es : root.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function ls(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- sonido y vibración ---------- */
  var ac = null;
  var T = { fav: [[740, 1046, .08]], unfav: [[600, 420, .08]], pin: [[520, 780, .07], [780, 1040, .08]], mark: [[660, 990, .09]], swipe: [[900, 700, .04]], end: [[523, 659, .12], [659, 784, .12], [784, 1046, .2]], open: [[700, 880, .05]], done: [[660, 880, .1], [880, 1318, .14]] };
  var V = { tap: 8, fav: 10, unfav: 8, pin: [10, 30, 10], mark: 12, swipe: 14, end: [120, 80, 120], done: [14, 40, 14], open: 6 };
  function on() { return ls("mk-snd") === "1"; }
  function tone(list) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume();
      var t0 = ac.currentTime;
      list.forEach(function (n, i) {
        var o = ac.createOscillator(), g = ac.createGain(), s = t0 + i * .07;
        o.type = "sine"; o.frequency.setValueAtTime(n[0], s); o.frequency.exponentialRampToValueAtTime(n[1], s + n[2]);
        g.gain.setValueAtTime(1e-4, s); g.gain.exponentialRampToValueAtTime(.06, s + .01); g.gain.exponentialRampToValueAtTime(1e-4, s + n[2]);
        o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + n[2] + .03);
      });
    } catch (e) {}
  }
  window.mkFx = {
    snd: function (n) { if (on() && T[n]) tone(T[n]); },
    hap: function (n) { if (!on()) return; try { navigator.vibrate && navigator.vibrate(V[n] || 8); } catch (e) {} },
    fb: function (n) { this.snd(n); this.hap(n); }
  };

  /* la opción «Sonidos» pasa a llamarse «Sonidos y vibración» */
  function relabel() {
    var rows = document.querySelectorAll(".mk-gp .mk-gl, .mk-gp .mk-gr span, .mk-gp label"), done = false;
    [].forEach.call(rows, function (n) { if (/^(Sonidos|Sons)$/.test(n.textContent.trim())) { n.textContent = t("Sonidos y vibración", "Sons i vibració"); done = true; } });
    return done;
  }
  (function wait() { if (relabel()) return; var mo = new MutationObserver(function () { if (relabel()) mo.disconnect(); }); mo.observe(document.documentElement, { childList: true, subtree: true }); setTimeout(function () { mo.disconnect(); }, 8000); })();

  /* ---------- transición tarjeta → página ---------- */
  addEventListener("pageswap", function (e) {
    if (!e.viewTransition) return;
    var card = window.__mkLastCard;
    var first = document.querySelector("main > :first-child, #view > :first-child");
    if (card && card.isConnected) { if (first) first.style.viewTransitionName = "none"; card.style.viewTransitionName = "mk-hero"; }
    else if (first) first.style.viewTransitionName = "none";
  });
  document.addEventListener("pointerdown", function (e) { var c = e.target.closest && e.target.closest(".course"); window.__mkLastCard = c || null; }, true);
  document.addEventListener("click", function (e) { var c = e.target.closest && e.target.closest(".course"); if (c) window.__mkLastCard = c; }, true);

  /* ---------- tamaño de texto del sistema / contraste ---------- */
  function dynType() {
    if (ls("mk-size")) return;
    try {
      var p = document.createElement("p"); p.style.cssText = "font:-apple-system-body;position:absolute;visibility:hidden;margin:0"; document.body.appendChild(p);
      var px = parseFloat(getComputedStyle(p).fontSize); p.remove();
      if (!(px > 0)) return; var r = px / 17, s = r >= 1.55 ? "xxl" : r >= 1.28 ? "xl" : r >= 1.1 ? "l" : r <= .9 ? "s" : "";
      if (s) root.setAttribute("data-size", s);
    } catch (e) {}
  }
  var hc = matchMedia("(prefers-contrast: more)");
  function contrast() { if (ls("mk-contrast")) return; if (hc.matches) root.setAttribute("data-contrast", "high"); else if (root.getAttribute("data-contrast") === "high" && !ls("mk-contrast")) root.removeAttribute("data-contrast"); }
  /* ---------- cambio de tema suave ---------- */
  var tt = 0;
  function ease() { if (reduce) return; root.classList.add("mk-th"); clearTimeout(tt); tt = setTimeout(function () { root.classList.remove("mk-th"); }, 700); }
  new MutationObserver(ease).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  var dk = matchMedia("(prefers-color-scheme: dark)"); dk.addEventListener && dk.addEventListener("change", ease);

  /* ---------- insignia de la app ---------- */
  function badge() {
    try { var n = window.mkStreak && window.mkStreak.data && window.mkStreak.data.n | 0; if (n > 0 && navigator.setAppBadge) navigator.setAppBadge(n); else if (navigator.clearAppBadge && !n) navigator.clearAppBadge(); } catch (e) {}
  }
  function boot() { dynType(); contrast(); hc.addEventListener && hc.addEventListener("change", contrast); badge(); }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { dynType(); badge(); } });
})();
