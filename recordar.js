/* Menudo Kanteo — recordatorio diario (repasos pendientes y racha en juego).
   Opcional: pide permiso de notificaciones. Sin servidor: la página guarda un resumen mínimo en la caché
   «mkst» y el service worker lo lee cuando el navegador lo despierta (Periodic Background Sync, app instalada
   en Chrome/Android). Si el navegador no lo admite, el aviso no llega: la interfaz lo dice. Clave «mk-rem». */
(function () {
  "use strict";
  if (window.mkRem) return;
  var LS; try { LS = window.localStorage; LS.getItem("mk-x"); } catch (e) { LS = null; }
  function es() { return window.MKL ? !!window.MKL.es : document.documentElement.lang !== "ca"; }
  function t(a, b) { return es() ? a : b; }
  function g(k, d) { try { var v = JSON.parse(LS.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  var DAY = 864e5, IV = [1, 3, 7, 14, 30];
  var can = !!(LS && window.Notification && navigator.serviceWorker && window.caches);
  function cfg() { var c = g("mk-rem", null); return c && c.h >= 6 && c.h <= 23 ? c : null; }
  function on() { return !!cfg() && can && Notification.permission === "granted"; }
  function dues() { var r = g("mk-pmr", {}); return Object.keys(r).map(function (k) { var e = r[k]; return (e.t || 0) + IV[Math.min(e.n | 0, IV.length - 1)] * DAY; }); }
  function mirror() {
    var c = cfg(); if (!can || !c) return Promise.resolve();
    return caches.open("mkst").then(function (ch) {
      return ch.match("state").then(function (r) { return r ? r.json() : {}; }).catch(function () { return {}; }).then(function (old) {
        var sk = g("mk-streak", {}), st = { h: c.h, es: es() ? 1 : 0, due: dues(), sd: sk.d || "", sn: sk.n | 0, last: old.last || "" };
        return ch.put("state", new Response(JSON.stringify(st), { headers: { "content-type": "application/json" } }));
      });
    }).catch(function () { });
  }
  function reg() { return navigator.serviceWorker.ready.then(function (r) { if (r.periodicSync) return r.periodicSync.register("mk-rem", { minInterval: 6 * 36e5 }).then(function () { return true; }, function () { return false; }); return false; }).catch(function () { return false; }); }
  function enable(h) {
    if (!can) return Promise.resolve("unsupported");
    return Notification.requestPermission().then(function (p) {
      if (p !== "granted") return "denied";
      try { LS.setItem("mk-rem", JSON.stringify({ h: h })); } catch (e) { }
      return mirror().then(reg).then(function (ps) { return ps ? "ok" : "nobg"; });
    });
  }
  function disable() {
    try { LS.removeItem("mk-rem"); } catch (e) { }
    return caches.delete("mkst").then(function () { return navigator.serviceWorker.ready; }).then(function (r) { return r.periodicSync && r.periodicSync.unregister("mk-rem"); }).catch(function () { });
  }
  function test() { return navigator.serviceWorker.ready.then(function (r) { return r.showNotification("Menudo Kanteo", { body: t("Así se verá tu recordatorio. ¡A repasar!", "Així es veurà el teu recordatori. A repassar!"), icon: "icons/icon-192.png", tag: "mk-rem-test", data: { url: "problemes.html#pau" } }); }); }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function mount(el) {
    function draw(note) {
      var c = cfg(), act = on(), h = c ? c.h : 19, opts = "";
      for (var i = 7; i <= 23; i++) opts += '<option value="' + i + '"' + (i === h ? " selected" : "") + ">" + (i < 10 ? "0" : "") + i + ":00</option>";
      var perm = can && Notification.permission === "denied";
      el.innerHTML = '<div class="mks-row"><div><strong>' + t("Recordatorio diario", "Recordatori diari") + '</strong><span class="mks-s">' + (can ? t("Te avisa si tienes repasos pendientes o tu racha está en juego.", "T’avisa si tens repassos pendents o la teva ratxa és en joc.") : t("Tu navegador no admite notificaciones.", "El teu navegador no admet notificacions.")) + "</span></div></div>" +
        (can ? '<div class="mks-bs"><label class="mks-n" style="margin:0;display:flex;align-items:center;gap:8px" for="mks-rh">' + t("Hora", "Hora") + '<select id="mks-rh" class="mks-in" style="width:auto;min-height:44px">' + opts + '</select></label><button type="button" class="mks-b ' + (act ? "" : "p") + '" data-rm="' + (act ? "off" : "on") + '">' + (act ? t("Desactivar", "Desactiva") : t("Activar", "Activa")) + "</button>" + (act ? '<button type="button" class="mks-b" data-rm="test">' + t("Probar", "Prova") + "</button>" : "") + "</div>" : "") +
        '<p class="mks-n" style="margin:0" role="status">' + esc(note || (perm ? t("Las notificaciones están bloqueadas en los ajustes del navegador.", "Les notificacions estan bloquejades als ajustos del navegador.") : (act ? t("Activo. Funciona mejor con la app instalada en Android; en iPhone puede no llegar.", "Actiu. Funciona millor amb l’app instal·lada a Android; a l’iPhone pot no arribar.") : ""))) + "</p>";
    }
    if (!el._rm) { el._rm = 1; el.addEventListener("click", function (e) { var b = e.target.closest("[data-rm]"); if (!b) return; var a = b.getAttribute("data-rm"), h = +el.querySelector("#mks-rh").value;
      if (a === "on") enable(h).then(function (r) { draw(r === "ok" ? t("Listo. Te avisaré a las " + h + ":00.", "Fet. T’avisaré a les " + h + ":00.") : r === "nobg" ? t("Activado, pero este navegador solo avisa con la app abierta o instalada en Chrome.", "Activat, però aquest navegador només avisa amb l’app oberta o instal·lada a Chrome.") : r === "denied" ? t("Permiso denegado.", "Permís denegat.") : t("No disponible.", "No disponible.")); });
      else if (a === "off") disable().then(function () { draw(t("Recordatorio desactivado.", "Recordatori desactivat.")); });
      else test().then(function () { draw(t("Notificación enviada.", "Notificació enviada.")); }, function () { draw(t("No se pudo mostrar.", "No s’ha pogut mostrar.")); }); });
      el.addEventListener("change", function (e) { if (e.target.id === "mks-rh" && on()) { try { LS.setItem("mk-rem", JSON.stringify({ h: +e.target.value })); } catch (x) { } mirror(); } }); }
    draw();
  }
  if (on()) { mirror(); addEventListener("pagehide", mirror); document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") mirror(); }); }
  window.mkRem = { mount: mount, mirror: mirror, on: on };
})();
