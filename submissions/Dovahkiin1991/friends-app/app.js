const usersList = [];
let usersFilteredList = [];
const nameInput = document.querySelector('.filter__block input');

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
    let users = filterUsers(filtersObject, usersArray);
    users = users.map((user) => createUser(user)).join("");
    usersListContainer.innerHTML = users;
    mainContainer.innerHTML = '';
    mainContainer.appendChild(usersListContainer);
    window.location.hash = '';
}

const createUser = (user) => {
    let picture = user.picture.medium;
    let name = user.name.first + ' ' + user.name.last;
    let age = user.dob.age;
    let location = user.location.country + ', ' + user.location.city;
    let email = user.email;
    let phone = user.phone;
    let gender = user.gender;

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

                    <div class="user-button" data-id="${name.replace(/\s/g, '').toLowerCase()}">
                        View Profile
                    </div>
                </div>
            </div>
        </div>
    `;
}

const renderUser = (user) => {
    let picture = user.picture.medium;
    let name = user.name.first + ' ' + user.name.last;
    let age = user.dob.age;
    let birthDate = new Date(user.dob.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    let country = user.location.country;
    let state = user.location.state;
    let city = user.location.city;
    let email = user.email;
    let phone = user.phone;
    let gender = user.gender;

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

                <div class="user-button user-button_close">
                    Back to Friends
                </div>
            </div>
        </div>
    `;
}

// filters
const sidebarFilters = document.querySelector('.main__sidebar');
sidebarFilters.addEventListener("submit", function(event) {
    event.preventDefault();

    renderUsers(getSidebarOptions(), usersList);

    if (window.screen.width <= 992) {
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

    let users = pipes.reduce((list, func) => {
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

    usersFilteredList = users;

    return users;
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
    if (sortValue.startsWith('alphabet')) {
        return array.sort((a, b) => {
            const nameA = a.name.first.toUpperCase();
            const nameB = b.name.first.toUpperCase();

            let isReversed = false;
            let result;

            if (sortValue == 'alphabetZA') {
                isReversed = true;
            }

            // Compare
            if (nameA < nameB) {
                result = -1;
            } else if (nameA > nameB) {
                result = 1;
            } else {
                result = 0;
            }

            // Reverse if needed
            if (isReversed) {
                result *= -1;
            }
            return result;
        });
    } else {
        return array.sort((a, b) => {
            if (sortValue == 'ageLowest') {
                return a.dob.age - b.dob.age;
            } else {
                return b.dob.age - a.dob.age;
            }
        });
    }

    return array;
}

//close user
const closeUser = () => {
    let singleUser = document.querySelector('.user_single');
    
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
            let id = e.target.closest('.user-button').dataset.id;
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
            let name = user.name.first + user.name.last;
            return name.toLowerCase().indexOf(location.hash.split('#')[1]) > -1;
        });
        renderUser(singleUser[0]);
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
const menuToggle = document .querySelector('.header__toggle-menu');

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
