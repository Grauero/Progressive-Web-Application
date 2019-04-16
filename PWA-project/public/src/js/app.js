/* eslint-disable no-console, no-unused-vars */

//variable for storing prompt event to call it in feed.js
let deferredPrompt;
const enableNotificationsbuttons = document.querySelectorAll('.enable-notifications');

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

if ('Notification' in window) {
  for (let i = 0; i < enableNotificationsbuttons.length; i++) {
    enableNotificationsbuttons[i].style.display = 'inline-block';
    enableNotificationsbuttons[i].addEventListener('click', askForNotificationPermission);
  }
}

function askForNotificationPermission() {
  Notification.requestPermission().then(result => {
    console.log('User notification choice', result);
    if (result !== 'granted') {
      console.log('No permission granted');
    } else {
      displayConfirmNotification();
    }
  });
}

function displayConfirmNotification() {
  const notificationOptions = {
    body: 'You successfully subscribed to Notification service',
    icon: '/src/images/icons/app-icon-96x96.png',
    image: '/src/images/sf-boat.jpg',
    dir: 'ltr',
    lang: 'en-US',
    vibrate: [100, 50, 200], // vibration->pause->vibration-> ...
    badge: '/src/images/icons/app-icon-96x96.png',
    tag: 'confirm-notification',
    renotify: true
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(activeServiceWorker =>
      activeServiceWorker.showNotification('Successfully subscribed', notificationOptions)
    );
  } else {
    new Notification('Successfully subscribed', notificationOptions);
  }
}
