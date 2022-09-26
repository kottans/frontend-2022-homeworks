async function loadUsers(amount = 50) {
  const response = await fetch(`https://randomuser.me/api/?results=${amount}`);
  if (response.status === 200) {
    const data = await response.json();
    return data.results;
  } else {
    throw Error("Error. Try again");
  }
}

function showLoading() {
  target.innerHTML = "<div class='message loading'>Загрузка...</div>";
}

function showError() {
  target.innerHTML =
    "<div class='message error'>Ошибка. Попробуйте обновить страницу</div>";
}

function showNothing() {
  target.innerHTML =
    "<div class='message error'>Нет данных для отображения.<br>Измените критерии фильтрации</div>";
}

function showUsers(users) {
  if (users.length > 0) {
    target.innerHTML = "";
    users.map(showUser);
  } else {
    showNothing();
  }
}

function showUser(user) {
  const node = document.createElement("div");
  node.innerHTML = `
    <div class="card card-wrapper">
      <div class="card__header">${user.name.first} ${user.name.last}</div>
      <div class="card__content">
        <img
          class="card__photo"
          src="${user.picture.large}"
          width="128"
          height="128"
          alt="${user.name.first} ${user.name.last}"
        />
        <div class="card__info">
          ${user.gender}, ${user.dob.age} <br />
          ${user.location.country}, ${user.location.city}
        </div>
      </div>
      <div class="card__toolbar">
        <a href="mailto:${user.email}" alt="Написать">&#9993</a>
        <a href="tel:${user.phone}" alt="Позвонить">&#9742</a>
      </div>
    </div>
  `;
  target.append(node);
}

function parseUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  formState.search = urlParams.get("search") ? urlParams.get("search") : "";
  formState.sort = urlParams.get("sort");
  formState.gender = urlParams.get("gender") ? urlParams.get("gender") : "all";
}

function setFormValuesFromUrl() {
  form.elements["search"].value = formState.search;
  form.elements["sort"].value = formState.sort;
  form.elements["gender"].value = formState.gender ? formState.gender : "all";
}

function setUrlFromFormValues() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("search", formState.search);
  urlParams.set("sort", formState.sort);
  urlParams.set("gender", formState.gender);
  window.history.replaceState(null, null, `?${urlParams.toString()}`);
}

function filterBySearch(users) {
  if (!formState.search) return users;

  const searchWords = formState.search.split(" ");
  return users.filter((user) =>
    searchWords.every((word) => {
      word = word.toLowerCase();
      return (
        user.email.includes(word) ||
        user.location.country.toLowerCase().includes(word) ||
        user.location.city.toLowerCase().includes(word) ||
        user.name.first.toLowerCase().includes(word) ||
        user.name.last.toLowerCase().includes(word) ||
        user.dob.age.toString().includes(word)
      );
    })
  );
}

function filterByGender(users) {
  if (formState.gender !== "male" && formState.gender !== "female")
    return users;

  return users.filter((user) => user.gender === formState.gender);
}

function compareUsersByName(reverse = false) {
  return (user1, user2) => {
    const name1 = `${user1.name.first}${user1.name.last}`;
    const name2 = `${user2.name.first}${user2.name.last}`;
    return reverse
      ? -1 * name1.localeCompare(name2)
      : name1.localeCompare(name2);
  };
}

function sortUsers(users) {
  if (!formState.sort) return users;

  switch (formState.sort) {
    case "nameAscending":
      return users.sort(compareUsersByName());
    case "nameDescending":
      return users.sort(compareUsersByName(true));
    case "ageAscending":
      return users.sort((user1, user2) => user1.dob.age - user2.dob.age);
    case "ageDescending":
      return users.sort((user1, user2) => user2.dob.age - user1.dob.age);
    default:
      return users;
  }
}

function getUsersToShow(users) {
  const functionsToCall = [filterByGender, filterBySearch, sortUsers];
  return functionsToCall.reduce((acc, func) => func(acc), users);
}

async function init() {
  parseUrl();
  setFormValuesFromUrl();
  showLoading();
  try {
    allUsers = await loadUsers();
    showUsers(getUsersToShow(allUsers));
  } catch {
    showError();
  }
}

const target = document.getElementById("target");
const form = document.getElementById("form");

const formState = {
  search: null,
  sort: null,
  gender: "all",
};

form.addEventListener("input", (e) => {
  formState[e.target.name] = e.target.value;
  setUrlFromFormValues();
  showUsers(getUsersToShow(allUsers));
});

let allUsers = {};

init();
