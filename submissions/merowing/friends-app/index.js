const mobileCheck = function () {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };
  const isMobile = mobileCheck();
  
  const search = document.querySelector(".search");
  const searchClear = document.querySelector(".search-clear");
  const friendsNotFoundBlock = document.querySelector(".friends-not-found");
  const selectAgeRanges = document.querySelectorAll(".filter-ages > select");
  const pagination = document.querySelector(".pagination > ul");
  const mobileSearch = document.querySelector(".mobile-search > input");
  const mobileReset = document.querySelector(".mobile-reset");
  const preload = document.querySelector(".preload");
  
  const perpage = 10;
  let defaultFriendList = [];
  let activeGender = "both";
  let paginationOffsetTop = 0;
  let activePage = 0;
  let clearAllMobileFilters = false;
  let filterChanged = false;
  let paginationTabs;
  
  loadDatabase();
  
  function loadDatabase() {
    const SEED = "abc";
    const results = 50;
    const url = `https://randomuser.me/api/?results=${results}&seed=${SEED}&exc=login,id`;
  
    fetch(url)
      .then((response) => {
        if (!response.ok) return Promise.reject(response.text());
        return response.json();
      })
      .then((data) => {
        parseFriendsData(data.results);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        error.then((data) => console.log(data));
      });
  }
  
  function parseFriendsData(data) {
    const listOfMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    defaultFriendList = data.reduce((allValues, currValue, id) => {
      const {
        gender,
        name: { title, first, last },
        location: { country },
        email,
        dob: { date, age },
        picture,
        registered: { date: registeregDate },
      } = currValue;
  
      const [year, month, day] = date.split("T")[0].match(/[0-9]{2,4}/g);
      const fulldate = `${day} ${listOfMonth[+month - 1]} ${year}`;
      const fullname = first + " " + last;
      const [yearReg, monthReg, dayReg] = registeregDate.split("T")[0].split("-");
      const fullRegDate = dayReg + "." + monthReg + "." + yearReg;
  
      allValues.push({
        id,
        gender,
        name: { title, fullname },
        country,
        email,
        dob: { fulldate, age },
        registered: {
          fullregistered: fullRegDate,
          year: yearReg,
          month: monthReg,
          day: dayReg,
        },
        picture,
      });
  
      return allValues;
    }, []);
  
    createAgeRange();
    createCountryFilter();
    createPagination();
  }
  
  const getFriendList = () => filterFriendList(createFilters());
  
  function createFriendCard(friendList) {
    const friendListBlock = document.querySelector(".friendlist > ul");
    friendListBlock.innerHTML = "";
  
    let fragmentFriendslist = [];
    friendList.forEach((friend) => {
      const {
        id,
        gender,
        picture: { large, medium },
        name: { title, fullname },
        country,
        dob: { fulldate, age },
      } = friend;
      const temp = [
        id,
        gender,
        large,
        medium,
        title,
        fullname,
        country,
        fulldate,
        age,
      ];
  
      const template = friendCardTempalte(temp);
      fragmentFriendslist.push(template);
    });
  
    friendListBlock.innerHTML = fragmentFriendslist.join("");
  
    if (!friendList.length) {
      friendsNotFoundBlock.classList.remove("hidden");
      friendListBlock.innerHTML = "";
    } else {
      friendsNotFoundBlock.classList.add("hidden");
    }
  
    preload.classList.add("hidden");
  }
  
  function createPagination() {
    let friendList = getFriendList();
    pagination.innerHTML = "";
  
    if (!isMobile) {
      let pagesCount = friendList.length / perpage;
      let pagesCountInt = parseInt(pagesCount);
  
      if (pagesCountInt * perpage < perpage) {
        pagesCount = 1;
      }
      if (pagesCount % 1 < 1 && pagesCount % 1 !== 0) {
        pagesCountInt += 1;
      }
      pagesCountInt = pagesCountInt || 1;
  
      if (pagesCount <= activePage) {
        activePage = 0;
      }
  
      const tabs = paginationTemplate(pagesCountInt);
      pagination.innerHTML = tabs;
  
      paginationTabs = pagination.querySelectorAll("li");
  
      friendList = friendList.slice(
        activePage * perpage,
        (activePage + 1) * perpage
      );
  
      if (activeGender !== "both") {
        activePage = 0;
      }
      activeGender = "both";
    }
  
    if (isMobile) window.scrollTo(0, 0);
  
    paginationOffsetTop = document.querySelector(".pagination").offsetTop;
  
    createFriendCard(friendList);
  }
  
  function paginationTemplate(pages) {
    let paginationsHtml = [];
    for (let i = 0; i < pages; i++) {
      const classString = i === activePage ? `class="active"` : "";
      paginationsHtml.push(`<li ${classString}>${i + 1}</li>`);
    }
  
    return paginationsHtml.join("");
  }
  
  function friendCardTempalte(friends) {
    const [id, gender, largeImg, mediumImg, title, name, country, birth, age] =
      friends;
  
    return `<li>
                <div class="friendcard">
                    <img src="${largeImg}" class="large" alt="${name}">
                    <img src="${mediumImg}" class="medium" alt="${name}">
                    <ul>
                        <li class="friendcard-title">${title}</li>
                        <li class="friendcard-name">${name}</li>
                        <li class="friendcard-from">${country}</li>
                        <li class="friendcard-birth">${birth} <span class="age">(age ${age})</span></li>
                    </ul>
                    <div class="friendcard-id">${id + 1}</div>
                    <div class="friendcard-gender-${gender}"></div>
                </div>
              </li>
              `;
  }
  
  const filterForm = document.querySelector("#filter-form");
  const filterInputs = filterForm.querySelectorAll("input");
  const resetFilterButton = filterForm.querySelector(".reset-filter");
  const countryBlock = filterForm.querySelector('select[name="country"]');
  let searchPressed = false;
  
  resetFilterButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    resetFilter();
  });
  
  filterForm.addEventListener("change", () => {
    if (!searchPressed) {
      filterChanged = true;
      clearAllMobileFilters = true;
      createPagination();
    }
    searchPressed = false;
  });
  
  function resetFilter() {
    const defaultFilters = {
      gender: "both",
      sortby: "-1",
      updown: "-1",
      ageMin: 0,
      ageMax: -1,
      country: 0,
      searchValue: "",
    };
  
    for (const key in defaultFilters) {
      const formElements = filterForm.querySelectorAll(`*[name=${key}]`);
  
      formElements.forEach((elem) => {
        if (
          elem.type.indexOf("radio") >= 0 &&
          elem.value === defaultFilters[key]
        ) {
          elem.checked = true;
        }
        if (elem.type.indexOf("select") >= 0) {
          if (key === "country" || key === "ageMix")
            elem.selectedIndex = defaultFilters[key];
          if (key === "ageMax") elem.selectedIndex = elem.options.length - 1;
        }
        if (elem.type.indexOf("text") >= 0) {
          elem.value = "";
        }
      });
    }
  
    activePage = 0;
    activeGender = "both";
    searchClear.classList.remove("visible");
  
    if (isMobile) {
      countryBlock.selectedIndex = -1;
      clearAllMobileFilters = false;
    }
  
    createPagination();
  }
  
  function createFilters() {
    const filters = {};
    const formEntries = new FormData(filterForm);
  
    for (let [key, value] of formEntries.entries()) {
      if (key === "country" && filters[key]) {
        filters[key] = filters[key] + "," + value;
      } else {
        filters[key] = value;
      }
    }
  
    if (isMobile) {
      filters["searchValue"] = mobileSearch.value.toLowerCase();
      if (clearAllMobileFilters) {
        mobileReset.classList.remove("hidden");
      }
  
      countryBlock.classList.remove("empty");
      if (filters.country === "-1") {
        countryBlock.classList.add("empty");
      }
    }
  
    return filters;
  }
  
  function filterFriendList(filters) {
    let friendList = defaultFriendList.slice();
  
    const { gender, sortby, updown, ageMin, ageMax, country, searchValue } =
      filters;
  
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        switch (key) {
          case "gender":
            friendList = friendList.filter(
              (friend) => gender === "both" || friend.gender === gender
            );
            break;
          case "sortby":
            if (parseInt(updown) !== -1) {
              const sortKey = sortby;
              switch (sortKey) {
                case "name":
                  friendList.sort((first, second) => {
                    let firstName = first.name.fullname;
                    let secondName = second.name.fullname;
  
                    let n = 0;
                    while (firstName.slice(0, n) === secondName.slice(0, n)) {
                      n += 1;
                    }
  
                    firstName = firstName.slice(0, n);
                    secondName = secondName.slice(0, n);
  
                    const condition = !+updown
                      ? firstName > secondName
                      : secondName > firstName;
  
                    return condition ? 1 : -1;
                  });
                  break;
                case "age":
                  friendList.sort((first, second) => {
                    return !parseInt(updown)
                      ? first.dob.age - second.dob.age
                      : second.dob.age - first.dob.age;
                  });
                  break;
              }
            }
            break;
          case "updown":
            if (parseInt(updown) !== -1 && parseInt(sortby) === -1) {
              if (gender === "both") {
                let separation = 0;
                const genderFirst = !+updown ? "female" : "male";
                friendList = friendList.reduce((friends, person) => {
                  if (person.gender === genderFirst) {
                    friends = [
                      ...friends.slice(0, separation),
                      person,
                      ...friends.slice(separation),
                    ];
                    separation += 1;
                  } else {
                    friends.push(person);
                  }
                  return friends;
                }, []);
              } else {
                friendList =
                  parseInt(updown) && parseInt(updown) !== -1
                    ? friendList.reverse()
                    : friendList;
              }
            }
            break;
          case "ageMin":
          case "ageMax":
            let [min, max] = [parseInt(ageMin), parseInt(ageMax)];
            if (parseInt(ageMin) > parseInt(ageMax)) {
              [min, max] = [ageMax, ageMin];
            }
            friendList = friendList.filter(
              (friend) => friend.dob.age >= min && friend.dob.age <= max
            );
            break;
          case "country":
            const countries = country
              .toLowerCase()
              .split(",")
              .map((country) => country);
            friendList = friendList.filter(
              (friend) =>
                countries.indexOf(friend.country.toLowerCase()) !== -1 ||
                country === "-1"
            );
            break;
          case "searchValue":
            friendList = friendList.filter(
              (friend) =>
                friend.name.fullname.toLowerCase().indexOf(searchValue) >= 0
            );
            break;
        }
      }
    }
  
    return friendList;
  }
  
  search.addEventListener("keyup", () => {
    searchPressed = true;
  
    if (search.value !== "") {
      searchClear.classList.add("visible");
    } else {
      clearSearch();
    }
  
    let searchTimer = setTimeout(() => {
      createPagination();
      clearInterval(searchTimer);
    }, 100);
  });
  
  searchClear.addEventListener("click", () => {
    clearSearch();
  });
  
  function clearSearch() {
    search.value = "";
    searchClear.classList.remove("visible");
    searchPressed = false;
  
    createPagination();
  }
  
  pagination.addEventListener("click", (e) => {
    const page = [...paginationTabs].indexOf(e.target);
  
    if (!paginationTabs[page].classList.contains("active")) {
      paginationTabs.forEach((item) => {
        item.classList.remove("active");
      });
    }
  
    paginationTabs[page].classList.add("active");
    activePage = page;
  
    let friendList = getFriendList();
    friendList = friendList.splice(perpage * page, perpage);
  
    if (window.scrollY > paginationOffsetTop) {
      window.scrollTo(0, paginationOffsetTop);
    }
  
    createFriendCard(friendList);
  });
  
  function createCountryFilter() {
    if (!isMobile) {
      countryBlock.innerHTML = `<option value="-1" selected>Select all</option>`;
    }
  
    const countries = defaultFriendList.reduce((listOfCountries, friend) => {
      const country = friend.country;
      if (listOfCountries.indexOf(country) === -1) listOfCountries.push(country);
  
      return listOfCountries;
    }, []);
  
    countries.sort();
  
    const countryOptions = countries.map(
      (item) => `<option value=${item}>${item}</option>`
    );
    countryBlock.innerHTML += countryOptions.join("");
  }
  
  countryBlock.addEventListener("mousedown", (e) => {
    if (!isMobile) {
      e.preventDefault();
      const options = countryBlock.querySelectorAll("option");
      const index = [...options].indexOf(e.target);
  
      if (!index) {
        [...options].forEach((elem) => {
          elem.selected = false;
        });
      } else {
        if (options[0].selected) options[0].selected = false;
  
        e.target.selected = !e.target.selected;
      }
  
      if ([...options].every((option) => !option.selected)) {
        options[0].selected = true;
      }
  
      scrollTop = countryBlock.scrollTop;
      setTimeout(() => countryBlock.scrollTo(0, scrollTop), 0);
    }
  });
  countryBlock.addEventListener("click", (e) => {
    if (e.target.tagName === "OPTION") {
      createPagination();
    }
  });
  
  function createAgeRange() {
    const ages = defaultFriendList.reduce((ages, friend) => {
      const age = friend.dob.age;
  
      if (ages.indexOf(age) === -1) ages.push(age);
      return ages;
    }, []);
  
    ages.sort();
  
    let agesTemp = ages.slice();
  
    const options = agesTemp.reduce((options, age) => {
      const option = `<option value="${age}">${age}</option>`;
      options.push(option);
  
      return options;
    }, []);
  
    selectAgeRanges.forEach((select) => (select.innerHTML = options.join("")));
    selectAgeRanges[1].selectedIndex = ages.length - 1;
  }
  
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-close > div");
  const mobileSearchClear = document.querySelector(".mobile-search-clear");
  const mobileCountriesClear = document.querySelector(".mobile-clear-countries");
  const filter = document.querySelector(".filter");
  
  mobileMenu.addEventListener("click", () => {
    filter.classList.add("visible");
    document.body.classList.add("overflow");
  });
  mobileMenuClose.addEventListener("click", () => {
    filter.classList.remove("visible");
    document.body.classList.remove("overflow");
  
    if (filterChanged) window.scrollTo(0, 0);
    filterChanged = false;
  });
  mobileSearch.addEventListener("keyup", () => {
    mobileSearchClear.classList.remove("hidden");
    if (mobileSearch.value === "") mobileSearchClear.classList.add("hidden");
  
    createPagination();
  });
  mobileReset.addEventListener("click", (e) => {
    e.preventDefault();
    mobileReset.classList.add("hidden");
  
    resetFilter();
  });
  mobileSearchClear.addEventListener("click", () => {
    mobileSearchClear.classList.add("hidden");
    mobileSearch.value = "";
  
    createPagination();
  });
  mobileCountriesClear.addEventListener("click", () => {
    [...countryBlock.querySelectorAll("option")].forEach(
      (option) => (option.selected = false)
    );
  
    createPagination();
  });
  