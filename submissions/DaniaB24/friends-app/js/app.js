const cardsOfFriends = document.getElementById("all_humans");
const searchBar = document.getElementById("search");
const filterMenu = document.getElementById("filter_menu");

let friends;
let filteredUsers;
function startApp() {
  const URL = "https://randomuser.me/api?results=10";
  fetch(URL)
    .then(handleErrors)
    .then((response) => response.json())
    .then((users) => {
      console.log("ok");
      friends = users.results;
      filteredUsers = users.results;
      displayUsers(friends);
      searchFriends(filteredUsers);
      filterMenu.addEventListener("click", (event) => {
        filterSetting(event, friends);
      });
    })
    .catch((error) => {
      alert("Please reload, Authorization failed : " + error.message);
      console.log("Authorization failed : " + error.message);
    });
}
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function filterSetting({ target }, friends) {
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
function sortByName(a, b) {
  return a.name.first.localeCompare(b.name.first);
}
function sortFriends(target, friends) {
  const button = target.id;

  switch (button) {
    case "a-z":
      friends.sort(sortByName);
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
  filteredUsers = friends.filter((item) =>
    checkboxes.some((gender) => item.gender === gender.value)
  );
  displayUsers(filteredUsers);
}

function searchFriends() {
  searchBar.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    let searchedFriend = filteredUsers.filter((item) => {
      const { first: firstName, last: lastName } = item.name;
      return `${firstName} ${lastName}`.toLowerCase().includes(search);
    });
    displayUsers(searchedFriend);
  });
}
startApp();
