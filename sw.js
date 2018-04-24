var log = console.log.bind(console);//bind our console to a variable
var version = "0.0.2";
var cacheName = "sw-demo";
var cache = cacheName + "-" + version;
var filesToCache = [
                    '/',
                    'index.html',
                    'css/style.css',
                    'imagens/logo.ico',
                    'imagens/f1.jpg',
                    'imagens/f2.jpg',
                    'imagens/f3.jpg',
                    'imagens/f4.jpg',
                    'imagens/f5.jpg',
                    'imagens/f6.jpg',
                    'imagens/fund1.png',
                    'imagens/fund2.jpg',
                    'imagens/fund3.jpg',
                    'imagens/icon1.png',
                    'imagens/icon2.png',
                    'imagens/icon3.png',
                    'imagens/icon4.jpg',
                    'feminina.html',
                    'cadastro.html',
                    'atendimento.html',
                    'camisetas.html',
                    'cadastro2.html',
                    'cadastro3.html',
                    'slick/ajax-loader.gif',	
                    'slick/config.rb',	
                    'slick/slick-theme.css',	
                    'slick/slick-theme.less',	
                    'slick/slick-theme.scss',	
                    'slick/slick.css',	
                    'slick/slick.js',	
                    'slick/slick.less',	
                    'slick/slick.min.js',	
                    'slick/slick.scss',
                    'slick/fonts/slick.eot',	
                    'slick/fonts/slick.svg',	
                    'slick/fonts/slick.ttf',	
                    'slick/fonts/slick.woff',	
                    'OutrosLivros.html',
                    'mangas.html',
                    'MeusPedidos.html',
                    'quadrinhos.html',
                    'imagens/another.jpg',
                    'imagens/aven1.jpg',	
                    'imagens/aven2.jpg',	
                    'imagens/aven3.jpg',	
                    'imagens/aven4.jpg',	
                    'imagens/aven5.jpg',	
                    'imagens/aven6.jpg',	
                    'imagens/cavalo.jpg',	
                    'imagens/db.jpg',	
                    'imagens/edu1.jpg',	
                    'imagens/edu2.jpg',	
                    'imagens/edu3.jpg',	
                    'imagens/edu4.jpg',	
                    'imagens/edu5.jpg',	
                    'imagens/edu6.jpg',	
                    'imagens/fan1.jpg',	
                    'imagens/fan2.jpg',	
                    'imagens/fan3.jpg',	
                    'imagens/fan4.jpg',	
                    'imagens/fan5.jpg',	
                    'imagens/fan6.jpg',	
                    'imagens/fan6.png',	
                    'imagens/fic1.jpg',	
                    'imagens/fic2.jpg',	
                    'imagens/fic3.jpg',	
                    'imagens/fic4.jpg',	
                    'imagens/fic5.jpg',	
                    'imagens/fic6.jpg',	
                    'imagens/heroi1.jpg',	
                    'imagens/heroi2.jpg',	
                    'imagens/heroi3.jpg',	
                    'imagens/heroi4.jpg',	
                    'imagens/heroi5.jpg',	
                    'imagens/heroi6.jpg',	
                    'imagens/infan1.jpg',	
                    'imagens/infan2.jpg',	
                    'imagens/infan3.jpg',	
                    'imagens/infan4.jpg',	
                    'imagens/infan5.jpg',	
                    'imagens/infan6.jpg',	
                    'imagens/itachi.jpg',	
                    'imagens/josei1.jpg',	
                    'imagens/josei2.jpg',	
                    'imagens/josei3.jpg',	
                    'imagens/josei4.jpg',	
                    'imagens/josei5.jpg',	
                    'imagens/josei6.jpg',	
                    'imagens/logo.ico',	
                    'imagens/luluzinha.jpg',	
                    'imagens/manga1.jpg',	
                    'imagens/manga2.jpg',	
                    'imagens/manga3.jpg',	
                    'imagens/manga4.jpg',	
                    'imagens/manga5.jpg',	
                    'imagens/manga6.png',	
                    'imagens/morty.png',	
                    'imagens/naruto.jpg',	
                    'imagens/shounen1.jpg',	
                    'imagens/shounen1.png',	
                    'imagens/shounen2.jpg',	
                    'imagens/shounen3.jpg',	
                    'imagens/shounen4.jpg',	
                    'imagens/shounen5.jpg',	
                    'imagens/shounen6.jpg',	
                    'imagens/stranger.jpg'
                 ];

//Add event listener for install
self.addEventListener("install", function(event) {
    log('[ServiceWorker] Installing....');
    event.waitUntil(caches
                        .open(cache)//open this cache from caches and it will return a Promise
                        .then(function(cache) { //catch that promise
                            log('[ServiceWorker] Caching files');
                            cache.addAll(filesToCache);//add all required files to cache it also returns a Promise
                        })
                    ); 
});

//Add event listener for fetch
self.addEventListener("fetch", function(event) {
    //note that event.request.url gives URL of the request so you could also intercept the request and send a response based on your URL
    //e.g. you make want to send gif if anything in jpeg form is requested.
    event.respondWith(//it either takes a Response object as a parameter or a promise that resolves to a Response object
                        caches.match(event.request)//If there is a match in the cache of this request object
                            .then(function(response) {
                                if(response) {
                                    log("Fulfilling "+event.request.url+" from cache.");
                                    //returning response object
                                    return response;
                                } else {
                                    log(event.request.url+" not found in cache fetching from network.");
                                    //return promise that resolves to Response object
                                    return fetch(event.request);
                                }
                            })
                    );
});

self.addEventListener('activate', function(event) {
  log('[ServiceWorker] Activate');
  event.waitUntil(
                    caches.keys()//it will return all the keys in the cache as an array
                    .then(function(keyList) {
                            //run everything in parallel using Promise.all()
                            Promise.all(keyList.map(function(key) {
                                    if (key !== cacheName) {
                                        log('[ServiceWorker] Removing old cache ', key);
                                        //if key doesn`t matches with present key
                                        return caches.delete(key);
                                    }
                                })
                            );
                        })
                );
});
