const content = document.querySelector(".content"),
  formParameters = document.querySelector(".form-parameters"),
  input = document.querySelector(".input"),
  clearButton = document.querySelector("#clear"),
  resetButton = document.querySelector(".reset");
const url =
  "https://randomuser.me/api/?results=30&nat=us,gb&inc=gender,name,email,dob,phone,picture";

let friendsList = [];
let currentFrendsList = [];

const getResource = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

function renderCard(listCard) {
  content.innerHTML = "";
  listCard.forEach((friend) => {
    content.innerHTML += `
      <div class="friend-wrap">
          <header class="friend-header">
              <h3>${friend.name.first} ${friend.name.last}</h3>
          </header>
          <img class="friend-img ${friend.gender}" src="${friend.picture.large}" alt="">
          <p>I am <span>${friend.dob.age}</span> years old</p>
          <a href="#" class="friend-email">${friend.email}</a>
          <a href="#" class="friend-tel">${friend.phone}</a>
          <footer class="friend-gender">
              <h4>${friend.gender}</h4>
          </footer>
      </div>
    `;
  });
}

function filterByInput(listCard) {
  return listCard.filter((element) => {
    let strName = `${element.name.first} ${element.name.last}`.toLowerCase();
    return strName.indexOf(input.value.toLowerCase()) >= 0;
  });
}

function filterByGender(listCard) {
  let sex = document.querySelector('[name="sex"]:checked').value;
  if (sex === "all") {
    return listCard;
  } else {
    return listCard.filter((element) => {
      return element.gender === sex;
    });
  }
}

function sortByNameAge(listCard) {
  let sortNameAge = document.querySelector('[name="name"]:checked').value;
  switch (sortNameAge) {
    case "name up":
      sortNameUp(listCard);
      break;
    case "name down":
      sortNameDown(listCard);
      break;
    case "age up":
      sortAgeUp(listCard);
      break;
    case "age down":
      sortAgeDown(listCard);
      break;
    case "unsorted":
      break;
  }
}

function sortNameUp(listCard) {
  listCard.sort(function (a, b) {
    if (a.name.first > b.name.first) return 1;
    if (a.name.first < b.name.first) return -1;
    return 0;
  });
}

function sortNameDown(listCard) {
  listCard.sort(function (a, b) {
    if (a.name.first < b.name.first) return 1;
    if (a.name.first > b.name.first) return -1;
    return 0;
  });
}

function sortAgeUp(listCard) {
  listCard.sort(function (a, b) {
    if (a.dob.age > b.dob.age) return 1;
    if (a.dob.age < b.dob.age) return -1;
    return 0;
  });
}

function sortAgeDown(listCard) {
  listCard.sort(function (a, b) {
    if (a.dob.age < b.dob.age) return 1;
    if (a.dob.age > b.dob.age) return -1;
    return 0;
  });
}

function clickHandler() {
  currentFrendsList = [...friendsList];
  currentFrendsList = filterByInput(currentFrendsList);
  currentFrendsList = filterByGender(currentFrendsList);
  sortByNameAge(currentFrendsList);
  renderCard(currentFrendsList);
}

window.addEventListener("resize", (e) => {
  let widthToHeightRatio = window.innerWidth / window.innerHeight;
  if (widthToHeightRatio > 2.71) {
    formParameters.classList.remove("back-img600");
    formParameters.classList.add("back-img");
  } else {
    formParameters.classList.remove("back-img");
    formParameters.classList.add("back-img600");
  }
});

resetButton.addEventListener("click", (event) => {
  event.preventDefault();
  const inputs = document.querySelectorAll(".radio-control");
  inputs.forEach((element) => {
    if (element.value != "all" && element.value != "unsorted") {
      element.checked = false;
    } else {
      element.checked = true;
    }
  });
  input.value = "";
  renderCard(friendsList);
});

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  input.value = "";
});

getResource(url).then((data) => {
  friendsList = data.results;
  currentFrendsList = [...friendsList];
  input.addEventListener("input", clickHandler);
  input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  });
  formParameters.addEventListener("click", clickHandler);
  renderCard(friendsList);
});
