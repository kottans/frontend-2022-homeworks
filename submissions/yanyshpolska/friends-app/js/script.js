"use strict";

const usersArea = document.querySelector(".friends");
const friendsForm = document.querySelector(".options");
friendsForm.addEventListener("input", doFiltering);

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
    const userCard = `<article class="user"> 
	<div class="user__photo" style="
		  background: url(${user.picture.large}) 0 0/cover no-repeat;
		"></div>
		 <h3 class="user__name">${user.name.last} ${user.name.first}</h3>
		 <span class="user__info">${user.location.city}</span>
		 <span class="user__info">${user.gender}, ${user.dob.age}</span>
	</article>`;
    usersArea.innerHTML += userCard;
  }
}

function doFiltering() {
  const gender = document.querySelector('input[name="gender"]:checked').value;

  gender === "all"
    ? (resultingFriendsSet = initialFriendsSet)
    : (resultingFriendsSet = filterGender(initialFriendsSet, gender));

  resultingFriendsSet = searchNameInArray(resultingFriendsSet);
  sortingArray(resultingFriendsSet);
}

function sortingArray() {
  const sortingCondition = document.querySelector(
    'input[name="sorting"]:checked'
  );

  sortingCondition.dataset.info === "age"
    ? showFriends(sortByAge(resultingFriendsSet, sortingCondition.value))
    : showFriends(sortByName(resultingFriendsSet, sortingCondition.value));
}

const compareName = (firstFriend, secondFriend) => {
  return firstFriend.name.last.localeCompare(secondFriend.name.last);
};
const compareAge = (firstFriend, secondFriend) => {
  return firstFriend.dob.age - secondFriend.dob.age;
};

function sortByAge(friendsArray, value) {
  return value === "ascending"
    ? friendsArray.sort(compareAge)
    : friendsArray.sort((a, b) => compareAge(b, a));
}

function sortByName(friendsArray, value) {
  return value === "ascending"
    ? friendsArray.sort(compareName)
    : friendsArray.sort((a, b) => compareName(b, a));
}

function filterGender(friendsArray, gender) {
  return friendsArray.filter((user) => user.gender === gender);
}

function searchNameInArray(friendsArray) {
  const searchNameFilter = document.querySelector(".options__search");

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
