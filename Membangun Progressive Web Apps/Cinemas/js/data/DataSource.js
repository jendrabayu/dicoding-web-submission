class DataSource{

    static getMovies(){
        return fetch('/js/data/movie.json')
        .then(res=>{
            if(res.ok){
               return res.json()
            }else{
                throw Error(res.statusText)
            }
        })
        .then(res => res)
    }

    static async getIndonesiaMovies(total){
        const movieObj = await this.getMovies()
        let movies = []
        movieObj.forEach(m => {
            if (m.Country.includes('Indonesia')) movies.push(m)
        })
        movies.sort((a,b)=> new Date(b.Released) -  new Date(a.Released))
        if(total) movies = movies.splice(0,total)
        return movies
    }

    static async getMancanegaraMovies(total){
        const movieObj = await this.getMovies()
        let movies = []
        movieObj.forEach(m => {
            if (!m.Country.includes('Indonesia')) movies.push(m)
        })
        movies.sort((a,b) => new Date(b.Released) -  new Date(a.Released))
        if(total) movies = movies.splice(0,total)  
        return movies
    }

    static async getMovieDetail(id){
        const movies = await this.getMovies()
        let movie = []
        movies.forEach(m => {
            if(m.imdbID == id) movie.push(m)
        })
        return movie[0]

    }

    static getPage(page){
        return fetch(`/pages/${page}.html`)
        .then(res=>{
            if(res.ok){
               return res.text()
            }else{
                throw Error(res.statusText)
            }
        })
        .then(res=> res)
    }
}