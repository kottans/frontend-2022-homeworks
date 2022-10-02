
//const ITEMS_PER_PAGE = 10; feature pagination
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

const getUsers = async() => {
    try {
        const users = await callAPI();
        usersList.push(...users);
        renderUsers([]);
    } catch (e) {
        console.log(e);
    }
}

const getOpt = (name) => {
    return document.querySelector(`.filter__block input[name="${name}"]:checked`);
}

const mainContainer = document.getElementById('main__content');
let usersListContainer = document.createElement('div');
usersListContainer.classList.add('users');

const renderUsers = (pipes, usersFiltered) => {
    let users = pipes.reduce((list, func) => {
        if (func.name.startsWith('filter')) { // Filter
            return list.filter(func);
        } else if (func.name.startsWith('sort')) { // Sort
            return list.sort(func)
        } else { // Do nothing
            return list;
        }
    }, usersList);

    usersFilteredList = users;
    
    if (usersFiltered) {
        users = usersFiltered.map((user) => createUser(user)).join("");
    } else {
        users = users.map((user) => createUser(user)).join("");
    }
    
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
nameInput.addEventListener('input', (e) => {
    const value = e.preventDefault();
    const pipes = [filterByName];
    
    if (getOpt('alphabet')) {
        pipes.push(sortByAlphabet);
    }
    if (getOpt('age')) {
        pipes.push(sortByAge);
    }
    if (getOpt('gender')) {
        pipes.push(filterByGender);
    }

    renderUsers(pipes);
});

document.querySelectorAll('.filter__block input[type="radio"]').forEach((elem) => {
    elem.addEventListener("change", function(event) {

        switch (event.target.name) {
            case 'alphabet':
                uncheckRadio('age');
                renderUsers([
                    filterByName,
                    filterByGender,
                    sortByAlphabet
                ]);

                break;
            case 'gender':
                const pipes = [
                    filterByName,
                    filterByGender,
                ];
                if (getOpt('alphabet')) {
                    pipes.push(sortByAlphabet);
                }
                if (getOpt('age')) {
                    pipes.push(sortByAge);
                }
                renderUsers(pipes);

                break;
            case 'age':
                uncheckRadio('alphabet');
                renderUsers([
                    filterByName,
                    filterByGender,
                    sortByAge
                ]);
                break;
            default:
                // renderUsers();
        }
    });
});

const filterByName = (user) => {
    const searchValue = nameInput.value.trim().toLowerCase();
    return user.name.first.toLowerCase().includes(searchValue);
}

const filterByGender = (user) => {
    const genderRadioOpt = getOpt('gender');
    if (!genderRadioOpt) { // Pass all if none gender checked
        return true;
    }

    if (!['male', 'female'].includes(genderRadioOpt.id)) { // Pass all if 'all' gender checked
        return true;
    }

    return genderRadioOpt.id === user.gender;
}

const sortByAlphabet = (a, b) => {
    const alphabetRadioOpt = getOpt('alphabet');

    if (alphabetRadioOpt) {
        let isReversed = alphabetRadioOpt.id === 'alphabetZA';
        const nameA = a.name.first.toUpperCase();
        const nameB = b.name.first.toUpperCase();
        let result;

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
    }

    return 0;
}

const sortByAge = (userA, userB) => {
    const ageRadioOpt = getOpt('age');

    if (ageRadioOpt) {
        let isReversed = ageRadioOpt.id === 'ageHighest';
        return isReversed
            ? userB.dob.age - userA.dob.age
            : userA.dob.age - userB.dob.age;
    }

    return 0;
}

//reset
let filterReset = document.querySelector('.filter__block button');

filterReset.addEventListener('click', (e) => {
    const value = e.preventDefault();
    const genderAll = document.getElementById('genderAll');

    closeUser();
    genderAll.checked = true;
    uncheckRadio('age');
    uncheckRadio('alphabet');
    filter.value = '';

    renderUsers([]);
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
        renderUsers([], usersFilteredList);
    }
}, false);

//helpers
const uncheckRadio = (name) => {
    let radioList = document.getElementsByName(name);

    radioList.forEach((title) => {
        title.checked = false;
    });
}

const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

//toggle theme
const theme = document.querySelector('.header__toggle');
const body = document.querySelector('body');

theme.addEventListener('click', (e) => {
    const value = e.preventDefault();
    body.classList.toggle('theme-dark');
});

//init
getUsers();