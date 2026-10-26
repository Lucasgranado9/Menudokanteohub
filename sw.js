/* Menudo Kanteo — service worker (sense connexió) */
const CACHE='mk-34dd9b6412';
const CORE=["./", "index.html", "mates.html", "fisica.html", "filosofia.html", "novetats.html", "sobre.html", "avis-legal.html", "privacitat.html", "buscador.json", "buscador-titols.json", "manifest.webmanifest", "icons/icon-192.png", "icons/apple-touch-icon.png", "img/logo-a.webp", "img/logo-b.webp", "fonts/f3ad42349f4.woff2", "fonts/f633f107217.woff2", "fonts/f7c54ed8d76.woff2", "fonts/f8a5b8a13e7.woff2", "fonts/f17fdee91f5.woff2", "fonts/fc267784d51.woff2", "fonts/f9b8790e4a8.woff2", "fonts/f20179d4dcc.woff2", "fonts/f24c2f4e0a2.woff2", "fonts/f6dbf2b405f.woff2", "fonts/f6f622e7f1f.woff2", "fonts/fe6237c63d4.woff2", "fonts/f9d31a47916.woff2"];
const WARM={"mates": ["data/m-form.json", "data/m-prob.json", "data/m-t1.json", "data/m-t10.json", "data/m-t11.json", "data/m-t12.json", "data/m-t2.json", "data/m-t3.json", "data/m-t4.json", "data/m-t5.json", "data/m-t6.json", "data/m-t7.json", "data/m-t8.json", "data/m-t9.json"], "fisica": ["data/f-t1.json", "data/f-t10.json", "data/f-t11.json", "data/f-t2.json", "data/f-t3.json", "data/f-t4.json", "data/f-t5.json", "data/f-t6.json", "data/f-t7.json", "data/f-t8.json", "data/f-t9.json"], "filosofia": ["filo/descartes_hero.jpg", "filo/descartes_t.jpg", "filo/hume_hero.jpg", "filo/hume_t.jpg", "filo/kant_hero.jpg", "filo/kant_t.jpg", "filo/locke_hero.jpg", "filo/locke_t.jpg", "filo/mill_hero.jpg", "filo/mill_t.jpg", "filo/nietzsche_hero.jpg", "filo/nietzsche_t.jpg", "filo/nussbaum_hero.jpg", "filo/nussbaum_t.jpg", "filo/platon_hero.jpg", "filo/platon_t.jpg"]};
const FULL={"mates": {"f": [["data/m-form.json", 242852], ["data/m-prob.es.json", 1969599], ["data/m-prob.json", 1969251], ["data/m-t1.json", 211270], ["data/m-t10.json", 122172], ["data/m-t11.json", 289370], ["data/m-t12.json", 115069], ["data/m-t2.json", 113863], ["data/m-t3.json", 73165], ["data/m-t4.json", 102860], ["data/m-t5.json", 71166], ["data/m-t6.json", 193248], ["data/m-t7.json", 122509], ["data/m-t8.json", 149343], ["data/m-t9.json", 116094], ["figm/bloc1.webp", 8398], ["figm/bloc2.webp", 12960], ["figm/bloc3.webp", 7492], ["figm/bloc4.webp", 24608], ["figm/m01_f01.png", 47580], ["figm/m01_f02.png", 23190], ["figm/m02_f03.png", 21874], ["figm/m02_f04.png", 6613], ["figm/m02_f05.png", 12162], ["figm/m02_f06.png", 19146], ["figm/m02_f07.png", 16651], ["figm/m02_f08.png", 14085], ["figm/m02_f09.png", 18971], ["figm/m02_f10.png", 26221], ["figm/m03_f11.png", 19822], ["figm/m05_f12.png", 10133], ["figm/m05_f13.png", 15235], ["figm/m05_f13b.png", 19425], ["figm/m05_f25.png", 12545], ["figm/m06_f14.png", 11773], ["figm/m06_f15.png", 21927], ["figm/m07_f16.png", 21802], ["figm/m09_f17.png", 18755], ["figm/m09_f18.png", 6404], ["figm/m10_f19.png", 12620], ["figm/m10_f20.png", 15157], ["figm/m10_f21.png", 4012], ["figm/m11_f22.png", 7698], ["figm/m11_f23.png", 9427], ["figm/m11_f24.png", 8673], ["figm/m12_f26.png", 25488], ["data/i18n.es.json", 65504]], "b": 6428182}, "fisica": {"f": [["data/f-p1.es.json", 203798], ["data/f-p10.es.json", 120773], ["data/f-p11.es.json", 144936], ["data/f-p2.es.json", 157996], ["data/f-p3.es.json", 127035], ["data/f-p4.es.json", 75851], ["data/f-p5.es.json", 107652], ["data/f-p6.es.json", 73084], ["data/f-p7.es.json", 76275], ["data/f-p8.es.json", 103139], ["data/f-p9.es.json", 156900], ["data/f-t1.json", 629112], ["data/f-t10.json", 242938], ["data/f-t11.json", 395258], ["data/f-t2.json", 545172], ["data/f-t3.json", 319827], ["data/f-t4.json", 235080], ["data/f-t5.json", 326633], ["data/f-t6.json", 263548], ["data/f-t7.json", 215183], ["data/f-t8.json", 228953], ["data/f-t9.json", 269386], ["figs/bloc1.webp", 30502], ["figs/bloc2.webp", 10280], ["figs/bloc3.webp", 18570], ["figs/bloc4.webp", 47974], ["figs/t01_f01.png", 32884], ["figs/t01_f02.png", 13135], ["figs/t01_f03.png", 10401], ["figs/t01_f04.png", 56082], ["figs/t01_f05.png", 21688], ["figs/t01_f06.png", 17065], ["figs/t01_f07.png", 12921], ["figs/t01_f08.png", 24563], ["figs/t01_f09.png", 16244], ["figs/t01_f10.png", 32292], ["figs/t02_f01.png", 16079], ["figs/t02_f02.png", 14861], ["figs/t02_f03.png", 27967], ["figs/t02_f04.png", 32644], ["figs/t02_f05.png", 16348], ["figs/t02_f06.png", 20019], ["figs/t02_f07.png", 30847], ["figs/t02_f08.png", 16599], ["figs/t02_f09.png", 16300], ["figs/t02_f10.png", 16205], ["figs/t03_f01.png", 44297], ["figs/t03_f02.png", 17672], ["figs/t03_f03.png", 40590], ["figs/t03_f04.png", 31595], ["figs/t03_f05.png", 35680], ["figs/t03_f06.png", 17515], ["figs/t03_f07.png", 42205], ["figs/t03_f08.png", 42031], ["figs/t03_f09.png", 21819], ["figs/t04_f01.png", 36920], ["figs/t04_f02.png", 19393], ["figs/t04_f03.png", 30156], ["figs/t04_f04.png", 31307], ["figs/t04_f05.png", 23859], ["figs/t04_f06.png", 10553], ["figs/t04_f07.png", 12152], ["figs/t05_f01.png", 20779], ["figs/t05_f02.png", 26477], ["figs/t05_f03.png", 29445], ["figs/t05_f04.png", 29299], ["figs/t05_f05.png", 29115], ["figs/t05_f06.png", 18031], ["figs/t05_f07.png", 20027], ["figs/t05_f08.png", 32185], ["figs/t06_f01.png", 35750], ["figs/t06_f02.png", 30367], ["figs/t06_f03.png", 24895], ["figs/t06_f04.png", 24455], ["figs/t06_f05.png", 94627], ["figs/t06_f06.png", 28492], ["figs/t06_f07.png", 39688], ["figs/t06_f08.png", 33678], ["figs/t06_f09.png", 44567], ["figs/t07_f01.png", 27685], ["figs/t07_f02.png", 22945], ["figs/t07_f03.png", 20301], ["figs/t07_f04.png", 8766], ["figs/t07_f05.png", 19709], ["figs/t07_f06.png", 16880], ["figs/t07_f07.png", 12051], ["figs/t07_f08.png", 32823], ["figs/t08_f01.png", 9328], ["figs/t08_f02.png", 15397], ["figs/t08_f03.png", 13433], ["figs/t08_f04.png", 32310], ["figs/t08_f05.png", 5690], ["figs/t08_f06.png", 22034], ["figs/t08_f07.png", 34794], ["figs/t08_f08.png", 5043], ["figs/t08_f09.png", 24598], ["figs/t08_f10.png", 33319], ["figs/t08_f11.png", 8950], ["figs/t09_f01.png", 40598], ["figs/t09_f02.png", 15168], ["figs/t09_f03.png", 29718], ["figs/t09_f04.png", 28309], ["figs/t10_f01.png", 19640], ["figs/t10_f02.png", 18209], ["figs/t10_f03.png", 23239], ["figs/t10_f04.png", 25115], ["figs/t11_f01.png", 24243], ["figs/t11_f02.png", 33592], ["figs/t11_f03.png", 16219], ["figs/t11_f04.png", 18088], ["figs/t11_f05.png", 50196], ["data/i18n.es.json", 65504]], "b": 7364514}, "filosofia": {"f": [["data/a1.json", 44111], ["data/a2.json", 50366], ["data/a3.json", 40763], ["data/a4.json", 36486], ["data/a5.json", 60333], ["data/a6.json", 28353], ["data/a7.json", 51101], ["data/a8.json", 30974], ["filo/descartes_00.jpg", 109260], ["filo/descartes_01.jpg", 34303], ["filo/descartes_02.jpg", 25371], ["filo/descartes_03.jpg", 90480], ["filo/descartes_04.jpg", 61123], ["filo/descartes_05.jpg", 28917], ["filo/descartes_06.jpg", 15068], ["filo/descartes_07.jpg", 16228], ["filo/descartes_08.jpg", 35714], ["filo/descartes_09.jpg", 11826], ["filo/descartes_10.jpg", 107223], ["filo/descartes_11.jpg", 9050], ["filo/descartes_hero.jpg", 65093], ["filo/descartes_t.jpg", 3940], ["filo/hume_00.jpg", 19502], ["filo/hume_01.jpg", 29974], ["filo/hume_02.jpg", 3352], ["filo/hume_03.jpg", 91501], ["filo/hume_04.jpg", 16658], ["filo/hume_05.jpg", 53452], ["filo/hume_hero.jpg", 32370], ["filo/hume_t.jpg", 4035], ["filo/kant_00.jpg", 14387], ["filo/kant_01.jpg", 123157], ["filo/kant_02.jpg", 20734], ["filo/kant_03.jpg", 35871], ["filo/kant_04.jpg", 36560], ["filo/kant_05.jpg", 80291], ["filo/kant_06.jpg", 25057], ["filo/kant_07.jpg", 86797], ["filo/kant_08.jpg", 30549], ["filo/kant_09.jpg", 12412], ["filo/kant_10.jpg", 100159], ["filo/kant_hero.jpg", 42057], ["filo/kant_t.jpg", 3410], ["filo/locke_00.jpg", 39971], ["filo/locke_01.jpg", 22526], ["filo/locke_02.jpg", 14548], ["filo/locke_03.jpg", 118026], ["filo/locke_04.jpg", 36434], ["filo/locke_05.jpg", 22607], ["filo/locke_06.jpg", 27232], ["filo/locke_07.jpg", 20388], ["filo/locke_08.jpg", 40437], ["filo/locke_hero.jpg", 26296], ["filo/locke_t.jpg", 4296], ["filo/mill_00.jpg", 53306], ["filo/mill_01.jpg", 33459], ["filo/mill_02.jpg", 30007], ["filo/mill_hero.jpg", 22200], ["filo/mill_t.jpg", 5425], ["filo/nietzsche_00.jpg", 19347], ["filo/nietzsche_01.jpg", 22425], ["filo/nietzsche_02.jpg", 25392], ["filo/nietzsche_03.jpg", 25157], ["filo/nietzsche_04.jpg", 57708], ["filo/nietzsche_05.jpg", 22938], ["filo/nietzsche_06.jpg", 29559], ["filo/nietzsche_07.jpg", 56330], ["filo/nietzsche_08.jpg", 70115], ["filo/nietzsche_09.jpg", 94638], ["filo/nietzsche_hero.jpg", 47356], ["filo/nietzsche_t.jpg", 4489], ["filo/nussbaum_hero.jpg", 49924], ["filo/nussbaum_t.jpg", 5949], ["filo/platon_00.jpg", 26564], ["filo/platon_01.jpg", 37458], ["filo/platon_02.jpg", 44227], ["filo/platon_03.jpg", 16921], ["filo/platon_04.jpg", 124198], ["filo/platon_05.jpg", 33791], ["filo/platon_06.jpg", 27784], ["filo/platon_07.jpg", 19964], ["filo/platon_08.jpg", 17774], ["filo/platon_09.jpg", 33683], ["filo/platon_10.jpg", 52817], ["filo/platon_11.jpg", 46403], ["filo/platon_12.jpg", 14608], ["filo/platon_hero.jpg", 40788], ["filo/platon_t.jpg", 5571], ["data/extra.es.json", 53403], ["data/i18n.es.json", 65504]], "b": 3528311}};
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    // pàgines primer; la resta es pot perdre sense trencar la instal·lació
    await Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k.startsWith('mk-')&&k!==CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('message',e=>{
  const d=e.data;if(d==='skip'){self.skipWaiting();return}
  const p=e.ports&&e.ports[0];
  if(d&&d.st&&FULL[d.st]&&p){e.waitUntil((async()=>{const c=await caches.open(CACHE);let have=0;for(const it of FULL[d.st].f){if(await c.match(it[0]))have++}p.postMessage({have,total:FULL[d.st].f.length,bytes:FULL[d.st].b})})());return}
  if(d&&d.dl&&FULL[d.dl]){
    e.waitUntil((async()=>{const c=await caches.open(CACHE);const L=FULL[d.dl].f,q=L.slice();let done=0,fail=0;
      async function w(){for(let it;(it=q.shift());){try{if(!(await c.match(it[0])))await c.add(new Request(it[0]))}catch(_){fail++}done++;if(p)p.postMessage({done,total:L.length,fail})}}
      await Promise.all([w(),w(),w(),w()]);if(p)p.postMessage({done:L.length,total:L.length,fail,end:1})})());return}
  if(d&&d.warm&&WARM[d.warm]){
    // descàrrega en segon pla (de 2 en 2) per poder treballar sense connexió
    e.waitUntil((async()=>{const c=await caches.open(CACHE);const q=WARM[d.warm].slice();
      async function w(){for(let u;(u=q.shift());){if(await c.match(u))continue;try{await c.add(new Request(u))}catch(_){}}}
      await Promise.all([w(),w()])})());
  }
});
async function put(req,res){
  if(res&&(res.ok||res.type==='opaque')&&res.status!==206){const c=await caches.open(CACHE);c.put(req,res.clone())}
  return res;
}
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||r.headers.has('range'))return;
  const u=new URL(r.url);
  if(u.protocol!=='http:'&&u.protocol!=='https:')return;
  const same=u.origin===location.origin;
  if(r.mode==='navigate'){
    // xarxa primer (per veure sempre l'última versió) i còpia local si no hi ha connexió
    e.respondWith((async()=>{
      const net=fetch(r).then(async res=>{if(res&&res.ok){const c=await caches.open(CACHE);c.put(r.url.split('#')[0],res.clone())}return res});
      try{return await Promise.race([net,new Promise((_,j)=>setTimeout(j,1500))])}
      catch(_){const c=await caches.open(CACHE);net.catch(()=>{});
        const hit=(await c.match(r,{ignoreSearch:true}))||(await c.match('index.html'));
        return hit||await net.catch(()=>Response.error())}
    })());
    return;
  }
  if(!same&&!/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host))return;
  // recursos estàtics (dades, imatges, tipus de lletra): del cau; si no hi són, xarxa i es desen
  // (cada versió del portal té el seu cau, per tant no cal revalidar-los a cada visita)
  const stat=same&&/\/(data|figs|figm|filo|fonts|img|icons)\//.test(u.pathname);
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    const hit=await c.match(r,{ignoreSearch:same});
    if(hit&&(stat||!same))return hit;
    const net=fetch(r).then(res=>put(r,res)).catch(()=>null);
    return hit||(await net)||Response.error();
  })());
});
