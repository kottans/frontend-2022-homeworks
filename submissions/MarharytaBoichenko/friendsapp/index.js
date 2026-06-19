const container = document.querySelector(".container");
const usersList = document.querySelector(".friends");
const formAll = document.querySelector(".form");
const menuButton = document.querySelector(".header__button");
const menu = document.querySelector(".menu");
const resetButton = document.querySelector(".reset");

const onEscapeClose = ({ code }) => {
  if (code === "Escape") {
    menuClose();
  }
};

const menuClose = () => {
  menu.classList.remove("is-open");
  menuButton.classList.remove("close");
  window.removeEventListener("keydown", onEscapeClose);
};

const openMenu = () => {
  menu.classList.add("is-open");
  menuButton.classList.add("close");
  window.addEventListener("keydown", onEscapeClose);
};

menuButton.addEventListener("click", () => {
  menu.classList.contains("is-open") ? menuClose() : openMenu();
});

let users = [];
let copyOfUsers = [];
const fetchUsers = async () => {
  const BASE_URL = "https://randomuser.me/api/?results=12";
  const response = await fetch(BASE_URL);
  const data = await response.json();
  users = [...data.results];
  copyOfUsers = [...users];
  return users;
};

const renderUsers = (usersData) => {
  const markup = usersData
    .map(
      ({
        email,
        picture,
        gender,
        phone,
        location,
        name,
        dob,
      }) => `<li class="friends__card">
      <p class="friends__name">${name.first} ${name.last}</p>
            <div class="thumb">
              <img src="${picture.large}" class="friends__photo" />
            </div> 
            <div class="friends__info">
              <div class="wrapper">
                <p class="friends__age">Age: ${dob.age}</p>
                <svg class="friends__sex">
   <use href="./images/sprite.svg#${gender}"></use>
              </svg>
              </div>
              <div class="friends__contacts">
              <a href="mailto:${email}" class="friends__mail"> <svg class="friends__mail--icon" width="35" height="35">
   <use href="./images/sprite.svg#envelop"></use>
 </svg>${email}</a>
              <a href="tel:${phone}" class="friends__phone"> <svg class="friends__phone--icon" width="35" height="35">
   <use href="./images/sprite.svg#mobile"></use>
 </svg>${phone}</a>
              <p class="friends__place"> <svg class="friends__place--icon" width="35" height="35">
   <use href="./images/sprite.svg#location"></use>
 </svg>${location.city}</p>
              </div>
           </div>
          </li>`
    )
    .join("");
  usersList.innerHTML = markup;
};

const sortUsers = (users, { target }) => {
  if (target.dataset.sort === "name") {
    return sortByName(users);
  } else if (target.dataset.sort === "age") {
    return sortByAge(users);
  } else {
    return users;
  }
};

const sortByAge = (users) => {
  if (formAll.sorter.value === "ascending") {
    return users.sort(
      (firstUser, secondUser) => firstUser.dob.age - secondUser.dob.age
    );
  } else if (formAll.sorter.value === "descending") {
    return users.sort(
      (firstUser, secondUser) => secondUser.dob.age - firstUser.dob.age
    );
  } else {
    return users;
  }
};

const compareName = (firstUser, secondUser) => {
  const nameToSortFirst = (
    firstUser.name.first + firstUser.name.last
  ).toLowerCase();
  const nameToSortSecond = (
    secondUser.name.first + secondUser.name.last
  ).toLowerCase();
  return nameToSortFirst.localeCompare(nameToSortSecond);
};

const sortByName = (users) => {
  if (formAll.sorter.value === "ascending") {
    return users.sort((firstUser, secondUser) =>
      compareName(firstUser, secondUser)
    );
  } else if (formAll.sorter.value === "descending") {
    return users.sort((firstUser, secondUser) =>
      compareName(secondUser, firstUser)
    );
  } else {
    return users;
  }
};

const filterByGender = (users) => {
  if (formAll.sex.value === "female" || formAll.sex.value === "male") {
    return users.filter((user) => user.gender === formAll.sex.value);
  } else {
    return users;
  }
};

const filterByName = (users) => {
  users = users.filter((user) =>
    (user.name.first + user.name.last)
      .toLowerCase()
      .includes(formAll.search.value.trim().toLowerCase())
  );
  return users;
};

// const filterByAge = (e, users) =>
//   users.filter((user) => user.dob.age.toString().trim().includes(e.target.value));

formAll.addEventListener("input", (event) => {
  renderUsers(filterByName(filterByGender(sortUsers(users, event))));
});

const showUsers = async () => {
  try {
    const fethchedUsers = await fetchUsers();
    renderUsers(fethchedUsers);
  } catch (error) {
    alert("Oops, something  wrong. Please, try again");
    console.log(error);
  }
};

showUsers();

resetButton.addEventListener("click", () => {
  document
    .querySelectorAll("input")
    .forEach((input) => (input.checked = false));
  formAll.search.value = "";
  renderUsers(copyOfUsers);
});
