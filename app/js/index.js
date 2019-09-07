let photos_db = [
    {
        id: "5c408b7c4465e774e0633f0b",
        src: "1.jpg",
        name: "Molina Slater",
        city: 'Рязань'
    },
    {
        id: "5c408b7cc56e7a6f297b749a",
        src: "2.jpeg",
        name: "Molina Slater",
        city: 'Рязань'
    },
    {
        id: "5c408b7c191eda0f320c96a1",
        src: "3.jpg",
        name: "Molina Slater",
        city: 'Рязань'
    },
    {
        id: "5c408b7cd82408d7ed808aa4",
        src: "4.jpg",
        name: "Imelda Jefferson",
        city: 'Рязань'
    },
    {
        id: "5c408b7cfb53d12428d4613f",
        src: "5.jpeg",
        name: "Imelda Jefferson",
        city: 'Рязань'
    },
    {
        id: "5c408b7cbc28fd1ab8ed729e",
        src: "6.jpg",
        name: "Imelda Jefferson",
        city: 'Москва'
    },
    {
        id: "5c408b7cf92ee8cd9089bbc5",
        src: "7.jpeg",
        name: "Imelda Jefferson",
        city: 'Москва'
    },
    {
        id: "5c408b7c11291ec047504c7d",
        src: "8.jpg",
        name: "Imelda Jefferson",
        city: 'Москва'
    },
    {
        id: "5c408b7ce2e4c0debe0c55fc",
        src: "9.jpeg",
        name: "Leslie Mcconnell",
        city: 'Москва'
    },
    {
        id: "5c408b7cdfbdaf2915371c94",
        src: "10.jpg",
        name: "Mandy Kerr",
        city: 'Москва'
    },
    {
        id: "5c408b7c655975333ee962a6",
        src: "11.jpeg",
        name: "Glass Browning",
        city: 'Москва'
    },
    {
        id: "5c408b7c6a048a4b44e3d964",
        src: "12.jpg",
        name: "Maddox Stein",
        city: 'Москва'
    },
    {
        id: "5c408b7cb9066aa5f7f69089",
        src: "13.jpg",
        name: "Webster Lambert",
        city: 'Москва'
    },
    {
        id: "5c408b7c903a1194f9fea4b1",
        src: "14.jpg",
        name: "Loraine Wilkins",
        city: 'Москва'
    },
    {
        id: "5c408b7c17096cf43dc49e52",
        src: "15.jpeg",
        name: "Georgia Graham",
        city: 'Санкт Петербург'
    },
    {
        id: "5c408b7cc4dceec5db0bc735",
        src: "16.jpeg",
        name: "Celina Chavez",
        city: 'Санкт Петербург'
    },
    {
        id: "5c408b7c7f15eb46b8273c70",
        src: "17.jpg",
        name: "Lila Hammond",
        city: 'Санкт Петербург'
    },
    {
        id: "5c408b7c9a9437c7f42532af",
        src: "18.jpg",
        name: "Moran Strong",
        city: 'Санкт Петербург'
    },
    {
        id: "5c408b7cf42a83cb3794da5b",
        src: "19.jpg",
        name: "Moran Strong",
        city: 'Санкт Петербург'
    },
    {
        id: "5c408b7c2ab826f902b0538d",
        src: "20.jpg",
        name: "Moran Strong",
        city: 'Санкт Петербург'
    }
];

const photoContainer = document.querySelector('.js-photos__container');

//рендер всех фото по умолчанию:
const renderPhotos = (arr) => {
    return arr.map((item) => {
        let img = document.createElement('img');
        img.className = 'js-img-photo';
        img.src = 'photos/' + item.src;
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
    photoContainer.innerHTML = "";
    if(event.target.value && !citySearchInput.value) {
        photos_db.map((item) => {
            if(item.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                let img = document.createElement('img');
                img.className = 'js-img-photo';
                img.src = 'photos/' + item.src;
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
    else if (event.target.value && citySearchInput.value) {
            photos_db.map((item) => {
            if(item.name.toLowerCase().includes(event.target.value.toLowerCase()) && item.city.toLowerCase().includes(citySearchInput.value.toLowerCase())) {
                let img = document.createElement('img');
                img.className = 'js-img-photo';
                img.src = 'photos/' + item.src;
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
                img.src = 'photos/' + item.src;
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
});