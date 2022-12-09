const API_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '31844347-16adccdcc2872ee3a7bce49dd',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

export async function fetchPictures(q, page = 1) {
  const resp = await fetch(`${API_URL}?${searchParams}&page=${page}&q=${q}`);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
  return await resp.json();
}
