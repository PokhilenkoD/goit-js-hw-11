import { renderMarkup } from './service_function';
import { fetchPictures } from './API';
import { formEl } from './service_function';
import { galleryEl } from './service_function';
import { target } from './service_function';
import { totalHitsMessage } from './service_function';

export let page = 1;

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

export const observer = new IntersectionObserver(onLoad, options);

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      renderMarkup(fetchPictures(formEl.elements.searchQuery.value, page));
    }
  });
}

export function onSearchPictures(event) {
  event.preventDefault();
  if (formEl.elements.searchQuery.value) {
    observer.unobserve(target);
    page = 1;
    galleryEl.innerHTML = '';
    renderMarkup(fetchPictures(formEl.elements.searchQuery.value));
    const timerId = setTimeout(totalHitsMessage, 500);
  }
}


