navigator.serviceWorker.register('../../sw.js');

const button = document.querySelector('button');
const title = document.querySelector('.title');
const courseFeatureElements = document.querySelectorAll('.course-feature');

function animate() {
  title.classList.remove('animate-in');
  for (let element of courseFeatureElements) {
    element.classList.remove('animate-in');
  }
  button.classList.remove('animate-in');

  setTimeout(() => title.classList.add('animate-in'), 1000);
  setTimeout(() => courseFeatureElements[0].classList.add('animate-in'), 3000);
  setTimeout(() => courseFeatureElements[1].classList.add('animate-in'), 4500);
  setTimeout(() => courseFeatureElements[2].classList.add('animate-in'), 6000);
  setTimeout(() => courseFeatureElements[3].classList.add('animate-in'), 7500);
  setTimeout(() => courseFeatureElements[4].classList.add('animate-in'), 9000);
  setTimeout(() => courseFeatureElements[5].classList.add('animate-in'), 10500);
  setTimeout(() => courseFeatureElements[6].classList.add('animate-in'), 12000);
  setTimeout(() => button.classList.add('animate-in'), 13500);
}

animate();
button.addEventListener('click', animate);
