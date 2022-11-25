import Notiflix from 'notiflix';

function fetchCountries(name) {
    const BASE_URL = "https://restcountries.com/v3.1/name";   
return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(resp => {
        if (!resp.ok) {
        throw new Error()
        }
        return resp.json()
}).catch(err => Notiflix.Notify.failure("Oops, there is no country with that name"))
}




export { fetchCountries }