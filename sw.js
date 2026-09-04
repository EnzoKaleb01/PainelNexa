/* =========================================================
   PAINEL NEXA WEB — Service Worker
   Serve para duas coisas:
   1. deixar o painel ser instalado como aplicativo no celular;
   2. abrir o painel quando você toca numa notificação.

   Ele NÃO guarda em cache nada que venha do Supabase — o painel
   sempre lê dados frescos do banco.
   ========================================================= */

const CACHE = 'nexa-painel-v1';
const CASCA = ['./', './index.html', './icone-192.png', './manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(CASCA.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  const url = new URL(req.url);

  /* dados do banco e biblioteca: sempre da rede, nunca do cache */
  if(url.hostname.endsWith('.supabase.co') || url.hostname === 'esm.sh') return;

  /* fontes: cache primeiro, guardando uma cópia */
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    event.respondWith(
      caches.match(req).then(salvo => salvo || fetch(req).then(resp => {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
        return resp;
      }).catch(() => salvo))
    );
    return;
  }

  /* a página em si: rede primeiro, cache como reserva */
  event.respondWith(
    fetch(req)
      .then(resp => {
        if(resp && resp.ok && url.origin === self.location.origin){
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return resp;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});

/* tocar na notificação abre o painel */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(lista => {
      for(const c of lista){
        if(c.url.startsWith(self.registration.scope) && 'focus' in c) return c.focus();
      }
      return clients.openWindow('./');
    })
  );
});
