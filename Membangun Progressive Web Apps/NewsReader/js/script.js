document.addEventListener('DOMContentLoaded', () => {

	// inisialisasi sideNav
	M.Sidenav.init(document.querySelectorAll('.sidenav'))
	loadNav()

	function loadNav()
	{
		fetch('nav.html', {method: 'get'})
		.then(res => {
			if(res.ok){
				return res.text()
			}else{
				throw Error(res.statusText)
			}
		})
		.then(res => {
			// Muat daftar tautan menu
			document.querySelectorAll(".topnav, .sidenav")
			.forEach(elm => {
				elm.innerHTML = res
			})

			// Daftarkan event listener untuk setiap tautan menu
			document.querySelectorAll('.sidenav a, .topnav a')
			.forEach(elm =>{
				elm.addEventListener('click', event =>{
					// Tutup sidenav
					M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
					
					// Muat konten halaman yang dipanggil 
					page = event.target.getAttribute('href').substr(1)
					loadPage(page)
					
				})
			})

		})
		.catch(error=>{
			console.log('Error : '+error)
		})
	}
	
	// Load page content
	let page = window.location.hash.substr(1)
	if(page == '') page = 'home'
	loadPage(page)

	function loadPage(page)
	{
		const content = document.querySelector(".body-content")

		fetch('pages/'+page+'.html', {method: 'get'})
		.then(res => {
			if(res.ok){
				return res.text()
			}else{
				throw Error(res.statusText)
			}
		})
		.then(res=> {
			content.innerHTML = res
		})
		.catch(error=> {
			content.innerHTML = `<p>Error : ${error}</p>`
		})
	}

})
