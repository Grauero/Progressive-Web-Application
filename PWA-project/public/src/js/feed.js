/* eslint-disable no-console, no-undef */

const shareImageButton = document.querySelector('#share-image-button');
const sharedMomentsArea = document.querySelector('#shared-moments');
const createPostArea = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector(
  '#close-create-post-modal-btn'
);

function openCreatePostModal() {
  createPostArea.style.display = 'block';

  // deferredPrompt defined in app.js
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User canselled installation');
      } else {
        console.log('User added app to homescreen');
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

//generate dummy data
function createCard(data) {
  const cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = data.title;

  const cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = `url(${data.image})`;
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardTitle.appendChild(cardTitleTextElement);

  const cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = data.location;
  cardSupportingText.style.textAlign = 'center';

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  cardWrapper.appendChild(cardTitle);
  cardWrapper.appendChild(cardSupportingText);

  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

function updateUI(data) {
  data.map(item => createCard(item));
}

const URL = 'https://progressive-web-app-a254b.firebaseio.com/posts.json';
let networkDataReceived = false;

// data from server
fetch(URL)
  .then(res => res.json())
  .then(data => {
    networkDataReceived = true;
    console.log('From web', data);
    updateUI(Object.values(data));
  });

// data from cache
if ('indexedDB' in window) {
  readAllData('posts').then(data => {
    if (!networkDataReceived) {
      console.log('From IDB', data);
      updateUI(data);
    }
  });
}

shareImageButton.addEventListener('click', openCreatePostModal);
closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
