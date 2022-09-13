let users = [];
const cardsList = document.querySelector(".users__list");

const sortAgeBlock = document.querySelector(".sort-age");
const sortNameBlock = document.querySelector(".sort-name");
const filterGenderBlock = document.querySelector(".sort-gender");

const searchInput = document.querySelector("#search-input");
const resetBtn = document.querySelector(".form__button");

const burgerBtn = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar");

burgerBtn.addEventListener("click", (e) => {
  burgerBtn.classList.toggle("active");
  sidebar.classList.toggle("sidebar--visible");
});

const statusMessage = {
  loading: "img/spinner.svg",
  failure: "Technical problems, try again later",
};

const loadingMessage = document.createElement("img");
function showLoadingStatus() {
  loadingMessage.src = statusMessage.loading;
  loadingMessage.classList.add("status-block");

  cardsList.insertAdjacentElement("afterend", loadingMessage);
}

function loadUsersData() {
  showLoadingStatus();

  fetch(
    "https://randomuser.me/api/?results=20&nat=us,ua,de&inc=picture,name,dob,gender,location"
  )
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((responseJson) => {
      users = responseJson.results;
      showCards(users);
      loadingMessage.remove();
    })
    .catch(() => {
      loadingMessage.remove();
      showErrorStauts();
    });
}

function showErrorStauts() {
  const errorMessage = document.createElement("div");
  errorMessage.classList.add("error-block");
  errorMessage.innerHTML = `${statusMessage.failure}`;

  cardsList.append(errorMessage);
}

function showCards(cards) {
  cards.forEach(({ picture, name, dob, gender, location }) => {
    createCard({ picture, name, dob, gender, location });
  });
}

function createCard({ picture, name, dob, gender, location }) {
  const userCard = document.createElement("li");
  userCard.classList.add("user__item");

  userCard.innerHTML = `
    <img class="user__img" src="${picture.large}" alt="User photo" />
    <p class="user__name">${name.first} ${name.last}</p>
    <p class="user__age">Age: <span class="user__age-span">${dob.age}</span></p>
    <p class="user__location">${location.country}</p>`;

  addGenderHeader(gender, userCard);
  cardsList.append(userCard);
}

function addGenderHeader(gender, card) {
  const friendGender = document.createElement("div");
  if (gender === "male") {
    friendGender.innerHTML = `<h4 class="user__gender user__gender--male">${gender}</h4>`;
  } else {
    friendGender.innerHTML = `<h4 class="user__gender user__gender--female">${gender}</h4>`;
  }
  card.prepend(friendGender);
}

const compareByName = (firstUser, secondUser) =>
  firstUser.name.first.toLowerCase() <= secondUser.name.first.toLowerCase()
    ? -1
    : 1;
const compareByAge = (firstUser, secondUser) =>
  firstUser.dob.age - secondUser.dob.age;

const compareByGender = (user, type) => user.gender === type;

function filterBySearch(arr, target) {
  return arr.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`;
    return fullName.toLowerCase().includes(target.toLowerCase());
  });
}

function filterUsers({ target }) {
  let resultUsers = [...users];
  if (searchInput.value !== "") {
    resultUsers = filterBySearch(resultUsers, searchInput.value);
  }

  if (target.checked) {
    switch (form.gender.value) {
      case "male":
        resultUsers = resultUsers.filter((user) =>
          compareByGender(user, "male")
        );
        break;
      case "female":
        resultUsers = resultUsers.filter((user) =>
          compareByGender(user, "female")
        );
        break;
      case "all":
        resultUsers;
        break;
    }

    if (target.value === "age-up") {
      resultUsers.sort((a, b) => compareByAge(b, a));
    } else if (target.value === "age-down") {
      resultUsers.sort((a, b) => compareByAge(a, b));
    }

    if (target.value === "name-up") {
      resultUsers.sort((a, b) => compareByName(b, a));
    } else if (target.value === "name-down") {
      resultUsers.sort((a, b) => compareByName(a, b));
    }
  }

  cardsList.innerHTML = "";
  showCards(resultUsers);
}

function resetFilters() {
  resultUsers = [...users];
  cardsList.innerHTML = "";
  showCards(resultUsers);
}

document.addEventListener("DOMContentLoaded", function () {
  loadUsersData();

  sortNameBlock.addEventListener("click", filterUsers);
  sortAgeBlock.addEventListener("click", filterUsers);
  filterGenderBlock.addEventListener("click", filterUsers);
  searchInput.addEventListener("input", filterUsers);
  resetBtn.addEventListener("click", resetFilters);
});
