import './sass/main.scss';
import gallery from "./js/gallery-cards";

const lightBox = document.querySelector('.js-lightbox')
const lightBoxImage = document.querySelector('.lightbox__image');
const btn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');
const galleryContainer = document.querySelector('.js-gallery');

galleryContainer.addEventListener('click', onImageClick);
btn.addEventListener('click', onModalClose);
overlay.addEventListener('click', onModalClose);

const galleryMarkup = makeGalleryMarkup(gallery);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function makeGalleryMarkup(gallery) {
    return gallery.map(({original, preview, description}, idx) => {
        return `
        <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-index = "${idx}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
        `
    }).join('')
};


function onImageClick(event) {
    event.preventDefault();
    const image = event.target;

    if (!image.classList.contains('gallery__image')) {
        return;
    };

    lightBox.classList.add('is-open');
    lightBoxImage.src = image.getAttribute("data-source");
    lightBoxImage.alt = image.alt;
  
    addEventListener('keyup', onClick);

}

function onModalClose() {
    lightBox.classList.remove('is-open');
    lightBoxImage.src = '';
    lightBoxImage.alt = '';

    removeEventListener('keyup', onClick)
}

function onClick(event) {

    if (event.code === 'Escape') {
        onModalClose();
  }
}
 
