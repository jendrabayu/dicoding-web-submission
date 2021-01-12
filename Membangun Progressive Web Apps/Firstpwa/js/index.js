document.addEventListener('DOMContentLoaded', () => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function() {
		  navigator.serviceWorker.register('/sw.js')
		  .then(function() {
			console.log('Pendaftaran ServiceWorker berhasil');
		  })
		  .catch(function(){
			console.log('Pendaftaran ServiceWorker gagal');
		  });
		})
	  } else {
		console.log("ServiceWorker belum didukung browser ini.")
	  }


	
	// SIDEBAR NAVIGATION
	M.Sidenav.init( document.querySelectorAll('.sidenav'));

	loadNav();

	getArticle()
	getArticleById()



	function loadNav()
	{
		fetch('nav.html', {method: 'GET'})
		.then(res => res.text())
		.then(res => {
			if(res){

				// Muat daftar tautan menu
				document.querySelectorAll(".topnav, .sidenav")
				.forEach(elm =>{
					elm.innerHTML = res;
				});

				// Daftarkan event listener untuk setiap tautan menu
				document.querySelectorAll('.sidenav a, .topnav a')
				.forEach(elm =>{
					elm.addEventListener('click', event => {
						// Tutup sidenav
						const sidenav = document.querySelector('.sidenav');
						M.Sidenav.getInstance(sidenav).close();
						
						// Muat konten halaman yang dipanggil 
						page = event.target.getAttribute('href').substr(1);
						loadPage(page);
					});
				});
			}
		})
	}
	
	// Load page content
	let page = window.location.hash.substr(1);
	console.log(page)
	if(page == '') page = 'home';
	loadPage(page);

	function loadPage(page)
	{
		fetch('pages/'+page+'.html', {method: 'GET'})
		.then(res => res.text())
		.then(res => {
			const content = document.querySelector(".body-content");
			if(res){
				content.innerHTML = res
			}else{
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
			}
		})
		.catch(error => {
			content.innerHTML = `<p>Ups.. ${error} halaman tidak dapat diakses.</p>`;
		})
	}

});
