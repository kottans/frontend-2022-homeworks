const URL =
  'https://randomuser.me/api/?results=20&nat=us,dk,fr,gb&inc=gender,name,email,dob,phone,picture';

const userListContainerElement = document.querySelector('.user-list');
const formElement = document.querySelector('.form');
const resetButtonElement = document.querySelector(
  '.form__reset-button'
);
// const formSearchInputElement = document.querySelector(
//   '.form__search-control'
// );

let userData = [];
let sortedUserData = [];

const handleErrors = (response) => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

const getUserData = async (url) => {
  try {
    const response = await fetch(url);
    const checkedResponse = handleErrors(response);
    const data = await checkedResponse.json();
    return data.results;
  } catch (error) {
    console.warn(error);
  }
};

const getRequiredUserData = async (url) => {
  const userListData = await getUserData(url);
  return userListData.map((userListDataItem) => ({
    fullName: `${userListDataItem.name.first} ${userListDataItem.name.last}`,
    gender: userListDataItem.gender,
    email: userListDataItem.email,
    age: userListDataItem.dob.age,
    phone: userListDataItem.phone,
    imageUrl: userListDataItem.picture.large,
  }));
};

const getUserListItemHTML = ({
  fullName,
  email,
  age,
  phone,
  imageUrl,
}) => {
  return `
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
};

const createUserListItem = (userDataItem) => {
  const userListItem = document.createElement('li');
  userListItem.classList.add('user-list__item');
  userListItem.innerHTML = getUserListItemHTML(userDataItem);
  return userListItem;
};

const addUserListItem = (userListItem) =>
  userListContainerElement.appendChild(userListItem);

const renderUserList = (userData) => {
  userListContainerElement.innerHTML = '';
  const userListItems = userData.map((userDataItem) =>
    createUserListItem(userDataItem)
  );
  userListItems.forEach((userListItem) =>
    addUserListItem(userListItem)
  );
};

const init = async (url) => {
  userData = await getRequiredUserData(url);
  sortedUserData = [...userData];
  renderUserList(userData);
};

const findName = (searchInput) => {
  return userData.filter((userDataItem) =>
    userDataItem.fullName
      .toLowerCase()
      .includes(searchInput.toLowerCase())
  );
};

const compareAge = (firstUser, secondUser) => {
  return firstUser.age - secondUser.age;
};

const ageSorters = {
  ageDescending: () => {
    sortedUserData.sort((a, b) => compareAge(b, a));
  },
  ageAscending: () => {
    sortedUserData.sort(compareAge);
  },
};

const compareName = (firstUser, secondUser) => {
  return firstUser.fullName > secondUser.fullName ? 1 : -1;
};

const nameSorters = {
  nameDescending: () => {
    sortedUserData.sort((a, b) => compareName(b, a));
  },
  nameAscending: () => {
    sortedUserData.sort(compareName);
  },
};

const filterUsersByGender = (selectedGender) => {
  return sortedUserData.filter(
    ({ gender: userGender }) => userGender === selectedGender
  );
};

const getFilteredUsersByGender = (selectedGender) => {
  if (selectedGender === 'male' || selectedGender === 'female') {
    sortedUserData = filterUsersByGender(selectedGender);
  }
};

const getSortedUsersByAge = (value) => {
  if (value === 'ageAscending' || value === 'ageDescending') {
    ageSorters[value]();
  }
};

const getSortedUsersByName = (value) => {
  if (value === 'nameAscending' || value === 'nameDescending') {
    nameSorters[value]();
  }
};

const handleFormInputs = () => {
  const { value: searchValue } = formElement.search;
  const { value: sortingValue } = formElement.sorting;
  const { value: filteringValue } = formElement.filtering;

  sortedUserData = findName(searchValue);
  getSortedUsersByAge(sortingValue);
  getSortedUsersByName(sortingValue);
  getFilteredUsersByGender(filteringValue);

  renderUserList(sortedUserData);
};

const resetForm = () => {
  formElement.reset();
  renderUserList(userData);
};

formElement.addEventListener('input', handleFormInputs);
formElement.addEventListener('submit', (e) => e.preventDefault());
resetButtonElement.addEventListener('click', resetForm);

init(URL);
