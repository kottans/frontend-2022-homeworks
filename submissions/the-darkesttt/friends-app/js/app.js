const usersList = document.querySelector('.users-list');
const sortBar = document.querySelector('.sort-bar');
const searchBar = document.querySelector('.sort-bar__search');

const allRadioBtns = document.querySelectorAll('input[type="radio"]');
const genderRadioBtns = document.querySelectorAll('input[name="gender"]');
const ageRadioBtns = document.querySelectorAll('input[name="age"]');
const alphabetRadioBtns = document.querySelectorAll('input[name="alphabet"]');

// get data

const requestURL = 'https://randomuser.me/api/?results=12&exc=location,login,registered,cell,id,nat';

function sendRequest (url) { 
    return fetch(url).then(response => {
        return response.json();
    }).catch(err => {
        alert('Something went wrong, try again!');
        console.error(err);
        location.reload();
    });
}

let initialFriendsArr;

sendRequest(requestURL)
.then((serverData) => {
  initialFriendsArr = serverData.results;
  initialFriendsArr = createFriendsCopy(initialFriendsArr);
  generateUsers(initialFriendsArr);
})
.catch((err) => {
    console.log(err);
});

function createFriendsCopy(friends) {
    const temp = [];
    friends.forEach(friend => {
        temp.push({
          fullName: `${friend.name.first} ${friend.name.last}`,
          picture: friend.picture.large,
          email: friend.email,
          phone: friend.phone,
          gender: friend.gender,
          age: friend.dob.age,
        });
    })
    return temp;
}
// generating html list

function createElement({fullName, picture, email, phone, gender, age}) {
    return `
    <li class='list-item'>
        <div class='user-top'>
            <img src='${picture}'>
            <h2 userData-name="${fullName}">${fullName}</h2>
            <p>${email}</p>
            <p>${phone}</p>
        </div>
        <div class='user-bottom'>
            <p data-gender='${gender}'>${gender}</p>
            <p data-age='${age}'>${age}</p>
        </div>
    </li>
    `;
}

const generateUsers = (users) => {
    usersList.innerHTML = users.reduce((acc, user) => {
        return acc += createElement(user);
    }, '');
};

// sorting bar 

let friendsArrCopy;

let searchInputValue;
let selectedGender;
let selectedAgeDirection;
let selectedAlphabetDirection;
let resetSorting;

function handleSorting(friends) {

    friends = sortByInput(friends);
    friends = sortByGender(friends);
    sortByAge(friends);
    sortByName(friends)
    friends = resetToInitial(friends);

    generateUsers(friends);
}

sortBar.addEventListener('click', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];

    if (target.name === 'gender') {
        selectedGender = target.value;
    }

    if (target.name === 'age') {
        selectedAgeDirection = target.value;
        selectedAlphabetDirection = null;
    }

    if (target.name === 'alphabet') {
        selectedAlphabetDirection = target.value;
        selectedAgeDirection = null;
    }

    if (target.value !== 'reset') {
        resetSorting = false;
    }

    if (target.value === 'reset') {
        resetSorting = true;
    }
    
    handleSorting(friendsArrCopy);
})


// sorting functions

searchBar.addEventListener('input', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];
    searchInputValue = target.value.trim().toLowerCase();
    handleSorting(friendsArrCopy);
});

function sortByInput(friendsCopy) {
    if (searchInputValue !== '') {

        const filteredFriends = friendsCopy.filter(({fullName}) => {
            fullName = fullName.toLowerCase();
            if (fullName.search(searchInputValue) !== -1) return true;
        });
        friendsCopy = [...filteredFriends];

    } else {
        friendsCopy = [...initialFriendsArr];
    }
    return friendsCopy;
}

function sortByGender(friendsCopy) {
    switch(selectedGender) {
        case 'male':
        case 'female':
            return friendsCopy.filter(friend => friend.gender === selectedGender);
        case 'all':
        default:
            return friendsCopy;
    }
}

function sortByAge(friendsCopy) {
    if (selectedAgeDirection) {

        friendsCopy.sort(({age: a}, {age: b}) => b - a)
        if (selectedAgeDirection === "ageUp") friendsCopy.reverse();

    } else {
        ageRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });
    }
}

function sortByName(friendsCopy) {
    if (selectedAlphabetDirection) {

        friendsCopy.sort(({ fullName: a }, { fullName: b}) =>  a > b);
        if (selectedAlphabetDirection === "ZA") friendsCopy.reverse();

    } else {
        alphabetRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });
    }
}

function resetToInitial(friendsCopy) {
    if (resetSorting) {

        selectedGender = null;
        selectedAgeDirection = null;
        selectedAlphabetDirection = null;
        searchBar.value = '';
        allRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });

        friendsCopy = [...initialFriendsArr];
    }
    return friendsCopy;
}
