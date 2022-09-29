const content = document.querySelector(".content");
const url =
  "https://randomuser.me/api/?results=30&nat=us,gb&inc=gender,name,email,dob,phone,picture";

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

function copyFriendsList(listCard) {
  let copyListCard = listCard.filter(() => true);
  return copyListCard;
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
    if (a.name.first > b.name.first) {
      return 1;
    }
    if (a.name.first < b.name.first) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
}

function sortNameDown(listCard) {
  listCard.sort(function (a, b) {
    if (a.name.first < b.name.first) {
      return 1;
    }
    if (a.name.first > b.name.first) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
}

function sortAgeUp(listCard) {
  listCard.sort(function (a, b) {
    if (a.dob.age > b.dob.age) {
      return 1;
    }
    if (a.dob.age < b.dob.age) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
}

function sortAgeDown(listCard) {
  listCard.sort(function (a, b) {
    if (a.dob.age < b.dob.age) {
      return 1;
    }
    if (a.dob.age > b.dob.age) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
}

getResource(url).then((data) => {
  const friendsList = data.results,
    formParameters = document.querySelector(".form-parameters"),
    input = document.querySelector(".input"),
    clearButton = document.querySelector("#clear"),
    resetButton = document.querySelector(".reset");
  let currentFrendsList = copyFriendsList(friendsList);
  let searchFriends = [];

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
    searchFriends = [];
    renderCard(friendsList);
  });

  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    input.value = "";
    searchFriends = [];
  });

  input.addEventListener("input", (event) => {
    searchFriends = currentFrendsList.filter((element) => {
      let strName = `${element.name.first} ${element.name.last}`.toLowerCase();
      return strName.indexOf(input.value.toLowerCase()) >= 0;
    });
    renderCard(searchFriends);
  });

  input.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  formParameters.addEventListener("click", (event) => {
    let filterFriendsList =
      input.value.length == 0 ? copyFriendsList(friendsList) : searchFriends;

    function filterByGender(listCard) {
      let sex = document.querySelector('[name="sex"]:checked').value;
      if (sex === "all") {
        currentFrendsList = listCard;
      } else {
        currentFrendsList = listCard.filter((element) => {
          return element.gender === sex;
        });
      }
    }

    filterByGender(filterFriendsList);
    sortByNameAge(currentFrendsList);
    renderCard(currentFrendsList);
  });
  renderCard(friendsList);
});
