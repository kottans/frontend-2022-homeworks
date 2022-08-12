const url =
  'https://randomuser.me/api/?results=20&nat=us,dk,fr,gb&inc=gender,name,email,dob,phone,picture';

const userListElement = document.querySelector('.user-list');
const filterFormElement = document.querySelector('.filter-options');
const nameSearchElement = document.querySelector(
  '.name-search-control'
);
const ageSortElement = document.querySelector('.age-sort');
const nameSortElement = document.querySelector('.name-sort');
const genderFilterElement = document.querySelector('.gender-filter');
const resetButton = document.querySelector('.filter-options__button');

let userData = [];

const filterState = {
  searchName: '',
  ageOrder: '',
  nameOrder: '',
  genderSelected: 'all',
};

async function getUserData(url) {
  const response = await fetch(url);
  const { results: userData } = await response.json();
  return userData.map((userDataItem) => ({
    fullName: `${userDataItem.name.first} ${userDataItem.name.last}`,
    gender: userDataItem.gender,
    email: userDataItem.email,
    age: userDataItem.dob.age,
    phone: userDataItem.phone,
    imageUrl: userDataItem.picture.large,
  }));
}

function createUserItem({ fullName, email, age, phone, imageUrl }) {
  const userListItem = document.createElement('li');
  userListItem.classList.add('user-list__item');
  userListItem.innerHTML = `
	<img
		src="${imageUrl}"
		alt="${fullName} Image"
		class="user-list__item-image"
	/>
	<div class="user-list__item-details">
		<div class="user-list__item-title">
			<span class="user-list__item-name">${fullName}</span>,
			<span class="user-list__item-age">${age}</span>
		</div>
		<a
			href="mailto:${email}"
			class="user-list__item-email"
		>${email}</a>
		<a href="tel:${phone}" class="user-list__item-tel">${phone}</a>
	</div>`;
  return userListItem;
}

function addUserItem(element, listContainer) {
  listContainer.appendChild(element);
}

function renderUserList(userData, listContainer) {
  listContainer.innerHTML = '';
  const userListItems = userData.map((userDataItem) =>
    createUserItem(userDataItem)
  );
  userListItems.forEach((userListItem) =>
    addUserItem(userListItem, listContainer)
  );
}

async function init(url, listElement) {
  userData = await getUserData(url);
  renderUserList(userData, listElement);
}

function filterUsersByName(userData, inputValue) {
  return userData.filter(({ fullName }) =>
    fullName.toLowerCase().includes(inputValue.toLowerCase())
  );
}

function sortUsersByAge(userData, sortOrder) {
  return [...userData].sort((a, b) => {
    if (sortOrder === 'ascending') return a.age - b.age;
    if (sortOrder === 'descending') return b.age - a.age;
  });
}

function sortUsersByName(userData, sortOrder) {
  return [...userData].sort((a, b) => {
    if (sortOrder === 'ascending')
      return a.fullName > b.fullName ? 1 : -1;
    if (sortOrder === 'descending')
      return b.fullName > a.fullName ? 1 : -1;
  });
}

function filterUsersByGender(userData, genderValue) {
  if (genderValue === 'all') return userData;
  return userData.filter(({ gender }) => gender === genderValue);
}

function getFilteredUserData() {
  let userDataCopy = JSON.parse(JSON.stringify(userData));

  for (let key in filterState) {
    if (key === 'searchName')
      userDataCopy = filterUsersByName(
        userDataCopy,
        filterState[key]
      );

    if (key === 'nameOrder')
      userDataCopy = sortUsersByName(userDataCopy, filterState[key]);

    if (key === 'genderSelected')
      userDataCopy = filterUsersByGender(
        userDataCopy,
        filterState[key]
      );

    if (key === 'ageOrder')
      userDataCopy = sortUsersByAge(userDataCopy, filterState[key]);
  }

  renderUserList(userDataCopy, userListElement);
}

function handleFilterChange({ target }) {
  filterState[target.name] = target.value;
  getFilteredUserData();
}

function handleResetClick() {
  renderUserList(userData, userListElement);
  filterState.searchName = '';
  filterState.ageOrder = '';
  filterState.nameOrder = '';
  filterState.genderSelected = 'all';
}

nameSearchElement.addEventListener('keyup', handleFilterChange);
ageSortElement.addEventListener('change', handleFilterChange);
nameSortElement.addEventListener('change', handleFilterChange);
genderFilterElement.addEventListener('change', handleFilterChange);
resetButton.addEventListener('click', handleResetClick);

init(url, userListElement);
