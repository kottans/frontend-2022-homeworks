import getData from './getData.js';
import removeMenu from './mobile.js';

const app = document.querySelector('.main');

let data = [];
let response = [];

const createCard = (data2) => {
    const { name, gender, email, phone, picture, dob } = data2;

    const card = document.createElement('div');
    card.classList.add('card');

    let phones = Number(phone.replace(/\D+/g,''));
    if (phones.toString().length === 6) {
        phones = '0000' + phones
    } else if (phones.toString().length === 7) {
        phones = '000' + phones
    } else if (phones.toString().length === 8) {
        phones = '00' + phones
    } else if (phones.toString().length === 9) {
        phones = '0' + phones
    } else if (phones.toString().length === 11 || phones.toString().length === 12 || phones.toString().length === 13) {
        phones = phones.toString().replace(phones.toString(), phones.toString().slice(-10))
    }
    let result = phones.toString().replace(/^(.{3})(.{3})(.{2})(.*)$/, "($1) $2-$3-$4");

    if(gender === 'female') {
        card.classList.add('female');
    }

    card.insertAdjacentHTML('afterbegin', ` 
        <div class="card_name">${name.first} ${name.last}</div>
        <div>
            <div class="card_block_img"><img class="card_img" src="${picture.large}" alt="${name.first}"></div>
            <div class="card_age">I am ${dob.age} years old</div>
            <div class="card_email">${email}</div>
            <div class="card_phone">${result}</div>
        </div>
        <div class="card_human" id="card_human">${gender}</div>       
    `);

    return card;
};

const sortAge = document.querySelector('.sort_by_age');
const sortListAge = document.querySelector('.sorts_list_age');
const sortIdAge = document.querySelector('#sort_by_age');
const sortName = document.querySelector('.sort_by_name');
const sortListName = document.querySelector('.sorts_list_name');
const sortIdName = document.querySelector('#sort_by_name');
const filterIdGender = document.querySelector('#filters_gender');
const inputSearch = document.querySelector('#search_friends');
const reset = document.querySelector('.reset_button');
const inputAll = document.querySelector('#all');

let genders = Array.from(document.getElementsByName("gender")).find(r => r.checked).value;

sortAge.addEventListener('click', () => {
    sortListAge.classList.toggle('sorts_list_active');
    sortListName.classList.remove('sorts_list_active');
});

sortListAge.addEventListener('click', ({target}) => {
    if (target.classList.contains('sorts_options')) {
        sortAge.textContent = target.textContent;
        sortIdAge.value = target.dataset.sort;
        filterByGender();
        sortName.textContent = 'Sort by Name';
        if (genders === 'all') {
            const newData = sortByAge();
            renderCards(newData);
        } else {
            const newData = sortByAge();
            renderCards(newData.filter(data => data.gender === genders));
        }
        removeMenu();
        sortListAge.classList.remove('sorts_list_active');
    }
});

sortName.addEventListener('click', () => {
    sortListName.classList.toggle('sorts_list_active');
    sortListAge.classList.remove('sorts_list_active');
});

sortListName.addEventListener('click', ({target}) => {
    if (target.classList.contains('sorts_options')) {
        sortName.textContent = target.textContent;
        sortIdName.value = target.dataset.sort;
        filterByGender();
        sortAge.textContent = 'Sort by Age';
        if (genders === 'all') {
            const newData = sortByName();
            renderCards(newData);
        } else {
            const newData = sortByName();
            renderCards(newData.filter(data => data.gender === genders));
        }
        removeMenu();
        sortListName.classList.remove('sorts_list_active');
    }
});

filterIdGender.addEventListener('click', ({target}) => {
    if (target.classList.contains('gender')) {
        genders = target.value;
        const newData = filterByGender();
        inputSearch.value = '';
        renderCards(newData);
        removeMenu();
    }
});

const sortByAge = () => {
    switch (sortIdAge.value) {
        case 'up':
            return data.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
            break;
        case 'down':
            return data.sort((a, b) => b.dob.age > a.dob.age ? 1 : -1);
            break;
        default:
            return data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
    }
};

const sortByName = () => {
    switch (sortIdName.value) {
        case 'fromA':
            return data.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
            break;
        case 'fromZ':
            return data.sort((a, b) => b.name.first > a.name.first ? 1 : -1);
            break;
        default:
            return data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
    }
};

const filterByGender = () => {
    switch (genders) {
        case 'male':
            return data.filter(data => data.gender === 'male');
            break;
        case 'female':
            return data.filter(data => data.gender === 'female');
            break;
        default:
            return data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
    }
};

const searchName = () => {
    inputSearch.addEventListener('input', e => {
        e.preventDefault();
        const searchOfName = data.filter(data => data.name.first.toLowerCase().includes(inputSearch.value.toLowerCase()));
        inputAll.checked = true;
        filterByGender();
        if(inputSearch.value.length > 0) {
            removeMenu();
        }
        renderCards(searchOfName);
    });
};

const resetAll = () => {
    data = [...response.results];
    sortAge.textContent = 'Sort by Age';
    sortName.textContent = 'Sort by Name';
    genders = 'all';
    filterByGender();
    inputAll.checked = true;
    inputSearch.value = '';
    removeMenu();
    renderCards(data)
};

reset.addEventListener('click', e => {
    e.preventDefault();
    resetAll();
});

const renderCards = (data) => {
    app.textContent = '';
    const cards = data.map(createCard);
    app.append(...cards);
};

const init = async () => {
    response = await getData();
    data = [...response.results];

    const searchFriends = searchName(data);
    const sortAge = sortByAge(searchFriends);
    const sortName = sortByName(sortAge);
    const filterGender = filterByGender(sortName);

    renderCards(filterGender);
};

removeMenu();
init();

