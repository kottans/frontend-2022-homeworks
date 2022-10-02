const citiesPhotos = [
  {
    cityPhoto: "./img/cities/dnipro_1.jpg",
  },
  {
    cityPhoto: "./img/cities/dnipro.jpg",
  },
  {
    cityPhoto: "./img/cities/doneck.jpg",
  },
  {
    cityPhoto: "./img/cities/ivano-frankivsk_2.jpg",
  },
  {
    cityPhoto: "./img/cities/kharkiv_1.jpg",
  },
  {
    cityPhoto: "./img/cities/kharkiv_2.jpg",
  },
  {
    cityPhoto: "./img/cities/kharkiv_4.jpg",
  },
  {
    cityPhoto: "./img/cities/kharkiv.jpg",
  },
  {
    cityPhoto: "./img/cities/kyiv_2.jpg",
  },
  {
    cityPhoto: "./img/cities/kyiv_3.jpg",
  },
  {
    cityPhoto: "./img/cities/kyiv.jpg",
  },
  {
    cityPhoto: "./img/cities/lviv.jpg",
  },
  {
    cityPhoto: "./img/cities/ternopil.jpg",
  },
  {
    cityPhoto: "./img/cities/zaporijja.jpg",
  },
];

async function getData(url) {
  const responceData = await fetch(url);
  const json = await responceData.json();
  return json;
}

async function waitData() {
  const url =
    "https://randomuser.me/api/?results=100&inc=gender,name,nat,dob,location,email,phone,picture&nat=us,ua,ch,gb";
  try {
    data = await getData(url);
    const preloaderEl = document.getElementById("preloader");
    preloaderEl.classList.add("hidden");
    preloaderEl.classList.remove("visible");
    return data;
  } catch {
    errorWindow.showModal();
    console.log(error);
  }
}

let friendsIdList = [];
let pageValue = 0;
const personsList = document.querySelector(".person__list");
const pageList = document.createElement("ul");
pageList.classList.add("page__list");
personsList.after(pageList);

const personsData = waitData();
personsData.then(({ results: persons }) => {
  persons.forEach((person, personPosition) => {
    person.cityImg = shuffle(citiesPhotos)[0];
    person.id = personPosition;
  });
  sort.byAlphabet(persons);
  pageList.innerHTML = createPageList(persons).join("");
  updatePersonsList(persons);
});

const errorWindow = document.querySelector(".error");
const nameFilter = document.querySelector(".name__filter");
const ageFilter = document.querySelector(".age__filter__by__number");
const filterMenu = document.querySelector("#filter__menu");
const filterForm = document.querySelector(".filter__form");
const filterMenuBtn = document.querySelector(".filter__btn");
const detailedPersonInfo = document.querySelector(".detailed__person__info");
const myFriendsBtn = document.querySelector(".my__friends__btn");
const btnsArea = document.querySelector(".btns__area");
const iconInFriends = document.querySelector(".detailed__icon__infriends");

let friendsList;

