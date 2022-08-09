const cardOfHumans = document.getElementById("allHumans");
const searchBar = document.getElementById("search");
const checkboxesGender = document.getElementById("filter_gender");

//TODO: call displayUsers function just once

let filterFriend;

fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((users) => {
    renderFriends(users.results);
    document.addEventListener("click", (event) =>
      filterSetting(event, users.results)
    );
  });

function renderFriends(friends) {
  selectFriends(friends);
  searchFriends();
}

function filterSetting(event, friends) {
  selectFriends(friends);

  if (event.target.closest(".filter_menu")) sortFriends(event.target, filterFriend);
}

const displayUsers = (friends) => {
  //TODO: rename variables
  //TODO: табуляция для html
  const htmlString = friends
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
  cardOfHumans.innerHTML = htmlString;
};

function increaseSortByName(friends) {
  const sortedIncrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedIncrease);
}

function decreaseSortByName(friends) {
  const sortedDecrease = friends.sort(function (a, b) {
    if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return -1;
    if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return 1;
    return 0;
  });
  displayUsers(sortedDecrease);
}

function sortFriends(target, friends) {
  console.log(friends)
  const button = target.id;
  switch (button) {
    case "a-z":
      increaseSortByName(friends);
      break;
    case "z-a":
      decreaseSortByName(friends);
      break;
    case "0-9":
      increaseSortByAge(friends);
      break;
    case "9-0":
      decreaseSortByAge(friends);
      break;
  }
}

function increaseSortByAge(friends) {
  const sortedAgeIncrease = friends.sort(function (a, b) {
    return a.dob.age - b.dob.age;
  });
  displayUsers(sortedAgeIncrease);
}

function decreaseSortByAge(friends) {
  const sortedAgeDecrease = friends.sort(function (a, b) {
    return b.dob.age - a.dob.age;
  });
  displayUsers(sortedAgeDecrease);
}

function filterByGender(friends) {
  const checkboxes = Array.from(
    document.querySelectorAll(".gender_checkbox:checked")
  );
  filterFriend = friends.filter((item) =>
    checkboxes.some((gender) => item.gender === gender.value)
  );
}

//TODO: rename function
function selectFriends(friends) {
  filterByGender(friends);
  displayUsers(filterFriend);
}

function searchFriends() {
  searchBar.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();

    const filterFriends = filterFriend.filter((item) => {
      const { first: firstName, last: lastName } = item.name;
      return `${firstName} ${lastName}`.toLowerCase().includes(search);
    });

    displayUsers(filterFriends);
  });
}
