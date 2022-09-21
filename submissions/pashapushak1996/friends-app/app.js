const content = document.querySelector('.content');
const searchButton = document.querySelector('.header__search-icon');
const searchInput = document.querySelector('.header__search input');
const asidePanel = document.querySelector('.aside');
const filterSearch = document.querySelector('#filter-search');
const applyButton = document.querySelector('#apply-button');
const headerButton = document.querySelector('#header-button');
const resetButton = document.querySelector('#reset-button');
const genderRadio = document.querySelector('#all-genders');
const nameRadio = document.querySelector('#alphabetical');
const minAgeInput = document.querySelector('#min-age');
const maxAgeInput = document.querySelector('#max-age');

//Constants
const baseUrl = 'https://randomuser.me/api/?results=20';

const asidePanelOptions = {
    AGE: 'age',
    NAME: 'name',
    GENDER: 'gender',
    ASC: 'asc',
    DESC: 'desc'
};

const initialUsers = [];

const normalizeUserObject = (user) => ({
    fullName: user.name.first + ' ' + user.name.last,
    age: user.dob.age,
    gender: user.gender,
    email: user.email,
    picture: user.picture.large,
    country: user.location.country,
    phone: user.phone
});

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function showLoader() {
    const img = document.createElement("img");
    img.src = './icons/loader.svg';
    img.className = 'loader';
    content.appendChild(img);
}

function hideLoader() {
    const loader = document.querySelector('.loader');

    loader.classList.add('none');
}

function showError() {
    const errorMessage = document.createElement('span');
    errorMessage.innerText = 'Oops, something went wrong. Please reload';
    errorMessage.className = 'error-message';
    content.append(errorMessage);
}

async function getUsers() {
    const data = await fetch(baseUrl);

    handleErrors(data);

    const { results: users } = await data.json();

    return users;
}

const setUsers = (users) => {
    const normalizedUsers = users.map((user) => normalizeUserObject(user));

    initialUsers.push(...normalizedUsers);
};


async function init() {
    try {
        showLoader();

        const users = await getUsers();

        setUsers(users);

        hideLoader();

        renderUsersList(initialUsers);
    } catch (e) {
        hideLoader();
        showError();
    }
}

function toggleFilterPanel() {
    asidePanel.classList.toggle('active');
}

const compareAge = (userOne, userTwo) => {
    return userOne.age - userTwo.age
};

const compareName = (userOne, userTwo) => {
    if (userOne.fullName.toLowerCase() > userTwo.fullName.toLowerCase()) {
        return -1;
    }
    if (userOne.fullName.toLowerCase() < userTwo.fullName.toLowerCase()) {
        return 1;
    }
}

const sortUsers = (users) => {
    const sortingOption = document.querySelector('input[name=sort-options]:checked').value;

    const sortBy = sortingOption.split('-').shift();
    const orderBy = sortingOption.split('-').pop();

    if (!orderBy) {
        return users;
    }

    switch (sortBy) {
        case asidePanelOptions.AGE: {
            const sortedUsers = users.sort(compareAge);

            return orderBy === asidePanelOptions.ASC ? sortedUsers : sortedUsers.reverse();
        }
        case asidePanelOptions.NAME: {
            const sortedUsers = users.sort(compareName);

            return orderBy === asidePanelOptions.ASC ? sortedUsers : sortedUsers.reverse();
        }

        default: {
            break;
        }
    }
};

const filterByGender = (users) => {
    const gender = document.querySelector('input[name="genders"]:checked').value;

    return gender !== 'all-genders'
        ? users.filter((user) => user.gender === gender)
        : users;
}

const filterByAge = (users) => {
    const minAge = minAgeInput.value || 0;
    const maxAge = maxAgeInput.value || 200;

    return users.filter((user) => user.age >= Number(minAge) && user.age <= Number(maxAge));
}

function applyOnClick() {
    content.innerHTML = '';

    const filteredUsersByAge = filterByAge(initialUsers);
    const filteredUsersByGender = filterByGender(filteredUsersByAge);
    const sortedUsers = sortUsers(filteredUsersByGender);

    renderUsersList(sortedUsers);

    searchByName({
        target: {
            value: filterSearch.value || searchInput.value
        }
    });

    toggleFilterPanel();
}

function resetOnClick() {
    content.innerHTML = '';
    genderRadio.checked = true;
    nameRadio.checked = true;
    filterSearch.value = '';
    searchInput.value = '';
    maxAgeInput.value = '';
    minAgeInput.value = '';

    renderUsersList(initialUsers);

    toggleFilterPanel();
}

const searchByName = ({ target: { value } }) => {
    const normalizedValue = value.trim().toLowerCase();

    const userCards = document.querySelectorAll('.user-card__name');

    userCards.forEach((userCard) => {
        const firstName = userCard.innerText
            .split(' ')
            .shift()
            .toLowerCase();

        const lastName = userCard.innerText
            .split(' ')
            .pop()
            .toLowerCase();

        const isVisible = firstName.startsWith(normalizedValue) || lastName.startsWith(normalizedValue);

        userCard.parentElement.parentElement.classList.toggle('none', !isVisible);
    });
};


const createUserCard = (user) => {
    const { fullName, age, email, phone, country, picture, gender } = user;

    const userCard = document.createElement('div');

    userCard.classList.add('user-card');

    userCard.innerHTML = `
                          <div class="user-card__inner"> 
                             <div class="user-card__image">
                                <img src="${ picture }" alt="user-photo">
                             </div>
                             <div class="user-card__name">${ fullName }</div>
                             <div data-age="${ age }" class="user-card__age">I am ${ age } years old</div>
                             <div class="user-card__email">
                                <img class="user-card__icon" src="./icons/email.png" alt="">
                                <span>${ email }</span>
                             </div>
                             <div class="user-card__phone">
                                <img class="user-card__icon" src="./icons/phone.png" alt="">
                                <span>${ phone }</span>
                             </div>
                             <div class="user-card__location">
                                <img class="user-card__icon" src="./icons/location.png" alt="">
                                <span>${ country }</span>
                              </div>
                          </div>
                          <div class="user-card__gender">
                           <span>${ gender.toUpperCase() }</span>
                          </div>
`;

    return userCard;
};

const renderUsersList = (users) => {
    const usersGrid = users.map((user) => createUserCard(user));

    content.append(...usersGrid);
};

applyButton.addEventListener('click', applyOnClick);
resetButton.addEventListener('click', resetOnClick);

filterSearch.addEventListener('input', searchByName);

searchInput.addEventListener('input', searchByName);

searchButton.addEventListener('click', () => {
    searchInput.classList.toggle('active');
});

headerButton.addEventListener('click', toggleFilterPanel);

init();

