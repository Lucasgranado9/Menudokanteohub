const { M, D, T, p, ans, ul, html, J, plot, r } = require('../pau-lib');
const TOP = {
  g: T('Camps gravitatoris', 'Campos gravitatorios'), e: T('Camps electromagnètics', 'Campos electromagnéticos'),
  o: T('Vibracions i ones', 'Vibraciones y ondas'), n: T('Física relativista, quàntica, nuclear', 'Física relativista, cuántica, nuclear'),
};
const F = tex => html(D(tex));
const AN = tex => ans('<b>' + M(tex) + '</b>', '<b>' + M(tex) + '</b>');
const DAT = (ca, es) => p('<b>Dades:</b> ' + ca, '<b>Datos:</b> ' + es);
const fig = svg => html('<figure class="pfig">' + svg + '</figure>');
const figL = fn => ({ ca: '<figure class="pfig">' + fn('ca') + '</figure>', es: '<figure class="pfig">' + fn('es') + '</figure>' });
const img = (f, w, h, ca, es) => ({ ca: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + ca + '"></figure>', es: '<figure class="pfig pimg"><img src="figm/pau/' + f + '.webp" width="' + w + '" height="' + h + '" loading="lazy" alt="' + es + '"></figure>' });
const f1 = v => +(+v).toFixed(1);
const SV = (w, h, alt, body) => `<svg class="pp" viewBox="0 0 ${w} ${h}" role="img" aria-label="${alt}">${body}</svg>`;
const LN = (x1, y1, x2, y2, c = 'ln') => `<path class="${c}" d="M${f1(x1)},${f1(y1)}L${f1(x2)},${f1(y2)}"/>`;
const AR = (x1, y1, x2, y2, c = 'vc') => {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 9, hx = x2 - s * Math.cos(a), hy = y2 - s * Math.sin(a), px = -Math.sin(a) * 3.8, py = Math.cos(a) * 3.8;
  return `<path class="${c}" d="M${f1(x1)},${f1(y1)}L${f1(hx)},${f1(hy)}"/><path class="${c} vh" d="M${f1(x2)},${f1(y2)}L${f1(hx + px)},${f1(hy + py)}L${f1(hx - px)},${f1(hy - py)}Z"/>`;
};
const TX = (x, y, t, a = 'middle') => `<text class="lb" x="${f1(x)}" y="${f1(y)}" text-anchor="${a}">${t}</text>`;
const DOT = (x, y, rr = 3.6, c = 'pt') => `<circle class="${c}" cx="${f1(x)}" cy="${f1(y)}" r="${rr}"/>`;
const RECT = (x, y, w, h, c = 'pl') => `<rect class="${c}" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}"/>`;
const PATH = (d, c = 'ln') => `<path class="${c}" d="${d}"/>`;
const L2 = (lang, ca, es) => lang === 'ca' ? ca : es;
const u = s => `\\text{${s}}`;
const GC = M('G=6{,}67\\cdot10^{-11}\\ \\text{N m}^2\\,\\text{kg}^{-2}');
const MTc = M('M_T=5{,}98\\cdot10^{24}\\ \\text{kg}'), RTc = M('R_T=6\\,370\\ \\text{km}');
const ECON = M('|e|=1{,}602\\cdot10^{-19}\\ \\text{C}'), MEC = M('m_e=9{,}11\\cdot10^{-31}\\ \\text{kg}'), CC = M('c=3{,}00\\cdot10^{8}\\ \\text{m s}^{-1}'), HC = M('h=6{,}63\\cdot10^{-34}\\ \\text{J s}');

const part = (n, q, sol, pts = 1.25) => ({ n, pts, q, sol });

const RT6 = M('R_T=6{,}37\\cdot10^{6}\\ \\text{m}');
const GS = '<b>';
const TAB = rows => html('<table class="pt-tab">' + rows.map((c, i) => '<tr>' + c.map(x => (i === 0 || (x && x.th) ? '<th>' : '<td>') + (x && x.th ? x.th : x) + (i === 0 ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</table>');
module.exports = { M, D, T, p, ans, ul, html, J, plot, r, TOP, F, AN, DAT, fig, figL, img, f1, SV, LN, AR, TX, DOT, RECT, PATH, L2, u, GC, MTc, RTc, ECON, MEC, CC, HC, part, RT6, TAB };
