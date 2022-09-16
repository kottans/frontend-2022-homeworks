const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=10&nat=ua,us,de,dk,fr,gb&inc=gender,name,dob,registered,cell,picture,nat,email";

const allUsers = document.getElementById("allUsers");
const searchByName = document.getElementById("searchByName");
const filterForm = document.getElementById("filterForm");
const resetFilter = document.getElementById("resetFilter");
const loader = document.getElementById("loader");

let users = [];
let usersCopy = [];
let genderFilterValue = "";
let nameOrAgeSortValue = "";

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

async function fetchUsers(url) {
  try {
    const res = await fetch(url);
    errorHandledResponse = handleErrors(res);
    usersData = await errorHandledResponse.json();
    return usersData.results;
  } catch (err) {
    console.error(err);
  }
}

function removeLoader() {
  loader.classList.add("remove");
}

function renderUsers(usersData) {
  let allUsersHTML = usersData
    .map(({ gender, name, dob, cell, picture, email }) => {
      let userFullName = `${name.first} ${name.last}`;
      let imageSrc = picture.large;
      return `
        <li class="user-profile-card">
          <div class="card-top"></div>
          <div class="photo-wrapper">
            <img src="${imageSrc}" class="profile-photo" alt="photo of ${userFullName}">
          </div>
          <div class="user-info">
            <span class="age-and-gender">${gender}, ${dob.age} y.o.</span>
          </div>
          <div class="user-contacts">
            <span class="user-phone">Phone:</span>${cell}
            <span class="user-email">Email:</span>${email}
          </div>
          <div class="card-bottom">
            <span class="user-name">${userFullName}</span>
          </div>
        </li>
          `;
    })
    .join("");

  allUsers.innerHTML = allUsersHTML;
}

function sortByName(firstUser, secondUser) {
  const firtUserFullName = `${firstUser.name.first} ${firstUser.name.last}`;
  const secondUserFullName = `${secondUser.name.first} ${secondUser.name.last}`;
  return firtUserFullName.localeCompare(secondUserFullName);
}

function sortByAge(firstUser, secondUser) {
  return firstUser.dob.age - secondUser.dob.age;
}

function sortByNameOrAge(sortValue, usersToSort) {
  switch (sortValue) {
    case "nameAsc":
      usersToSort.sort(sortByName);
      break;
    case "nameDesc":
      usersToSort.sort((firstUser, secondUser) =>
        sortByName(secondUser, firstUser)
      );
      break;
    case "ageAsc":
      usersToSort.sort(sortByAge);
      break;
    case "ageDesc":
      usersToSort.sort((firstUser, secondUser) =>
        sortByAge(secondUser, firstUser)
      );
      break;
  }

  return usersToSort;
}

function filterByGender(filterValue, usersToFilter) {
  let filteredUsers = [...usersToFilter];
  if (filterValue === "both") {
    return filteredUsers;
  } else if (filterValue === "male" || filterValue === "female") {
    filteredUsers = filteredUsers.filter(
      ({ gender }) => gender === `${filterValue}`
    );
    return filteredUsers;
  }
}

function searchByUserName() {
  let searchInput = document.getElementById("searchByName").value.toLowerCase();
  const usersCards = allUsers.querySelectorAll(".user-profile-card");

  usersCards.forEach((user) => {
    let userName = user.querySelector(".user-name");
    if (!userName.textContent.toLocaleLowerCase().includes(searchInput)) {
      user.closest(".user-profile-card").classList.add("hidden");
    } else {
      user.closest(".user-profile-card").classList.remove("hidden");
    }
  });
}

function applySelectedFilters({ target }) {
  if (target.name === "nameOrAgeSort") {
    nameOrAgeSortValue = target.value;
  }

  if (target.name === "genderSort") {
    genderFilterValue = target.value;
  }

  renderByAppliedFilters(genderFilterValue, nameOrAgeSortValue);
  searchByUserName();
}

function renderByAppliedFilters(filterValue, sortValue) {
  let usersToRender = [...usersCopy];
  if (genderFilterValue) {
    usersToRender = filterByGender(filterValue, usersToRender);
  }
  if (nameOrAgeSortValue) {
    usersToRender = sortByNameOrAge(sortValue, usersToRender);
  }

  renderUsers(usersToRender);
}

function resetForm() {
  renderUsers(users);
  usersCopy = [...users];
  filterForm.reset();
}

async function main() {
  const fakeUsers = await fetchUsers(RANDOM_USERS_URL);
  removeLoader();
  renderUsers(fakeUsers);
  users = [...fakeUsers];
  usersCopy = [...users];

  filterForm.addEventListener("input", applySelectedFilters);
  resetFilter.addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", main);
onload = () => filterForm.reset();
