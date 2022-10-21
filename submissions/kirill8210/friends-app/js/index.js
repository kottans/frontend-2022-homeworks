import getUsers from './getData.js';
import removeMenu from './mobile.js';
import preparePhoneNumber from './preparePhoneNumber.js';

const app = document.querySelector('.main');
const functionMenu = document.querySelector('.function_menu');
const countFriends = document.querySelector('.count_friends');

const sortAge = document.querySelector('.sort_by_age');
const sortListAge = document.querySelector('.sorts_list_age');
const sortIdAge = document.querySelector('#sort_by_age');
const sortName = document.querySelector('.sort_by_name');
const sortListName = document.querySelector('.sorts_list_name');
const sortIdName = document.querySelector('#sort_by_name');

const inputSearch = document.querySelector('#search_friends');
const resetBtn = document.querySelector('.reset_btn');
const applyBtn = document.querySelector('.apply_btn');

let sortAgeInput = sortIdAge.value;
let sortNameInput = sortIdName.value;
let genders = Array.from(document.getElementsByName("gender")).find(r => r.checked).value;
let users = [];
let allFilters = [];

const createCard = ({ name, gender, email, phone, picture, dob }) => {
    const card = document.createElement('article');
    card.classList.add('card');

    let phones = Number(phone.replace(/\D+/g,''));
    let result = preparePhoneNumber(phones);

    if(gender === 'female') {
        card.classList.add('female');
    }

    card.insertAdjacentHTML('afterbegin', ` 
        <h2 class="card_name">${name.first} ${name.last}</h2>
        <div>
            <div class="card_block_img"><img class="card_img" src="${picture.large}" alt="${name.first}"></div>
            <p class="card_age">I am ${dob.age} years old</p>
            <p class="card_email">${email}</p>
            <p class="card_phone"><a href="tel:${phones}">${result}</a></p>
        </div>
        <p class="card_human" id="card_human">${gender}</p>       
    `);

    return card;
};

sortAge.addEventListener('click', () => {
    sortListAge.classList.toggle('sorts_list_active');
    sortListName.classList.remove('sorts_list_active');
});

sortName.addEventListener('click', () => {
    sortListName.classList.toggle('sorts_list_active');
    sortListAge.classList.remove('sorts_list_active');
});

functionMenu.addEventListener('click', ({target}) => {
    if (target.classList.contains('sorts_age')) {
        sortAge.textContent = target.textContent;
        sortAgeInput = target.dataset.sort;
        sortName.textContent = 'Sort by Name';
        sortNameInput = 'date';
        sortListAge.classList.remove('sorts_list_active');

        renderCards();
    }
    if (target.classList.contains('sorts_name')) {
        sortName.textContent = target.textContent;
        sortNameInput = target.dataset.sort;
        sortAge.textContent = 'Sort by Age';
        sortAgeInput = 'date';
        sortListName.classList.remove('sorts_list_active');

        renderCards();
    }
    if (target.classList.contains('gender')) {
        genders = target.value;

        renderCards();
    }
});

const sortByAge = (users) => {
    switch (sortAgeInput) {
        case 'up':
            return users.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
            break;
        case 'down':
            return users.sort((a, b) => b.dob.age > a.dob.age ? 1 : -1);
            break;
        default:
            return users;
    }
};

const sortByName = (users) => {
    switch (sortNameInput) {
        case 'fromA':
            return users.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
            break;
        case 'fromZ':
            return users.sort((a, b) => b.name.first > a.name.first ? 1 : -1);
            break;
        default:
            return users
    }
};

const filterByGender = (users) => {
    switch (genders) {
        case 'male':
            return users.filter(data => data.gender === 'male');
            break;
        case 'female':
            return users.filter(data => data.gender === 'female');
            break;
        default:
            return users
    }
};

const searchName = (users) => {
    let searchInputFr = inputSearch.value;
    if (searchInputFr.length !== 0) {
        return users.filter(users =>
            (users.name.first).toLowerCase().includes(searchInputFr.toLowerCase())
            || (users.name.last).toLowerCase().includes(searchInputFr.toLowerCase()));
    } else {
        return users;
    }
};

inputSearch.addEventListener('input', e => {
    e.preventDefault();

    renderCards();
});

const renderCards = () => {
    allFilters = users;
    const searchFriends = searchName(allFilters);
    const filterGender = filterByGender(searchFriends);
    const sortAge = sortByAge(filterGender);
    const sortName = sortByName(sortAge);

    render(sortName);
};

const render = (users) => {
    const countAllUsers = users.map(e => e.name.first).length;
    countFriends.textContent = `${countAllUsers}`;
    app.textContent = '';
    const cards = users.map(createCard);
    app.append(...cards);
};

applyBtn.addEventListener('click', e => {
    e.preventDefault();
    removeMenu();
});

resetBtn.addEventListener('click', () => {
    sortAge.textContent = 'Sort by Age';
    sortName.textContent = 'Sort by Name';
    render(users);
    genders = 'all';
    sortAgeInput = 'date';
    sortNameInput = 'date';
});

const init = async () => {
    const response = await getUsers();
    users = [...response.results];
    renderCards();
};

removeMenu();
init();
