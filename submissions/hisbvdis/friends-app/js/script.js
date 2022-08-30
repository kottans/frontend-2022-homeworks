import { getUserList } from "./randomuser.service.js";
const dataArr = await getUserList().then(data => data);

const listElem = document.querySelector("[data-user-list]");
const searchElem = document.querySelector("[data-search-input]");
const sortElem = document.querySelector("[data-sort-select]");
const filtersFormElem = document.querySelector("[data-filters-form]");

let urlSearchParams =
  location.search === ""
    ? {}
    : location.search
        .slice(1)
        .split("&")
        .map((item) => item.split("="))
        .filter(([_, value]) => value !== "")
        .reduce((accum, [key, value]) => ({ ...accum, [key]: value }), {});

let searchValue = urlSearchParams.search || "";
searchElem.value = searchValue;
let sortValue = urlSearchParams.sort || "default";
sortElem.value = sortValue;
let genderValue = urlSearchParams.gender || "all";
filtersFormElem.gender.value = genderValue;

searchElem.addEventListener("input", (evt) => {
  searchValue = evt.target.value;
  urlSearchParams.search = searchValue;
  renderUserList();
});

sortElem.addEventListener("change", (evt) => {
  sortValue = evt.target.value;
  urlSearchParams.sort = sortValue;
  renderUserList();
});

filtersFormElem.addEventListener("change", (evt) => {
  if (evt.target.name !== "gender") return;
  genderValue = evt.target.value;
  urlSearchParams.gender = genderValue;
  renderUserList();
})

renderUserList("first");

function renderUserList(mode) {
  if (mode !== "first") {
    updateURL();
  }
  
  listElem.innerHTML = "";
  let newArr = dataArr;
  
  newArr = newArr.filter(({name}) => name.toLowerCase().includes(searchValue.toLowerCase()));

  newArr = sortArray(newArr, sortValue);

  if (genderValue !== "all") {
    newArr = newArr.filter(({gender}) => gender === genderValue);
  }

  newArr.forEach(({name, age, gender, photo, email, phone}) => {
    listElem.insertAdjacentHTML(
      "beforeend",
      `
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
    `
    );
  })
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
  const searchParams = Object.entries(urlSearchParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  history.replaceState(null, null, `?${searchParams}`);
}
