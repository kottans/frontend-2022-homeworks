const ulList = document.querySelector("ul.friends-list");

const searchName = document.querySelector("#search-input");
const filters = document.querySelector(".filters");
const genderAll = document.querySelector("#all");
const genderMale = document.querySelector("#male");
const genderFemale = document.querySelector("#female");

const ageFilter = document.querySelector("filter-age");

const sorts = document.querySelector(".sorts");
const sortAZ = document.querySelector("#name-A-Z");
const sortZA = document.querySelector("#name-Z-A");
const sortYoung = document.querySelector("#age-up");
const sortOld = document.querySelector("#age-down");

const nameFilter = document.querySelector(".filter-name");

const fullName = (obj) => Object.values(obj.name).join(" ");

let usersData = [];
let filterCards = [];
let genderData = [];
let sortsData = [];

function emptyList(who) {
  if (ulList[0] == undefined) {
    ulList.innerHTML = `<li class="card text-dark mt-5 p-2"><h1>По даному запиту немає ${who} анкет</h1></li>`;
  }
}

const getUsers = async () => {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=100&page=2&seed=drew`
    );
    const data = await response.json();
    usersData = data.results;
    showContent(usersData);
  } catch (error) {
    console.log(error);
  }
};

searchName.addEventListener("input", updateValue);

searchName.addEventListener("click", (e) => resetInput());

function updateValue(e) {
  resetRadio();
  if ((searchValue = "")) {
    filterCards = [];
  } else {
    showContent(usersData);
    const searchValue = e.target.value;
    filterCards = usersData.filter((card) =>
      fullName(card).toLowerCase().includes(searchValue.toLowerCase())
    );
    showContent(filterCards);
    if (filterCards[0] == undefined) {
      emptyList("таких");
    }
  }
}

function resetRadio() {
  const input = document.querySelectorAll("input:checked");
  input.forEach((i) => (i.checked = false));
  genderAll.checked = true;
}

function resetInput() {
  if (filterCards[0] == undefined && searchName.value != "") {
    return (searchName.value = "");
  }
}

filters.addEventListener("click", filterData);

function filterData() {
  filterCards[0] == undefined
    ? genderFilter(usersData)
    : genderFilter(filterCards);
}

function genderFilter(data) {
  if (genderMale.checked) {
    genderData = data.filter((card) => card.gender === "male");
    genderData[0] != undefined
      ? showContent(genderData)
      : emptyList("чоловічих");
  } else if (genderFemale.checked) {
    genderData = data.filter((card) => card.gender === "female");
    genderData[0] != undefined ? showContent(genderData) : emptyList("жіночих");
  } else showContent(data);
}

sorts.addEventListener("click", sortData);

function sortData(e) {
  genderData[0] == undefined && filterCards[0] == undefined
    ? (sortsData = usersData)
    : filterCards[0] == undefined
    ? (sortsData = genderData)
    : (sortsData = filterCards);
  switch (e.target) {
    case sortAZ:
      sortsData = sortsData.sort((userFirst, userSecond) =>
        userFirst.name.first < userSecond.name.first ? -1 : 1
      );
      showContent(sortsData);
      break;
    case sortZA:
      sortsData = sortsData.sort((userFirst, userSecond) =>
        userFirst.name.first > userSecond.name.first ? -1 : 1
      );
      showContent(sortsData);
      break;
    case sortYoung:
      sortsData = sortsData.sort(
        (first, second) => first.dob.age - second.dob.age
      );
      showContent(sortsData);
      break;
    case sortOld:
      sortsData = sortsData.sort(
        (first, second) => second.dob.age - first.dob.age
      );
      showContent(sortsData);
      break;
  }
}

getUsers();

function showContent(db) {
  // console.log(db);
  ulList.innerHTML = createCardUser(db);
}

function createCardUser(data) {
  return data
    .map(
      (i) =>
        `<li class="col-xl-3 col-lg-4 col-md-6 col-sm-12 p-2 text-light bg-secondary list-group-item list-group-item-secondary">
    <div class="person card m-1 bg-dark p-2 h-100"> 
    <div class="image m-1"><img class="card-img-top" src="${
      i.picture.large
    }" alt="" /></div>
    <h4 class="name mt-3">${fullName(i)}</h4>
    <h6 class="country text-muted">Country: ${i.location.country}/${
          i.location.city
        }</h6>
    <p class="age text-info pt-2">Age: ${i.dob.age}</p>
    <p class="phone "><a class="text-decoration-none text-warning " href="tel:${
      i.phone
    }">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>  ${i.phone}</a></p>
    <p class="email text-truncate"><a class="text-decoration-none text-success"  href="mailto:${
      i.email
    }"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">
    <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>
  </svg> ${i.email}</a></p>
    </div>
    </li>`
    )
    .join("");
}
