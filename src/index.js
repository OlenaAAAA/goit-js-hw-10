// import axios from "axios";


import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};
const { selector, divCatInfo, loader, error } = ref;

loader.classList.add('hidden');
error.classList.add('hidden');
divCatInfo.classList.add('hidden');
selector.classList.add('hidden');
        error.hidden = true;
        loader.hidden = true;



fetchBreeds()
    .then(data => {
        selector.innerHTML = data.map(item => {
            return `<option value="${item.id}">"${item.name}"</option>`;
            }).join('');
        
        new SlimSelect({
        select: selector,
            });
        })
    .catch(onFetchError);


selector.addEventListener('change', onSelectBreed);



function onSelectBreed(event) {
    loader.hidden = false;
    const breedId = event.currentTarget.value;
    
    fetchCatByBreed(breedId)
        .then(data => {
        const { url, breeds } = data[0];
        
        divCatInfo.innerHTML = `<div class="cat-box"
         ><div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div><div>`
        loader.hidden = true;
        })
        .catch(onFetchError);
};


function onFetchError(error) {
        loader.hidden = true;
   

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};
   




