class User {
    constructor(userObj){
        this.firstName = userObj.name.first;
        this.lastName = userObj.name.last;
        this.age = userObj.dob.age;
        this.phone = userObj.phone;
        this.sex = userObj.gender;
        this.photo = userObj.picture.large;
    }

    createCardElement(){
        const CARD = document.createElement('div');
        CARD.setAttribute('class', 'card');
        // photo
        const CARD_PHOTO = document.createElement('img');
        CARD_PHOTO.src = this.photo;
        CARD_PHOTO.setAttribute('alt', `There is ${this.firstName} ${this.lastName} in the picture`);
        CARD_PHOTO.className = 'card__photo';
        // name
        const CARD_NAME = document.createElement('p');
        CARD_NAME.className = 'card__info';
        CARD_NAME.innerText = `${this.firstName} ${this.lastName}`;
        // age
        const AGE_SECTION = document.createElement('p');
        AGE_SECTION.className = 'card__info';
        AGE_SECTION.innerText = `${this.age} years old`;
        // sex
        const SEX_SECTION = document.createElement('p');
        SEX_SECTION.className = 'card__info';
        SEX_SECTION.innerText = this.sex;
        // phone 
        const CARD_PHONE = document.createElement('p');
        CARD_PHONE.className = 'card__info';
        CARD_PHONE.innerText = this.phone;
        // appending element into card
        CARD.appendChild(CARD_PHOTO)
        CARD.appendChild(CARD_NAME);
        CARD.appendChild(AGE_SECTION);
        CARD.appendChild(SEX_SECTION);
        CARD.appendChild(CARD_PHONE);        
        return CARD;
    }
}

let users;
let filteredUsers;
const ASIDE = document.getElementById('aside');
const CARD_CONTAINER = document.querySelector('#main');
const BTN_SORT_BY_AGE_ASCENDING = document.getElementById('btn__sort-age_ascending');
const BTN_SORT_BY_AGE_DESCENDING = document.getElementById('btn__sort-age_descending');
const BTN_SORT_BY_NAME_ALPHA = document.getElementById('btn__sort-name_alphabetical');
const BTN_SORT_BY_NAME_REVERSE = document.getElementById('btn__sort-name_alphabetical-reverse');
const BTN_FILTER_BY_AGE = document.getElementById('btn__filter_by-age');
const BTN_FILTER_BY_NAME = document.getElementById('btn__filter_by-name');
const BTN_FILTER_BY_SEX = document.getElementById('btn__filter_by-sex');
const BTN_RESET = document.getElementById('btn_reset');
const INPUT_AGE_FIELD = document.getElementById('input__filter_by-age');
const INPUT_NAME_FIELD = document.getElementById('input__filter_by-name');
const BTN_RADIO_MALE = document.getElementById('sex_male');
const BTN_RADIO_FEMALE = document.getElementById('sex_female');
const BTN_RADIO_ALL = document.getElementById('sex_all');
const INPUTS = document.querySelectorAll('input'); 

const URL_API = 'https://randomuser.me/api/?results=102';
const fetchData = async () => {
    try{
        const response = await fetch(URL_API);
        const jsonResponse = await response.json();
        users = await jsonResponse.results;
        filteredUsers = [...users];
        renderCards(users);
    }
    catch (error){
        alert('There is something wrong. Refresh the page or press "New query" button.');
    }
}
fetchData();

function renderCards(arrayOfUsers){
    CARD_CONTAINER.innerHTML = '';
    arrayOfUsers.forEach(user => {
        const newUser = new User (user);
        CARD_CONTAINER.appendChild(newUser.createCardElement());
    })
}

function resetInputs(){
    INPUTS.forEach( el => {
        if (el.type === 'text' || el.type === 'number') {
            el.value = '';
        }
        if (el.type === 'radio'){
            el.checked = false;
        }
    })
    BTN_RADIO_ALL.checked = true;
    filteredUsers = [...users];
}

