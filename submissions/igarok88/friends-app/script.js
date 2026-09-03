(async function () {
  const ALL_USERS_LINK =
    "https://randomuser.me/api/?inc=name,picture,dob,email,phone,location,gender,&results=5000";

  const container = document.querySelector(".container");
  const userContainer = document.querySelector(".user__container");

  const inputSearch = document.querySelector(".options-bar__search");

  const arrowLeft = document.querySelector("#paginationLeft");
  const arrowRight = document.querySelector("#paginationRight");

  const numberOfUsers = document.querySelector("#numberOfUsers");
  const totalPages = document.querySelector("#totalPages");
  const currentPage = document.querySelector("#currentPage");

  let genderValue = "all";
  let searchValue = "";
  let sortByAgeValue = "reset";
  let sortByAlphabetValue = "reset";

  let countPages = 1;

  let minAge;
  let maxAge;

  let index1 = 0;
  let index2 = 20;

  const getUsers = async (url) => {
    try {
      const response = await fetch(url).then((data) => data.json());
      const newUsers = response.results.map((user) => {
        return {
          name: `${user.name.first} ${user.name.last}`,
          photoUrl: user.picture.medium,
          age: user.dob.age,
          email: user.email,
          tel: user.phone,
          location: user.location.city,
          gender: user.gender,
        };
      });

      return newUsers;
    } catch (e) {
      console.error(e);
      userContainer.innerHTML = "<div class='error'>Something went wrong</div>";
    }
  };

  const allUsers = await getUsers(ALL_USERS_LINK);
  let currentUsers;
  if (allUsers) {
    currentUsers = allUsers.concat();
  } else {
    return;
  }

  container.addEventListener("click", async (e) => {
    if (e.target.closest(".options-bar__gender .options-bar__btn")) {
      activeBtnHandler(e, ".options-bar__gender .options-bar__btn");

      genderValue = e.target.getAttribute("data-value");

      currentUsers = await handlerUsers(allUsers);
    }

    if (e.target.closest(".options-bar__sort-age .options-bar__btn")) {
      activeBtnHandler(e, ".options-bar__sort-age .options-bar__btn");
      activeBtnHandler(e, ".options-bar__sort-name-alphabet .options-bar__btn");

      sortByAgeValue = e.target.getAttribute("data-value");

      sortByAlphabetValue = "reset";

      currentUsers = await handlerUsers(allUsers);
    }

    if (
      e.target.closest(".options-bar__sort-name-alphabet .options-bar__btn")
    ) {
      activeBtnHandler(e, ".options-bar__sort-name-alphabet .options-bar__btn");
      activeBtnHandler(e, ".options-bar__sort-age .options-bar__btn");

      sortByAlphabetValue = e.target.getAttribute("data-value");

      sortByAgeValue = "reset";

      currentUsers = await handlerUsers(allUsers);
    }

    if (e.target.closest(".options-bar__pagination")) {
      if (e.target.closest("#paginationRight")) {
        const numberRemainingUsers = currentUsers.slice(index2).length;

        if (numberRemainingUsers < 20 && numberRemainingUsers !== 0) {
          index1 = currentUsers.length - numberRemainingUsers;

          if (20 > currentUsers.length) {
            index1 = 0;
          }

          index2 = currentUsers.length;
        }

        if (index2 < currentUsers.length) {
          index1 += 20;
          index2 += 20;
          arrowLeft.classList.remove("options-bar__btn_disabled");
        }

        if (index2 > currentUsers.length) {
          index2 = currentUsers.length;
        }
        if (index2 === currentUsers.length) {
          arrowRight.classList.add("options-bar__btn_disabled");
        }

        if (20 >= currentUsers.length) {
          index1 = 0;
          index2 = currentUsers.length;
        }

        if (index1 >= 20) {
          arrowLeft.classList.remove("options-bar__btn_disabled");
        }

        const users20 = currentUsers.slice(index1, index2);

        renderUsers(users20);
        countPages++;
        showPaginationInfo(currentUsers);
      }

      if (e.target.closest("#paginationLeft")) {
        if (index2 % index1) {
          index2 -= index2 % index1;
          index1 -= 20;
        } else {
          index2 -= 20;
          index1 -= 20;
        }
        if (index1 <= 0) {
          index1 = 0;
          index2 = 20;
          arrowLeft.classList.add("options-bar__btn_disabled");
        }
        if (20 >= currentUsers.length) {
          index1 = 0;
          index2 = currentUsers.length;
        }

        const users20 = currentUsers.slice(index1, index2);

        renderUsers(users20);

        const numberRemainingUsers = currentUsers.slice(index2).length;
        if (numberRemainingUsers) {
          arrowRight.classList.remove("options-bar__btn_disabled");
        }
        countPages--;
        showPaginationInfo(currentUsers);
      }
    }
  });

  const renderUsers = (users) => {
    userContainer.innerHTML = "";
    users.forEach((user) => {
      const { name, photoUrl, age, email, tel, location, gender } = user;
      userContainer.innerHTML += `
        <div class="user__card">
            <div class="user__name ${
              gender === "female" ? "user__name_female" : "user__name_male"
            }">${name}
            </div>
            <img class="user__photo" src="${photoUrl}"/>
            <div class="user__age">I have ${age} years old</div>
            <a class="user__link user__email" href="mailto:${email}" title='${email}'>
              ${email}
            </a>
            <a class="user__link user__tel" href="tel:${tel}" title='${tel}'>${tel}</a>
            <a class="user__link user__location" href='https://www.google.com/maps/place/${location}' target="_blank" title='${location}'>${location}</a>
            <div class="user__gender">${gender}</div>
        </div>
      `;
    });
  };
  renderUsers(currentUsers.slice(0, 20));

  inputSearch.addEventListener("input", async () => {
    searchValue = inputSearch.value;

    currentUsers = await handlerUsers(allUsers);
  });

  const searchUserByName = async (users, str) => {
    const filteredUsersName = users.filter((user) => {
      if (user.name.toLowerCase().includes(str.toLowerCase())) {
        return user;
      }
    });

    return filteredUsersName;
  };

  const sortByAlphabet = (users) => {
    if (sortByAlphabetValue === "reset") {
      return users;
    }
    let newUsers;
    if (sortByAlphabetValue === "A-Z") {
      newUsers = users.sort((user, user2) =>
        user.name === user2.name ? 0 : user.name > user2.name ? 1 : -1
      );
    }
    if (sortByAlphabetValue === "Z-A") {
      newUsers = users.sort((user, user2) =>
        user.name === user2.name ? 0 : user.name < user2.name ? 1 : -1
      );
    }

    return newUsers;
  };

  const sortByAge = (users, sortAge) => {
    if (sortAge === "reset") {
      return users;
    }
    let newUsers;
    if (sortAge === "up") {
      newUsers = users.sort((user, user2) => user.age - user2.age);
    }
    if (sortAge === "down") {
      newUsers = users.sort((user, user2) => user2.age - user.age);
    }

    return newUsers;
  };

  minAge = sortByAge(currentUsers, "up")[0].age;
  maxAge = sortByAge(currentUsers, "up")[currentUsers.length - 1].age;

  const rangeHandler = () => {
    const controlRangeMin = (rangeMin, rangeMax, inputMin) => {
      const [from, to] = getParsed(rangeMin, rangeMax);
      fillSlider(rangeMin, rangeMax, "#C6C6C6", "#25daa5", rangeMax);
      if (from > to) {
        rangeMin.value = to;
        inputMin.value = to;
      } else {
        inputMin.value = from;
      }
    };

    const controlRangeMax = (rangeMin, rangeMax, inputMax) => {
      const [from, to] = getParsed(rangeMin, rangeMax);
      fillSlider(rangeMin, rangeMax, "#C6C6C6", "#25daa5", rangeMax);
      setToggleAccessible(rangeMax);
      if (from <= to) {
        rangeMax.value = to;
        inputMax.value = to;
      } else {
        inputMax.value = from;
        rangeMax.value = from;
      }
    };

    const getParsed = (currentFrom, currentTo) => {
      const from = parseInt(currentFrom.value, 10);
      const to = parseInt(currentTo.value, 10);
      return [from, to];
    };

    const fillSlider = (from, to, sliderColor, rangeColor, controlSlider) => {
      const rangeDistance = to.max - to.min;
      const fromPosition = from.value - to.min;
      const toPosition = to.value - to.min;
      controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
    };

    const setToggleAccessible = (currentTarget) => {
      const rangeMax = document.querySelector("#rangeMax");
      if (Number(currentTarget.value) <= 0) {
        rangeMax.style.zIndex = 2;
      } else {
        rangeMax.style.zIndex = 0;
      }
    };

    const rangeMin = document.querySelector("#rangeMin");
    const rangeMax = document.querySelector("#rangeMax");
    const inputMin = document.querySelector("#inputMin");
    const inputMax = document.querySelector("#inputMax");

    rangeMin.setAttribute("min", minAge);
    rangeMin.setAttribute("max", maxAge);
    rangeMin.setAttribute("value", minAge);

    rangeMax.setAttribute("min", minAge);
    rangeMax.setAttribute("max", maxAge);
    rangeMax.setAttribute("value", maxAge);

    inputMin.setAttribute("value", minAge);

    inputMax.setAttribute("value", maxAge);

    fillSlider(rangeMin, rangeMax, "#C6C6C6", "#25daa5", rangeMax);
    setToggleAccessible(rangeMax);

    rangeMin.addEventListener("input", () =>
      controlRangeMin(rangeMin, rangeMax, inputMin)
    );

    rangeMin.addEventListener("click", async () => {
      minAge = rangeMin.value;
      currentUsers = await handlerUsers(allUsers);
    });

    rangeMax.addEventListener("input", () =>
      controlRangeMax(rangeMin, rangeMax, inputMax)
    );
    rangeMax.addEventListener("click", async () => {
      maxAge = rangeMax.value;
      currentUsers = await handlerUsers(allUsers);
    });
  };
  rangeHandler();

  const filterByAge = (users, min, max) => {
    const filteredUsers = users.filter(
      (user) => user.age >= min && user.age <= max
    );
    return filteredUsers;
  };

  const filterByGender = (users, sex) => {
    if (sex === "all") {
      return users;
    }
    const filteredUsersGender = users.filter((user) => user.gender === sex);

    index1 = 0;
    index2 = 20;
    arrowDisabledHandler(users);

    return filteredUsersGender;
  };

  const showPaginationInfo = (users) => {
    numberOfUsers.innerHTML = users.length;
    totalPages.innerHTML = Math.ceil(users.length / 20);
    if (countPages < 1) {
      countPages = 1;
    }
    if (countPages > Math.ceil(users.length / 20)) {
      countPages = Math.ceil(users.length / 20);
    }
    currentPage.innerHTML = countPages;
  };
  showPaginationInfo(currentUsers);

  const arrowDisabledHandler = (users) => {
    index1 = 0;
    index2 = 20;

    if (users.length <= 20) {
      arrowRight.classList.add("options-bar__btn_disabled");
      arrowLeft.classList.add("options-bar__btn_disabled");
    } else {
      arrowRight.classList.remove("options-bar__btn_disabled");
      arrowLeft.classList.remove("options-bar__btn_disabled");
    }
    arrowLeft.classList.add("options-bar__btn_disabled");
  };
  arrowDisabledHandler(currentUsers);

  const activeBtnHandler = (e, elements) => {
    const btns = document.querySelectorAll(elements);
    btns.forEach((btn) => {
      btn.classList.remove("options-bar__btn_active");
    });

    e.target.classList.add("options-bar__btn_active");

    const noActiveBtns = document.querySelectorAll(
      ".options-bar__btn_no-active"
    );
    noActiveBtns.forEach((btn) => {
      btn.classList.remove("options-bar__btn_active");
    });
  };

  const handlerUsers = async (users) => {
    let newUsers = await searchUserByName(users, inputSearch.value);

    newUsers = sortByAge(newUsers, sortByAgeValue);

    newUsers = sortByAlphabet(newUsers, sortByAlphabetValue);

    newUsers = filterByAge(newUsers, minAge, maxAge);

    newUsers = filterByGender(newUsers, genderValue);

    arrowDisabledHandler(newUsers);

    renderUsers(newUsers.slice(0, 20));

    countPages = 1;

    showPaginationInfo(newUsers);

    return newUsers;
  };
})();
