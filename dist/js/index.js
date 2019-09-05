

const citySearchInput = document.querySelector('.js-photographers-select-city__input');
const citySearchSelectList = document.querySelector('.js-photographers-select-city__list');

citySearchInput.addEventListener('click', () => {
    citySearchSelectList.classList.toggle('hidden');
        if (!citySearchSelectList.classList.contains('hidden')) {
            citySearchInput.classList.add('photographers-select-city__input_border-color');
        } else {
            citySearchInput.classList.remove('photographers-select-city__input_border-color');
        }
    });
