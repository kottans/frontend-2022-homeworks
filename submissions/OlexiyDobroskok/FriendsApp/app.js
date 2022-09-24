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
const url =
  "https://randomuser.me/api/?results=100&inc=gender,name,nat,dob,location,email,phone,picture&nat=us,ua,ch,gb";

async function getData(url) {
  const responceData = await fetch(url);
  const json = await responceData.json();
  return json;
}

async function waitData() {
  try {
    data = await getData(url);
    return data;
  } catch {
    showOrHideErrorMsg();
    console.log(error);
  }
}

let friendsIdList = [];
let firstPageValue = 0;
const personsList = document.querySelector(".person__list");
const pageList = document.createElement("ul");
pageList.classList.add("page__list");
personsList.after(pageList);

const personsData = waitData();
personsData.then(({ results: persons }) => {
  const preloaderEl = document.getElementById("preloader");
  preloaderEl.classList.add("hidden");
  preloaderEl.classList.remove("visible");
  persons.forEach((person, personPosition) => {
    person.cityImg = shuffle(citiesPhotos)[0];
    person.id = personPosition;
  });
  sort.byAlphabet(persons);
  pageList.append(...createPageList(persons));
  updatePersonsList(persons);
});

const filterBtns = document.querySelector(".filter__btns");
const surnameFilter = document.querySelector(".surname__filter");
const ageFilter = document.querySelector(".age__filter__by__number");
const resetBtn = document.querySelector(".reset__filter__btn");
const filterMenu = document.querySelector("#filter__menu");
const filterForm = document.querySelector(".filter__form");
const filterMenuBtn = document.querySelector(".filter__btn");
const errorArea = document.querySelector(".error__area");
const detailedPersonInfo = document.querySelector(".detailed__person__info");
const myFriendsBtn = document.querySelector(".my__friends__btn");
const btnsArea = document.querySelector(".btns__area");
const iconInFriends = document.querySelector(".detailed__icon__infriends");

let friendsList;

