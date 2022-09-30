const usersField = document.querySelector(".users");

const allFilters = document.querySelector(".main__filters");
const resetBtn = document.querySelector(".resetBtn");

const genderChoosenAll = document.querySelector('input[value="all"]');
const genderChoosenMale = document.querySelector('input[value="male"]');
const genderChoosenFemale = document.querySelector('input[value="female"]');

const searchInput = document.querySelector('input[name="search"]');

const usersURL =
  "https://randomuser.me/api/?results=16&nat=ua&inc=gender,name,location,picture,dob&seed=1 noinfo";

let allUsers = [];
let copyOfAllUsers = [];

const getUsersData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allUsers = [...data.results];
    copyOfAllUsers = [...allUsers];
    displayAllUsers(allUsers);
  } catch (err) {
    console.log("Error");
  }
};
getUsersData(usersURL);

const displayAllUsers = (arrOfUsers) => {
  usersField.innerHTML = "";
  arrOfUsers.map((user) => {
    const html = ` <li class="user">
      <div class="user_photo">
        <img src=${user.picture.large} alt="" class="user_img" />
      </div>
      <div class="user_description">
        <h2 class="user_name">${user.name.first} ${user.name.last}, ${user.dob.age}</h2>
        <span class="user_location data">Location: ${user.location.city}</span>
      </div>
      <div class="user_manipulate">
        <img src="img/add-user.png" alt="" class="img_manipulate" />
        <img
          src="img/broken-heart.png"
          alt=""
          class="img_manipulate img_broken"
        />
        <img
          src="img/red-heart.png"
          alt=""
          class="img_manipulate img_liked hidden"
        />
        <img src="img/email.png" alt="" class="img_manipulate" />
      </div>
    </li>`;
    usersField.insertAdjacentHTML("beforeend", html);
  });
};

let rules = ["", false, false, false, false];

function filterUsers(target) {
  if (genderChoosenMale.checked) {
    rules[0] = "male";
  }
  if (genderChoosenFemale.checked) {
    rules[0] = "female";
  }
  if (genderChoosenAll.checked) {
    rules[0] = "all";
  }
  if (target.value === "0-9" && target.checked) {
    rules[1] = true;
    rules[2] = false;
    rules[3] = false;
    rules[4] = false;
  }
  if (target.value === "9-0" && target.checked) {
    rules[2] = true;
    rules[1] = false;
    rules[3] = false;
    rules[4] = false;
  }
  if (target.value === "A-z" && target.checked) {
    rules[3] = true;
    rules[4] = false;
    rules[1] = false;
    rules[2] = false;
  }
  if (target.value === "Z-a" && target.checked) {
    rules[4] = true;
    rules[3] = false;
    rules[1] = false;
    rules[2] = false;
  }

  if (rules[1] || rules[2]) {
    displayAllUsers(sortByAge(filterByGender(copyOfAllUsers, rules), rules));
  } else if (rules[3] || rules[4]) {
    displayAllUsers(
      sortByAlphabets(filterByGender(copyOfAllUsers, rules), rules)
    );
  } else if (
    rules[0] === "all" ||
    rules[0] === "male" ||
    rules[0] === "female"
  ) {
    displayAllUsers(filterByGender(copyOfAllUsers, rules));
  }
}

function filterByGender(arr, rules) {
  if (rules[0] === "male" || rules[0] === "female") {
    arr = arr.filter((user) => user.gender === rules[0]);
    return arr;
  } else if (rules[0] === "all") {
    return arr;
  }
}

function sortByAge(arr, rules) {
  if (rules[1]) {
    arr.sort((a, b) => a.dob.age - b.dob.age);
  } else {
    arr.sort((a, b) => b.dob.age - a.dob.age);
  }
  return arr;
}

function sortByAlphabets(arr, rules) {
  if (rules[3]) {
    arr.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
  } else {
    arr.sort((a, b) => (a.name.first > b.name.first ? -1 : 1));
  }
  return arr;
}

allFilters.addEventListener("input", function (e) {
  const target = e.target;

  if (searchInput.value !== "") {
    const searchUser = copyOfAllUsers.filter(
      (user) =>
        user.name.first
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displayAllUsers(searchUser);
  } else {
    filterUsers(target);
  }
});

resetBtn.addEventListener("click", function () {
  displayAllUsers(allUsers);
  rules = ["", false, false, false, false];
  searchInput.value = "";
});
