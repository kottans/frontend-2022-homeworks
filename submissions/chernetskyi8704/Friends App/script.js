const filterBody = document.querySelector(".main__filters");
const burgerImage = document.querySelector(".burger_img");
const allFilters = document.querySelector(".main__filters");
const filterButtons = document.querySelector(".filter__buttons");
const filterForm = document.querySelector(".filter_form");
const closeBurgerButton = document.querySelector(".close");
const searchInput = document.querySelector('input[name="search"]');
const noUsersFoundElement = document.querySelector(".no-usersFound");

let allUsers = [];
let copyOfAllUsers = [];
let foundUsers = [];
let currentArrayOfUsers = [];
let currentFilterSettings = {
  selectedGender: "all",
  currentSort: false,
  inputText: false,
};

(async () => {
  try {
    const usersURL =
      "https://randomuser.me/api/?results=16&nat=ua&inc=gender,name,location,picture,dob&seed=1 noinfo";
    const response = await fetch(usersURL);
    const data = await response.json();
    allUsers = data.results;
    displayAllUsers(allUsers);
  } catch (err) {
    console.log("Error");
  }
})();

const displayAllUsers = usersArray => {
  const listOfUsers = document.querySelector(".users");
  listOfUsers.innerHTML = "";
  usersArray.map(user => {
    const html = ` <li class="user">
      <div class="user_photo-wrapper">
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
    listOfUsers.insertAdjacentHTML("beforeend", html);
  });
};

const compareAge = (firstUser, secondUser) => {
  return firstUser.dob.age - secondUser.dob.age;
};

const compareName = (firstUser, secondUser) => {
  return firstUser.name.first > secondUser.name.first ? 1 : -1;
};

const allSortMethods = {
  nameDescending: arr => {
    return arr.sort((a, b) => compareName(b, a));
  },
  nameAscending: arr => {
    return arr.sort(compareName);
  },
  ageDescending: arr => {
    return arr.sort((a, b) => compareAge(b, a));
  },
  ageAscending: arr => {
    return arr.sort(compareAge);
  },
};

const filterUsers = function (
  arrayOfUsers,
  { selectedGender } = currentFilterSettings
) {
  if (selectedGender !== "all") {
    return arrayOfUsers.filter(user => user.gender === selectedGender);
  } else {
    return arrayOfUsers;
  }
};

const defineCurrentFilterSettings = function ({ target: radioButton }) {
  if (radioButton.className.includes("gender")) {
    currentFilterSettings.selectedGender = radioButton.value;
  } else if (radioButton.className.includes("sort")) {
    currentFilterSettings.currentSort = radioButton.value;
  }
};

const ifUsersNotFound = function () {
  currentArrayOfUsers.length === 0?noUsersFoundElement.classList.remove("hidden"): noUsersFoundElement.classList.add("hidden")
};

const defineCurrentArrayOfUsers = function () {
  if (searchInput.value !== "") {
    currentFilterSettings.inputText = true;
    foundUsers = copyOfAllUsers.filter(
      user =>
        user.name.first
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }
  currentArrayOfUsers = searchInput.value !== "" ? foundUsers : copyOfAllUsers;
  ifUsersNotFound();
};

const displaySortedUsers = function ({ target: radioButton }) {
  copyOfAllUsers = [...allUsers];
  defineCurrentFilterSettings({ target: radioButton });
  defineCurrentArrayOfUsers();

  const filteredAndSortedUsers =
    !currentFilterSettings.currentSort && !currentFilterSettings.searchInput
      ? filterUsers(currentArrayOfUsers, currentFilterSettings)
      : allSortMethods[currentFilterSettings.currentSort](
          filterUsers(currentArrayOfUsers, currentFilterSettings)
        );

  displayAllUsers(filteredAndSortedUsers);
};

allFilters.addEventListener("input", function ({ target: radioButton }) {
  displaySortedUsers({ target: radioButton });
});

const resetFilters = () => {
  const inputTypeIsGenderAll = document.querySelector('input[value="all"]');
  const inputTypeIsGenderFemale = document.querySelector(
    'input[value="female"]'
  );
  const inputTypeIsGenderMale = document.querySelector('input[value="male"]');
  const inputSortAgeByIncreasing = document.querySelector(
    'input[value="ageAscending"]'
  );
  const inputSortAgeByDescending = document.querySelector(
    'input[value="ageDescending"]'
  );
  const inputSortNameByIncreasing = document.querySelector(
    'input[value="nameAscending"'
  );
  const inputSortNameByDescending = document.querySelector(
    'input[value="nameDescending"]'
  );

  displayAllUsers(allUsers);
  currentFilterSettings = {
    selectedGender: "all",
    currentSort: false,
    inputText: false,
  };

  searchInput.value = "";
  inputTypeIsGenderAll.checked = true;
  inputTypeIsGenderFemale.checked = false;
  inputTypeIsGenderMale.checked = false;
  inputSortAgeByIncreasing.checked = false;
  inputSortAgeByDescending.checked = false;
  inputSortNameByIncreasing.checked = false;
  inputSortNameByDescending.checked = false;
  if(!noUsersFoundElement.classList.contains("hidden")){
    noUsersFoundElement.classList.add("hidden");
  }
};

filterForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

filterButtons.addEventListener("click", function ({ target: button }) {
  if (button.classList.contains("reset")) {
    resetFilters();
  } else if (button.classList.contains("close")) {
    document.body.classList.remove("_lock");
    burgerImage.classList.remove("_active");
    filterBody.classList.remove("_active");
    closeBurgerButton.classList.add("hidden");
  }
});

burgerImage.addEventListener("click", function(){
  document.body.classList.toggle("_lock");
  burgerImage.classList.toggle("_active");
  closeBurgerButton.classList.toggle("hidden");
  filterBody.classList.toggle("_active");
});