personsData.then(({ results: persons }) => {
  filterForm.addEventListener("change", () =>
    renderPersonsList(
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  filterForm.addEventListener("input", () =>
    renderPersonsList(
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  pageList.addEventListener("click", () =>
    showPage(
      event,
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  filterMenu.addEventListener("click", () =>
    filterBtnsHandler(
      event,
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  personsList.addEventListener("click", () =>
    createDetailedPersonsInfo(event, persons)
  );
  detailedPersonInfo.addEventListener("click", () =>
    detailedInfoBtnsHandler(
      event,
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  btnsArea.addEventListener("click", () => changeDisplayMode(event, persons));
});

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
      const personCard = `
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
      return personCard;
    }
  );
}

function createPageList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  return convertedPersonsData.map((page, number) => {
    const pageNumber = `
    <li class="page__number"><a class="page__link${
      pageValue == number ? " chosen__page" : ""
    }" href="#" data-page-value="${number}">${number + 1}</a></li>`;
    return pageNumber;
  });
}

function showPage({ target }, persons) {
  const selectedPage = target.closest(".page__link");
  if (!selectedPage) return;
  pageValue = selectedPage.dataset.pageValue;
  showFilteredPersons(persons);
}

function createDetailedPersonsInfo({ target }, persons) {
  const activePerson = target.closest(".person__item");
  if (!activePerson) return;
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
  personPhoto.src = photo;
  personName.innerText = `${firstName} ${surName}`;
  personDate.innerHTML = `<strong>Birthday:</strong> ${birthday}`;
  personAge.innerHTML = `<strong>Age:</strong> ${age}`;
  personEmail.innerHTML = `<strong>Email:</strong> ${email}`;
  personGender.innerHTML = `<strong>Gender:</strong> ${gender}`;
  personLocation.innerHTML = `<strong>Address:</strong> ${streetNumber} ${streetName},
    ${city},${state},
    ${country},${postcode}`;
  personNation.innerHTML = `<strong>Nation:</strong> ${nation}`;
  personPhoneNumber.innerHTML = `<strong>Phone:</strong> ${phone}`;
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

function renderPersonsList(persons) {
  pageValue = 0;
  showFilteredPersons(persons);
}

function showFilteredPersons(persons) {
  validationOfEnteredData(nameFilter, "[^a-z]");
  validationOfEnteredData(ageFilter, "[^0-9]");
  let filteredPersonsByAge;
  let filteredPersonsByName;
  let filteredPersonsByGender;
  const inputValueAge = getValueInputField("age__filter__by__number");
  const inputValueName = getValueInputField("name__filter");
  const filterMethodValue = document.querySelector("#filter__method").value;
  if (inputValueAge !== "" && inputValueName !== "") {
    filteredPersonsByName =
      filterMethodValue === "extended"
        ? filterExtendedName(persons, inputValueName)
        : filterMethodValue === "surname"
        ? filterSurname(persons, inputValueName)
        : filterFirstName(persons, inputValueName);
    filteredPersonsByAge = filterAge(filteredPersonsByName, inputValueAge);
    filteredPersonsByGender = genderFilter(
      filteredPersonsByAge,
      getValueRadioBtn("gender__filter")
    );
  } else if (inputValueName !== "") {
    filteredPersonsByName =
      filterMethodValue === "extended"
        ? filterExtendedName(persons, inputValueName)
        : filterMethodValue === "surname"
        ? filterSurname(persons, inputValueName)
        : filterFirstName(persons, inputValueName);
    filteredPersonsByGender = genderFilter(
      filteredPersonsByName,
      getValueRadioBtn("gender__filter")
    );
  } else if (inputValueAge !== "") {
    filteredPersonsByAge = filterAge(persons, inputValueAge);
    filteredPersonsByGender = genderFilter(
      filteredPersonsByAge,
      getValueRadioBtn("gender__filter")
    );
  } else {
    filteredPersonsByGender = genderFilter(
      persons,
      getValueRadioBtn("gender__filter")
    );
  }
  sortPersons(filteredPersonsByGender, getValueRadioBtn("sort"));
  updatePageList(filteredPersonsByGender);
  updatePersonsList(filteredPersonsByGender);
}

const sort = {
  byAgeIncrease(persons) {
    persons.sort(
      (firstPerson, secondPerson) => firstPerson.dob.age - secondPerson.dob.age
    );
  },
  byAgeDecrease(persons) {
    persons.sort(
      (firstPerson, secondPerson) => secondPerson.dob.age - firstPerson.dob.age
    );
  },
  byAlphabet(persons) {
    persons.sort((firstPerson, secondPerson) => {
      if (firstPerson.name.last < secondPerson.name.last) {
        return -1;
      }
      if (firstPerson.name.last > secondPerson.name.last) {
        return 1;
      }
      return 0;
    });
  },
  byAlphabetReverse(persons) {
    persons.sort((firstPerson, secondPerson) => {
      if (firstPerson.name.last > secondPerson.name.last) {
        return -1;
      }
      if (firstPerson.name.last < secondPerson.name.last) {
        return 1;
      }
      return 0;
    });
  },
};

function sortPersons(personsData, value) {
  switch (value) {
    case "increase":
      sort.byAgeIncrease(personsData);
      break;
    case "decrease":
      sort.byAgeDecrease(personsData);
      break;
    case "alphabet":
      sort.byAlphabet(personsData);
      break;
    case "alphabet__reverse":
      sort.byAlphabetReverse(personsData);
      break;
  }
}

function genderFilter(personsData, value) {
  switch (value) {
    case "male":
      return personsData.filter((person) => person.gender === "male");
    case "female":
      return personsData.filter((person) => person.gender === "female");
    case "all":
      return personsData;
  }
}

function filterSurname(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    if (person.name.last.search(searchOptions) === -1) {
      return false;
    }
    return true;
  });
}

function filterFirstName(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    if (person.name.first.search(searchOptions) === -1) {
      return false;
    }
    return true;
  });
}

function filterExtendedName(persons, value) {
  return persons.filter((person) =>
    (person.name.first + person.name.last)
      .toLowerCase()
      .includes(value.toLowerCase())
  );
}

function validationOfEnteredData(entryField, forbiddendValues) {
  const maxLengthText = 12;
  const maxLengthNumber = 2;
  const forbidden = new RegExp(forbiddendValues, "ig");
  if (entryField.value !== forbidden) {
    entryField.value = entryField.value.replace(forbidden, "");
  }
  entryField.value = entryField.value.slice(
    0,
    entryField.type === "text" ? maxLengthText : maxLengthNumber
  );
}

function filterAge(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    if (person.dob.age.toString().search(searchOptions) === -1) {
      return false;
    }
    return true;
  });
}

function updatePersonsList(persons) {
  deleteFirstChildsElements(personsList);
  personsList.innerHTML =
    persons.length > 0
      ? createPersonsList(persons).join("")
      : `<p class="list__message">We found nothing matching your search... =(</p>`;
}

function updatePageList(persons) {
  deleteFirstChildsElements(pageList);
  pageList.innerHTML = createPageList(persons).join("");
}

function resetForm(persons) {
  pageValue = 0;
  sort.byAlphabet(persons);
  updatePageList(persons);
  updatePersonsList(persons);
}

function convertPersonsData(persons) {
  const convertedPersonsData = [];
  let count = 0;
  const personsPerPage = 15;
  while (count < persons.length) {
    const page = persons.slice(count, count + personsPerPage);
    count += personsPerPage;
    convertedPersonsData.push(page);
  }
  return convertedPersonsData;
}

function shuffle(cities) {
  return cities.sort(function () {
    return 0.5 - Math.random();
  });
}

function deleteFirstChildsElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function getValueRadioBtn(name) {
  const radioBtn = document.querySelectorAll("input[name=" + name + "]");
  for (let btn of radioBtn) {
    if (!!btn.checked) {
      return btn.value;
    }
  }
}

function getValueInputField(className) {
  const inputField = document.querySelector("." + className);
  return inputField.value;
}

function changeSideBtnName() {
  const hideFilterBtn = document.querySelector(".hide__filter__btn");
  const showFilterBtn = document.querySelector(".show__filter__btn");
  if (filterMenu.classList.value === "filter__menu") {
    showFilterBtn.classList.add("hide__btn");
    hideFilterBtn.classList.remove("hide__btn");
  } else {
    showFilterBtn.classList.remove("hide__btn");
    hideFilterBtn.classList.add("hide__btn");
  }
}

function errorHandler({ target }) {
  let btn = target.closest("button");
  if (!btn) return;
  if (btn.value === "cancel") {
    errorWindow.close();
  } else {
    errorWindow.close();
    waitData();
  }
}
