const usersList = document.querySelector('.users-list');
const sortBar = document.querySelector('.sort-bar');
const searchBar = document.querySelector('.sort-bar__search');
const paginationList = document.querySelector('.pagination-list');

const allRadioBtns = document.querySelectorAll('input[type="radio"]');
const genderRadioBtns = document.querySelectorAll('input[name="gender"]');
const ageRadioBtns = document.querySelectorAll('input[name="age"]');
const alphabetRadioBtns = document.querySelectorAll('input[name="alphabet"]');

// get data

const requestUsersNum = 24;
const requestURL = `https://randomuser.me/api/?results=${requestUsersNum}&exc=location,login,registered,cell,id,nat`;

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
  generateUsers(returnSelectedPage(initialFriendsArr));
  createPaginationList(initialFriendsArr);
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

    createPaginationList(friends);
    friends = returnSelectedPage(friends);
    
    generateUsers(friends);
}

sortBar.addEventListener('click', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];

    if (target.name === 'gender') {
        selectedGender = target.value;
        selectedPage = 1;
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

        friendsCopy.sort(({ fullName: a }, { fullName: b}) =>  a > b ? 1 : -1);
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

// pagination

const userPerPageNum = 6;
let selectedPage = 1;
let pageNum;

function countPages(friendsCopy) {
    if (Number.isInteger(friendsCopy.length / userPerPageNum)) {
        pageNum = friendsCopy.length / userPerPageNum;
    } else {
        pageNum = Math.round(friendsCopy.length / userPerPageNum);
    }
}

function createPaginationList(friendsCopy) {
    countPages(friendsCopy);

    paginationList.innerHTML = '';
    for (let i = 1; i <= pageNum; i++) {
        const paginationListElem = document.createElement('LI');
        const paginationLink = document.createElement('A');
        paginationLink.setAttribute('href', '#');
        paginationLink.dataset.pageNum = i;
        paginationLink.innerHTML = i;
        
        if (i == selectedPage) {
            paginationListElem.classList.add('selected-page');
        }

        paginationList.appendChild(paginationListElem);
        paginationListElem.appendChild(paginationLink);
    }
};

paginationList.addEventListener('click', ({target}) => {
    friendsArrCopy = [...initialFriendsArr];
    if (target.tagName === 'A') {
        selectedPage = target.dataset.pageNum;
    }
    handleSorting(friendsArrCopy);
});

function returnSelectedPage(friendsCopy) {
    const sliceStart = userPerPageNum * (selectedPage - 1);
    const sliceEnd = userPerPageNum + sliceStart;
    const slicedUsersArr = friendsCopy.slice(sliceStart, sliceEnd);
    return slicedUsersArr;
}
