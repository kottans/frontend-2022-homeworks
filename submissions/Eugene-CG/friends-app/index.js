const FRIEND_URL = `https://randomuser.me/api/?results=30&nat=us,fr,nl,nz&inc=nat,gender,name,dob,picture`;
const friendsContainer = document.querySelector(".friends-container");
const sidebar = document.querySelector(".sidebar");
const searchInput = document.querySelector(".search__input");

const createFriend = ({ gender, fullName, age, face, nat }) => {
  return `
            <div class="friend">
                <div class="friend-picture-sex">
                    <img src="${face}" alt="" class="friend-picture">
                    <div class="friend-sex-container">
                        <img src="./img/${gender}-gender.png" alt="" class="friend-sex">
                    </div>
                </div>
                <div class="friend-description">
                    <div class="friend-name-age">
                        <span class="friend-name">
                            ${fullName},
                        </span>
                        <span class="friend-age">
                            ${age}
                        </span>
                    </div>
                    <div class="friend-icons">
                        <div class="friend-mail"><img src="./img/icons8-gmail-logo-30.png" alt=""></div>
                        <div class="friend-maps"><img src="./img/icons8-google-maps-old-50.png" alt=""></div>
                        <div class="friend-nat"><img src="https://www.worldometers.info/img/flags/${nat.toLowerCase()}-flag.gif" alt=""></div>
                    </div>
                </div>
            </div>`;
};
const getFriendsData = async (url, requestCounter = 0) => {
  if (requestCounter > 4) {
    alert("GO AWAY");
    location.reload();
  }
  try {
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
  } catch (err) {
    console.log(err);
    getFriendsData(url, requestCounter + 1);
  }
};
const setFriendsDataToHtml = (friends) => {
  friendsContainer.innerHTML = "";
  let temp = "";
  friends.forEach((friend) => (temp += createFriend(friend)));
  friendsContainer.insertAdjacentHTML("beforeend", temp);
};

let initialFriends = getFriendsData(FRIEND_URL);

(async () => {
  initialFriends = [...(await initialFriends)].map((friend) => {
    return {
      gender: friend.gender,
      fullName: `${friend.name.first} ${friend.name.last}`,
      age: friend.dob.age,
      face: friend.picture.large,
      nat: friend.nat,
    };
  });
  setFriendsDataToHtml(initialFriends);
})();
// I prefer IIFE here, because fetch called once
let sex;
let headerInputValue = "";
let friendsCopy;

const filterSex = (friends, sex) => {
  if (sex === "male" || sex === "female") {
    friends = friends.filter(({ gender }) => gender === sex);
  }
  return friends;
};
const filterByInput = (friends, value) => {
  if (value === "") return friends;
  const filteredFriends = friends.filter(({ fullName: a }) => {
    let fullName = a.toLowerCase();
    let tempTarget = value.toLowerCase();
    return fullName.indexOf(tempTarget) >= 0;
  });
  return filteredFriends;
};
const sortName = (friends, direction) => {
  friends.sort(({ fullName: a }, { fullName: b }) => a.localeCompare(b));
  if (direction === "up") friends.reverse();
};
const sortAge = (friends, direction) => {
  friends.sort(({ age: a }, { age: b }) => a - b);
  if (direction === "up") friends.reverse();
};

const handleFilters = (friends) => {
  friends = filterSex(friends, sex);
  friends = filterByInput(friends, headerInputValue);
  setFriendsDataToHtml(friends);
};

sidebar.addEventListener("click", ({ target }) => {
  friendsCopy = [...initialFriends];

  if (target.closest(".search")) return;
  if (target.closest(".sex-icon")) sex = target.dataset.id;
  if (target.closest(".age-icon")) sortAge(friendsCopy, target.dataset.direction);
  if (target.closest(".name-icon")) sortName(friendsCopy, target.dataset.direction);
  if (target.closest(".icon-hover")) handleFilters(friendsCopy);
});

searchInput.addEventListener("input", ({ target }) => {
  friendsCopy = [...initialFriends];
  headerInputValue = target.value;
  handleFilters(friendsCopy);
});
