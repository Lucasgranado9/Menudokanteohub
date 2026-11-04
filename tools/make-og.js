/* Genera las imágenes para compartir (1200×630) de las páginas que no tienen una propia.
   Uso: node tools/make-og.js  (requiere Playwright y la fuente Inter instalada) */
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const P = [
  ['problemes', '#6d28d9', 'PROBLEMES', 'Col·lecció de problemes', 'Matemàtiques II i Física II tipus selectivitat, amb solucions', 'FILTRA PER MATÈRIA · TEMA · ESTAT'],
  ['museu', '#5e5ce6', 'MUSEU', 'Museu interactiu', 'Laboratoris i simulacions per explorar la ciència', 'SISTEMA SOLAR · TAULA PERIÒDICA · CÈL·LULES · FOURIER'],
  ['calculadora', '#e11d48', 'NOTA', 'Calculadora de nota', 'Calcula la teva nota d’accés a la universitat', 'FASE GENERAL · FASE ESPECÍFICA · PONDERACIONS'],
  ['revista', '#be123c', 'REVISTA', 'Revista', 'Articles i curiositats de ciència i filosofia', 'LLEGEIX · APRÈN · DESCOBREIX'],
  ['sistema-solar', '#d97706', 'SOL', 'Sistema solar', 'Òrbites i planetes en 3D', 'EXPLORA · ROTA · ESCALA'],
  ['taula-periodica', '#0e7490', 'ELEMENTS', 'Taula periòdica', 'Els 118 elements, un per un', 'PROPIETATS · ELECTRONS · USOS'],
  ['celules', '#15803d', 'CÈL·LULES', 'Cèl·lules en 3D', 'Per dins d’una cèl·lula, en tres dimensions', 'ORGÀNULS · MEMBRANA · NUCLI'],
  ['fourier', '#9333ea', 'FOURIER', 'Laboratori de Fourier', 'Ones i sèries, amb les mans', 'HARMÒNICS · SÈRIES · ESPECTRE'],
  ['preguntes', '#1d4ed8', 'PREGUNTES', 'Preguntes freqüents', 'Respostes a les dubtes més habituals', 'COM FUNCIONA · DADES · SUPORT'],
  ['sobre', '#3f3f46', 'SOBRE', 'Sobre el projecte', 'Qui hi ha darrere de Menudo Kanteo', 'OBERT · GRATUÏT · PER A ESTUDIANTS'],
  ['avis-legal', '#3f3f46', 'LEGAL', 'Avís legal', 'Condicions d’ús del portal', 'MENUDO KANTEO'],
  ['privacitat', '#3f3f46', 'PRIVACITAT', 'Privacitat', 'Les teves dades es queden al teu navegador', 'SENSE COMPTES · SENSE SEGUIMENT'],
];
const b64 = f => 'data:image/webp;base64,' + fs.readFileSync(path.join(ROOT, f)).toString('base64');
const logoA = b64('img/logo-a.webp'), logoB = b64('img/logo-b.webp');
const html = (c, big, title, sub, tags) => {
  const fs0 = Math.max(54, Math.min(120, Math.floor(330 / (big.length * 0.66))));
  return `<!doctype html><meta charset=utf-8><style>*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;display:flex;font-family:Inter,sans-serif;background:#eeede9;color:#161618;overflow:hidden}
.l{width:430px;background:${c};color:#fff;padding:56px;display:flex;flex-direction:column;justify-content:space-between}.big{font-weight:900;font-size:${fs0}px;letter-spacing:-.04em;line-height:1;word-break:keep-all;margin-top:24px}.k{font-weight:600;font-size:22px;letter-spacing:.04em;opacity:.92;margin-top:-80px}.logo{display:block;width:300px;filter:brightness(0) invert(1)}
.r{flex:1;padding:0 70px 0 60px;display:flex;flex-direction:column;justify-content:center}h1{font-size:68px;font-weight:800;letter-spacing:-.035em;line-height:1.08}p{font-size:30px;color:#444;margin-top:28px;line-height:1.35}.t{font-size:22px;font-weight:600;color:#777;margin-top:34px;letter-spacing:.02em}.bar{width:90px;height:8px;background:${c};margin:46px 0 22px}.s{font-size:26px;font-weight:700}</style>
<div class=l><div><div class=big>${big}</div></div><div><div class=k style="margin:0 0 28px">PREPARACIÓ PAU</div><img class=logo src="${logoA}"><img class=logo src="${logoB}" style="margin-top:-95px"></div></div>
<div class=r><h1>${title}</h1><p>${sub}</p><div class=t>${tags}</div><div class=bar></div><div class=s>Menudo Kanteo · apunts, laboratoris i problemes</div></div>`;
};
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [slug, c, big, title, sub, tags] of P) {
    await pg.setContent(html(c, big, title, sub, tags)); await pg.waitForTimeout(150);
    await pg.screenshot({ path: path.join(ROOT, 'icons/og-' + slug + '.png') });
    const f = path.join(ROOT, slug + '.html'); let h = fs.readFileSync(f, 'utf8');
    const url = 'https://lucasgranado9.github.io/Menudokanteohub/icons/og-' + slug + '.png';
    h = h.replace(/(property="og:image" content=")[^"]*"/, `$1${url}"`).replace(/(name="twitter:image" content=")[^"]*"/, `$1${url}"`)
      .replace(/(property="og:image:alt" content=")[^"]*"/, `$1Menudo Kanteo — ${title}"`).replace(/(name="twitter:image:alt" content=")[^"]*"/, `$1Menudo Kanteo — ${title}"`);
    fs.writeFileSync(f, h); console.log('✓', slug);
  }
  await b.close();
})();
