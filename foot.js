/* Menudo Kanteo — pie de página: en móvil las columnas se pliegan (acordeón accesible).
   Mejora progresiva: sin JS, o en pantallas anchas, se ven las 4 columnas de siempre. */
(function () {
  "use strict";
  var mq = matchMedia("(max-width: 640px)"), reduce = matchMedia("(prefers-reduced-motion: reduce)"), made = [], n = 0;
  function build() {
    var cols = document.querySelector("footer.gut .ft-cols"); if (!cols || cols.classList.contains("ft-on")) return;
    [].forEach.call(cols.querySelectorAll("nav"), function (nav) {
      var h = nav.querySelector(".ft-h"); if (!h) return;
      var id = "ft-p" + (++n), btn = document.createElement("button"), chev = document.createElement("i");
      btn.type = "button"; btn.className = "ft-acc"; btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", id);
      var kids = [].slice.call(h.childNodes); kids.forEach(function (k) { btn.appendChild(k); }); chev.setAttribute("aria-hidden", "true"); btn.appendChild(chev); h.appendChild(btn);
      var p = document.createElement("div"), pi = document.createElement("div"); p.className = "ft-p"; p.id = id; pi.className = "ft-pi"; p.appendChild(pi);
      var links = [].slice.call(nav.children).filter(function (c) { return c !== h; }); links.forEach(function (a) { pi.appendChild(a); }); nav.appendChild(p); p.setAttribute("inert", "");
      btn.addEventListener("click", function () { var o = btn.getAttribute("aria-expanded") !== "true"; btn.setAttribute("aria-expanded", String(o)); p.classList.toggle("open", o); if (o) p.removeAttribute("inert"); else p.setAttribute("inert", ""); try { window.mkFx && window.mkFx.hap && window.mkFx.hap(6); } catch (e) {} });
      made.push({ nav: nav, h: h, btn: btn, kids: kids, p: p, links: links });
    });
    cols.classList.add("ft-on");
  }
  function teardown() {
    var cols = document.querySelector("footer.gut .ft-cols"); if (!cols || !cols.classList.contains("ft-on")) return;
    made.forEach(function (m) { m.kids.forEach(function (k) { m.h.insertBefore(k, m.btn); }); m.btn.remove(); m.links.forEach(function (a) { m.nav.appendChild(a); }); m.p.remove(); });
    made = []; cols.classList.remove("ft-on");
  }
  function sync() { mq.matches ? build() : teardown(); }
  function boot() { sync(); mq.addEventListener ? mq.addEventListener("change", sync) : mq.addListener(sync); }
  if (document.readyState === "loading") addEventListener("DOMContentLoaded", boot); else boot();
})();
