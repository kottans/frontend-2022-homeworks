import {
  changeSideBtnName,
  convertPersonsData,
  deleteFirstChildElements,
} from "./Service.js";
import { showFilteredPersons } from "./FilterLogic.js";
import { friendsIdList } from "./Handlers.js";

let pageValue = 0;

export function updatePersonsList(persons) {
  const personsList = document.querySelector(".person__list");
  deleteFirstChildElements(personsList);
  personsList.innerHTML =
    persons.length > 0
      ? createPersonsList(persons).join("")
      : `<p class="list__message">We found nothing matching your search... =(</p>`;
}

export function updatePageList(persons) {
  const pageList = document.querySelector(".page__list");
  deleteFirstChildElements(pageList);
  pageList.innerHTML = createPageList(persons).join("");
}

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
      const myFriendsBtn = document.querySelector(".my__friends__btn");
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

export function createPageList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  return convertedPersonsData.map((page, number) => {
    return `
    <li class="page__number"><a class="page__link${
      pageValue == number ? " chosen__page" : ""
    }" href="#" data-page-value="${number}">${number + 1}</a></li>`;
  });
}

export function createDetailedPersonsInfo(activePerson, persons) {
  const personId = activePerson.id;
  const filterMenu = document.querySelector("#filter__menu");
  const detailedPersonInfo = document.querySelector(".detailed__person__info");
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

export function showPage(page, persons) {
  pageValue = page.dataset.pageValue;
  showFilteredPersons(persons);
}

export function resetForm(persons) {
  pageValue = 0;
  showFilteredPersons(persons);
  updatePageList(persons);
  updatePersonsList(persons);
}

export function renderPersonsList(persons) {
  pageValue = 0;
  showFilteredPersons(persons);
}
