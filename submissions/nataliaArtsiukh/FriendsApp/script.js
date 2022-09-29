const board = document.querySelector('.main-section');
const genderFilter = document.querySelector('.gender-filter');
const sortFriends = document.querySelector('.sort');
const nameFilter = document.querySelector('.form-input');
let nameFilterValue = '';
let genderFilterValue = '';
let sortValue = '';
const friends = [];
const quotations = [
    'A dear friend from afar flies in for a minute - and you don\'t have a cake!', 
    'Tell me who your friend is and I\'ll tell him how unlucky he is.',
    'True friends never judge each other. They judge other people. Together.',
    'You can\'t ruin a friendship with sex! How can you ruin ice cream by sprinkling it with chocolate?',
    'Let\'s be friends. Let\'s be like brother and sister... Like second cousin and second cousin. This does not exclude some nuances.',
    'At what idiot fair did you find your friend?'
]; 

const getFriends = async function() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=100&inc=gender,name,email,picture,dob,phone&noinfo');
        const {results:people} = await response.json();
        friends.push(...people); 
        drawCards(friends);
    } catch (error) {
        alert('Try again later.');
    } 
}

const drawCards = function(people) {
    board.innerHTML = '';
    const cards = people.map(({name: {first, last}, email, dob: {age}, phone, picture: {large}}) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.insertAdjacentHTML('beforeend', `
            <img src="${large}" alt="Photo of ${first} ${last}" class="card-img">
            <h2 class="name">${first} ${last}</h2>
            <p class="age">${age} years.</p>
            <p class="contacts">${phone}</p>
            <p class="contacts">${email}</p>
        `);
        return card;
    });
    board.append(...cards);
}

const filterByName = function(friends, inputText) {
    if (inputText) {
        return friends.filter(({name:{first, last}}) => 
            first.toLowerCase().startsWith(inputText) || last.toLowerCase().startsWith(inputText) || `${first} ${last}`.toLowerCase().startsWith(inputText)
        )
    }
    return friends;
}

const filterByGender = function(friends, sex) {
    if (sex) {
        return friends.filter(({gender}) => gender == sex);
    } 
    return friends;
}

const sort = function(friends, sortDirection) {
    if (sortDirection == 'ascending') {
        return friends.sort(({name: {first: firsName, last: firstSurname}}, {name: {first: secondName, last: secondSurname}}) => 
            `${firsName} ${firstSurname}`.localeCompare(`${secondName} ${secondSurname}`))
    } else if (sortDirection == 'descending') {
        return friends.sort(({name: {first: firsName, last: firstSurname}}, {name: {first: secondName, last: secondSurname}}) => 
        `${secondName} ${secondSurname}`.localeCompare(`${firsName} ${firstSurname}`))
    } else if (sortDirection == 'from-young') {
        return friends.sort((firstFriend, secondFriend) => firstFriend.dob.age - secondFriend.dob.age)
    } else if (sortDirection == 'from-old') {
        return friends.sort((firstFriend, secondFriend) => secondFriend.dob.age - firstFriend.dob.age)
    } else {
        return friends;
    }
}

const applyFilters = function() {
    let filteredFriends = friends;
    filteredFriends = filterByName(filteredFriends, nameFilterValue);
    filteredFriends = filterByGender(filteredFriends, genderFilterValue);
    filteredFriends = sort(filteredFriends, sortValue);
    return filteredFriends;
}

nameFilter.addEventListener('input', function(e) {
    nameFilterValue = e.target.value.toLowerCase();
    let filteredFriends = applyFilters();
    drawCards(filteredFriends);
})

genderFilter.addEventListener('input', function(e) {
    genderFilterValue = e.target.value;
    let filteredFriends = applyFilters();
    drawCards(filteredFriends);
})

sortFriends.addEventListener('input', function(e) {
    sortValue = e.target.value;
    let filteredFriends = applyFilters();
    drawCards(filteredFriends);
})

const showRandomQuotation = function() {
    const quote = document.querySelector('.quote');
    const randomIndex = Math.floor(Math.random() * quotations.length);
    quote.textContent = quotations[randomIndex];
}

getFriends();
showRandomQuotation();
