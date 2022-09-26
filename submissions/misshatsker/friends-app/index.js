const url = 'https://randomuser.me/api/?nat=UA&results=30';

const mainMenu = document.querySelector('.mainMenu');
const sectionDating = document.querySelector('.sectionDating');
const sectionUsers = document.querySelector('.sectionUsers');
const hamburger = document.querySelector('.hamburger');
const findBtn = document.querySelector('.findBtn');
const sortByAge = document.querySelector('.sortByAge');
const sortByGender = document.querySelector('.sortByGender');
const searchInput = document.querySelector('.searchInput');
const filterBy = document.querySelector('.filterBy');
const asideSearchForm = document.querySelector('.asideSearchForm');

function getUserFromRandomUserAPI (randomUser) {
    return {
        name: `${randomUser.name.first} ${randomUser.name.last}`,
        media: randomUser.picture.large,
        gender: randomUser.gender,
        age: randomUser.dob.age,
        email: randomUser.email,
        phone: randomUser.phone
    }
}

function checkResponseStatus(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function fetchRandomUsers() {
    try {
        const response = await fetch(url);
        const validatedResponse = checkResponseStatus(response);
        const data = await validatedResponse.json();
        const randomUsers = data.results;
        return randomUsers.map(getUserFromRandomUserAPI);
    } catch (error) {
        console.error(error);
    }
}

function getFilteredUsers(users, inputValue, ageFilterValue, genderFilterValue) {
    let filteredUsers = users;
    if (inputValue) {
        filteredUsers = filteredUsers.filter((user) => user.name.toLowerCase().includes(inputValue));
    }
    if (ageFilterValue) {
        filteredUsers = filteredUsers.filter((user) => user.age < ageFilterValue);
    }
    if (genderFilterValue) {
        filteredUsers = filteredUsers.filter((user) => user.gender === genderFilterValue);
    }

    return filteredUsers;
}

function appendUserCards(users) {
    const userCards = users.map((user) => new UserCard(user));
    userCards.forEach((userCard) => userCard.append());  
}

async function init() {
    function rulesUpdated() {
        sectionUsers.innerHTML = null;
        appendUserCards(
            getFilteredUsers(
                users,
                userInput.value,
                ageFilter.value,
                genderFilter.value
            )
        );
    }

    const userInput = new UserInput(searchInput, rulesUpdated);

    const ageFilter = new UserFilter(
        'age',
        [
            {id: 30, title: 'to 30'},
            {id: 50, title: 'to 50'},
            {id: 80, title: 'to 80'}
        ],
        rulesUpdated
    );
    
    const genderFilter = new UserFilter(
        'gender',
        [
            {id: 'male', title: 'male'},
            {id: 'female', title: 'female'}
        ],
        rulesUpdated
    );

    asideSearchForm.onreset = () => {
        userInput.reset();
        ageFilter.reset();
        genderFilter.reset();

        rulesUpdated();
    };

    const users = await fetchRandomUsers();
    rulesUpdated();
}

class UserCard {
    constructor(user) {
        this.user = user;
    }

    getUserCardHTMLCode() {
        const {media, name, gender, age, email, phone} = this.user;

        return `
            <img class="imageUser" src="${media}" alt="avatar">
            <div class="titleAge details">
                <img class="detailsIcon" src="./icon/name.png" alt="name">
                <p class="detailsContent">${name}, ${age}</p>
            </div>
            <div class="gender details">
                <img class="detailsIcon" src="./icon/sex.png" alt="gender">
                <p class="detailsContent">${gender}</p>
            </div>
            <div class="email details">
                <img class="detailsIcon" src="./icon/email.png" alt="email">
                <p class="detailsContent">${email}</p>
            </div>
            <div class="phone details">
                <img class="detailsIcon" src="./icon/call.png" alt="phone">
                <p class="detailsContent">${phone}</p>
            </div>
        `;
    }

    append() {
        const html = this.getUserCardHTMLCode();

        const card = document.createElement('div');
        card.className = 'user';
        card.innerHTML = html;

        sectionUsers.append(card);
    }
}

class UserFilter {
    constructor(filterName, options, rulesUpdated) {
        this.filterName = filterName;
        this.options = options;
        this.rulesUpdated = rulesUpdated;
        this.value = null;

        this.append();
    }

    getFilterHTMLCode() {
        const optionsElements = this.options.map((option) => {
            return `
                <div class="option">
                    <input type="radio" id="${option.id}" name="${this.filterName}">
                    <label class="radioButton" for="${option.id}">${option.title}</label>
                </div>
            `
        });

        return `
            <div class="sortRule">
                <p class="searchText">${this.filterName}:</p>
                ${optionsElements.join('')}
            </div>
        `
    }

    append() {
        const div = document.createElement('div');

        div.onclick = (e) => {
            const element = e.target;
            const elementName = element.tagName.toLowerCase();
            if (elementName === 'input') {
                this.updateValue(element.id);
            }
        }

        div.innerHTML = this.getFilterHTMLCode();
        filterBy.append(div);
    }

    updateValue(newValue) {
        this.value = newValue;
        this.rulesUpdated(newValue);
    }

    reset() {
        this.value = null;
    }
}

class UserInput {
    constructor(element, inputUpdated) {
        this.element = element;
        this.inputUpdated = inputUpdated;
        this.value = null;

        this.init();
    }

    init() {
        this.element.oninput = (e) => {
            this.value = e.target.value.toLowerCase();
            this.inputUpdated();
        }
    }

    reset() {
        this.value = null;
    }
}

const timeToHideIntro = 1000;
findBtn.onclick = () => {
    sectionDating.classList.add('active');

    sectionDating.scrollIntoView({behavior: 'smooth', });

    setTimeout(() => {
        mainMenu.classList.remove('active');
    }, timeToHideIntro);

    init();
}

hamburger.onclick = () => {
    hamburger.classList.toggle('active');
    asideSearchForm.classList.toggle('active');
}
