const cardsOfFriends = document.getElementById("allHumans");
const searchBar = document.getElementById("search");
const filterMenu = document.getElementById("filter_menu");
const URL = "https://randomuser.me/api/?results=10";
let friends;

function startApp() {
  fetch(URL)
    .then((response) => response.json())
    .then((users) => {
      console.log("ok");
      friends = users.results;
      displayUsers(friends);
      filterMenu.addEventListener("click", (event) => {
        renderFriends(event, friends);
      });
    })
    .catch((error) => console.log("Authorization failed : " + error.message));
}

function renderFriends({ target }, friends) {
  const sortedResults = sortFriends(target, friends);
  filterByGender(sortedResults ?? []);
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

function sortByAge(a, b) {
  return a.dob.age > b.dob.age ? 1 : -1;
}
function sortByName (a, b) {
  return a.name.first.localeCompare(b.name.first);
}
function sortFriends(target, friends) {
  const button = target.id;

  switch (button) {
    case "a-z":
      friends.sort((a, b) => sortByName(a, b));
      break;
    case "z-a":
      friends.sort((a, b) => sortByName(b, a));
      break;
    case "0-9":
      friends.sort((a, b) => sortByAge(a, b));

      break;

    case "9-0":
      friends.sort((a, b) => sortByAge(b, a));

      break;
  }
  return friends;
}
function sortByAge(a, b) {
  return a.dob.age > b.dob.age ? 1 : -1;
}
function filterByGender(friends) {
  const checkboxes = Array.from(
    document.querySelectorAll(".gender_checkbox:checked")
  );
  const filteredUsers = friends.filter((item) =>
    checkboxes.some((gender) => item.gender === gender.value)
  );
  displayUsers(filteredUsers);
  searchFriends(filteredUsers);
}

function searchFriends(filteredUsers) {
  searchBar.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    const searchedFriend = filteredUsers.filter((item) => {
      const { first: firstName, last: lastName } = item.name;
      return `${firstName} ${lastName}`.toLowerCase().includes(search);
    });
    displayUsers(searchedFriend);
  });
}
startApp();
