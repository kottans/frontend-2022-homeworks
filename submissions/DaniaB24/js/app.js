const cardsOfFriends = document.getElementById("allHumans");
const searchBar = document.getElementById("search");

let filteredFriends;
let allFriends;
let sortedFriends;
let friends;
fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((users) => {
    friends = users.results;
    renderFriends(friends);
    displayUsers(friends);
    document.addEventListener("click", (event) =>
      filterSetting(event, friends)
    );
  });

function filterSetting(event, friends) {
  renderFriends(friends);
  filterByGender(friends);

  if (event.target.closest(".filter_menu"))
    sortFriends(event.target, filteredFriends);
}
function renderFriends(friends) {
  filterByGender(friends);
  searchFriends();
  sortFriends(friends);
}
function displayUsers(friends) {
  const createCards = friends
    .map((item) => {
      return `
    <div class="card_person">
      <div class="card_container">
        <img src="${item.picture.large}">
         <h3 class="card_h3">${item.name.first} ${item.name.last}</h3>
         <p class="card_age">Age: ${item.dob.age}</p>
         <p class="card_gender">Gender: ${item.gender}</p>
      </div>
    </div>`;
    })
    .join("");
  cardsOfFriends.innerHTML = createCards;
}

function ascendingOfName(friends) {
  const sortedIncrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedIncrease);
}

function descendingOfName(friends) {
  const sortedDecrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedDecrease);
}

function sortFriends(target, friends) {
  const button = target.id;
  switch (button) {
    case "a-z":
      ascendingOfName(friends);
      break;
    case "z-a":
      descendingOfName(friends);
      break;
    case "0-9":
      ascendingOfAge(friends);
      break;
    case "9-0":
      descendingOfAge(friends);
      break;
    case "set":
      displayUsers(friends);
      break;
  }
}

function ascendingOfAge(friends) {
  const sortedAgeAscending = friends.sort(function (a, b) {
    return a.dob.age - b.dob.age;
  });
  displayUsers(sortedAgeAscending);
}

function descendingOfAge(friends) {
  const sortedAgeDescending = friends.sort(function (a, b) {
    return b.dob.age - a.dob.age;
  });
  displayUsers(sortedAgeDescending);
}

function filterByGender(friends) {
  const checkboxes = Array.from(
    document.querySelectorAll(".gender_checkbox:checked")
  );
  filteredFriends = friends.filter((item) =>
    checkboxes.some((gender) => item.gender === gender.value)
  );
}

function searchFriends() {
  searchBar.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    const filterFriends = filteredFriends.filter((item) => {
      const { first: firstName, last: lastName } = item.name;
      return `${firstName} ${lastName}`.toLowerCase().includes(search);
    });

    displayUsers(filterFriends);
  });
}
