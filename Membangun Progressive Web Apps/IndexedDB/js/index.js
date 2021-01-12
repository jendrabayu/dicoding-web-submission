var dbPromise = idb.open("perpustakaan", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("buku")) {
    var peopleOS = upgradeDb.createObjectStore("buku", { keyPath: "isbn" });
  }
});

  dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readwrite');
    var store = tx.objectStore('buku');
    var item = {
        judul: 'Menjadi Android Developer Expert (MADE)',
        isbn: 123456789,
        description: 'Belajar pemrograman Android di Dicoding dengan modul online dan buku.',
        created: new Date().getTime()
    };
    store.add(item, 123456789); //menambahkan key "buku"
    return tx.complete;
}).then(function() {
    console.log('Buku berhasil disimpan.');
}).catch(function(err) {
    console.log('Buku gagal disimpan.', err)
})

dbPromise.then(function(db) {
    var tx = db.transaction('buku', 'readonly');
    var store = tx.objectStore('buku');
    // mengambil primary key berdasarkan isbn
    return store.get(123456789); 
  }).then(function(val) {
    console.dir(val);
  });