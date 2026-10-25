/* Menudo Kanteo — service worker (sense connexió) */
const CACHE='mk-a85c6b08a9';
const CORE=["./", "index.html", "mates.html", "fisica.html", "filosofia.html", "novetats.html", "buscador.json", "manifest.webmanifest", "icons/icon-192.png", "icons/apple-touch-icon.png", "figm/m05_f12.png", "figm/m05_f13.png", "figm/m05_f25.png", "figm/m11_f23.png", "figm/m05_f13b.png", "figm/m01_f02.png", "figm/m10_f20.png", "figm/m02_f07.png", "figm/m10_f21.png", "figm/m07_f16.png", "figm/m06_f14.png", "figm/m01_f01.png", "figm/m09_f17.png", "figm/m02_f06.png", "figm/m02_f04.png", "figm/m03_f11.png", "figm/m06_f15.png", "figm/m11_f22.png", "figm/m02_f09.png", "figm/m12_f26.png", "figm/m09_f18.png", "figm/m02_f10.png", "figm/m02_f03.png", "figm/m02_f05.png", "figm/m02_f08.png", "figm/m11_f24.png", "figm/m10_f19.png", "figs/t07_f04.png", "figs/t08_f06.png", "figs/t07_f02.png", "figs/t02_f04.png", "figs/t08_f03.png", "figs/t03_f02.png", "figs/t05_f07.png", "figs/t04_f07.png", "figs/t06_f04.png", "figs/t01_f04.png", "figs/t08_f09.png", "figs/t03_f06.png", "figs/t01_f01.png", "figs/t06_f09.png", "figs/t02_f07.png", "figs/t02_f10.png", "figs/t05_f05.png", "figs/t06_f01.png", "figs/t01_f02.png", "figs/t05_f02.png", "figs/t03_f04.png", "figs/t07_f07.png", "figs/t10_f04.png", "figs/t09_f03.png", "figs/t09_f04.png", "figs/t11_f03.png", "figs/t08_f05.png", "figs/t08_f02.png", "figs/t04_f04.png", "figs/t04_f02.png", "figs/t11_f01.png", "figs/t02_f02.png", "figs/t07_f05.png", "figs/t10_f02.png", "figs/t06_f06.png", "figs/t01_f09.png", "figs/t02_f09.png", "figs/t01_f07.png", "figs/t05_f08.png", "figs/t01_f05.png", "figs/t11_f04.png", "figs/t09_f01.png", "figs/t02_f01.png", "figs/t10_f03.png", "figs/t07_f03.png", "figs/t03_f09.png", "figs/t02_f03.png", "figs/t03_f05.png", "figs/t01_f10.png", "figs/t07_f08.png", "figs/t03_f07.png", "figs/t08_f04.png", "figs/t03_f08.png", "figs/t06_f07.png", "figs/t09_f02.png", "figs/t08_f07.png", "figs/t05_f06.png", "figs/t07_f01.png", "figs/t04_f05.png", "figs/t02_f06.png", "figs/t03_f03.png", "figs/t08_f01.png", "figs/t04_f06.png", "figs/t05_f04.png", "figs/t01_f08.png", "figs/t01_f03.png", "figs/t08_f10.png", "figs/t06_f03.png", "figs/t07_f06.png", "figs/t06_f08.png", "figs/t11_f02.png", "figs/t11_f05.png", "figs/t08_f08.png", "figs/t04_f01.png", "figs/t08_f11.png", "figs/t03_f01.png", "figs/t06_f02.png", "figs/t02_f08.png", "figs/t10_f01.png", "figs/t06_f05.png", "figs/t04_f03.png", "figs/t01_f06.png", "figs/t02_f05.png", "figs/t05_f03.png", "figs/t05_f01.png", "filo/mill_01.jpg", "filo/nietzsche_09.jpg", "filo/platon_07.jpg", "filo/platon_02.jpg", "filo/platon_12.jpg", "filo/descartes_07.jpg", "filo/nietzsche_04.jpg", "filo/nietzsche_hero.jpg", "filo/locke_01.jpg", "filo/locke_03.jpg", "filo/kant_06.jpg", "filo/nietzsche_t.jpg", "filo/descartes_03.jpg", "filo/platon_10.jpg", "filo/descartes_00.jpg", "filo/hume_01.jpg", "filo/mill_t.jpg", "filo/platon_01.jpg", "filo/mill_hero.jpg", "filo/descartes_06.jpg", "filo/kant_05.jpg", "filo/kant_t.jpg", "filo/descartes_hero.jpg", "filo/kant_hero.jpg", "filo/platon_00.jpg", "filo/kant_08.jpg", "filo/locke_04.jpg", "filo/kant_09.jpg", "filo/hume_hero.jpg", "filo/nietzsche_06.jpg", "filo/mill_02.jpg", "filo/descartes_10.jpg", "filo/nietzsche_07.jpg", "filo/platon_t.jpg", "filo/nietzsche_05.jpg", "filo/kant_10.jpg", "filo/nietzsche_08.jpg", "filo/platon_04.jpg", "filo/locke_00.jpg", "filo/kant_02.jpg", "filo/descartes_05.jpg", "filo/locke_02.jpg", "filo/kant_04.jpg", "filo/mill_00.jpg", "filo/platon_06.jpg", "filo/locke_05.jpg", "filo/hume_04.jpg", "filo/descartes_02.jpg", "filo/platon_03.jpg", "filo/descartes_11.jpg", "filo/descartes_09.jpg", "filo/locke_t.jpg", "filo/nietzsche_01.jpg", "filo/nietzsche_02.jpg", "filo/descartes_01.jpg", "filo/kant_07.jpg", "filo/nietzsche_00.jpg", "filo/nietzsche_03.jpg", "filo/locke_07.jpg", "filo/descartes_04.jpg", "filo/hume_02.jpg", "filo/hume_03.jpg", "filo/descartes_08.jpg", "filo/hume_00.jpg", "filo/platon_11.jpg", "filo/hume_t.jpg", "filo/kant_00.jpg", "filo/descartes_t.jpg", "filo/kant_01.jpg", "filo/platon_09.jpg", "filo/locke_hero.jpg", "filo/locke_08.jpg", "filo/locke_06.jpg", "filo/kant_03.jpg", "filo/platon_hero.jpg", "filo/platon_08.jpg", "filo/platon_05.jpg", "filo/hume_05.jpg", "data/m-form.json", "data/f-t1.json", "data/f-t5.json", "data/m-t1.json", "data/m-t9.json", "data/f-t4.json", "data/f-t11.json", "data/f-t10.json", "data/f-t9.json", "data/f-t8.json", "data/m-t4.json", "data/m-t11.json", "data/f-t7.json", "data/m-t12.json", "data/m-t2.json", "data/f-t6.json", "data/f-t2.json", "data/f-t3.json", "data/m-t10.json", "data/m-t5.json", "data/m-t8.json", "data/m-prob.json", "data/m-t3.json", "data/m-t6.json", "data/m-t7.json", "fonts/f3ad42349f4.woff2", "fonts/f633f107217.woff2", "fonts/f7c54ed8d76.woff2", "fonts/f8a5b8a13e7.woff2", "fonts/f17fdee91f5.woff2", "fonts/fc267784d51.woff2", "fonts/f9b8790e4a8.woff2", "fonts/f20179d4dcc.woff2", "fonts/f24c2f4e0a2.woff2", "fonts/f6dbf2b405f.woff2", "fonts/f6f622e7f1f.woff2", "fonts/fe6237c63d4.woff2", "fonts/f9d31a47916.woff2", "img/prev-m1.jpg", "img/prev-f2.jpg", "img/prev-f1.jpg", "img/prev-f3.jpg", "img/logo-b.png", "img/logo-a.png", "img/prev-m2.jpg", "img/prev-m3.jpg"];
const EXTRA=['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(CACHE);
    // pàgines primer; la resta es pot perdre sense trencar la instal·lació
    await Promise.all(CORE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));
    await Promise.all(EXTRA.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{})));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k.startsWith('mk-')&&k!==CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
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
      try{const res=await Promise.race([fetch(r),new Promise((_,j)=>setTimeout(j,6000))]);
        if(res&&res.ok){const c=await caches.open(CACHE);c.put(r.url.split('#')[0],res.clone())}return res}
      catch(_){const c=await caches.open(CACHE);
        return (await c.match(r,{ignoreSearch:true}))||(await c.match('index.html'))||Response.error()}
    })());
    return;
  }
  if(!same&&!/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host))return;
  // recursos: del cau i s'actualitza al fons
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    const hit=await c.match(r,{ignoreSearch:same});
    const net=fetch(r).then(res=>put(r,res)).catch(()=>null);
    return hit||(await net)||Response.error();
  })());
});
