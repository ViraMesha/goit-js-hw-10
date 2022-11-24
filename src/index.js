import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(event) {
    const searchValue = event.target.value.trim().toLowerCase();
    if (!searchValue) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    } 
    fetchCountries(searchValue).then(data => {
        if (data.length === 1) {
            refs.countryInfo.innerHTML = '';
            return createMarkup(data);
        } else if (data.length > 1 && data.length < 10) {
             refs.countryList.innerHTML = '';
            createMarkupForCountryList(data);
            return
        } 
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return
    });
}


function createMarkup(arr) {
    const markup = arr.map(item => `<li>
        <img src="${item.flags.svg}" alt="${item.name.official}  width="50" height="50"" />
        <h2>${item.name.official}</h2>
        <p>Capital: ${item.capital}</p>
        <p>Population: ${item.population}</p>
        <p>Languages: ${Object.values(item.languages)}</p>
      </li>`).join('');
    refs.countryList.innerHTML = markup;
};

function createMarkupForCountryList(arr) {
    const markup = arr.map(({ flags, name }) =>
        `<li class="country-info-item">
        <img class="flag-img" src="${flags.svg}" alt="${name.official} width="20" height="20" "/>
        <h2>${name.official}</h2>
        </li>`).join('');
    refs.countryInfo.innerHTML = markup
};
