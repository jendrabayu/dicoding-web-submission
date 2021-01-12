const baseUrl = 'https://readerapi.codepolitan.com/'

// jika fetch berhasil
function status(res){
    if(res.status !== 200){
        console.log('Error ',res.status)
        return Promise.reject(new Error(res.statusText))
    }
    return Promise.resolve(res)
}

//merubah json ke array javascript
function json(res){
    return res.json()
}

// jika terdapat error (404,403,500 dll)
function error(err){
    console.log('Error : ',err)
}

function getArticle(){
    fetch(baseUrl+'articles')
    .then(status)
    .then(json)
    .then(data=>{
        let articlesHtml = ''
        data.result.forEach(article => {
            articlesHtml+=`
                <div class="card">
                    <a href="./article.html?id=${article.id}">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.thumbnail}" />
                        </div>
                    </a>
                    <div class="card-content">
                        <span class="card-title truncate">${article.title}</span>
                        <p>${article.description}</p>
                    </div>
                </div>
            `
            document.getElementById('articles').innerHTML =  articlesHtml
        })
    })
    .catch(error)
}

function getArticleById(){
    const urlParams = new URLSearchParams(window.location.search)
    const idParam = urlParams.get('id')
    fetch(baseUrl+'article/'+idParam)
    .then(status)
    .then(json)
    .then(data => {
        const articleHtml =  `
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.result.cover}" />
            </div>
            <div class="card-content">
                <span class="card-title">${data.result.post_title}</span>
                ${snarkdown(data.result.post_content)}
            </div>
            </div>
        `
        document.querySelector('.body-content').innerHTML = articleHtml
    })
}