personsData.then(({ results: persons }) => {
  filterBtns.addEventListener("change", () =>
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
  filterForm.addEventListener("click", () =>
    actionsServiceBtnFilterMenu(
      event,
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  personsList.addEventListener("click", () =>
    createDetailedPersonsInfo(event, persons)
  );
  detailedPersonInfo.addEventListener("click", () =>
    actionsBtnDetailedPersonsMenu(
      event,
      myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
    )
  );
  btnsArea.addEventListener("click", () =>
    changingPersonDisplayModes(event, persons)
  );
});

errorArea.addEventListener("click", actionsOnError);

function createPersonsList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  if (convertedPersonsData.length === 0) {
    const personsListMessage = document.createElement("p");
    personsListMessage.classList.add("list__message");
    personsListMessage.innerText =
      "We found nothing matching your search... =(";
    personsList.append(personsListMessage);
    return convertedPersonsData;
  }
  return convertedPersonsData[firstPageValue].map(
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
      const personItem = document.createElement("li");
      personItem.classList.add("person__item");
      personItem.id = id;
      const personBg = document.createElement("img");
      personBg.classList.add("person__bg");
      personBg.src = cityPhoto;
      personItem.append(personBg);
      const personPhoto = document.createElement("img");
      personPhoto.classList.add("person__photo");
      personPhoto.src = photo;
      personBg.after(personPhoto);
      const personName = document.createElement("h3");
      personName.classList.add("person__name");
      personName.innerText = `${firstName} ${surName}`;
      personPhoto.after(personName);
      const personAge = document.createElement("span");
      personAge.classList.add("person__text__age");
      personAge.innerText = age;
      personName.after(personAge);
      const personGender = document.createElement("span");
      personGender.classList.add("person__text__gender");
      personGender.innerText = gender;
      personAge.after(personGender);
      if (repeatId !== undefined) {
        personItem.setAttribute("data-friend", true);
        const inFriendsIcon = document.createElement("i");
        inFriendsIcon.classList.add("infriends__icon");
        const iconImg = document.createElement("img");
        iconImg.classList.add("icon__img__infriends");
        iconImg.src = "./img/friends__ico/in__friends.png";
        inFriendsIcon.append(iconImg);
        personGender.after(inFriendsIcon);
      }
      return personItem;
    }
  );
}

function createPageList(persons) {
  const convertedPersonsData = convertPersonsData(persons);
  return convertedPersonsData.map((page, number) => {
    const pageNumber = document.createElement("li");
    if (firstPageValue == number) {
      pageNumber.classList.add("page__number", "chosen__page");
    }
    pageNumber.classList.add("page__number");
    pageNumber.setAttribute("data-page-value", number);
    pageNumber.innerText = number + 1;
    return pageNumber;
  });
}

function showPage({ target }, persons) {
  const selectedPage = target.closest("li");
  if (!selectedPage) return;
  firstPageValue = selectedPage.dataset.pageValue;
  showFilteredPersons(persons);
}

function createDetailedPersonsInfo({ target }, persons) {
  const activePerson = target.closest(".person__item");
  if (!activePerson) return;
  const personId = activePerson.id;
  if (filterMenu.classList.value === "filter__menu") {
    filterMenu.classList.remove("filter__menu");
    filterMenu.classList.add("filter__menu__hide");
    changeFilterMenuBtnName();
  }
  if (detailedPersonInfo.classList.value.includes("hide__person__info")) {
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
  }
  if (activePerson.dataset.friend !== "true") {
    iconInFriends.classList.add("hide__btn");
    addFriendBtn.classList.remove("hide__btn");
    deleteFriendBtn.classList.add("hide__btn");
  }
}

function actionsBtnDetailedPersonsMenu({ target }, persons) {
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

function changingPersonDisplayModes({ target }, persons) {
  const myFriendsBtn = target.closest(".my__friends__btn");
  const allPeoplesBtn = target.closest(".all__persons__btn");
  if (!myFriendsBtn && !allPeoplesBtn) return;
  if (!!myFriendsBtn) {
    friendsList = friendsIdList.map((friendId) =>
      persons.find((person) => person.id == friendId)
    );
    const allPeoplesBtn = document.querySelector(".all__persons__btn");
    allPeoplesBtn.classList.remove("select__btn");
    myFriendsBtn.classList.add("select__btn");
    myFriendsBtn.setAttribute("data-friends-btn", "open");
    renderPersonsList(friendsList);
    updateVisualPageToDefaultSettings();
  }
  if (!!allPeoplesBtn) {
    const myFriendsBtn = document.querySelector(".my__friends__btn");
    allPeoplesBtn.classList.add("select__btn");
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
  changeFilterMenuBtnName();
}

function actionsServiceBtnFilterMenu({ target }, persons) {
  const activeBtn = target.closest("button");
  if (!activeBtn) return;
  if (activeBtn.type !== "reset") {
    event.preventDefault();
    filterMenu.classList.toggle("filter__menu__hide");
    filterMenu.classList.toggle("filter__menu");
    changeFilterMenuBtnName();
  }
  if (activeBtn.type === "reset") {
    resetForm(persons);
  }
}

function renderPersonsList(persons) {
  firstPageValue = 0;
  showFilteredPersons(persons);
}

function showFilteredPersons(persons) {
  validationOfEnteredData(surnameFilter, "[^a-z]");
  validationOfEnteredData(ageFilter, "[^0-9]");
  let filteredPersonsByAge;
  let filteredPersonsBySurname;
  let filteredPersonsByGender;
  const inputValueAge = getValueInputField("age__filter__by__number");
  const inputValueSurname = getValueInputField("surname__filter");
  if (inputValueAge !== "" && inputValueSurname !== "") {
    filteredPersonsBySurname = filterSurname(persons, inputValueSurname);
    filteredPersonsByAge = filterAge(filteredPersonsBySurname, inputValueAge);
    filteredPersonsByGender = genderFilter(
      filteredPersonsByAge,
      getValueRadioBtn("gender__filter")
    );
  } else if (inputValueSurname !== "") {
    filteredPersonsBySurname = filterSurname(persons, inputValueSurname);
    filteredPersonsByGender = genderFilter(
      filteredPersonsBySurname,
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

function validationOfEnteredData(entryField, forbiddendValues) {
  const forbidden = new RegExp(forbiddendValues, "ig");
  if (entryField.value !== forbidden) {
    entryField.value = entryField.value.replace(forbidden, "");
  }
  if (entryField.value.length > entryField.maxLength) {
    entryField.value = entryField.value.slice(0, entryField.maxLength);
  }
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
function showOrHideErrorMsg() {
  const errorWindow = document.querySelector(".error__wrap__hide");
  errorWindow.classList.toggle("error__wrap__show");
}

function updatePersonsList(persons) {
  deleteFirstChildsElements(personsList);
  personsList.append(...createPersonsList(persons));
}

function updatePageList(persons) {
  deleteFirstChildsElements(pageList);
  pageList.append(...createPageList(persons));
}

function resetForm(persons) {
  firstPageValue = 0;
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
    if (btn.checked) {
      return btn.value;
    }
  }
}

function getValueInputField(className) {
  const inputField = document.querySelector("." + className);
  return inputField.value;
}

function changeFilterMenuBtnName() {
  const hideFilterBtn = document.querySelector(".hide__filter__btn");
  const showFilterBtn = document.querySelector(".show__filter__btn");
  if (filterMenu.classList.value === "filter__menu") {
    showFilterBtn.classList.add("hide__btn");
    hideFilterBtn.classList.remove("hide__btn");
  }
  if (filterMenu.classList.value === "filter__menu__hide") {
    showFilterBtn.classList.remove("hide__btn");
    hideFilterBtn.classList.add("hide__btn");
  }
}

function actionsOnError({ target }) {
  let btn = target.closest("button");
  if (!btn) return;
  if (btn.value === "cancel") showOrHideErrorMsg();
  showOrHideErrorMsg();
  waitData();
}
