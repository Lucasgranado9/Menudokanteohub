/* Comprovació lleugera del web publicat: pàgines, enllaços interns, imatges, PDFs, manifest i service worker.
   Ús: node tests/links.js [URL base]   (per defecte, GitHub Pages). Surt amb codi 1 si hi ha errors. */
const BASE = (process.argv[2] || process.env.BASE_URL || 'https://lucasgranado9.github.io/Menudokanteohub/').replace(/\/?$/, '/');
const PAGES = ['index.html', 'mates.html', 'fisica.html', 'filosofia.html', 'novetats.html', 'preguntes.html', 'calculadora.html', 'sobre.html', 'avis-legal.html', 'privacitat.html', '404.html'];
const errors = [], seen = new Map();
async function get(url, asText) {
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url, { redirect: 'follow' }); return { ok: r.ok, status: r.status, text: asText && r.ok ? await r.text() : (await r.arrayBuffer(), ''), ct: r.headers.get('content-type') || '' }; }
    catch (e) { if (i === 2) return { ok: false, status: 'xarxa: ' + e.message, text: '', ct: '' }; await new Promise(r => setTimeout(r, 1500)); }
  }
}
async function check(url, from) {
  if (seen.has(url)) return;
  const p = get(url, false); seen.set(url, p); const r = await p;
  if (!r.ok) errors.push(r.status + '  ' + url + '   (des de ' + from + ')');
}
function refs(html) {
  const out = new Set(), re = /\b(?:href|src|poster)\s*=\s*["']([^"']+)["']/gi; let m;
  while ((m = re.exec(html))) out.add(m[1]);
  const ss = /\bsrcset\s*=\s*["']([^"']+)["']/gi; while ((m = ss.exec(html))) m[1].split(',').forEach(x => out.add(x.trim().split(/\s+/)[0]));
  return [...out];
}
(async () => {
  console.log('Comprovant', BASE);
  for (const pg of PAGES) {
    const r = await get(BASE + pg, true);
    if (!r.ok) { errors.push(r.status + '  ' + BASE + pg + '   (pàgina)'); continue; }
    if (pg !== '404.html' && !/<title>[^<]{3,}<\/title>/i.test(r.text)) errors.push('sense <title>: ' + pg);
    if (r.text.length < 5000) errors.push('pàgina buida o massa petita: ' + pg + ' (' + r.text.length + ' bytes)');
    for (const u of refs(r.text)) {
      if (/['"+{}$<>\\\s]/.test(u)) continue; /* plantilles de JS: es comproven a la llista fixa */
      if (/^(#|mailto:|tel:|javascript:|data:|blob:)/i.test(u) || /^https?:\/\//i.test(u) && !u.startsWith(BASE) || u.startsWith('//')) continue;
      const clean = u.split('#')[0].split('?')[0]; if (!clean || !/\.[a-z0-9]+$/i.test(clean) && !clean.endsWith('/')) continue; /* trossos de plantilla sense extensió */
      await check(new URL(clean, BASE + pg).href, pg);
    }
  }
  const mf = await get(BASE + 'manifest.webmanifest', true);
  if (!mf.ok) errors.push(mf.status + '  manifest.webmanifest');
  else {
    let j; try { j = JSON.parse(mf.text); } catch (e) { errors.push('manifest.webmanifest no és JSON vàlid'); }
    if (j) {
      for (const ic of j.icons || []) await check(new URL(ic.src, BASE).href, 'manifest');
      for (const s of j.shortcuts || []) { await check(new URL(s.url, BASE).href, 'manifest'); for (const ic of s.icons || []) await check(new URL(ic.src, BASE).href, 'manifest'); }
    }
  }
  const fixed = ['sw.js', 'buscador.json', 'buscador-titols.json', 'data/i18n.es.json', 'data/m-form.json', 'data/m-prob.json', 'figs/hero-fisica.webp', 'figm/hero-mates.webp'];
  for (let i = 1; i <= 12; i++) fixed.push('data/m-t' + i + '.json');
  for (let i = 1; i <= 11; i++) fixed.push('data/f-t' + i + '.json', 'data/f-p' + i + '.es.json');
  for (let i = 1; i <= 8; i++) fixed.push('data/a' + i + '.json');
  for (let i = 1; i <= 4; i++) fixed.push('figm/bloc' + i + '.webp', 'figs/bloc' + i + '.webp', 'figm/bloc' + i + '-cap.webp');
  fixed.push('figm/bloc2-cl.webp', 'figm/bloc4-cl.webp', 'figm/cap-euler.webp', 'figm/cap-gauss.webp', 'figm/cap-arquimedes.webp', 'figm/cap-pascal.webp');
  for (const f of fixed) await check(BASE + f, 'llista fixa');
  for (const f of ['Apunts_Matematiques_II', 'Apunts_Fisica_II']) await check(BASE + 'pdf/' + f + '.pdf', 'comprovació fixa');
  console.log(seen.size + ' recursos comprovats en ' + PAGES.length + ' pàgines.');
  if (errors.length) { console.log('\n✗ ' + errors.length + ' problemes:'); errors.forEach(e => console.log('  - ' + e)); if (process.env.GITHUB_ACTIONS) errors.slice(0, 20).forEach(e => console.log('::error::' + e)); process.exit(1); }
  console.log('✓ Tot correcte.');
})();
