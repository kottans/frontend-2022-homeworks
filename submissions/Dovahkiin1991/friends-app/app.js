
//const ITEMS_PER_PAGE = 10; feature pagination
const usersList = [];
let usersListTemp = usersList;

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

async function getUsers() {
    try {
        const users = await callAPI();
        usersList.push(...users);
        renderUsers(usersList);
    } catch (e) {
        console.log(e);
    }
}

const mainContainer = document.getElementById('main__content');
let usersListContainer = document.createElement('div');
usersListContainer.classList.add('users');

const renderUsers = (usersList) => {
    let users = usersList.map((user) => createUser(user)).join("");
    usersListContainer.innerHTML = users;
    mainContainer.appendChild(usersListContainer);
}

const createUser = (user) => {
    return `
        <div class="users__item">
            <div class="user">
                <div class="user-block">
                    <div class="user-poster">
                        <img src="${user.picture.medium}" alt="${user.name.first + ' ' + user.name.last}">
                    </div>

                    <div class="user-headings">
                        <h5><strong>${user.name.first + ' ' + user.name.last}</strong></h5>
                        <h6>${user.dob.age} years old</h6>
                    </div>

                    <div class="user-description">
                        <p>${user.location.country + ', ' + user.location.city}</p>
                        <p>
                            <a href="mailto:${user.email}">${user.email}</a>
                        </p>
                        <p>
                            <a href="tel:${user.phone}">${user.phone}</a>
                        </p>
                        <p class="uppercase">${user.gender}</p>
                    </div>

                    <div class="user-button" data-id="${user.name.last.toLowerCase()}">
                        View Profile
                    </div>
                </div>
            </div>
        </div>
    `;
}

const renderUser = (user) => {
    let singleUser = `
        <div class="user user--single">
            <div class="user-block">
                <div class="user-poster">
                    <img src="${user.picture.medium}" alt="${user.name.first + ' ' + user.name.last}">
                </div>

                <div class="user-headings">
                    <h5><strong>${user.name.first + ' ' + user.name.last}</strong></h5>
                    <h6>${user.dob.age} years old</h6>
                </div>

                <div class="user-description">
                    <p><strong>User Location:</strong></p>
                    <p>${new Date(user.dob.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
                    <p>&nbsp;</p>
                    <p><strong>User Location:</strong></p>
                    <p>${user.location.country}</p>
                    <p>${user.location.state}</p>
                    <p>${user.location.city}</p>
                    <p>&nbsp;</p>
                    <p><strong>User Contacts:</strong></p>
                    <p>
                        <a href="mailto:${user.email}">${user.email}</a>
                    </p>
                    <p>
                        <a href="tel:${user.phone}">${user.phone}</a>
                    </p>
                    <p>&nbsp;</p>
                    <p><strong>User Gender:</strong></p>
                    <p class="uppercase">${user.gender}</p>
                </div>

                <div class="user-button user-button--close">
                    Back to Friends
                </div>
            </div>
        </div>
    `;
    mainContainer.innerHTML = singleUser;
}

// filters
let filter = document.querySelector('.filter__block input');

filter.addEventListener('input', (e) => {
    const value = e.preventDefault();
    const searchValue = e.target.value.trim().toLowerCase();

    if (searchValue !== '') {
        const filteredFriends = usersList.filter((user) => {
            return user.name.first.toLowerCase().indexOf(searchValue) > -1;
        });
        usersListTemp = [...filteredFriends];

    } else {
        usersListTemp = [...usersList];
    }

    renderUsers(usersListTemp);
});

document.querySelectorAll('.filter__block input[type="radio"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
        let checkedValue = event.target.id;
        let filteredFriends = [];

        switch (event.target.name) {
            case 'alphabet':
                uncheckRadio('age');

                filteredFriends = usersListTemp.sort((a, b) => {
                    const nameA = a.name.first.toUpperCase();
                    const nameB = b.name.first.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                });

                if (event.target.id == 'alphabetZA') {
                    filteredFriends.reverse();
                }

                break;
            case 'gender':
                if (event.target.id === 'male' || event.target.id === 'female') {
                    filteredFriends = usersListTemp.filter(friend => friend.gender === event.target.id);
                    
                } else {
                    filteredFriends = [...usersListTemp];
                }

                break;
            case 'age':
                uncheckRadio('alphabet');
 
                filteredFriends = usersListTemp.sort((a, b) => a.dob.age - b.dob.age);

                if (event.target.id == 'ageHighest') {
                    filteredFriends.reverse();
                }

                break;
            default:
                filteredFriends = [...usersList];
        }

        renderUsers(filteredFriends);
    });
});

// reset
let filterReset = document.querySelector('.filter__block button');
filterReset.addEventListener('click', (e) => {
    const value = e.preventDefault();
    closeUser();
    uncheckRadio('age');
    uncheckRadio('alphabet');
    filter.value = '';

    renderUsers(usersList);
});

//close user
const closeUser = () => {
    let singleUser = document.querySelector('.user--single');
    
    if (singleUser) {
        singleUser.parentNode.removeChild(singleUser);
    }

    window.location.hash = '';
}

//read more
mainContainer.addEventListener('click', (e) => {
    const value = e.preventDefault();

    if(e.target.closest('.user-button')) {
        if (!e.target.closest('.user-button').classList.contains('user-button--close')) {
            let id = e.target.closest('.user-button').dataset.id;
            window.location.hash = id;
        } else {
            closeUser();
            renderUsers(usersList);
        }
        
    }
});

//change hash event
window.addEventListener('hashchange', () => {
    if (window.location.hash) {
        const singleUser = usersList.filter((user) => {
            return user.name.last.toLowerCase().indexOf(location.hash.split('#')[1]) > -1;
        });
        renderUser(singleUser[0]);
    } else {
        renderUsers(usersList);
    }
}, false);

//helper
const uncheckRadio = (name) => {
    let radioList = document.getElementsByName(name);

    radioList.forEach((title) => {
        title.checked = false;
    });
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

// toggle theme
const theme = document.querySelector('.header__toggle');
const body = document.querySelector('body');

theme.addEventListener('click', (e) => {
    const value = e.preventDefault();
    body.classList.toggle('theme-dark');
});

//init
getUsers();