#!/usr/bin/env node
/* Genera data/m-pau.json (índex) i data/m-pau-<any>-<sèrie>.json (examen sencer), cadascun en català (.json) i castellà (.es.json),
 * a partir de tools/pau-<any>.js. Les fórmules es pre-renderitzen amb KaTeX (el portal no carrega KaTeX en execució).
 * Ús: node tools/pau.js */
const fs = require('fs'), path = require('path');
const { pick } = require('./pau-lib');
const SUBJ = { m: { years: [...require('./pau-2026.js').years, require('./pau-2025.js').year, require('./pau-2024.js').year, require('./pau-2023.js').year, require('./pau-2022.js').year, require('./pau-2021.js').year] }, // més recent primer
  f: { years: [...require('./pau-fis-2026.js').years] },
  h: { years: [...require('./pau-fil-2026.js').years] } };
const join = v => Array.isArray(v) ? v.join('') : (v || '');
/* ── temes (classificació per temes de cada assignatura) ── */
const TH = {
  m: [['an', 'Anàlisi', 'Análisis'], ['int', 'Integrals', 'Integrales'], ['alg', 'Àlgebra lineal', 'Álgebra lineal'], ['geo', 'Geometria a l’espai', 'Geometría en el espacio'], ['prob', 'Probabilitat', 'Probabilidad'], ['opt', 'Optimització', 'Optimización']],
  f: [['g', 'Camps gravitatoris', 'Campos gravitatorios'], ['e', 'Camps electromagnètics', 'Campos electromagnéticos'], ['o', 'Vibracions i ones', 'Vibraciones y ondas'], ['n', 'Física relativista, quàntica, nuclear', 'Física relativista, cuántica, nuclear']],
  h: [['cr', 'Coneixement i realitat', 'Conocimiento y realidad'], ['et', 'Ètica', 'Ética'], ['po', 'Política i societat', 'Política y sociedad'], ['re', 'Ésser humà i religió', 'Ser humano y religión']],
};
const M_MAP = { 'Anàlisi': 'an', 'Integral': 'int', 'Àlgebra': 'alg', 'Matrius': 'alg', 'Geometria': 'geo', 'Probabilitat': 'prob', 'Optimització': 'opt' };
const F_MAP = { 'Camps gravitatoris': 'g', 'Camps electromagnètics': 'e', 'Vibracions i ones': 'o', 'Física relativista, quàntica, nuclear': 'n' };
function tagsOf(sj, e) {
  if (e.tags) return e.tags;
  const ca = e.topic && e.topic.ca != null ? e.topic.ca : e.topic;
  if (sj === 'f') return [F_MAP[ca]].filter(Boolean);
  if (sj === 'm') { const out = []; String(ca).split(/\s*·\s*|\s+i\s+/).forEach(w => { const k = M_MAP[w]; if (k && !out.includes(k)) out.push(k); }); return out; }
  return [];
}
/* text net per a la targeta: treu etiquetes i substitueix cada fórmula (KaTeX) per «⋯» */
function plain(h) {
  h = join(h); let out = '', i = 0;
  while (i < h.length) {
    const j = h.indexOf('<span class="katex"', i);
    if (j < 0) { out += h.slice(i); break; }
    out += h.slice(i, j); let d = 0, k = j;
    const re = /<span\b|<\/span>/g; re.lastIndex = j; let m;
    while ((m = re.exec(h))) { if (m[0] === '</span>') { d--; if (d === 0) { k = re.lastIndex; break; } } else d++; }
    out += '⋯'; i = k || h.length;
  }
  return out.replace(/<[^>]+>/g, ' ').replace(/&nbsp;| /g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/[​‌]/g, '').replace(/(⋯\s*)+/g, '⋯ ').replace(/\s+([.,;:])/g, '$1').replace(/\s+/g, ' ').trim();
}
function preview(x) {
  const src = [x.lead, x.intro, x.parts && x.parts[0].q, x.opts && x.opts[0].intro, x.opts && x.opts[0].parts[0].q];
  let txt = '';
  for (const s of src) { if (!s) continue; const t = plain(s); txt += (txt ? ' ' : '') + t; if (txt.replace(/⋯/g, '').length >= 40) break; }
  txt = txt.replace(/^Considereu |^Considere /, m => m);
  if (txt.length > 112) { txt = txt.slice(0, 112); txt = txt.slice(0, txt.lastIndexOf(' ')).replace(/[\s,;:.(]+$/, '') + '…'; }
  return txt;
}
/* previsualització del problema: primers blocs de l'enunciat (HTML amb fórmules ja renderitzades), sense figures */
const VOID = new Set(['br', 'img', 'hr', 'input', 'meta', 'link']);
function blocks(h) {
  h = join(h); const out = []; const re = /<(\/?)([a-z0-9]+)\b[^>]*?(\/?)>/gi; let d = 0, st = -1, m;
  while ((m = re.exec(h))) {
    const close = m[1] === '/', tag = m[2].toLowerCase(); if (!close && (VOID.has(tag) || m[3])) { if (d === 0) out.push(h.slice(m.index, re.lastIndex)); continue; }
    if (!close) { if (d === 0) st = m.index; d++; } else { d--; if (d === 0 && st >= 0) { out.push(h.slice(st, re.lastIndex)); st = -1; } }
  }
  return out;
}
function stem(x) {
  const src = [x.lead, x.intro, x.parts && x.parts[0].q, x.opts && x.opts[0].intro, x.opts && x.opts[0].parts[0].q], out = []; let len = 0, skipping = false;
  for (const s of src) {
    if (!s) continue;
    for (const b of blocks(s)) {
      if (/<figure\b|<svg class="pp"|<img\b|<table\b/.test(b)) { skipping = true; continue; }
      if (/^<span\b/.test(b)) continue; /* rótulos sueltos (de una figura omitida): solos no se entienden */
      skipping = false;
      if (out.length && (len + b.length > 9000 || out.length >= 4)) return out.join('');
      out.push(b); len += b.length;
    }
  }
  return out.join('');
}
const ids = (parts, k) => parts.map(p => (k ? k + '|' : '') + p.n);
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
    const idx = { years: [] }, pv = {};
    for (const y of src.years) {
      const yi = { y: y.y, series: [] };
      for (const s of y.series) {
        const ps = pick(s, lang), c = conv(ps);
        const n = c.ex.reduce((a, e) => a + (e.parts ? e.parts.length : Math.max(...e.opts.map(o => o.parts.length))), 0);
        const exi = c.ex.map((e, q) => {
          const raw = s.ex[q], pe = ps.ex[q], o = { n: e.n, pts: e.pts, topic: e.topic, choose: e.choose || 0, tags: tagsOf(sj, raw), ttl: pe.ttl || preview(pe) };
          if (!pe.parts && raw.opts.some(x => x.tags)) { delete o.tags; delete o.ttl; }
          const keyp = k => y.y + '-' + s.id + '-' + e.n + (k ? '-' + k : '');
          if (!pe.parts && raw.opts.some(x => x.tags)) pe.opts.forEach(x => { pv[keyp(x.k)] = stem(x); }); else pv[keyp('')] = stem(pe);
          if (pe.parts) o.ids = ids(pe.parts);
          else o.opts = pe.opts.map((x, r) => ({ k: x.k, ids: ids(x.parts, x.k), tags: raw.opts[r].tags || undefined, ttl: x.ttl || (raw.opts[r].tags ? preview(x) : undefined) }));
          return o;
        });
        yi.series.push({ id: s.id, pdf: s.pdf, ex: exi, np: n });
        const out = JSON.stringify(c);
        fs.writeFileSync(path.join(D, `${sj}-pau-${y.y}-${s.id}${sfx}.json`), out); total += out.length;
      }
      idx.years.push(yi);
    }
    fs.writeFileSync(path.join(D, `${sj}-pau-pv${sfx}.json`), JSON.stringify(pv));
    idx.th = TH[sj].map(x => ({ id: x[0], t: lang === 'es' ? x[2] : x[1] }));
    fs.writeFileSync(path.join(D, `${sj}-pau${sfx}.json`), JSON.stringify(idx));
  }
}
console.log('fet:', (total / 1024).toFixed(0), 'KB en total (', nyears, 'any(s))');
