const CACHE_NAME = 'cinemas-v1';



let urlsToCache = [
	'/',
	'/manifest.json',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css',
	'https://fonts.googleapis.com/css2?family=Lobster+Two:wght@700&family=Pacifico&family=Roboto&display=swap',
	'/icon/logo512.png',
	'/icon/logo384.png',
	'/icon/logo256.png',
	'/icon/logo192.png',
	'/icon/logo144.png',
	'/icon/cgv.png',
	'/icon/Cinema_XXI.png',
	'/icon/cinepolis.png',
	'/icon/nsc.png',
	'/index.html',
    '/pages/home.html',
    '/pages/indonesia.html',
    '/pages/mancanegara.html',
    '/pages/bioskop.html',
    '/vendor/materialize/materialize.min.css',
    '/vendor/animatecss/animate.min.css',
    '/vendor/owlcarousel/owl.carousel.min.css',
	'/vendor/owlcarousel/owl.theme.default.min.css',
	'/vendor/aos/aos.css',
    '/css/style.css',
    '/vendor/jquery/jquery.min.js',
    '/vendor/materialize/materialize.min.js',
	'/vendor/owlcarousel/owl.carousel.min.js',
	'/vendor/aos/aos.js',
    '/js/data/movie.json',
	'/js/data/DataSource.js',
	'/js/main.js',
	'https://m.media-amazon.com/images/M/MV5BODljZTM3ODAtMDc0YS00NmI4LTlmZTUtM2I5MDAzNTQxZmMxXkEyXkFqcGdeQXVyMTEwMTY3NDI@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNjE4ODEwNzktYjg5Yi00N2YxLWExMmEtMmQyZTBiYWI4MGQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYWFmYjBiYzItYjBlOS00NThkLTljMWEtYzQ4NTdlNDlmMjg0XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYzkxMzMzOTgtNmZhMS00MGM0LTk3MzUtMjE1MzI4MzU5ZjkzXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNDljZWNmYjItM2I2MC00MTkyLThhMmUtNGUwYzNhOGI4MGE2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYjk0MTgzMmQtZmY2My00NmE5LWExNGUtYjZkNTA3ZDkyMTJiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNmMwYzFlNTEtYTc0NC00NGY4LTgzNzItZGFiYTViY2QzNzU1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BOTAzMjhiOWQtZDkzMy00NmNiLWE1ZTEtYTJmNDIzMzhmZGQyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNDM2MzMwMzcxNF5BMl5BanBnXkFtZTcwNTczMDk3OA@@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNTM5YWZiMzQtNDQxZS00ODI0LWJjNTQtZmQ3OWU3Njg4NWYyXkEyXkFqcGdeQXVyNzc4NTU3Njg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNzU1ZTE4YzAtOWNkYi00YWE4LThmY2YtMDNlYzU2ZTgxYTc2XkEyXkFqcGdeQXVyODQzNTE3ODc@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZDA1ZmQ2OGMtZDhkMC00ZjRkLWE3ZTMtMzA5ZTk0YjM1OGRmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BODJkMTg5ZjctYTM4Ni00ZGJiLTgxNDYtNDQ5NDUzOTVmNjRhXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNzYwMjg2ZmMtZDY0Mi00MjZhLTgwNmUtYTExNzYzODA4OWNiXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BMzYwNGE0MGItMDc3YS00NWI4LThiMWUtMDRlY2NiYjRjMDE1XkEyXkFqcGdeQXVyMTAyNDYyNzcw._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYzI5YzgxNmUtNmUxYy00NDMzLWE3YzItMzRhMDVhMTllZGQwXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZDU2YzY1YzQtODRlYS00MmE4LTg4ZDMtN2M3OGI2ZWU5MDVmXkEyXkFqcGdeQXVyNDE5MTU2MDE@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNTRhNjQxYmYtNDkzNS00MDhlLWE2ODQtNmJiNzQzNTJjZDVmXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZjcwZmQ3OTQtOWMxMS00ZjRjLTg1NjEtNTQ2NmRhZGRlZjE3XkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BM2I0NDU0NzQtNTViMS00NDQxLWIxMzYtZmM0NDQ0YzUyN2I2XkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNjM0NjA0ZTYtMTM1My00ODBlLWJkMWYtOTcxZmVhNDNhMmUyXkEyXkFqcGdeQXVyNzEzNjU1NDg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYWQ3ZTM2ZmQtNTU0NC00YzlmLWFjMjMtMGMwNmZkZGY5YmFkXkEyXkFqcGdeQXVyNzY4NDQzNTg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNTM1OTMzZTEtYjQ0ZC00ZTZkLWIwYmQtOTU5Mzk1Mzg4NWI0XkEyXkFqcGdeQXVyNjMxNTEyMTM@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BOGY2M2Y4YjUtYTlkNi00NTkyLTk3NmQtNWYxNDM4ODhmNzgxXkEyXkFqcGdeQXVyMTAyNDYyNzcw._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BYzM3N2I1MGUtZWQwOS00ZGM3LThmYzQtN2NmMWZjYWJlZGVhXkEyXkFqcGdeQXVyNzY4NDQzNTg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZWU5NzQ2NjYtOWRiYy00YmQxLTg3Y2QtMTQ1NDQyNDFlZmJmXkEyXkFqcGdeQXVyNDA1NDA2NTk@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BOWY0YmEyY2EtMmMxYi00MWZhLWFhYTItZDZmOWNhMTliMGI1XkEyXkFqcGdeQXVyNTkxNzAyNDQ@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZTkxNzM2ZGItMjZkYi00ZjVmLTllZWUtZjI2MmEyZTYzZTY4XkEyXkFqcGdeQXVyNzY4NDQzNTg@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BMTg5MTE2NjA4OV5BMl5BanBnXkFtZTgwMTUyMjczMTE@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BMjE5NTI2MTg5M15BMl5BanBnXkFtZTgwNjkxNjU3NjM@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BNzdmNmVkMjctYjIwMC00ZGY2LWJkODktOGVmMTljYWU4MTE3XkEyXkFqcGdeQXVyODg1MTc3MTM@._V1_SX300.jpg', 'https://m.media-amazon.com/images/M/MV5BZTJhMWE4MDUtYTIzYi00M2ZmLThhNjgtZTM2YTY0NDU1NWJhXkEyXkFqcGdeQXVyOTA5NzQ0MDQ@._V1_SX300.jpg'
];


self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => cache.addAll(urlsToCache))
	)
})

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName =>{
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			)
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(response => {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	)
})


