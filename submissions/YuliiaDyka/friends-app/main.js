"use strict"

let requestErrorsCounter = 0;
const cardsSection = document.querySelector('.grid__wrapper');
const firstScreen = document.querySelector('.form__wrapper');
const mainScreen = document.querySelector('.wrapper');
const firstScreenForm = document.querySelector('.form_first-screen');
const aside = document.querySelector('.aside');
const search = document.querySelector('#search');
const resetFormBtn = document.querySelector('.aside__button');
const sortBtns = document.querySelectorAll('.sort');
const navigation = document.querySelector('.bottom__menu');
const loadingIcon = document.querySelector('.loading__animation');
const submitBtn = document.querySelector('.submit');

let min = document.querySelector('input[id="aside_input-min"]'); 
let max = document.querySelector('input[id="aside_input-max"]');
let allUsers;
let filtredUsers;
let filters = {
    name: '',
    sex: '',
    minAge: 18,
    maxAge: 120,
    sort: '',
};

aside.addEventListener('click', getFiltredUsers);
mainScreen.addEventListener('click', showFilters);
mainScreen.addEventListener('mousemove', showBotoomMenu);
aside.addEventListener('input', getFiltredUsersByAgeRange);
search.addEventListener('input', searchName);
resetFormBtn.addEventListener('click', resetForm);
firstScreenForm.addEventListener('submit', getDataFromFirstForm);

function getDataFromFirstForm(e) {
    e.preventDefault(); 
    submitBtn.classList.add('hidden');
    loadingIcon.classList.add('visible');
    filters.sex = document.querySelector('input[name="sex"]:checked').id;
    filters.minAge = document.querySelector('input[id="input-min"]').value;
    filters.maxAge = document.querySelector('input[id="input-max"]').value;

    if (filters.minAge) {
        min.value = filters.minAge;
    } else {
        min.value = filters.minAge = 18;
    }

    if (filters.maxAge) {
        max.value = filters.maxAge
    } else {
        max.value = filters.maxAge = 120;
    }

    switch (filters.sex) {
        case 'male': 
        document.querySelector('input[id="male_aside"]').checked = true;
        break;

        case 'female': 
        document.querySelector('input[id="female_aside"]').checked = true;
        break;

        case 'all': 
        document.querySelector('input[id="all_aside"]').checked = true;
        break;
    };
    getUsers();
};

function getUsers() {
    const url = "https://randomuser.me/api/?results=200";
    const promise = fetch(url);
    return promise
        .then(data => data.json())
        .then(users => {
            allUsers = [...users.results];
            filtredUsers = filterByAge(filterBySex(allUsers));
            renderCards(filtredUsers);
            firstScreen.classList.add("hidden");
        })
        .catch(function() {
            requestErrorsCounter++;
            if (requestErrorsCounter < 5) {
                getUsers();
            } else {
                console.log(Error("Помилка серверу. Перезапустіть сторінку."))
            }
        });
};

function renderCards(usersArr) {
    cardsSection.innerHTML = "";
    usersArr.forEach(user => {
        new Card(user).render();
    });
};

// sorting & filters
function getFiltredUsersByAgeRange(e) {
    if (e.target.id == "aside_input-min" || e.target.id == "aside_input-max") {
        filters.minAge = document.querySelector('input[id="aside_input-min"]').value;
        filters.maxAge = document.querySelector('input[id="aside_input-max"]').value;
        filtredUsers = filterBySex(filterByAge(allUsers));
        renderCards(filtredUsers);
    } 
}    

function getFiltredUsers(e) {
    switch (e.target.id) {
        case 'female_aside':
            filters.sex = 'female';
            break;
        case 'male_aside':
            filters.sex = 'male';
            break;
        case 'all_aside':
            filters.sex = null;
            break;    
        case 'a-z':
            sortBtns.forEach(btn => {btn.classList.remove('sort_active')});
            filters.sort = "a-z";
            filtredUsers = sortByName(allUsers);
            e.target.classList.add('sort_active');
            break;
        case 'z-a':
            sortBtns.forEach(btn => {btn.classList.remove('sort_active')});
            filters.sort = "z-a";
            filtredUsers = sortByName(allUsers);
            e.target.classList.add('sort_active');
            break;
        case '1-9':
            sortBtns.forEach(btn => {btn.classList.remove('sort_active')});
            filters.sort = "1-9";
            filtredUsers = sortByAge(allUsers);
            e.target.classList.add('sort_active');
            break;
        case '9-1':
            sortBtns.forEach(btn => {btn.classList.remove('sort_active')});
            filters.sort = "9-1";
            filtredUsers = sortByAge(allUsers);
            e.target.classList.add('sort_active');
            break;
            
            default:
            break;
    }
    filtredUsers = filterBySex(filterByAge(allUsers));
    filters.name ? searchName() : filtredUsers;
    renderCards(filtredUsers);
}

function filterByName(user, name) {
    let userName = user.name.first;
    userName = userName.toLowerCase();
    return userName.includes(name);
}

function filterBySex(arr) {
    if (filters.sex == "male" || filters.sex == "female" ) {
        return arr.filter(user => user.gender == filters.sex)
    } else {
        return arr;
    }
}

function filterByAge(arr) {
    !filters.minAge ?  filters.minAge = 18 : filters.minAge; 
    !filters.maxAge ?  filters.maxAge = 120 : filters.maxAge; 
    return arr.filter(user => user.dob.age >= filters.minAge && user.dob.age <= filters.maxAge);
}

function sortByName(arr) {
    if (filters.sort ==  "a-z" || filters.sort ==  "z-a") {
        arr.sort(function(a, b) {
                let nameA = a.name.first.toLowerCase(), nameB = b.name.first.toLowerCase();
                if (nameA < nameB) {
                    return -1
                } else if (nameA > nameB) {
                    return 1
                } else {
                    return 0
                }
            });
        return filters.sort === 'a-z' ? arr : arr.reverse();
    }
}

function sortByAge(arr) {
    if (filters.sort ==  "1-9" || filters.sort ==  "9-1") { 
    arr.sort((a, b) => a.dob.age - b.dob.age);
    return filters.sort === '1-9' ? arr : arr.reverse();
    }
}

function searchName() {
    filters.name = search.value.toLowerCase();
    if (filters.name) {
        filtredUsers = filterBySex(filterByAge(allUsers));
        filtredUsers = filtredUsers.filter(user => filterByName(user, filters.name));
        renderCards(filtredUsers);
    } else {
        filtredUsers = filterBySex(filterByAge(allUsers));
        renderCards(filtredUsers);
    }
}

function resetForm() {
    filters = {
        name: '',
        sex: '',
        minAge: 18,
        maxAge: 120,
        sort: '',
    };
    document.querySelector('input[id="all_aside"]').checked = true;
    min.value = filters.minAge;
    max.value = filters.maxAge;
    sortBtns.forEach(btn => {btn.classList.remove('sort_active')});
    renderCards(allUsers);
}

function showFilters(e) {
    if (window.innerWidth < 767) {
        if (e.target.className == "form_aside") {
            aside.classList.add('show-aside');
        } else if (!aside.contains(e.target)) {
            aside.classList.remove('show-aside');
        }
    }
}

function showBotoomMenu(e) {
    const showMenuArea = {
        x: 400,
        y: 550
    }
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    
    if (mouseX > showMenuArea.x && mouseY > showMenuArea.y) {
        navigation.classList.add('menu__up');
    } else {
        navigation.classList.remove('menu__up');
    }

}
