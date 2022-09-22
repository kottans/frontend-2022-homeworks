const URL = 'https://randomuser.me/api/?results=200&nat=ua&inc=picture,name,gender,name,dob,phone,location';

const userCardParentELement = document.querySelector('.container__user__card');
userCardParentELement.insertAdjacentHTML('beforeend',
    `<div class="loading">
        <img src="assets/image/loading.png" width="170" height="190" alt="">
    </div>`
);

const loading = document.querySelector('.loading');
const loadingPage = () => {
    loading.innerHTML = '';
    loading.classList.remove("loading");
    loading.classList.add("error__message");
    loading.innerHTML = "Oops, something went wrong! Try again...";
}

let usersData = [];

const getUsersData = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        prepareUsersData(result.results);
    } catch (err) {
        loadingPage();
    }
};

getUsersData(URL);

const prepareUsersData = (data) => {
    data.map(user => {
        let userInfo = {
            picture: user.picture.large,
            fullName: user.name.first + ' ' + user.name.last,
            gender: user.gender,
            age: user.dob.age,
            phone: user.phone,
            city: user.location.city,
            country: user.location.country
        }
        usersData = [...usersData, userInfo];
    });
    userCardParentELement.removeChild(loading);
    renderUsers(usersData);
};

const renderUsers = (listOfUsers) => {
    userCardParentELement.innerHTML = "";
    listOfUsers.forEach((user) => {
        userCardParentELement.insertAdjacentHTML('beforeend',
            `<div class="user__card">
                <img src="${user.picture}" alt="user photo" class="user__photo">
                <h3 class="user__name">${user.fullName}</h3>
                <span class="user__info">&#9892; ${user.gender}</span>
                <span class="user__info">&#128100; ${user.age} y.o.</span>
                <span class="user__info">&#128222; ${user.phone}</span>
                <span class="user__info">&#129517; ${user.city}, ${user.country}</span>
            </div>`
        )
    })
};

let searchValue;
let idgender;

const sortUsers = (id, listOfUsers) => {
    let copyListOfUsers = [...listOfUsers];

    copyListOfUsers = searchByName(copyListOfUsers);

    switch (id) {
        case 'search_age_up':
            copyListOfUsers.sort((first, next) => compareAge(first, next));
            break;
        case 'search_age_down':
            copyListOfUsers.sort((first, next) => compareAge(next, first));
            break;
        case 'search_by_alphabet_up':
            copyListOfUsers.sort((first, next) => compareName(first, next));
            break;
        case 'search_by_alphabet_down':
            copyListOfUsers.sort((first, next) => compareName(next, first));
            break;
        case 'male':
        case 'female':
            idgender = id;
            break;
        default:
            break;
    }
    copyListOfUsers = filterByGender(id, copyListOfUsers);
    renderUsers(copyListOfUsers);
};

const searchByName = (users) => {
    if (searchValue) {
        return users.filter((user) => user.fullName.toLowerCase().search(searchValue) > -1);
    }
    return users;
};

const filterByGender = (gender, users) => {
    if (gender === "male" || gender === "female") {
        return users.filter((user) => user.gender === idgender);
    } else {
        return users;
    }
};

const compareAge = (firstUser, nextUser) => { return firstUser.age - nextUser.age };

const compareName = (firstUser, nextUser) => {
    first = firstUser.fullName.toLowerCase();
    next = nextUser.fullName.toLowerCase();
    return first < next ? -1 : 1;
};

const radioGender = document.querySelectorAll("input[name='search_by_gender']");
const radioAge = document.querySelectorAll("input[name='search_age']");
const radioAlphabet = document.querySelectorAll("input[name='search_by_alphabet']");

const searchInput = document.querySelector(".input__search__name");
const resetBtn = document.querySelector(".reset__button");

const filterContainer = document.querySelector('.container__filter');

filterContainer.addEventListener("click", ({ target }) => {
    if (target.closest(".input__search__name")) return;
    sortUsers(target.id, usersData);
});

searchInput.addEventListener("input", ({ target }) => {
    searchValue = target.value.toLowerCase();
    sortUsers(target.id, usersData);
});

const reset = () => {
    searchValue = '';
    searchInput.value = '';
    radioAge.forEach(radio => radio.checked = false);
    radioAlphabet.forEach(radio => radio.checked = false);
    radioGender.forEach(radio => radio.checked = false);
};

resetBtn.addEventListener("click", reset);

const menu = document.querySelector('.container__filter');
const showMenu = () => {
    menu.classList.toggle('show');
};

const button = document.querySelector('.burger__menu');
button.addEventListener('click', showMenu);
