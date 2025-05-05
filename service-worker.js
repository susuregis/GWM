// Nome do cache atual
const CACHE_NAME = 'fitlife-v1';

// Arquivos a serem cacheados
const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/profile.html',
    '/css/style.css',
    '/js/app.js',
    '/js/auth.js',
    '/js/timer.js',
    '/manifest.json',
    '/img/logo.svg',
    // Imagens de treinos
    '/img/exercises/squat.svg',
    '/img/exercises/leg-press.svg',
    '/img/exercises/leg-extension.svg',
    // Ícones
    '/img/icons/icon-512x512.svg',
    // Recursos externos
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Instala o Service Worker
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching all files');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Limpa caches antigos
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Estratégia Cache First com fallback para rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    // Se o recurso estiver no cache, retorna-o
                    return response;
                }
                
                // Caso contrário, busca na rede
                return fetch(event.request)
                    .then(networkResponse => {
                        // Verifica se a resposta é válida
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }
                        
                        // Clone a resposta, pois ela só pode ser consumida uma vez
                        const responseToCache = networkResponse.clone();
                        
                        // Adiciona o recurso ao cache para uso futuro
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                            
                        return networkResponse;
                    })
                    .catch(() => {
                        // Fallback para quando a rede falha e o recurso não está no cache
                        if (event.request.url.indexOf('.html') > -1) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Sincronização em segundo plano quando fica online
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Função para sincronizar dados armazenados localmente com o servidor
function syncData() {
    // Em uma implementação real, aqui você recuperaria dados do IndexedDB
    // e enviaria para o servidor
    console.log('[Service Worker] Syncing data');
    
    // Por enquanto esta é apenas uma função de exemplo
    return new Promise((resolve, reject) => {
        // Simulação de sincronização
        setTimeout(() => {
            console.log('[Service Worker] Syncing complete');
            resolve();
        }, 2000);
    });
}

// Notificações push
self.addEventListener('push', event => {
    const title = 'FitLife';
    const options = {
        body: event.data ? event.data.text() : 'Nova notificação do FitLife!',
        icon: '/img/icons/icon-192x192.png',
        badge: '/img/icons/icon-72x72.png'
    };
    
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

// Ação ao clicar na notificação
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
