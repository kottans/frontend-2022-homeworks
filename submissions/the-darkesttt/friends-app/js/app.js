const usersList = document.querySelector('.users-list');
const sortBar = document.querySelector('.sort-bar');
const searchBar = document.querySelector('.sort-bar__search');

const allRadioBtns = document.querySelectorAll('input[type="radio"]');
const genderRadioBtns = document.querySelectorAll('input[name="gender"]');
const ageRadioBtns = document.querySelectorAll('input[name="age"]');
const alphabetRadioBtns = document.querySelectorAll('input[name="alphabet"]');

// get data

const requestURL = 'https://randomuser.me/api/?results=12&exc=location,login,registered,cell,id,nat';

async function sendRequest (url) {
    return await fetch(url).then(response => {
        return response.json();
    }).catch(err => {
        alert('Something went wrong, try again!');
        console.error(err);
    });
}

let initialFriendsArr;

sendRequest(requestURL)
.then(async (serverData) => {
    initialFriendsArr = await serverData.results;
    generateUsers(initialFriendsArr);
})
.catch((err) => {
    console.log(err);
});

// generating html list

function createElement(userData) {
    return `
    <li class='list-item'>
        <div class='user-top'>
            <img src='${userData.picture.large}'>
            <h2 userData-name='${`${userData.name.first} ${userData.name.last}`}'>${userData.name.first} ${userData.name.last}</h2>
            <p>${userData.email}</p>
            <p>${userData.phone}</p>
        </div>
        <div class='user-bottom'>
            <p data-gender='${userData.gender}'>${userData.gender}</p>
            <p data-age='${userData.dob.age}'>${userData.dob.age}</p>
        </div>
    </li>
    `
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
    friends = sortByAge(friends);
    friends = sortByName(friends)
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

        let filteredFriends = [];

        friendsCopy.forEach(friend => {
            const friendFullName = `${friend.name.first} ${friend.name.last}`.toLowerCase();
            if (friendFullName.search(searchInputValue) !== -1) {
                filteredFriends.push(friend);
            }
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
            let filteredGendersArr = [];
            filteredGendersArr = friendsCopy.filter(friend => friend.gender === selectedGender);
            friendsCopy = [...filteredGendersArr];
            return friendsCopy;
        case 'all':
        default:
            return friendsCopy;
    }
}

function sortByAge(friendsCopy) {
    if (selectedAgeDirection) {
        friendsCopy.sort((firstFriend, secondFriend) => {
            return secondFriend.dob.age - firstFriend.dob.age;
        });
        switch(selectedAgeDirection) {
            case 'ageDown':
                return friendsCopy;
            case 'ageUp':
                return friendsCopy.reverse();
        }
    } else {
        ageRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });
    }
    
    return friendsCopy;
}

function sortByName(friendsCopy) {
    if (selectedAlphabetDirection) {
        
        function sortArr(a, b) {
            return a.name.first > b.name.first ? 1 : -1;
        }
        
        friendsCopy.sort(sortArr);
        switch(selectedAlphabetDirection) {
            case 'AZ':
                return friendsCopy;
            case 'ZA':
                return friendsCopy.reverse();
        }
    } else {
        alphabetRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });
    }
    return friendsCopy;
}

function resetToInitial(friendsCopy) {
    if (resetSorting) {

        selectedGender = null;
        selectedAgeDirection = null;
        selectedAlphabetDirection = null;

        allRadioBtns.forEach(radioBtn => {
            radioBtn.checked = false;
        });

        friendsCopy = [...initialFriendsArr];
    }
    return friendsCopy;
}
