#!/usr/bin/env node
/* SVG -> PDF vectorial (Chromium). Uso: node tools/svg2pdf.js <dir-svg> <dir-pdf> [prefijo...] */
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const [src, dst] = process.argv.slice(2); fs.mkdirSync(dst, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage();
  for (const f of fs.readdirSync(src).filter(f => f.endsWith('.svg') && !f.endsWith('-d.svg'))) {
    const svg = fs.readFileSync(path.join(src, f), 'utf8');
    const m = svg.match(/<svg[^>]*\bwidth="([\d.]+)(pt|px)?"[^>]*\bheight="([\d.]+)(pt|px)?"/s) || [];
    const w = parseFloat(m[1] || 600) * (m[2] === 'pt' ? 4 / 3 : 1), h = parseFloat(m[3] || 400) * (m[4] === 'pt' ? 4 / 3 : 1);
    await pg.setContent(`<style>@page{margin:0;size:${w}px ${h}px}html,body{margin:0}svg{display:block;width:${w}px;height:${h}px}</style>` + svg.replace(/<\?xml[^>]*\?>|<!DOCTYPE[^>]*>/g, ''));
    await pg.pdf({ path: path.join(dst, f.replace('.svg', '.pdf')), width: w + 'px', height: h + 'px', printBackground: true, pageRanges: '1' });
  }
  await b.close();
})();
