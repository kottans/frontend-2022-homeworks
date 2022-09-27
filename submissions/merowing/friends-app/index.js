let defaultFriendList = [];
let friendList = [];

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

const perpage = 10;
const pagination = document.querySelector(".pagination > ul");
let paginationOffsetTop = 0;

const mobileSearch = document.querySelector(".mobile-search > input");
const mobileReset = document.querySelector(".mobile-reset");
const preload = document.querySelector(".preload");
let clearAllMobileFilters = false;
let filterChanged = false;

let paginationTabs;
let activePage = 0;
let activeGender = "both";
let countries = [];
let ages = [];

let searchTimer;

loadFriendsData();

function loadFriendsData() {
  const SEED = "abc";
  const results = 40;
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

  const url = `https://randomuser.me/api/?results=${results}&seed=${SEED}&exc=login,id`;

  fetch(url)
    .then((response) => {
      if (!response.ok) return Promise.reject(response.text());

      return response.json();
    })
    .then((data) => {
      defaultFriendList = data.results.reduce((allValues, currValue, id) => {
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
        const [yearReg, monthReg, dayReg] = registeregDate
          .split("T")[0]
          .split("-");
        const fullRegDate = dayReg + "." + monthReg + "." + yearReg;

        if (countries.length === 0) countries.push(country);
        if (!countries.some((c) => c === country)) countries.push(country);

        ages.push(age);

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

      friendList = defaultFriendList.slice();

      createAgeRange();
      createCountryFilter();
      createPagination();
    })
    .catch((error) => {
      console.log(error);
      error.then((data) => console.log(data));
    });
}

function createFriendCard() {
  const friendListBlock = document.querySelector(".friendlist > ul");
  friendListBlock.innerHTML = "";

  let fragmentFriendslist = document.createDocumentFragment();
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
    fragmentFriendslist.appendChild(template);
  });

  friendListBlock.appendChild(fragmentFriendslist);

  if (!friendList.length) {
    friendsNotFoundBlock.classList.remove("hidden");
    friendListBlock.innerHTML = "";
  } else {
    friendsNotFoundBlock.classList.add("hidden");
  }

  preload.classList.add("hidden");
}

function createPagination() {
  pagination.innerHTML = "";

  let filters = createFilters();
  friendList = filterFriendList(filters);

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
    pagination.appendChild(tabs);

    paginationTabs = pagination.querySelectorAll("li");

    friendList = friendList.slice(
      activePage * perpage,
      (activePage + 1) * perpage
    );

    if (activeGender !== filters[0]) {
      activePage = 0;
    }
    activeGender = filters[0];
  }

  if (isMobile) window.scrollTo(0, 0);

  paginationOffsetTop = document.querySelector(".pagination").offsetTop;

  createFriendCard();
}

function paginationTemplate(pages) {
  let pagesFragment = document.createDocumentFragment();

  for (let i = 0; i < pages; i++) {
    let elem = document.createElement("li");
    if (i === activePage) elem.classList.add("active");
    elem.innerText = i + 1;
    pagesFragment.appendChild(elem);
  }

  return pagesFragment;
}

