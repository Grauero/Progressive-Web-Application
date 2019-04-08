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
function createCard() {
  const cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = 'San Francisco Trip';

  const cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardTitle.appendChild(cardTitleTextElement);

  const cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.style.textAlign = 'center';

  const cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  cardWrapper.appendChild(cardTitle);
  cardWrapper.appendChild(cardSupportingText);

  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
  .then(res => res.json())
  .then(createCard);

shareImageButton.addEventListener('click', openCreatePostModal);
closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
