import { showFilteredPersons } from "./modules/FilterLogic.js";
import { getData } from "./modules/Serve.js";
import {
  deleteFirstChildElements,
  updatePersonsData,
  convertPersonsData,
  changeSideBtnName,
  closePreLoader,
} from "./modules/Service.js";

let persons = [];
let friendsList = [];
let friendsIdList = [];
let pageValue = 0;
const contentArea = document.querySelector(".app__content");
const errorWindow = document.querySelector(".error");
const filterMenu = document.querySelector("#filter__menu");
const detailedPersonInfo = document.querySelector(".detailed__person__info");
const btnsArea = document.querySelector(".btns__area");
const myFriendsBtn = document.querySelector(".my__friends__btn");
const pageList = document.querySelector(".page__list");

async function init() {
  const url =
    "https://randomuser.me/api/?results=100&inc=gender,name,nat,dob,location,email,phone,picture&nat=us,ua,ch,gb";
  const { results } = await getData(url);
  persons = results;
  closePreLoader();
  updatePersonsData(persons);
  pageList.innerHTML = createPageList(persons).join("");
  showFilteredPersons(persons);
}

init();

filterMenu.addEventListener("input", () =>
  renderPersonsList(
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

filterMenu.addEventListener("click", () =>
  filterBtnsHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

contentArea.addEventListener("click", () =>
  contentAreaHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

detailedPersonInfo.addEventListener("click", () =>
  detailedInfoBtnsHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);
btnsArea.addEventListener("click", () => changeDisplayMode(event, persons));

errorWindow.addEventListener("click", errorHandler);

function createPersonsList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  if (convertedPersonsData.length === 0) {
    return convertedPersonsData;
  }
  return convertedPersonsData[pageValue].map(
    ({
      id,
      gender,
      name: { first: firstName, last: surName },
      picture: { large: photo },
      dob: { age },
      cityImg: { cityPhoto },
    }) => {
      const repeatId = friendsIdList.find((friendId) => friendId == id);
      if (myFriendsBtn.dataset.friendsBtn === "open") {
        if (repeatId === undefined) {
          return "";
        }
      }
      return `
      <li id='${id}'class="person__item" ${
        repeatId !== undefined ? ' data-friend="true"' : ""
      }>
        <img src="${cityPhoto}" alt="" class="person__bg">
        <img src="${photo}" alt="" class="person__photo">
        <h2 class="person__name">${firstName} ${surName}</h2>
        <span class="person__text__age">${age}</span>
        <span class="person__text__gender">${gender}</span>
        ${
          repeatId !== undefined
            ? `
        <i class="infriends__icon">
          <img src="./img/friends__ico/in__friends.png" alt="" class="icon__img__infriends">
        </i>`
            : ""
        }
      </li>
      `;
    }
  );
}

export function updatePersonsList(persons) {
  const personsList = document.querySelector(".person__list");
  deleteFirstChildElements(personsList);
  personsList.innerHTML =
    persons.length > 0
      ? createPersonsList(persons).join("")
      : `<p class="list__message">We found nothing matching your search... =(</p>`;
}

function createPageList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  return convertedPersonsData.map((page, number) => {
    return `
    <li class="page__number"><a class="page__link${
      pageValue == number ? " chosen__page" : ""
    }" href="#" data-page-value="${number}">${number + 1}</a></li>`;
  });
}

export function updatePageList(persons) {
  const pageList = document.querySelector(".page__list");
  deleteFirstChildElements(pageList);
  pageList.innerHTML = createPageList(persons).join("");
}

function contentAreaHandler({ target }, persons) {
  const selectedPage = target.closest(".page__link");
  const activePerson = target.closest(".person__item");
  if (!activePerson && !selectedPage) return;
  if (selectedPage) showPage(selectedPage, persons);
  if (activePerson) createDetailedPersonsInfo(activePerson, persons);
}

function showPage(page, persons) {
  pageValue = page.dataset.pageValue;
  showFilteredPersons(persons);
}

function createDetailedPersonsInfo(activePerson, persons) {
  const personId = activePerson.id;
  if (filterMenu.classList.value === "filter__menu") {
    filterMenu.classList.remove("filter__menu");
    filterMenu.classList.add("filter__menu__hide");
    changeSideBtnName();
  }
  if (detailedPersonInfo.classList.contains("hide__person__info")) {
    detailedPersonInfo.classList.remove("hide__person__info");
  }
  const {
    id,
    gender,
    email,
    nat: nation,
    phone,
    dob: { date, age },
    name: { first: firstName, last: surName },
    location: {
      city,
      country,
      state,
      postcode,
      street: { name: streetName, number: streetNumber },
    },
    picture: { large: photo },
  } = persons.find((person) => person.id == personId);
  const birthday = date.slice(0, 10);
  const personPhoto = document.querySelector(".detailed__photo");
  const personName = document.querySelector(".detailed__name");
  const personDate = document.querySelector(".detailed__date");
  const personAge = document.querySelector(".detailed__age");
  const personEmail = document.querySelector(".detailed__email");
  const personGender = document.querySelector(".detailed__gender");
  const personLocation = document.querySelector(".detailed__location");
  const personNation = document.querySelector(".detailed__nation");
  const personPhoneNumber = document.querySelector(".detailed__phone__number");
  const addFriendBtn = document.querySelector(".add__friend");
  const deleteFriendBtn = document.querySelector(".delete__friend");
  const iconInFriends = document.querySelector(".detailed__icon__infriends");
  personPhoto.src = photo;
  personName.innerText = `${firstName} ${surName}`;
  personDate.innerHTML = `<strong>Birthday:</strong> ${birthday}`;
  personAge.innerHTML = `<strong>Age:</strong> ${age}`;
  personEmail.textContent = email;
  personEmail.href = `mailto:${email}`;
  personGender.innerHTML = `<strong>Gender:</strong> ${gender}`;
  personLocation.innerHTML = `<strong>Address:</strong> ${streetNumber} ${streetName},
    ${city},${state},
    ${country},${postcode}`;
  personNation.innerHTML = `<strong>Nation:</strong> ${nation}`;
  personPhoneNumber.textContent = phone;
  personPhoneNumber.href = `tel:${phone}`;
  addFriendBtn.setAttribute("data-person-id", id);
  deleteFriendBtn.setAttribute("data-person-id", id);
  if (activePerson.dataset.friend === "true") {
    iconInFriends.classList.remove("hide__btn");
    addFriendBtn.classList.add("hide__btn");
    deleteFriendBtn.classList.remove("hide__btn");
  } else {
    iconInFriends.classList.add("hide__btn");
    addFriendBtn.classList.remove("hide__btn");
    deleteFriendBtn.classList.add("hide__btn");
  }
}

function detailedInfoBtnsHandler({ target }, persons) {
  const activeBtn = target.closest(".friend__btn");
  const addFriendBtn = target.closest(".add__friend");
  const deleteFriendBtn = target.closest(".delete__friend");
  if (!activeBtn) return;
  const iconInFriends = document.querySelector(".detailed__icon__infriends");
  const activePersonId = activeBtn.dataset.personId;
  if (!!addFriendBtn) {
    const repeatId = friendsIdList.find(
      (friendId) => friendId == activePersonId
    );
    if (repeatId === undefined) {
      friendsIdList.push(activePersonId);
      iconInFriends.classList.remove("hide__btn");
      addFriendBtn.classList.add("hide__btn");
      const deleteFriendBtn = document.querySelector(".delete__friend");
      deleteFriendBtn.classList.remove("hide__btn");
      showFilteredPersons(persons);
    }
  }
  if (!!deleteFriendBtn) {
    friendsIdList = friendsIdList.filter(
      (friendsId) => friendsId !== activePersonId
    );
    iconInFriends.classList.add("hide__btn");
    deleteFriendBtn.classList.add("hide__btn");
    const addFriendBtn = document.querySelector(".add__friend");
    addFriendBtn.classList.remove("hide__btn");
    showFilteredPersons(persons);
  }
}

function changeDisplayMode({ target }, persons) {
  const myFriendsBtn = target.closest(".my__friends__btn");
  const allPeopleBtn = target.closest(".all__persons__btn");
  if (!myFriendsBtn && !allPeopleBtn) return;
  if (!!myFriendsBtn) {
    friendsList = friendsIdList.map((friendId) =>
      persons.find((person) => person.id == friendId)
    );
    const allPeopleBtn = document.querySelector(".all__persons__btn");
    allPeopleBtn.classList.remove("select__btn");
    myFriendsBtn.classList.add("select__btn");
    myFriendsBtn.setAttribute("data-friends-btn", "open");
    renderPersonsList(friendsList);
    updateVisualPageToDefaultSettings();
  }
  if (!!allPeopleBtn) {
    const myFriendsBtn = document.querySelector(".my__friends__btn");
    allPeopleBtn.classList.add("select__btn");
    myFriendsBtn.classList.remove("select__btn");
    myFriendsBtn.setAttribute("data-friends-btn", "close");
    renderPersonsList(persons);
    updateVisualPageToDefaultSettings();
  }
}

function updateVisualPageToDefaultSettings() {
  filterMenu.classList.remove("filter__menu__hide");
  filterMenu.classList.add("filter__menu");
  detailedPersonInfo.classList.add("hide__person__info");
  changeSideBtnName();
}

function renderPersonsList(persons) {
  pageValue = 0;
  showFilteredPersons(persons);
}

function filterBtnsHandler({ target }, persons) {
  const resetBtn = target.closest(".reset__filter__btn");
  const sideBtn = target.closest(".filter__btn");
  if (!resetBtn && !sideBtn) return;
  if (!!sideBtn) {
    filterMenu.classList.toggle("filter__menu__hide");
    filterMenu.classList.toggle("filter__menu");
    changeSideBtnName();
  }
  if (!!resetBtn) resetForm(persons);
}

function resetForm(persons) {
  pageValue = 0;
  showFilteredPersons(persons);
  updatePageList(persons);
  updatePersonsList(persons);
}

function errorHandler({ target }) {
  let btn = target.closest("button");
  if (!btn) return;
  if (btn.value === "cancel") {
    errorWindow.close();
  } else {
    errorWindow.close();
    init();
  }
}
