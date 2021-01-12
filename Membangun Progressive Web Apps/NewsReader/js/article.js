document.addEventListener("DOMContentLoaded", function() {
    getArticleById()

    const item = getArticleById()
    const save = document.getElementById("save")
    save.addEventListener('click', ()=> {
        console.log("Tombol FAB di klik.")
        item.then(function (article) {
            saveForLater(article)
        })
    }) 

    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved")
    const btnSave = document.getElementById("save")
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        // ambil artikel lalu tampilkan
        getSavedArticleById()
    } else {
        const item = getArticleById()
    }
    btnSave.addEventListener('click', () => {
        console.log("Tombol FAB di klik.")
        item.then(article => {
        saveForLater(article)
        })
    })
})