const usersList = [];
const MOBILE_WIDTH_BREAKPOINT = 992;
let usersFilteredList = [];

const callAPI = async () => {
    const data = await fetch('https://randomuser.me/api/?results=30&nat=ua');
    handleErrors(data);

    const { results: users } = await data.json();

    return users;
};

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const getUsers = async () => {
    try {
        const users = await callAPI();
        usersList.push(...users);
        renderUsers(getSidebarOptions(), usersList);
    } catch (e) {
        console.log(e);
    }
}

const mainContainer = document.getElementById('main__content');
const usersListContainer = document.createElement('div');
usersListContainer.classList.add('users');

const renderUsers = (filtersObject, usersArray) => {
    const filteredUsers = filterUsers(filtersObject, usersArray);
    const usersCards = filteredUsers.map((user) => createUserCard(user)).join("");
    usersListContainer.innerHTML = usersCards;
    mainContainer.innerHTML = '';
    mainContainer.appendChild(usersListContainer);
    window.location.hash = '';
}

const createUserCard = (user) => {
    const picture = user.picture.medium;
    const name = user.name.first + ' ' + user.name.last;
    const age = user.dob.age;
    const location = user.location.country + ', ' + user.location.city;
    const email = user.email;
    const phone = user.phone;
    const gender = user.gender;

    return `
        <div class="users__item">
            <div class="user">
                <div class="user-block">
                    <div class="user-poster">
                        <img src="${picture}" alt="${name}">
                    </div>

                    <div class="user-headings">
                        <h5><strong>${name}</strong></h5>
                        <h6>${age} years old</h6>
                    </div>

                    <div class="user-description">
                        <p>${location}</p>
                        <p>
                            <a href="mailto:${email}">${email}</a>
                        </p>
                        <p>
                            <a href="tel:${phone}">${phone}</a>
                        </p>
                        <p class="uppercase">${gender}</p>
                    </div>

                    <a href="${name.replace(/\s/g, '').toLowerCase()}" class="user-button" data-id="${name.replace(/\s/g, '').toLowerCase()}">
                        View Profile
                    </a>
                </div>
            </div>
        </div>
    `;
}

const renderUserProfile = (user) => {
    const picture = user.picture.medium;
    const name = user.name.first + ' ' + user.name.last;
    const age = user.dob.age;
    const birthDate = new Date(user.dob.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    const country = user.location.country;
    const state = user.location.state;
    const city = user.location.city;
    const email = user.email;
    const phone = user.phone;
    const gender = user.gender;

    mainContainer.innerHTML = `
        <div class="user user_single">
            <div class="user-block">
                <div class="user-poster">
                    <img src="${picture}" alt="${name}">
                </div>

                <div class="user-headings">
                    <h5><strong>${name}</strong></h5>
                    <h6>${age} years old</h6>
                </div>

                <div class="user-description">
                    <p><strong>User Location:</strong></p>
                    <p>${birthDate}</p>
                    <p>&nbsp;</p>
                    <p><strong>User Location:</strong></p>
                    <p>${country}</p>
                    <p>${state}</p>
                    <p>${city}</p>
                    <p>&nbsp;</p>
                    <p><strong>User Contacts:</strong></p>
                    <p>
                        <a href="mailto:${email}">${email}</a>
                    </p>
                    <p>
                        <a href="tel:${phone}">${phone}</a>
                    </p>
                    <p>&nbsp;</p>
                    <p><strong>User Gender:</strong></p>
                    <p class="uppercase">${gender}</p>
                </div>

                <a href="/" class="user-button user-button_close">
                    Back to Friends
                </a>
            </div>
        </div>
    `;
}

// filters
const sidebarFilters = document.querySelector('.main__sidebar');
sidebarFilters.addEventListener("submit", function(event) {
    event.preventDefault();

    renderUsers(getSidebarOptions(), usersList);

    if (window.screen.width <= MOBILE_WIDTH_BREAKPOINT) {
        toggleMenu();
    }
});

const getSidebarOptions = () => {
    const formData = new FormData(sidebarFilters);
    const filtersObject = {};
    formData.forEach((value, key) => {
        filtersObject[key] = value;
    });

    return filtersObject;
}

const filterUsers = (filtersObject, usersArray) => {
    const pipes = [filterByName, filterByGender, sortBy];
    const filterName = filtersObject.name;
    const filterGender = filtersObject.gender;
    const filterSort = filtersObject.filterSort;

    usersFilteredList = pipes.reduce((list, func) => {
        switch (func.name) {
            case 'filterByName':
                return func(list, filterName);
            case 'filterByGender':
                return func(list, filterGender);
            case 'sortBy':
                return func(list, filterSort);
            default:
                return usersArray;
        }
    }, usersArray);

    return usersFilteredList;
}

const filterByName = (array, searchValue) => {
    if (searchValue) {
        searchValue = searchValue.trim().toLowerCase();
        return array.filter(user => user.name.first.toLowerCase().includes(searchValue));
    } else {
        return array;
    }
}

const filterByGender = (array, filterOption) => {
    if (filterOption !== 'genderAll') {
        return array.filter(user => user.gender === filterOption);
    } else {
        return array;
    }
}

const sortBy = (array, sortValue) => {
    return array.sort((a, b) => {
        let result;

        if (sortValue.startsWith('alphabet')) {
            a = a.name.first.toUpperCase();
            b = b.name.first.toUpperCase();
        } else {
            a = a.dob.age;
            b = b.dob.age;
        }

        if (a < b) {
            result = -1;
        } else if (a > b) {
            result = 1;
        } else {
            result = 0;
        }

        if (sortValue == 'alphabetZA') {
            result *= -1;
        }

        if (sortValue == 'ageHighest') {
            return b - a;
        }

        return result;
    });

    return array;
}

//close user
const closeUser = () => {
    const singleUser = document.querySelector('.user_single');
    
    if (singleUser) {
        singleUser.parentNode.removeChild(singleUser);
    }

    window.location.hash = '';
}

//read more
mainContainer.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.closest('.user-button')) {
        if (!e.target.closest('.user-button').classList.contains('user-button_close')) {
            const id = e.target.closest('.user-button').dataset.id;
            window.location.hash = id;
        } else {
            closeUser();
        }
    }
});

//change hash event
window.addEventListener('hashchange', () => {
    if (window.location.hash) {
        const singleUser = usersList.filter((user) => {
            const name = user.name.first + user.name.last;
            return name.toLowerCase().indexOf(location.hash.split('#')[1]) > -1;
        });
        renderUserProfile(singleUser[0]);
    } else {
        renderUsers(getSidebarOptions(), usersFilteredList);
    }
}, false);

//toggle theme
const theme = document.querySelector('.header__toggle');
const body = document.querySelector('body');

theme.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.toggle('theme-dark');
});

//toggle menu
const menuToggle = document.querySelector('.header__toggle-menu');

menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

const toggleMenu = () => {
    menuToggle.classList.toggle('header__toggle-menu_open');
    sidebarFilters.classList.toggle('main__sidebar_open');
}

//init
getUsers();
