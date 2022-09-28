import { getUserList } from "./randomuser.service.js";
const users = await getUserList();

const listElem = document.querySelector("[data-user-list]");
const searchElem = document.querySelector("[data-search-input]");
const sortElem = document.querySelector("[data-sort-select]");
const filtersFormElem = document.querySelector("[data-filters-form]");

let urlSearchParams = new URLSearchParams(window.location.search);

let searchValue = urlSearchParams.get("search") || "";
searchElem.value = searchValue;
let sortValue = urlSearchParams.get("sort") || "default";
sortElem.value = sortValue;
let genderValue = urlSearchParams.get("gender") || "all";
filtersFormElem.gender.value = genderValue;

searchElem.addEventListener("input", (evt) => {
  searchValue = evt.target.value;
  urlSearchParams.set("search", searchValue);
  renderUserList();
});

sortElem.addEventListener("change", (evt) => {
  sortValue = evt.target.value;
  urlSearchParams.set("sort", sortValue);
  renderUserList();
});

filtersFormElem.addEventListener("change", (evt) => {
  if (evt.target.name !== "gender") return;
  genderValue = evt.target.value;
  urlSearchParams.set("gender", genderValue);
  renderUserList();
})

renderUserList(true);

function renderUserList(isFirstRender = false) {
  if (!isFirstRender) {
    updateURL();
  }
  
  listElem.innerHTML = "";
  let clonedUsers = users;
  
  clonedUsers = clonedUsers.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));

  clonedUsers = sortArray(clonedUsers, sortValue);

  if (genderValue !== "all") {
    clonedUsers = clonedUsers.filter(({gender}) => gender === genderValue);
  }

  const fragment = new DocumentFragment();

  clonedUsers.forEach(({name, age, gender, photo, email, phone}) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <li class="users__item  user  ${gender === "female" && "user--female"}">
        <p class="user__name">${name}</p>
        <div class="user__info">
          <img class="user__img" src="${photo}" width="150" height="150" alt="${name}">
          <p class="user__age">I am ${age} years old</p>
          <a class="user__email" href="mailto:${email}">${email}</a>
          <a class="user__phone" href="tel:${phone}">${phone}</a>
        </div>
        <p class="user__gender">${gender}</p>
      </li>
    `;

    fragment.append(listItem);
  })

  listElem.append(fragment);
}


function sortArray(arr, method) {
  const sorts = {
    "default"() {
      return arr;
    },
    "name-asc"() {
      return arr.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name === b.name) return 0;
        if (a.name < b.name) return -1;
      });
    },
    "name-desc"() {
      return arr.sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name === b.name) return 0;
        if (a.name < b.name) return 1;
      });
    },
    "age-asc"() {
      return arr.sort((a, b) => a.age - b.age);
    },
    "age-desc"() {
      return arr.sort((a, b) => b.age - a.age);
    },
  };

  return sorts[method](arr);
}


function updateURL() {
  let urlString = "?";
  for (let [key, value] of urlSearchParams.entries()) {
    urlString += `&${key}=${value}`;
  }
  

  history.replaceState(null, null, urlString);
}
