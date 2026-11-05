#!/usr/bin/env node
/* Genera data/m-pau.json (índex) i data/m-pau-<any>-<sèrie>.json (examen sencer), cadascun en català (.json) i castellà (.es.json),
 * a partir de tools/pau-<any>.js. Les fórmules es pre-renderitzen amb KaTeX (el portal no carrega KaTeX en execució).
 * Ús: node tools/pau.js */
const fs = require('fs'), path = require('path');
const { pick } = require('./pau-lib');
const SUBJ = { m: { years: [...require('./pau-2026.js').years, require('./pau-2025.js').year, require('./pau-2024.js').year, require('./pau-2023.js').year] }, // més recent primer
  f: { years: [...require('./pau-fis-2026.js').years] },
  h: { years: [...require('./pau-fil-2026.js').years] } };
const join = v => Array.isArray(v) ? v.join('') : (v || '');
const D = path.join(__dirname, '..', 'data');
const part = q => ({ n: q.n, pts: q.pts, q: join(q.q), sol: join(q.sol) });
function conv(s) {
  return { id: s.id, pdf: s.pdf, ex: s.ex.map(e => {
    const o = { n: e.n, pts: e.pts, topic: e.topic };
    if (e.choose) o.choose = 1;
    if (e.lead) o.lead = join(e.lead);
    if (e.intro) o.intro = join(e.intro);
    if (e.parts) o.parts = e.parts.map(part);
    if (e.opts) o.opts = e.opts.map(x => ({ k: x.k, intro: join(x.intro), parts: x.parts.map(part) }));
    return o;
  }) };
}
let total = 0, nyears = 0;
for (const [sj, src] of Object.entries(SUBJ)) {
  nyears += src.years.length;
  for (const lang of ['ca', 'es']) {
    const sfx = lang === 'es' ? '.es' : '';
    const idx = { years: [] };
    for (const y of src.years) {
      const yi = { y: y.y, series: [] };
      for (const s of y.series) {
        const c = conv(pick(s, lang));
        const n = c.ex.reduce((a, e) => a + (e.parts ? e.parts.length : Math.max(...e.opts.map(o => o.parts.length))), 0);
        yi.series.push({ id: s.id, pdf: s.pdf, ex: c.ex.map(e => ({ n: e.n, pts: e.pts, topic: e.topic, choose: e.choose || 0 })), np: n });
        const out = JSON.stringify(c);
        fs.writeFileSync(path.join(D, `${sj}-pau-${y.y}-${s.id}${sfx}.json`), out); total += out.length;
      }
      idx.years.push(yi);
    }
    fs.writeFileSync(path.join(D, `${sj}-pau${sfx}.json`), JSON.stringify(idx));
  }
}
console.log('fet:', (total / 1024).toFixed(0), 'KB en total (', nyears, 'any(s))');
