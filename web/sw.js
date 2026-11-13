const BASE=new URL('./',self.location.href);
const CACHE_PREFIX='forge-shell-'+BASE.pathname.replace(/[^a-zA-Z0-9]/g,'_')+'-';
const CACHE=CACHE_PREFIX+'v4';
const SHELL=['./','./index.html','./style.css','./app.js','./beginner.js','./beginner.css','./config.js','./icon.svg','./manifest.webmanifest'].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(async cache=>{for(const url of SHELL){try{const r=await fetch(url);if(r.ok&&!r.redirected)await cache.put(url,r)}catch{}}}));self.skipWaiting()});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||!SHELL.includes(event.request.url))return;event.respondWith(fetch(event.request).then(response=>{if(response.ok&&!response.redirected&&response.type!=='opaqueredirect'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(async()=>await caches.match(event.request)||new Response('FORGE is offline. Reconnect once to load the app.',{status:503,headers:{'content-type':'text/plain'}})))});
