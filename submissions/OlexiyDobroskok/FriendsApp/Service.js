export function validationOfEnteredData(entryField, forbiddendValues) {
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

export function getValueInputField(className) {
  const inputField = document.querySelector("." + className);
  return inputField.value;
}

export function getValueRadioBtn(name) {
  const radioBtn = document.querySelectorAll("input[name=" + name + "]");
  for (let btn of radioBtn) {
    if (!!btn.checked) {
      return btn.value;
    }
  }
}

export function deleteFirstChildElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

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

export function updatePersonsData(persons) {
  persons.forEach((person, personPosition) => {
    person.cityImg = shuffle(citiesPhotos)[0];
    person.id = personPosition;
  });
}

function shuffle(cities) {
  return cities.sort(function () {
    return 0.5 - Math.random();
  });
}

export function closePreLoader() {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");
  preloader.classList.remove("visible");
}

export function convertPersonsData(persons) {
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

export function changeSideBtnName() {
  const hideFilterBtn = document.querySelector(".hide__filter__btn");
  const showFilterBtn = document.querySelector(".show__filter__btn");
  const filterMenu = document.querySelector("#filter__menu");
  if (filterMenu.classList.value === "filter__menu") {
    showFilterBtn.classList.add("hide__btn");
    hideFilterBtn.classList.remove("hide__btn");
  } else {
    showFilterBtn.classList.remove("hide__btn");
    hideFilterBtn.classList.add("hide__btn");
  }
}

export function updateVisualPageToDefaultSettings() {
  const filterMenu = document.querySelector("#filter__menu");
  const detailedPersonInfo = document.querySelector(".detailed__person__info");
  filterMenu.classList.remove("filter__menu__hide");
  filterMenu.classList.add("filter__menu");
  detailedPersonInfo.classList.add("hide__person__info");
  changeSideBtnName();
}
