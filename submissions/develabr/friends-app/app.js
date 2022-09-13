const CONTAINER = document.getElementById('main-content');
const FORM = document.querySelector('.form');
const MALE = document.getElementById('male');
const FEMALE = document.getElementById('female');
const SEARCH_FIELD = document.getElementById('search-field');
const RESET = document.getElementById('reset-button');
let nameNum = 0;
let ageNum = 0;
let usersCollection = [];

fetch('https://randomuser.me/api/?results=40&nat=gb,us,es')
  .then((response) => response.json())
  .then((data) => {
    usersCollection = data.results;
    printUsers(usersCollection);
  });

function printUsers(usersCollection) {
  let block = document.createDocumentFragment();
  usersCollection.forEach(function (user) {
    let card = document.createElement('div');
    card.classList.add('cards');
    block.appendChild(card);

    let userImage = document.createElement('img');
    userImage.classList.add('user-pic');
    userImage.setAttribute('src', user.picture.large);
    card.appendChild(userImage);

    let userName = document.createElement('p');
    userName.classList.add('user-name');
    userName.innerHTML = `${user.name.first} ${user.name.last}, ${user.dob.age}`;
    card.appendChild(userName);

    let userData = document.createElement('p');
    userData.classList.add('user-data');
    userData.innerHTML = `from ${user.location.city}`;
    card.appendChild(userData);

    let userPhone = document.createElement('p');
    userPhone.classList.add('user-phone');
    userPhone.innerHTML = user.phone;
    card.appendChild(userPhone);
  });
  CONTAINER.appendChild(block);
}

FORM.addEventListener('click', function () {
  switch (event.target.value) {
    case 'all':
    case 'male':
    case 'female':
      handleInput(usersCollection);
      break;
    case 'age-down':
      if (!ageNum || ageNum === 1) {
        usersCollection.sort(function (a, b) {
          return a.dob.age - b.dob.age;
        });
        handleInput(usersCollection.reverse());
        nameNum = 0;
        ageNum = 2;
      }
      break;
    case 'age-up':
      if (!ageNum || ageNum === 2) {
        usersCollection.sort(function (a, b) {
          return a.dob.age - b.dob.age;
        });
        handleInput(usersCollection);
        nameNum = 0;
        ageNum = 1;
      }
      break;
    case 'name-down':
      if (!nameNum || nameNum === 1) {
        usersCollection = sortName(usersCollection);
        handleInput(usersCollection);
        ageNum = 0;
        nameNum = 2;
      }
      break;
    case 'name-up':
      if (!nameNum || nameNum === 2) {
        usersCollection = sortName(usersCollection);
        handleInput(usersCollection.reverse());
        ageNum = 0;
        nameNum = 1;
      }
      break;
  }
});

function sortName(usersCollection) {
  usersCollection.sort(function (a, b) {
    let nameA = a.name.first.toLowerCase(),
      nameB = b.name.first.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return usersCollection;
}

function handleInput(usersCollection) {
  let userArrayLocal = [];
  usersCollection.forEach(function (user) {
    if (!FEMALE.checked) if (user.gender === 'female') return;
    if (!MALE.checked) if (user.gender === 'male') return;
    if (
      !`${user.name.first} ${user.name.last}`.includes(
        SEARCH_FIELD.value.trim().toLowerCase()
      )
    )
      return;
    userArrayLocal.push(user);
  });

  CONTAINER.innerHTML = '';
  printUsers(userArrayLocal);
}

SEARCH_FIELD.addEventListener('input', function () {
  handleInput(usersCollection);
});

RESET.addEventListener('click', function () {
  FORM.reset();
  printUsers(usersCollection);
});
