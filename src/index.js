import SlimSelect from 'slim-select';
import iziToast from 'izitoast';
import { fetchBreed, fetchCatByBreed } from './cat-api';

import '../node_modules/slim-select/dist/slimselect.css';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  select: document.querySelector('.breed-select'),
  msgLoader: document.querySelector('.loader-text'),
  loader: document.querySelector('.loader'),
  msgError: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// elements.select.addEventListener('change', handlerSelect);

fetchBreed()
  .then(data => {
    elements.select.insertAdjacentHTML('afterbegin', selectMarkup(data));
    elements.select.classList.remove('hidden');
    elements.msgLoader.classList.add('hidden');
    elements.loader.classList.add('hidden');

    new SlimSelect({
      select: elements.select,
      events: {
        afterChange: handlerSelect,
      },
    });
  })
  .catch(err => {
    elements.msgLoader.classList.add('hidden');
    elements.loader.classList.add('hidden');
    new iziToast.error({
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topLeft',
      icon: '',
      messageColor: 'red',
      backgroundColor: 'transparent',
      displayMode: 0,
      timeout: '',
    });
    console.log(err);
  });

function selectMarkup(array) {
  return array
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join();
}

function handlerSelect() {
  elements.msgLoader.classList.remove('hidden');
  elements.loader.classList.remove('hidden');
  elements.catInfo.classList.add('hidden');
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
        elements.msgLoader.classList.add('hidden');
        elements.loader.classList.add('hidden');
        elements.catInfo.classList.remove('hidden');
      }
    )
    .catch(err => {
      elements.msgLoader.classList.add('hidden');
      elements.loader.classList.add('hidden');

      iziToast.error({
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'topLeft',
        icon: '',
        messageColor: 'red',
        backgroundColor: 'white',
        displayMode: 0,
        timeout: '',
      });
      console.log(err);
    });
}
