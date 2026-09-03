const cardsWrapper = document.querySelector('.cards-wrapper');
const form = document.querySelector('.form');

const USERS_QUANTITY = 50;
const USERS_COUNTRIES = 'gb,us,ua,fr,nl,nz';
const API = 'https://randomuser.me/api/';
const QUERY = `?results=${USERS_QUANTITY}&nat=${USERS_COUNTRIES}`;
const API_URL = API + QUERY;

let usersData;
let usersDataCopy;

getUsersData(API_URL)
  .then((friends) => {
    usersData = createUsersData(friends);
    toggleDisabedOnForm(false);
    renderUsersCards(usersData);
  })
  .catch((error) => {
    alert('Something went wrong. Please reload the page!');
    console.log(error);
  });

toggleDisabedOnForm(true);

form.addEventListener('input', handleInputEvent);
form.addEventListener('reset', handleResetEvent);

function handleInputEvent() {
  usersDataCopy = [...usersData];
  const usersHandled = handleUsers(usersDataCopy, getFormData());
  renderUsersCards(usersHandled);
  scrollToTop();
}

function handleResetEvent() {
  usersDataCopy = [...usersData];
  renderUsersCards(usersDataCopy);
  scrollToTop();
}

async function getUsersData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const { results } = await response.json();
  return results;
}

function createUsersData(users) {
  users = users.map((user) => {
    const {
      name: { first: nameFirst, last: nameLast },
      gender,
      dob: { age },
      picture: { large: userPic },
      location: { city, country },
      phone,
      email
    } = user;
    return {
      nameFirst,
      nameLast,
      gender,
      age,
      userPic,
      city,
      country,
      phone,
      email
    };
  });
  return users;
}

function toggleDisabedOnForm(boolean) {
  Array.from(form.elements).forEach((element) => {
    element.disabled = boolean;
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderUsersCards(users) {
  const usersCards = users.map((user) => createUserCard(user)).join('');
  cardsWrapper.innerHTML = '';
  cardsWrapper.innerHTML = usersCards;
}

function createUserCard(user) {
  const {
    nameFirst,
    nameLast,
    gender,
    age,
    userPic,
    city,
    country,
    phone,
    email
  } = user;

  return `
    <li class="card">
      <div class="card-title ${gender}">
        <span>${gender}</span>
        <span>${age}</span>
      </div>
      <div class="card-content">
        <img class="card-img" src="${userPic}" alt="${nameFirst} photo" />
        <div class="card-field">
          <span class="card-field-name">Name: </span>
          <span class="card-field-value">${nameFirst} ${nameLast}</span>
        </div>
        <div class="card-field">
          <span class="card-field-name">From: </span>
          <span class="card-field-value">${city}, ${country}</span>
        </div>
        <div class="card-field">
          <span class="card-field-name">Email: </span>
          <span class="card-field-value">${email}</span>
        </div>
        <div class="card-field">
          <span class="card-field-name">Tel: </span>
          <span class="card-field-value">${phone}</span>
        </div>
      </div>
      <div class="card-contact ${gender}">
        <a class="contact ${gender}" href="tel:+${phone}"> call me </a>
        <a class="contact ${gender}" href="mailto:${email}"> text me </a>
      </div>
    </li>
  `;
}

function getFormData() {
  const formData = new FormData(form);
  const search = formData
    .get('search')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const sortBy = formData.get('sort-type');
  const gender = formData.get('gender');

  return {
    search,
    sortBy,
    gender
  };
}

function handleUsers(users, { search, sortBy, gender }) {
  const filteredByName = filterUsersBySearch(users, search);
  const filteredByGender = filterUsersByGender(filteredByName, gender);
  const sortedUsers = sortUsers(filteredByGender, sortBy);
  return sortedUsers;
}

function filterUsersBySearch(users, search) {
  if (search === '') return users;
  return users.filter(({ nameFirst, nameLast }) => {
    const name = `${nameFirst} ${nameLast}`.toLowerCase();
    return name.includes(search);
  });
}

function filterUsersByGender(users, genderFilter) {
  if (genderFilter === 'all') return users;
  return users.filter(({ gender }) => gender === genderFilter);
}

function sortUsers(users, sortType) {
  switch (sortType) {
    case null:
      return users;
    case 'name-ascending':
      return users.sort(compareNames);
    case 'name-descending':
      return users.sort((currentUser, nextUser) =>
        compareNames(nextUser, currentUser)
      );
    case 'age-ascending':
      return users.sort(compareAges);
    case 'age-descending':
      return users.sort((currentUser, nextUser) =>
        compareAges(nextUser, currentUser)
      );
  }
}

function compareNames(firstUser, secondUser) {
  return firstUser.nameFirst > secondUser.nameFirst ? 1 : -1;
}

function compareAges(firstUser, secondUser) {
  return firstUser.age - secondUser.age;
}
