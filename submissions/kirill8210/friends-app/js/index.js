import getUsers from './getUsers.js';
import removeMenu from './mobile.js';
import preparePhoneNumber from './preparePhoneNumber.js';

const locationCardUsers = document.querySelector('.main');
const functionForm = document.querySelector('#function_menu');
const resetBtn = document.querySelector('.reset_btn');
let response = [];

const createdCardUser = ({ name, gender, email, phone, picture, dob }) => {
    const card = document.createElement('article');
    card.classList.add('card');

    const formationPhone = Number(phone.replace(/\D+/g,''));
    const phoneUser = preparePhoneNumber(formationPhone);

    if(gender === 'female') {
        card.classList.add('female');
    }

    card.insertAdjacentHTML('afterbegin', ` 
        <h2 class="card_name">${name.first} ${name.last}</h2>
        <div>
            <div class="card_block_img"><img class="card_img" src="${picture.large}" alt="${name.first}"></div>
            <p class="card_age">I am ${dob.age} years old</p>
            <p class="card_email">${email}</p>
            <p class="card_phone"><a href="tel:${formationPhone}">${phoneUser}</a></p>
        </div>
        <p class="card_human" id="card_human">${gender}</p>       
    `);

    return card;
};

const sortUsers = (users) => {
    const sortByField = (a, b) => {
        return a > b ? 1 : -1;
    };

    const selectSortsUser = functionForm.sorts_users.value;

    if (selectSortsUser === 'default') {
        return users;
    }

    if (selectSortsUser === 'age_up') {
        return users.sort((a, b) => sortByField(a.dob.age, b.dob.age));
    }
    if (selectSortsUser === 'age_down') {
        return users.sort((a, b) => sortByField(b.dob.age, a.dob.age));
    }
    if (selectSortsUser === 'name_fromA') {
        return users.sort((a, b) => sortByField(a.name.first, b.name.first));
    }
    if (selectSortsUser === 'name_fromZ') {
        return users.sort((a, b) => sortByField(b.name.first, a.name.first));
    }
};

const filterByGender = (users) => {
    const gendersValue = functionForm.gender.value;
    if (gendersValue === 'all') return users;
    return users.filter(user => user.gender === gendersValue);
};

const searchByUsers = (users) => {
    const inputSearchValue = functionForm.search_friends.value;
    if (inputSearchValue.length !== 0) {
        return users.filter(user =>
            (user.name.first + ' ' + user.name.last).toLowerCase().includes(inputSearchValue.toLowerCase()));
    } else {
        return users;
    }
};

const renderUsers = () => {
    const users = [...response.results];
    const foundFriends = searchByUsers(users);
    const filteredByGenderUsers = filterByGender(foundFriends);
    const sortedUsers = sortUsers(filteredByGenderUsers);

    renderCards(sortedUsers);
};

const renderCards = (users) => {
    locationCardUsers.textContent = '';
    const cardUsers = users.map(createdCardUser);
    locationCardUsers.append(...cardUsers);
};

functionForm.addEventListener('input', renderUsers);

resetBtn.addEventListener('click', () => {
    renderCards([...response.results]);
});

const init = async () => {
    response = await getUsers();
    renderUsers();
    removeMenu();
};

init();
