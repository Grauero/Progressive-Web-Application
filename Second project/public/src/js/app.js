/* eslint-disable no-console, no-unused-vars */

//variable for storing prompt event to call it in feed.js
let deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(console.log('serviceWorker registered'));
}

window.addEventListener('beforeinstallprompt', e => {
  console.log('beforeinstallprompt event');
  e.preventDefault();
  deferredPrompt = e;
  return false;
});
