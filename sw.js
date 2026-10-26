/* Menudo Kanteo — service worker (sense connexió) */
const CACHE='mk-afb5610124';
const CORE=["./", "index.html", "mates.html", "fisica.html", "filosofia.html", "novetats.html", "sobre.html", "avis-legal.html", "privacitat.html", "buscador.json", "buscador-titols.json", "manifest.webmanifest", "icons/icon-192.png", "icons/apple-touch-icon.png", "img/logo-a.webp", "img/logo-b.webp", "fonts/f3ad42349f4.woff2", "fonts/f633f107217.woff2", "fonts/f7c54ed8d76.woff2", "fonts/f8a5b8a13e7.woff2", "fonts/f17fdee91f5.woff2", "fonts/fc267784d51.woff2", "fonts/f9b8790e4a8.woff2", "fonts/f20179d4dcc.woff2", "fonts/f24c2f4e0a2.woff2", "fonts/f6dbf2b405f.woff2", "fonts/f6f622e7f1f.woff2", "fonts/fe6237c63d4.woff2", "fonts/f9d31a47916.woff2"];
const WARM={"mates": ["data/m-form.json", "data/m-prob.json", "data/m-t1.json", "data/m-t10.json", "data/m-t11.json", "data/m-t12.json", "data/m-t2.json", "data/m-t3.json", "data/m-t4.json", "data/m-t5.json", "data/m-t6.json", "data/m-t7.json", "data/m-t8.json", "data/m-t9.json"], "fisica": ["data/f-t1.json", "data/f-t10.json", "data/f-t11.json", "data/f-t2.json", "data/f-t3.json", "data/f-t4.json", "data/f-t5.json", "data/f-t6.json", "data/f-t7.json", "data/f-t8.json", "data/f-t9.json"], "filosofia": ["filo/descartes_hero.jpg", "filo/descartes_t.jpg", "filo/hume_hero.jpg", "filo/hume_t.jpg", "filo/kant_hero.jpg", "filo/kant_t.jpg", "filo/locke_hero.jpg", "filo/locke_t.jpg", "filo/mill_hero.jpg", "filo/mill_t.jpg", "filo/nietzsche_hero.jpg", "filo/nietzsche_t.jpg", "filo/nussbaum_hero.jpg", "filo/nussbaum_t.jpg", "filo/platon_hero.jpg", "filo/platon_t.jpg"]};
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
