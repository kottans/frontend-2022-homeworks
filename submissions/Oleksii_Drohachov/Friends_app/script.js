const cardsContainer = document.querySelector(".cards__container");
const openFilterContainerBtn = document.querySelector(".open__filter__btn");
const filterContainer = document.querySelector(".filter__container");
const searchInput = document.querySelector(".search__input");
const resetFiltersBtn = document.querySelector(".apply__filters_btn");
const sortingRadioBtns = document.querySelectorAll('input[name="sorting"]');
const filterRadioBtns = document.querySelectorAll('input[name="filter"]');
const sortingForm = document.querySelector(".sorting__container");

let initialPersonsData = [];
let personsToRender = [];

cardsContainer.addEventListener("click", handleCardClick);
openFilterContainerBtn.addEventListener("click", handleFilterBtnClick);
searchInput.addEventListener("input", handleNameSearch);
sortingForm.addEventListener("change", handleSortAndFilter);
resetFiltersBtn.addEventListener("click", resetFilters);

getData();

async function getData() {
  await fetch("https://randomuser.me/api/?results=30")
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .then((data) =>
      data.results.map((item) => {
        let person = {
          firstName: item.name.first,
          lastName: item.name.last,
          gender: item.gender,
          phone: item.phone,
          email: item.email,
          country: item.location.country,
          age: item.dob.age,
          picture: item.picture.large,
        };
        initialPersonsData = [...initialPersonsData, person];
      })
    )
    .catch((error) => console.log(error));
  renderPersonsCards(initialPersonsData);
}

function renderPersonsCards(arrayOfPersons) {
  personsToRender = [...arrayOfPersons];

  const cardsWrapper = document.createElement("div");
  cardsWrapper.classList.add("cards__wrapper");

  personsToRender = personsToRender.map((person) => {
    let personCard = document.createElement("div");
    personCard.classList.add("person__card");
    personCard.setAttribute("data-phone", person.phone);

    let avatarContainer = document.createElement("div");
    avatarContainer.classList.add("avatar__container");
    let avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.setAttribute("src", person.picture);

    let personName = document.createElement("h4");
    personName.classList.add("person__name");

    let personAge = document.createElement("h4");
    personAge.classList.add("person__age");
    personAge.textContent = person.age;

    personName.textContent = `${person.firstName} ${person.lastName}`;

    let spreadWrapper = document.createElement("div");
    spreadWrapper.classList.add("spread__wrapper");
    let personGender = document.createElement("span");
    personGender.classList.add("person__gender");
    personGender.textContent = person.gender;
    let personCountry = document.createElement("span");
    personCountry.classList.add("person__country");
    personCountry.textContent = person.country;
    let personEmail = document.createElement("span");
    personEmail.classList.add("person__email");
    personEmail.textContent = person.email;
    let personPhone = document.createElement("span");
    personPhone.classList.add("person__phone");
    personPhone.textContent = person.phone;

    spreadWrapper.append(personGender);
    spreadWrapper.append(personCountry);
    spreadWrapper.append(personEmail);
    spreadWrapper.append(personPhone);

    avatarContainer.append(avatar);
    personCard.append(avatarContainer);
    personCard.append(personName);
    personCard.append(personAge);
    personCard.append(spreadWrapper);

    cardsWrapper.append(personCard);

    return {
      firstName: person.firstName,
      lastName: person.lastName,
      gender: person.gender,
      phone: person.phone,
      email: person.email,
      country: person.country,
      age: person.age,
      picture: person.picture,
      element: personCard,
    };
  });
  cardsContainer.innerHTML = "";
  cardsContainer.append(cardsWrapper);
}

function handleCardClick({ target }) {
  const neededElement = target.closest(".person__card");
  neededElement.classList.toggle("person__card_spreaded");
}

function handleFilterBtnClick() {
  filterContainer.classList.toggle("filter__container_shown");
}

function handleNameSearch({ target }) {
  const value = target.value.toLowerCase();
  personsToRender.forEach((user) => {
    const isVisible =
      user.firstName.toLowerCase().includes(value) ||
      user.lastName.toLowerCase().includes(value);
    user.element.classList.toggle("person__card_hidden", !isVisible);
  });
}

function handleSortAndFilter() {
  let genderFilter = [...filterRadioBtns].find((radio) => {
    if (radio.checked) return radio;
  }).value;
  let ageOrNameSort = [...sortingRadioBtns].find((radio) => {
    if (radio.checked) return radio;
  }).value;

  let sortedArray = [...initialPersonsData];

  searchInput.value = "";

  renderPersonsCards(
    sortedArray
      .filter(
        (() => {
          switch (genderFilter) {
            case "randomGender":
              return (person) => person.gender;
            case "female":
              return (person) => person.gender === "female";
            case "male":
              return (person) => person.gender === "male";
            default:
              break;
          }
        })()
      )
      .sort(
        (() => {
          switch (ageOrNameSort) {
            case "youngerSort":
              return (a, b) => a.age - b.age;
            case "elderSort":
              return (a, b) => b.age - a.age;
            case "randomSort":
              return () => {
                return 0.5 - Math.random();
              };
            case "ascendingSort":
              return (a, b) => a.firstName.localeCompare(b.firstName);
            case "descendingSort":
              return (a, b) => b.firstName.localeCompare(a.firstName);
            default:
              break;
          }
        })()
      )
  );
}

function resetFilters() {
  sortingRadioBtns.forEach((radio) => {
    radio.checked = false;
  });
  filterRadioBtns.forEach((radio) => {
    radio.checked = false;
  });

  searchInput.value = "";

  const baseSortRadio = document.querySelector('input[value="randomSort"]');
  baseSortRadio.checked = true;
  const baseFilterRadio = document.querySelector('input[value="randomGender"]');
  baseFilterRadio.checked = true;

  renderPersonsCards(initialPersonsData);
}
