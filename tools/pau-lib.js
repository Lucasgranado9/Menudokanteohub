/* Utilitats per generar data/m-pau*.json (examens PAU de Matemàtiques II).
 * Contingut a tools/pau-2026.js. Execució: node tools/pau.js */
const katex = require('/opt/npm-tools/node_modules/katex');
const r = String.raw;

const ren = (tex, display) => katex.renderToString(tex, { displayMode: !!display, output: 'html', throwOnError: true, strict: 'ignore' });
const M = tex => ren(tex, false);               // fórmula en línia
const D = tex => '<div class="pd">' + ren(tex, true) + '</div>'; // fórmula destacada

/* text bilingüe: {ca, es}. Els fragments de fórmules són comuns. */
const T = (ca, es) => ({ ca, es });
const p = (ca, es) => ({ ca: '<p>' + ca + '</p>', es: '<p>' + es + '</p>' });
const ans = (ca, es) => ({ ca: '<p class="ans">' + ca + '</p>', es: '<p class="ans">' + es + '</p>' });
const ul = (...items) => ({ ca: '<ul>' + items.map(i => '<li>' + (i.ca ?? i) + '</li>').join('') + '</ul>', es: '<ul>' + items.map(i => '<li>' + (i.es ?? i) + '</li>').join('') + '</ul>' });
const html = s => ({ ca: s, es: s });          // bloc comú (fórmula destacada, gràfic…)
const J = (...a) => ({ ca: a.map(x => x.ca ?? x).join(''), es: a.map(x => x.es ?? x).join('') });

/* tria d'idioma recursiva */
function pick(o, lang) {
  if (Array.isArray(o)) return o.map(x => pick(x, lang));
  if (o && typeof o === 'object') {
    if ('ca' in o && 'es' in o && Object.keys(o).length === 2) return o[lang];
    const out = {}; for (const k in o) out[k] = pick(o[k], lang); return out;
  }
  return o;
}

/* gràfics SVG petits: hereten color del tema (classes .ax .c1 .c2 .fl .pt .lb) */
function plot({ w = 340, h = 230, xr, yr, curves = [], fill, vlines = [], hlines = [], points = [], labels = [], tickx = [], ticky = [], alt }) {
  const pad = 26, X = x => pad + (x - xr[0]) / (xr[1] - xr[0]) * (w - 2 * pad), Y = y => h - pad - (y - yr[0]) / (yr[1] - yr[0]) * (h - 2 * pad);
  const f4 = v => (+v.toFixed(2));
  let s = `<svg class="pp" viewBox="0 0 ${w} ${h}" role="img" aria-label="${alt}">`;
  if (fill) {
    const { f, g = () => 0, a, b, n = 160 } = fill; let up = [], dn = [];
    for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; up.push(`${f4(X(x))},${f4(Y(f(x)))}`); dn.unshift(`${f4(X(x))},${f4(Y(g(x)))}`); }
    s += `<polygon class="fl" points="${up.concat(dn).join(' ')}"/>`;
  }
  const ax0 = Math.min(Math.max(Y(0), pad), h - pad), ay0 = Math.min(Math.max(X(0), pad), w - pad);
  s += `<path class="ax" d="M${pad},${f4(ax0)}H${w - pad}M${f4(ay0)},${pad}V${h - pad}"/>`;
  tickx.forEach(t => { s += `<path class="ax" d="M${f4(X(t))},${f4(ax0 - 3)}v6"/><text class="lb" x="${f4(X(t))}" y="${f4(ax0 + 15)}" text-anchor="middle">${t}</text>`; });
  ticky.forEach(t => { s += `<path class="ax" d="M${f4(ay0 - 3)},${f4(Y(t))}h6"/><text class="lb" x="${f4(ay0 - 7)}" y="${f4(Y(t) + 4)}" text-anchor="end">${t}</text>`; });
  vlines.forEach(v => { s += `<path class="dsh" d="M${f4(X(v))},${pad}V${h - pad}"/>`; });
  hlines.forEach(v => { s += `<path class="dsh" d="M${pad},${f4(Y(v))}H${w - pad}"/>`; });
  curves.forEach((c, k) => {
    const [a, b] = c.dom || xr; let d = '', pen = false;
    for (let i = 0; i <= 320; i++) { const x = a + (b - a) * i / 320, y = c.f(x); if (!isFinite(y) || y < yr[0] - 0.5 || y > yr[1] + 0.5) { pen = false; continue; } d += (pen ? 'L' : 'M') + f4(X(x)) + ',' + f4(Y(y)); pen = true; }
    s += `<path class="c${(c.k ?? k) + 1}" d="${d}"/>`;
  });
  points.forEach(([x, y]) => { s += `<circle class="pt" cx="${f4(X(x))}" cy="${f4(Y(y))}" r="3.4"/>`; });
  labels.forEach(([x, y, t, anchor]) => { s += `<text class="lb" x="${f4(X(x))}" y="${f4(Y(y))}" text-anchor="${anchor || 'start'}">${t}</text>`; });
  return s + '</svg>';
}

module.exports = { M, D, T, p, ans, ul, html, J, pick, plot, r };
