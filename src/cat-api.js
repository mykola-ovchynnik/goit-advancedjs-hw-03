import axios from 'axios';

const API_KEY =
  'live_gx5mwTdpktLl6xdhpuQw9kTaTAevrcrANhMNGA6mvTxfxagdtdDbekzlyo3sTKhz';

// axios.defaults.headers.common['x-api-key'] = API_KEY;

const BASE_URL = 'https://api.thecatapi.com/v1';
const ENDPOINT_BREEDS = '/breeds';
const ENDPOINT_IMG_SEARCH = '/images/search';

function fetchBreed() {
  return fetch(`${BASE_URL}${ENDPOINT_BREEDS}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch(err => console.log(err));
}

function fetchCatByBreed(breedId = '') {
  const params = new URLSearchParams({
    breed_ids: breedId,
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}${ENDPOINT_IMG_SEARCH}?${params}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch(err => console.log(err));
}

export { fetchBreed, fetchCatByBreed };
