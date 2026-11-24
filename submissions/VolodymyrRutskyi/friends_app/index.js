const URL = 'https://randomuser.me/api/?results=30&nat=us,dk,fr,gb&inc=gender,name,email,dob,phone,picture';
const usersContainer = document.querySelector('.users-container');
const searchField = document.querySelector('.controls-search');
const controlsNameSort = document.querySelectorAll('.controls-sort-name');
const controlsAgeSort = document.querySelectorAll('.controls-sort-age');
const controlsFilter = document.querySelectorAll('.form__filter-control');
const form = document.querySelector('form');
const resetBtn = document.querySelector('.controls-reset-button');
let usersData = [];
let usersSorted = [];

const statusMessages = {
    loading: 'Please, wait ...',
    loadingImg: 'img/loading.gif',
    failure: 'Something went wrong, please reload this page',
    failureImg: 'img/fail.png'
}

const getUsers = async (url) => {
    showStatusMessages(statusMessages.loading);
    try{
        const response = await fetch(url);
        const data = await response.json();
        usersData = [...data.results];
        initCards(usersData);
    } catch (error) {
        showStatusMessages(statusMessages.failure);
        console.warn(error);
    }
}
const showStatusMessages = (status) =>{
    if (status === statusMessages.loading){
        usersContainer.innerHTML = `
            <div class='status'>
                <img src=${statusMessages.loadingImg}></img>
                <p>${statusMessages.loading}</p>
            </div>
        `;
    }
    if (status === statusMessages.failure){
        usersContainer.innerHTML = `
            <div class='status'>
                <img src=${statusMessages.failureImg}></img>
                <p>${statusMessages.failure}</p>
            </div>
        `;
    }    
}

const initCards = (users) =>{
    const status = document.querySelector('.status');
    if (status){
      usersContainer.removeChild(status);  
    } 
    if (users.length === 0){
        usersContainer.innerHTML = `<div class='status'>No such users</div>`;
    } else {
        usersContainer.innerHTML = '';
    }
    users.forEach((item) =>{
        createCards(item);
    });
    return users;
}

const createCards = (user) =>{
    const {gender, name, email, dob, phone, picture} = user;
    usersContainer.innerHTML += `
        <div class="card">
            <div class="card-photo">
                <img src="${picture.large}" alt="Profile-photo">
            </div>
            <div class="card-name">
                <span class="first-name">${name.first}</span>
                <span class="last-name">${name.last}</span>
            </div>
            <div class="card-age">Age: <span>${dob.age}</span></div>
            <div class="card-gender">Gender: <span>${gender}</span></div>
            <div class="card-mail">${email}</div>
            <div class="card-phone">${phone}</div>
        </div>
    `;
}

const search = () => {
    const searchStr = searchField.value.toLowerCase();
    const users = usersData.filter((user) => user.name.first.toLowerCase().includes(searchStr));
    usersSorted = users;
    initCards(users);
};
function sortByAge(a, b) {
    return a.dob.age - b.dob.age;
}
function sortByFirstName(a, b) {
    return a.name.first !== b.name.first ? a.name.first < b.name.first ? -1 : 1 : 0;
}

const sortByName = (event) => {
    if (usersSorted.length === 0){
        usersSorted = usersData;
    }
    const nameSortDown = document.querySelector('#name-sorting-down');
    if (event.target === nameSortDown){
        usersSorted.sort((a, b) => sortByFirstName(a, b));
    } else {
        usersSorted.sort((a, b) => sortByFirstName(b, a));
    }
    initCards(usersSorted);
};
const sortByAges = (event) => {
    if (usersSorted.length === 0){
        usersSorted = usersData;
    }
    const ageSortDown = document.querySelector('#age-sorting-down');
    if (event.target === ageSortDown){
        usersSorted.sort((a, b) => sortByAge(b, a));
    } else {
        usersSorted.sort((a, b) => sortByAge(a, b));
    }
    initCards(usersSorted);
};
const filterByGender = (event) => {
    usersSorted = usersData;
    switch(event.target.value) {
        case 'male':
        case 'female':
            usersSorted = usersSorted.filter(item => item.gender === event.target.value);
            break;
        case 'all':   
            usersSorted = [...usersData];
            break;
    }
    initCards(usersSorted);
    return usersSorted;
};
const resetForm = (event) => {
    event.preventDefault();
    form.reset();
    usersSorted = usersData;
    initCards(usersData);
};

controlsNameSort.forEach((checkbox) =>{
    checkbox.addEventListener('change', sortByName);
});
controlsAgeSort.forEach((checkbox) =>{
    checkbox.addEventListener('change', sortByAges);
});
controlsFilter.forEach((checkbox) =>{
    checkbox.addEventListener('change', filterByGender);
});
searchField.addEventListener('input', search);
resetBtn.addEventListener('click', resetForm)

getUsers(URL);





