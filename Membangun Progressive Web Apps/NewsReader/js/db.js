
//membuat database : open("namadatabase", nomorVersi, upgradeCallback) 
const dbPromised = idb.open("news-reader", 1, upgradeDb => {
    const articlesObjectStore = upgradeDb.createObjectStore("articles", {
      keyPath: "ID"
    })
    articlesObjectStore.createIndex("post_title", "post_title", { unique: false })
  })

//menyimpan data
function saveForLater(article) {
  dbPromised.then(db => {
      const tx = db.transaction("articles", "readwrite")
      const store = tx.objectStore("articles")
      store.add(article.result)
      return tx.complete
    })
    .then(() => {
      console.log("Artikel berhasil di simpan.")
    });
}

//mendapatkan semua data
function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
        const tx = db.transaction("articles", "readonly")
        const store = tx.objectStore("articles")
        return store.getAll();
      })
      .then(articles => {
        resolve(articles)
      })
  })
}  


//mendapatkan data berdasarkan id
function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
        const tx = db.transaction("articles", "readonly")
        const store = tx.objectStore("articles")
        return store.get(id)
      })
      .then(article => {
        resolve(article)
      });
  });
}