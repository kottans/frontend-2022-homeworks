"use strict";

const usersArea = document.querySelector(".friends");
const friendsForm = document.querySelector(".options");
friendsForm.addEventListener("change", doFiltering);

const searchNameFilter = document.querySelector(".options__search");
searchNameFilter.addEventListener("input", doFiltering);

let initialFriendsSet = [];
let resultingFriendsSet = [];

async function getData() {
  const url =
    "https://randomuser.me/api/?results=24&nat=ua&inc=gender,name,dob,location,picture";
  let response = await fetch(url);
  if (response.ok) {
    const users = await response.json();
    initialFriendsSet = users.results;
  } else {
    throw Error(response.statusText);
  }
}

function initial() {
  resultingFriendsSet = initialFriendsSet;
  showFriends(resultingFriendsSet);
}

function showFriends(friendsArray) {
  usersArea.innerHTML = "";
  for (let user of friendsArray) {
    const userCard = `<div class="user"> 
	<div class="user__photo" style="
		  background: url(${user.picture.large}) 0 0/cover no-repeat;
		"></div>
		 <span class="user__name">${user.name.last} ${user.name.first}</span>
		 <span class="user__info">${user.location.city}</span>
		 <span class="user__info">${user.gender}, ${user.dob.age}</span>
	</div>`;
    usersArea.innerHTML += userCard;
  }
}

function doFiltering() {
  const isMale = document.querySelector("#male");
  const isFemale = document.querySelector("#female");
  const isAll = document.querySelector("#gender-all");

  switch (true) {
    case isMale.checked:
      resultingFriendsSet = filterGender(initialFriendsSet, isMale.id);
      break;
    case isFemale.checked:
      resultingFriendsSet = filterGender(initialFriendsSet, isFemale.id);
      break;
    case isAll.checked:
      resultingFriendsSet = initialFriendsSet;
      break;
    default:
      break;
  }
  resultingFriendsSet = searchNameinArray(resultingFriendsSet);
  sortingArray(resultingFriendsSet);
}

function sortingArray() {
  const ageIncrease = document.querySelector("#age-increase");
  const ageDecrease = document.querySelector("#age-decrease");
  const nameAtoZ = document.querySelector("#name-AtoZ");
  const nameZtoA = document.querySelector("#name-ZtoA");
  switch (true) {
    case nameAtoZ.checked:
      showFriends(sortNameAtoZ(resultingFriendsSet));
      break;
    case nameZtoA.checked:
      showFriends(sortNameZtoA(resultingFriendsSet));
      break;
    case ageIncrease.checked:
      showFriends(sortAgeIncrease(resultingFriendsSet));
      break;
    case ageDecrease.checked:
      showFriends(sortAgeDecrease(resultingFriendsSet));
      break;
  }
}

function sortAgeIncrease(friendsArray) {
  return friendsArray.sort((a, b) => a.dob.age - b.dob.age);
}
function sortAgeDecrease(friendsArray) {
  return friendsArray.sort((a, b) => b.dob.age - a.dob.age);
}
function sortNameAtoZ(friendsArray) {
  return friendsArray.sort((a, b) => a.name.last.localeCompare(b.name.last));
}
function sortNameZtoA(friendsArray) {
  return friendsArray.sort((a, b) => b.name.last.localeCompare(a.name.last));
}
function filterGender(friendsArray, gender) {
  return friendsArray.filter((user) => user.gender === gender);
}

function searchNameinArray(friendsArray) {
  return friendsArray.filter(
    (user) =>
      user.name.last
        .toLowerCase()
        .includes(searchNameFilter.value.toLowerCase()) ||
      user.name.first
        .toLowerCase()
        .includes(searchNameFilter.value.toLowerCase())
  );
}

getData().then(initial).then(sortingArray);
