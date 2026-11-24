const URL =
  'https://randomuser.me/api/?results=40&nat=gb,us,ua&inc=name,location,picture,dob,gender,phone';
const content = document.getElementById('content');
const FORM = document.getElementById('form');
const searchField = document.getElementById('search-field');
const RESET = document.getElementById('reset-button');

let usersData = [];

document.addEventListener('DOMContentLoaded', getData);
FORM.addEventListener('input', () => showContent(usersData));

async function getData() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    const data = await response.json();

    usersData = data.results;
    showContent(usersData);
  } catch (err) {
    console.error('Error: ', err);
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}

function showContent(data) {
  content.innerHTML = createCardUser(filterDataUser(data));
}

function filterDataUser(data) {
  const sortedAge = sortAge(data);
  const sortedName = sortName(sortedAge);
  const filteringGender = filterGender(sortedName);
  const searchingName = searchName(filteringGender);
  return searchingName;
}

function searchName(data) {
  if (searchField.value) {
    return usersData.filter((user) =>
      (user.name.first + ' ' + user.name.last)
        .toLowerCase()
        .includes(searchField.value.toLowerCase())
    );
  }
  return data;
}

function sortAge(data) {
  if (FORM.sort.value === 'age-up') {
    return usersData.sort((userFirst, userSecond) =>
      userFirst.dob.age < userSecond.dob.age ? -1 : 1
    );
  }
  if (FORM.sort.value === 'age-down') {
    return usersData.sort((userFirst, userSecond) =>
      userFirst.dob.age < userSecond.dob.age ? 1 : -1
    );
  }
  return data;
}

function sortName(data) {
  if (FORM.sort.value === 'name-down') {
    return usersData.sort((userFirst, userSecond) =>
      userFirst.name.first < userSecond.name.first ? -1 : 1
    );
  }
  if (FORM.sort.value === 'name-up') {
    return usersData.sort((userFirst, userSecond) =>
      userFirst.name.first > userSecond.name.first ? -1 : 1
    );
  }
  return data;
}

function filterGender(data) {
  return data.filter(
    (user) => user.gender === FORM.filter.value || FORM.filter.value === 'all'
  );
}

function createCardUser(data) {
  return data
    .map(
      ({ picture, name, dob, phone, location }) =>
        `<div class="cards">
				<img class="user-pic" src="${picture.large}" alt="${name.first} ${name.last}">
				<p class="user-name">${name.first} ${name.last}, ${dob.age}</p>
				<p class="user-data">from ${location.city}</p>
				<p class="user-phone">${phone}</p>
			</div>`
    )
    .join('');
}

RESET.addEventListener('click', function () {
  FORM.reset();
  content.innerHTML = createCardUser(usersData);
});