function friendCardTempalte(friends) {
  const [id, gender, largeImg, mediumImg, title, name, country, birth, age] =
    friends;

  const template = document.createElement("li");
  template.innerHTML = `
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
  return template;
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
  const defaultFilterValues = ["both", "none1", "none2"];

  filterInputs.forEach((item) => {
    if (item.getAttribute("type") === "text") item.value = "";

    item.checked = false;
    if (defaultFilterValues.indexOf(item.id) >= 0) item.checked = true;
  });

  friendList = defaultFriendList.slice();
  activePage = 0;
  activeGender = "both";

  countryBlock.selectedIndex = 0;
  if (isMobile) {
    countryBlock.selectedIndex = -1;
    clearAllMobileFilters = false;
  }
  selectAgeRanges.forEach((select, ind) => {
    select.selectedIndex = 0;
    if (ind === 1) {
      select.selectedIndex = select.options.length - 1;
    }
  });
  createPagination();
}

function createFilters() {
  const filters = [...filterInputs.values()].reduce((params, item) => {
    if (item.checked || item.type === "text") {
      params.push(item.value);
    }

    return params;
  }, []);

  const selectedCountry = [...countryBlock.querySelectorAll("option")].reduce(
    (countries, option) => {
      if (option.selected) countries.push(option.value);
      return countries;
    },
    []
  );

  let searchValue = filters.splice(0, 1)[0];
  if (isMobile) {
    searchValue = mobileSearch.value;
    if (clearAllMobileFilters) {
      mobileReset.classList.remove("hidden");
    }

    countryBlock.classList.remove("empty");
    if (!selectedCountry.length) {
      countryBlock.classList.add("empty");
    }
  }
  searchValue = searchValue.toLowerCase();

  const ageRange = [...selectAgeRanges].map((age) => {
    return age.options[age.selectedIndex].text;
  });

  return [...filters, selectedCountry, ageRange, searchValue];
}

function filterFriendList(filters) {
  friendList = defaultFriendList.slice();

  /*
   * 0 - gender
   * 1 - type
   * 2 - asc, desc
   * 3 - country range
   * 4 - age range
   * 5 - search value
   */

  filters.forEach((filter, index) => {
    if (index === 0) {
      friendList = friendList.filter(
        (friend) => filter === "both" || friend.gender === filter
      );
    }

    if (
      index === 1 &&
      !isNaN(+filters[2]) &&
      +filters[1] !== -1 &&
      +filters[2] !== -1
    ) {
      if (filter === "age") {
        friendList.sort((friend1, friend2) => {
          return !+filters[2]
            ? friend1.dob.age - friend2.dob.age
            : friend2.dob.age - friend1.dob.age;
        });
      }

      if (filter === "name") {
        friendList.sort((friend1, friend2) => {
          let name1 = friend1.name.fullname;
          let name2 = friend2.name.fullname;

          let n = 0;
          while (name1.slice(0, n) === name2.slice(0, n)) {
            n += 1;
          }

          name1 = name1.slice(0, n);
          name2 = name2.slice(0, n);

          const condition = !+filters[2] ? name1 > name2 : name2 > name1;

          return condition ? 1 : -1;
        });
      }
    }

    if (
      index === 2 &&
      !isNaN(+filters[2]) &&
      +filters[1] === -1 &&
      +filters[2] !== -1
    ) {
      if (filters[0] === "both") {
        // variable next need for to keep order
        let next = 0;
        const gender = !+filters[2] ? "female" : "male";
        friendList = friendList.reduce((friends, person) => {
          if (person.gender === gender) {
            friends = [
              ...friends.slice(0, next),
              person,
              ...friends.slice(next),
            ];
            next += 1;
          } else {
            friends.push(person);
          }
          return friends;
        }, []);
      } else {
        friendList =
          +filters[2] && +filters[2] !== -1 ? friendList.reverse() : friendList;
      }
    }

    if (index === 3 && filter.indexOf("-1") === -1 && filter.length > 0) {
      filter = filter.map((country) => country.toLowerCase());
      friendList = friendList.filter(
        (friend) => filter.indexOf(friend.country.toLowerCase()) !== -1
      );
    }

    if (index === 4) {
      if (+filter[0] > +filter[1]) filter.reverse();

      friendList = friendList.filter(
        (friend) => friend.dob.age >= +filter[0] && friend.dob.age <= +filter[1]
      );
    }

    if (index === 5 && filter !== "") {
      friendList = friendList.filter(
        (friend) => friend.name.fullname.toLowerCase().indexOf(filter) >= 0
      );
    }
  });

  return friendList;
}

search.addEventListener("keyup", () => {
  clearInterval(searchTimer);
  searchPressed = true;

  if (search.value !== "") {
    searchClear.classList.add("visible");
  } else {
    clearSearch();
  }

  searchTimer = setTimeout(() => {
    friendList = filterFriendList(createFilters());

    if (friendList.length / perpage <= activePage) {
      activePage = 0;
    }

    createPagination();
    clearInterval(searchTimer);
  }, 100);
});

searchClear.addEventListener("click", () => {
  clearSearch();
});

function clearSearch() {
  clearInterval(searchTimer);
  search.value = "";
  searchClear.classList.remove("visible");
  searchPressed = false;

  friendList = defaultFriendList.slice();

  friendList = filterFriendList(createFilters());
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

  friendList = filterFriendList(createFilters());
  friendList = friendList.splice(perpage * page, perpage);

  if (window.scrollY > paginationOffsetTop) {
    window.scrollTo(0, paginationOffsetTop);
  }

  createFriendCard();
});

function createCountryFilter() {
  const countryOptionElement = document.createDocumentFragment();

  // mobile
  if (!isMobile) {
    const firstElem = document.createElement("option");
    firstElem.value = "-1";
    firstElem.text = "Select all";
    firstElem.setAttribute("selected", "");
    countryBlock.appendChild(firstElem);
  }
  // mobile

  countries.sort();
  countries.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.innerText = item;
    countryOptionElement.appendChild(option);
  });

  countryBlock.appendChild(countryOptionElement);
}

let countryBlockOptionsChecked = [];
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
  ages = ages.filter((age, ind) => ages.indexOf(age) === ind);
  ages.sort();

  const optionsFragment = () => {
    let agesTemp = ages.slice();

    return agesTemp.reduce((options, age) => {
      const option = document.createElement("option");
      option.value = age;
      option.text = age;

      options.appendChild(option);
      return options;
    }, document.createDocumentFragment());
  };

  selectAgeRanges.forEach((select) => select.appendChild(optionsFragment()));
  selectAgeRanges[1].selectedIndex = ages.length - 1;
}

// mobile
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
