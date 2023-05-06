
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';


const DEBOUNCE_DELAY = 300;


const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


const cleanMarkup = element => (element.innerHTML = '');


const inputHandler = event => {
  const userInput = event.target.value.trim();



  if (!userInput) {
    cleanMarkup(countryList);
    cleanMarkup(countryInfo);
    return;
  }

  fetchCountries(userInput)
    .then(countries => {
      console.log(countries);
      
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name');
        return;
      }
      renderData(countries);
    })
    .catch(error => {
      cleanMarkup(countryList);
      cleanMarkup(countryInfo);
      Notify.failure('Oops, there is no country with that name');
    });
};


const createListMarkup = countryList => {
  return `
    <ul>
      ${countryList
        .map(
          ({ name, flags }) =>
            `<li>
              <img src="${flags.png}" alt="${name.official}" width="60" height="40">
              ${name.official}
            </li>`,)
        .join('')}
    </ul>`;
};


const createInfoMarkup = countryData => {
  return `
    <h1>
      <img src="${countryData[0].flags.png}" alt="${countryData[0].name.official}" width=\"40" height="40">
      ${countryData[0].name.official}
    </h1>
    <p>Capital: ${countryData[0].capital}</p>
    <p>Population: ${countryData[0].population}</p>
    <p>Languages: ${Object.values(countryData[0].languages)}</p>
  `;
};


const renderData = data => {
  if (data.length === 1) {
    cleanMarkup(countryList);
    const countryInfoMarkup = createInfoMarkup(data);
    countryInfo.innerHTML = countryInfoMarkup;
  } else {
    cleanMarkup(countryInfo);
    const countriesListMarkup = createListMarkup(data);
    countryList.innerHTML = countriesListMarkup;
  }
};


searchBox.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
