if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(registration => {
    console.log('sw is registered ', registration.scope)
  }).catch(err => {
    console.log('sw failed to register, ', err)
  })
}