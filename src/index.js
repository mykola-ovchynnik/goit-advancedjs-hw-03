import { fetchBreed, fetchCatByBreed } from './cat-api';

const elements = {
  select: document.querySelector('.breed-select'),
  msgLoader: document.querySelector('.loader'),
  msgError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.select.addEventListener('change', handlerSelect);

fetchBreed()
  .then(data => {
    elements.select.insertAdjacentHTML('afterbegin', selectMarkup(data));
  })
  .catch(err => console.log(err));

function selectMarkup(array) {
  return array
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join();
}

function handlerSelect() {
  fetchCatByBreed(elements.select.value)
    .then(
      ([
        {
          breeds: [{ name, temperament, description }],
          url,
        },
      ]) => {
        elements.catInfo.innerHTML = `
        <img src="${url}" alt="${name}" class="cat-img"/>
        <div class="cat-info-text">
          <h2 class="cat-name">${name}</h2>
          <p class="cat-description">${description}</p>
          <p class="cat-temper"><b>Temperament:</b> ${temperament}</p>
        </div>`;
        console.log(temperament, description, url);
      }
    )
    .catch(err => console.log(err));
}
