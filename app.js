import { imageData } from './data.js';
import { sectionTxt } from './data.js';
import { setLinearGradient } from './colorThief.js';

const customImageSection = document.querySelector('.custom-image');
const buttonGenerate = document.querySelector('.generate-btn');
const buttonClear = document.querySelector('.clear-btn');
const linkTmdb = document.querySelector('.info-website');

// const initalState = {
//   gradientContainer: null,
//   title: null,
//   image: null,
//   imgIdx: 0
// }

let gradientContainer;
let title;
let image;

let imgIdx = 0;

function init() {
  buttonGenerate.addEventListener('click', generate);
  buttonClear.addEventListener('click', clear);
}

function clear() {
  removeChildren(customImageSection);
  customImageSection.classList.remove('section');
  customImageSection.style.backgroundImage = null;
  linkTmdb.href = 'https://www.themoviedb.org/';
}

function generate() {
  if (!customImageSection.hasChildNodes()) {
    customImageSection.classList.add('section');
    createSectionContent();
  }

  const { movieTitle, img, backImg, tmdb } = imageData[imgIdx];

  linkTmdb.href = tmdb;
  title.textContent = movieTitle;
  image.src = img;
  image.alt = movieTitle + ' poster';
  customImageSection.style.backgroundImage = `url(${backImg})`;
  imgIdx++;
  if (imgIdx >= imageData.length) imgIdx = 0;
}

function createParsingImg(elemToAddGradient) {
  const img = new Image();
  // img.src = imgSrc;
  // img.alt = movieTitle + ' poster';
  img.crossOrigin = 'anonymous';
  img.addEventListener('load', (e) => {
    setLinearGradient(e.target, elemToAddGradient);
  });

  return img;
}

function createSectionContent() {
  // const { gradientContainer, title, image, imgIdx } = state;

  gradientContainer = document.createElement('div');
  gradientContainer.classList.add('background-gradient');

  const imageContainer = document.createElement('div');
  imageContainer.className = 'img-container';
  image = createParsingImg(gradientContainer);
  imageContainer.appendChild(image);

  const showInfoContainer = document.createElement('div');
  showInfoContainer.classList.add('show_info-container');
  title = document.createElement('h2');
  const paragraph = document.createElement('p');
  paragraph.textContent = sectionTxt;
  showInfoContainer.append(title, paragraph);

  gradientContainer.append(imageContainer, showInfoContainer);

  customImageSection.appendChild(gradientContainer);
}

function removeChildren(parentEl) {
  if (!parentEl.hasChildNodes()) return;
  const childrenArr = [...parentEl.childNodes].forEach(child => child.remove());
}

export {
  init
}