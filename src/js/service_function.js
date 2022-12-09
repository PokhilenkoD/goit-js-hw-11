import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { observer } from './observer';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onSearchPictures } from './observer';

export const formEl = document.querySelector('.search-form');
export const galleryEl = document.querySelector('.gallery');
export const target = document.querySelector('.js-guard');
export let totalHitsCounter = 0;

formEl.addEventListener('submit', onSearchPictures);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderMarkup(resp) {
  resp
    .then(({ hits, totalHits }) => {
      totalHitsCounter = totalHits;
      if (!totalHits) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      hits.map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          galleryEl.insertAdjacentHTML(
            'beforeend',
            `<div class="photo-card">
  <a href="${largeImageURL}">
  <img class = 'gallery__image' src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="gallery__info">
    <p class="gallery__info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="gallery__info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="gallery__info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="gallery__info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
          );
          smoothScroll();
          gallery.refresh();
          observer.observe(target);
        }
      );

      if (!hits.length && totalHits) {
        observer.unobserve(target);
        return Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(err => console.error(err));
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 5,
    behavior: 'smooth',
  });
}

export function totalHitsMessage() {
  Notify.info(`Hooray! We found ${totalHitsCounter} images.`);
}