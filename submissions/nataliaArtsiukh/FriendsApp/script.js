const board = document.querySelector('.main-section');
const genderFilter = document.querySelector('.gender-filter');
const sortFriends = document.querySelector('.sort');
const nameFilter = document.querySelector('.form-input');
const friends = [];
const quotations = [
    'A dear friend from afar flies in for a minute - and you don\'t have a cake!', 
    'Tell me who your friend is and I\'ll tell him how unlucky he is.',
    'True friends never judge each other. They judge other people. Together.',
    'You can\'t ruin a friendship with sex! How can you ruin ice cream by sprinkling it with chocolate?',
    'Let\'s be friends. Let\'s be like brother and sister... Like second cousin and second cousin. This does not exclude some nuances.',
    'At what idiot fair did you find your friend?'
]; 

const createCard = function({name: {first, last}, email, dob: {age}, phone, picture: {large}}) {
    const card = document.createElement('div');
    card.classList.add('card');
    board.append(card); 
    const photo = document.createElement('img');
    photo.setAttribute('src', large);
    photo.setAttribute('alt', `Photo of ${first} ${last}`);
    photo.classList.add('card-img');
    card.append(photo);
    const name = document.createElement('h2');
    name.classList.add('name');
    name.textContent = `${first} ${last}`;
    card.append(name);
    const personAge = document.createElement('p');
    personAge.classList.add('age');
    personAge.textContent = `${age} years.`;
    card.append(personAge);
    const phoneNumber = document.createElement('p');
    phoneNumber.classList.add('contacts');
    phoneNumber.textContent = phone;
    card.append(phoneNumber);
    const emailAddress = document.createElement('p');
    emailAddress.classList.add('contacts');
    emailAddress.textContent = email;
    card.append(emailAddress);
}

const getFriends = async function() {
    const response = await fetch('https://randomuser.me/api/?results=100&inc=gender,name,email,picture,dob,phone&noinfo');
    const {results:people} = await response.json();
    friends.push(...people); 
    drawCards(friends);
}

const drawCards = function(people) {
    board.innerHTML = '';
    people.forEach(friend => createCard(friend));
}

const filterByGender = function(friends, sex) {
    return friends.filter(({gender}) => gender == sex);
}

genderFilter.addEventListener('click', function(e) {
    let filteredFriends = friends;
    const genderLabel = e.target.closest('.form-label');
    if (genderLabel) {
        if (genderLabel.classList.contains('male')) {
            filteredFriends = filterByGender(friends, 'male');
        } else if (genderLabel.classList.contains('female')) {
            filteredFriends = filterByGender(friends, 'female')
        } 
        drawCards(filteredFriends);
    }
})

const sortByAge = function(friends, ageSortDirection) {
    if (ageSortDirection == 'from-yang') {
        return friends.sort((firstFriend, secondFriend) => firstFriend.dob.age - secondFriend.dob.age)
    } else if (ageSortDirection == 'from-old') {
        return friends.sort((firstFriend, secondFriend) => secondFriend.dob.age - firstFriend.dob.age)
    }
}

const sortByAlphabet = function(friends, alphabetSortDirection) {
    if (alphabetSortDirection == 'foreward') {
        return friends.sort(({name: {first: firsName, last: firstSurname}}, {name: {first: secondName, last: secondSurname}}) => 
            `${firsName} ${firstSurname}`.localeCompare(`${secondName} ${secondSurname}`))
    } else if (alphabetSortDirection == 'backward') {
        return friends.sort(({name: {first: firsName, last: firstSurname}}, {name: {first: secondName, last: secondSurname}}) => 
        `${secondName} ${secondSurname}`.localeCompare(`${firsName} ${firstSurname}`))
    }
}

sortFriends.addEventListener('click', function(e) {
    let sortedFriends = friends;
    const sortLabel = e.target.closest('.form-label');
    if (sortLabel) {
        if (sortLabel.classList.contains('from-yang')) {
            sortedFriends = sortByAge(friends, 'from-yang');
        } else if (sortLabel.classList.contains('from-old')) {
            sortedFriends = sortByAge(friends, 'from-old');
        } else if (sortLabel.classList.contains('foreward')) {
            sortedFriends = sortByAlphabet(friends, 'foreward');
        } else if (sortLabel.classList.contains('backward')) {
            sortedFriends = sortByAlphabet(friends, 'backward');
        }
        drawCards(sortedFriends)
    }
})

const filterByName = function(friends, inputText) {
    return friends.filter(({name:{first, last}}) => 
        first.toLowerCase().startsWith(inputText) || last.toLowerCase().startsWith(inputText) || `${first} ${last}`.toLowerCase().startsWith(inputText)
    )
}

nameFilter.addEventListener('input', function(e) {
    let filteredFriends = friends;
    const inputText = e.target.value;
    filteredFriends = filterByName(friends, inputText.toLowerCase());
    drawCards(filteredFriends);
})

const showRandomQuotation = function() {
    const quote = document.querySelector('.quote');
    const randomIndex = Math.floor(Math.random() * quotations.length);
    quote.textContent = quotations[randomIndex];
}

getFriends();
showRandomQuotation();