function getSortedUsersByName(eventTarget) {
    let sortedByNameUsers = [...filteredUsers].sort((previousEl, nextEl) => {;
        if (previousEl.name.first.toLowerCase() < nextEl.name.first.toLowerCase()) {
            return -1;
        }
        if (previousEl.name.first.toLowerCase() > nextEl.name.first.toLowerCase()) {
            return 1;
        }
        if (previousEl.name.first.toLowerCase() === nextEl.name.first.toLowerCase()) {
            return 0;
        }
    });
    if (eventTarget === BTN_SORT_BY_NAME_ALPHA){
        filteredUsers = [...sortedByNameUsers];
    }
    if (eventTarget === BTN_SORT_BY_NAME_REVERSE){
        filteredUsers = [...sortedByNameUsers].reverse();
    }
    return filteredUsers;
}

function getSortedUsersByAge(eventTarget) {
    let sortedByAgeUsers = filteredUsers.sort((previousEl, nextEl) => {;
        if (previousEl.dob.age < nextEl.dob.age) {
            return -1;
        }
        if (previousEl.dob.age > nextEl.dob.age) {
            return 1;
        }
        if (previousEl.dob.age === nextEl.dob.age) {
            return 0;
        }
    });
    if (eventTarget === BTN_SORT_BY_AGE_ASCENDING){
        filteredUsers = [...sortedByAgeUsers];
    }
    if (eventTarget === BTN_SORT_BY_AGE_DESCENDING){
        filteredUsers = [...sortedByAgeUsers].reverse();
    }
    return filteredUsers;
}

function getFilteredByName(){
    let filterValueName = INPUT_NAME_FIELD.value;
    if (filterValueName){
        let filteredByNameUsers = filteredUsers.filter(el => {
            return el.name.first.toLowerCase().includes(filterValueName.toLowerCase()) || el.name.last.toLowerCase().includes(filterValueName.toLowerCase());
        });
        filteredUsers = [...filteredByNameUsers];
        return filteredUsers;
    } else{
        return filteredUsers;
    }
}

function getFilteredByAge(){
    let filterValueAge = INPUT_AGE_FIELD.value;
    if (filterValueAge){
        let filteredByAgeUsers = filteredUsers.filter(el => {
            return el.dob.age === +filterValueAge;
        });
        filteredUsers = [...filteredByAgeUsers];
        return filteredUsers;
    }
    else {
        return filteredUsers;
    }
}

function getFilteredBySex(){
    if (BTN_RADIO_MALE.checked === true || BTN_RADIO_FEMALE.checked === true){
        let filterValueSex = BTN_RADIO_MALE.checked === true ? 'male' : 'female';
        let filteredBySexUsers = filteredUsers.filter(el => {
            return el.gender === filterValueSex;
        });
        filteredUsers = [...filteredBySexUsers];
        return filteredUsers;
    } else {
        return filteredUsers;
    }
}

ASIDE.addEventListener('click', event => {
    if (event.target.parentElement === BTN_SORT_BY_NAME_ALPHA || event.target.parentElement === BTN_SORT_BY_NAME_REVERSE){
        renderCards(getSortedUsersByName(event.target.parentElement));
    }
    if (event.target.parentElement === BTN_SORT_BY_AGE_ASCENDING || event.target.parentElement === BTN_SORT_BY_AGE_DESCENDING){
        renderCards(getSortedUsersByAge(event.target.parentElement));
    }
    if (event.target === BTN_FILTER_BY_NAME){
       renderCards(getFilteredByName());
    }
    if (event.target === BTN_FILTER_BY_AGE){
        renderCards(getFilteredByAge());
    }
    if (event.target === BTN_FILTER_BY_SEX){
        renderCards(getFilteredBySex(filteredUsers));
    }
    if (event.target === BTN_RESET){
        resetInputs();
        renderCards(users);
    }
});

ASIDE.addEventListener('keypress', event => {
    if (event.key === 'Enter' && event.target === INPUT_AGE_FIELD) {
        renderCards(getFilteredByAge());
    };
    if (event.key === 'Enter' && event.target === INPUT_NAME_FIELD) {
        renderCards(getFilteredByName());
    }
});
