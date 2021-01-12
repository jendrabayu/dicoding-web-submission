document.addEventListener('DOMContentLoaded',async  () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'), {inDuration: 350, outDuration: 500})
    M.Modal.init(document.querySelector('.modal'))
        
    const scrollTop = document.querySelector('.scroll-top');
    self.addEventListener('scroll', function(){
        this.scrollY > 200 ? scrollTop.style.display = 'block' : scrollTop.style.display = 'none'
    })

    scrollTop.addEventListener('click', () => {
        document.body.scrollIntoView({ behavior: 'smooth' });
    });


    let page = self.location.hash.substr(1)
    page == '' ? page = 'home' : page
    renderPage(page)

    document.querySelectorAll('.topnav a').forEach(elm => {
        elm.addEventListener('click', e => {
            document.querySelectorAll('.topnav a').forEach(elm => {
                elm.classList.remove('active-nav')
            })
            e.target.classList.add('active-nav')
        })
    })

    document.querySelectorAll('.topnav a, .sidenav a').forEach(elm => {
        
        elm.addEventListener('click', e => {
            M.Sidenav.getInstance(document.querySelector('.sidenav')).close()
            document.querySelector('main').innerHTML = `
                <div class="row center-align" style="margin-top: 25%">
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                        <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div>
            `
            setTimeout(() => {
                renderPage(e.target.getAttribute('href').substr(1))
            }, 500);
        })
    })
})


async function renderNewMovie(){
    let movies = await DataSource.getMovies()
    movies.sort((a,b)=> new Date(b.Released) -  new Date(a.Released))
    movies = movies.splice(0,10)
    movies.forEach(m=>{  
        document.getElementById('newMovie').innerHTML += cardSlider(m)
    })
}

async function renderNewIndonesianMovie (){
    const movie = await DataSource.getIndonesiaMovies(10)
    movie.forEach(m=>{  
        document.getElementById('newIndonesiaMovie').innerHTML += cardSlider(m)
    })
}

async function renderNewMancanegaraMovie(){
    const movie = await DataSource.getMancanegaraMovies(10)
    movie.forEach(m=>{  
        document.getElementById('newMancanegaraMovie').innerHTML += cardSlider(m)
    })
}

async function renderAllIndonesiaMovie(){
    const movies = await DataSource.getIndonesiaMovies()
    movies.forEach(m => {
        document.getElementById('indonesiaMovie').innerHTML += card(m)
    })
}

async function renderAllMancanegaraMovie (){
    const movies = await DataSource.getMancanegaraMovies()
    movies.forEach(m=>{
        document.getElementById('mancanegaraMovie').innerHTML += card(m)
    })
}


async function renderDetail(id){
    const modalContent =  document.querySelector('.modal-content')
    modalContent.innerHTML = `
    <div class="progress">
        <div class="indeterminate"></div>
    </div>
    `  
    const movie = await DataSource.getMovieDetail(id)

    setTimeout(() => {
        modalContent.innerHTML = `
        <div class="row">
            <h4 class="mb-5">${movie.Title}(${movie.Year})</h4>
            <div class="col s12 l6">
                <img src="${movie.Poster}" style="width: 100%">
            </div>
            <div class="col s12 l6">
                <table>
                    <tbody>
                    <tr>
                        <td style="font-weight: bold">Genre</td>
                        <td>${movie.Genre}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Released</td>
                        <td>${movie.Released}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Director</td>
                        <td>${movie.Director}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Country</td>
                        <td>${movie.Country}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Actors</td>
                        <td>${movie.Actors}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Runtime</td>
                        <td>${movie.Runtime}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Writer</td>
                        <td>${movie.Writer}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold">Language</td>
                        <td>${movie.Language}</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div class="col s12">
                <h5>Plot</h5>
                <p>${movie.Plot}</p>
            </div>
        </div>
        `
    }, 500);
}

async function renderPage(name){

    const main = document.querySelector('main')

    try {
        const page = await DataSource.getPage(name)
        main.innerHTML = page
    
        if (name === 'home') {
            await renderNewMovie()
        }else if(name === 'indonesia'){
            await renderNewIndonesianMovie()
            await renderAllIndonesiaMovie()
        }else if(name === 'mancanegara'){
            await renderNewMancanegaraMovie()
            await renderAllMancanegaraMovie()
        }

    } catch (error) {
        main.innerHTML = `<h1 class="white-text center-align mt-5">${error}</h1>`
    }

    document.querySelectorAll('.modal-trigger').forEach(btn => {
        btn.addEventListener('click', async () => {
          await renderDetail(btn.dataset.id)
        })
    })

    AOS.init();

    $(".owl-carousel").owlCarousel({
        loop:false,
        margin:20,
        nav:true,
        dots:false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'] ,
        navContainer: '.wrapper-carousel .custom-nav',
        responsive:{
            0:{
                items:1,
                nav: false,
                navContainer: false
            },
            425:{
                items:2,
                nav: false,
                navContainer: false
            },
            600:{
                items:3,

            },
            1000:{
                items:4
            }
        }
    })
}

function cardSlider(movie){
    return `
    <div class="item">
        <div class="card card-new-movie">
        <div class="card-image">
            <img src="${movie.Poster}">
        </div>
        <div class="card-content">
            <a href="#modal" class="modal-trigger" data-id="${movie.imdbID}">${movie.Title}</a>
        </div>
        <div class="card-action center-align">
            <a href="#modal" class="modal-trigger" data-id="${movie.imdbID}">Detail</a>
        </div>
        </div>
    </div>
    `
}

function card (movie){
    return `
    <div class="col s6 m4 l3 aos-animate" data-aos="fade-up" data-aos-offset="400" data-aos-duration="500"  data-aos-delay="200" >
        <div class="card all-movie-card">
            <div class="card-image">
                <img src="${movie.Poster}">
                <span class="card-title">${movie.Title}(${movie.Year})</span>
            </div>
            <div class="card-action center-align">
                <a href="#modal" class="modal-trigger" data-id="${movie.imdbID}">Detail</a>
            </div>
        </div>
    </div>`
}
