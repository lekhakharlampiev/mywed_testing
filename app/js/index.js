
(function () {

const photoContainer = document.querySelector('.js-photos__container');

//рендер всех фото по умолчанию:
const renderPhotos = (arr) => {
    return arr.map((item) => {
        let img = document.createElement('img');
        img.className = 'js-img-photo';
        img.src = 'dist/photos/' + item.src;
        let photo = document.createElement('div');
        photo.className = 'photo js-photo';
        let title = document.createElement('h4');
        title.prepend(item.name);
        let city = document.createElement('p');
        city.prepend(item.city);
        let button = document.createElement('button');
        button.className = 'photo__botton-close hidden js-photo__botton-close';
        button.type = 'button';
        button.title = 'Закрыть';
        photo.prepend(city);
        photo.prepend(title);
        photo.prepend(button);
        photo.append(img);
        photoContainer.prepend(photo);
    });
}
renderPhotos(photos_db);

const photo = document.querySelectorAll('.js-photo');

//обработчик клика для фото
const addListenerToPhoto = () => {
    const photo = document.querySelectorAll('.js-photo');
    for(let i = 0; i < photo.length; i++) {
        photo[i].addEventListener('click', function(evt) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.toggle('photo-popup-open');
            this.firstElementChild.classList.toggle('hidden');
            this.lastElementChild.classList.toggle('img-full-screen');
        });
    }
};
addListenerToPhoto();

const inputName = document.querySelector('.js-name-input');
const citySearchInput = document.querySelector('.js-photographers-select-city__input');
const citySearchSelectList = document.querySelector('.js-photographers-select-city__list');

//рендел списка городов 
const renderCitiesList = (container, array) => {
let sort = [];
for(let i = 0; i < array.length; i++) {
    if(!sort.includes(array[i].city)) {
        sort.push(array[i].city);
    }
}
sort.map((item) => {
    let li = document.createElement('li');
    li.className = 'photographers-select-city__list__item js-photographers-select-city__list__item';
    li.prepend(item);
    container.prepend(li);
});
};

renderCitiesList(citySearchSelectList, photos_db);

const citeSelectItem = document.querySelectorAll('.js-photographers-select-city__list__item');

//если выбирается какой то город то срабатывает фильтр по городу
for(let i = 0; i < citeSelectItem.length; i++) {
    citeSelectItem[i].addEventListener('click', function() {
        let input = citySearchInput;
        input.value = event.target.textContent;
        searchByCity(input.value);
        
    });
}

//фильтр по имени
inputName.addEventListener('input', function() {
    photoContainer.innerHTML = '';
    if(event.target.value && !citySearchInput.value) {
        photos_db.map((item) => {
            if(item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                let img = document.createElement('img');
                img.className = 'js-img-photo';
                img.src = 'dist/photos/' + item.src;
                let photo = document.createElement('div');
                photo.className = 'photo js-photo';
                let title = document.createElement('h4');
                title.prepend(item.name);
                let city = document.createElement('p');
                city.prepend(item.city);
                let button = document.createElement('button');
                button.className = 'photo__botton-close hidden js-photo__botton-close';
                button.type = 'button';
                button.title = 'Закрыть';
                photo.prepend(city);
                photo.prepend(title);
                photo.prepend(button);
                photo.append(img);
                photoContainer.prepend(photo) 
            }
        });
        addListenerToPhoto();
    if(photoContainer.innerHTML === '') {
        let message = document.createElement('div');
        message.className = 'photographers__photos__message';
        message.prepend('Совпадений не найдено');
        photoContainer.prepend(message);
    }    
}
    else if (event.target.value && citySearchInput.value) {
            photos_db.map((item) => {
            if(item.name.toLowerCase().includes(event.target.value.toLowerCase()) && item.city.toLowerCase().includes(citySearchInput.value.toLowerCase())) {
                let img = document.createElement('img');
                img.className = 'js-img-photo';
                img.src = 'dist/photos/' + item.src;
                let photo = document.createElement('div');
                photo.className = 'photo js-photo';
                let title = document.createElement('h4');
                title.prepend(item.name);
                let city = document.createElement('p');
                city.prepend(item.city);
                let button = document.createElement('button');
                button.className = 'photo__botton-close hidden js-photo__botton-close';
                button.type = 'button';
                button.title = 'Закрыть';
                photo.prepend(city);
                photo.prepend(title);
                photo.prepend(button);
                photo.append(img);
                photoContainer.prepend(photo); 
            }
        });
        addListenerToPhoto();
    if(photoContainer.innerHTML === '') {
        let message = document.createElement('div');
        message.className = 'photographers__photos__message';
        message.prepend('Совпадений не найдено');
        photoContainer.prepend(message);
    }     
    } 
    
    else if (!event.target.value) {
        photoContainer.innerHTML = "";
        renderPhotos(photos_db);
        addListenerToPhoto();
    }
});

//фильтр по городу
const searchByCity = (value) => {
    photoContainer.innerHTML = "";
    if(value) {
        photos_db.map((item) => {
            if(item.city.toLowerCase().includes(value.toLowerCase())) {
                let img = document.createElement('img');
                img.className = 'js-img-photo';
                img.src = 'dist/photos/' + item.src;
                let photo = document.createElement('div');
                photo.className = 'photo js-photo';
                let title = document.createElement('h4');
                title.prepend(item.name);
                let city = document.createElement('p');
                city.prepend(item.city);
                let button = document.createElement('button');
                button.className = 'photo__botton-close hidden js-photo__botton-close';
                button.type = 'button';
                button.title = 'Закрыть';
                photo.prepend(city);
                photo.prepend(title);
                photo.prepend(button);
                photo.append(img);
                photoContainer.prepend(photo) 
            }
        });

        addListenerToPhoto(); 
    }
}; 

const buttonReset = document.querySelector('.js-reset-filter__button');

buttonReset.addEventListener('click', function() {
    inputName.value = '';
    citySearchInput.value = '';
    photoContainer.innerHTML = "";
    renderPhotos(photos_db);
    addListenerToPhoto();
});
})();