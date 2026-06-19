function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

const url = 'https://randomuser.me/api/?nat=ua&results=24&inc=gender,name,picture,dob,cell&noinfo';
const responseData = []
const mainContainer = document.querySelector('.container')
const listOfMembers = document.querySelector(".list");

const getData = (url) => {
  try {
    fetch(url)  
      .then(handleErrors)
      .then(response => response.json())
      .then((json) => {
        responseData.push(...json.results);
        getPeoples(responseData);
      });
  } catch (err) {
     console.log(err);
     mainContainer.innerHTML = `<div class="errorScreen">
     <p class="errorText">Something wrong with connect, try to refresh the page</p>
     <p class="errorText">${err}</p>
     <img class="errorImage" src="./images/err.png" alt="error"></div>`
  }
}
getData(url);

function getPeoples(responseData) {
  responseData.forEach((user) => {
    const newCard = document.createElement('div');
    newCard.classList.add('human');
    listOfMembers.appendChild(newCard);
    newCard.innerHTML = `
      <img class="myFace" src="${user.picture.large}" alt="myFace">
      <div class="profileColor"></div>
      <p class="myData">${user.gender}</p>
      <p class="myData">${user.name.first} ${user.name.last}</p>
      <p class="myData">${user.dob.age} y.o.</p>
      <a href="tel:${user.cell.replace(/[A-Z]/, Math.floor(Math.random()*9))}">
      ${user.cell.replace(/[A-Z]/, Math.floor(Math.random()*9))}</a>`
  });
}

const searchInput = document.querySelector("#searchFriend");
const genderSelector = document.querySelector('#sex');
const sortingSelector = document.querySelector("#ageAndName");

searchInput.addEventListener("input", sortMembers);
genderSelector.addEventListener("change", sortMembers);
sortingSelector.addEventListener("change", sortMembers);

function sortMembers() {
  let sortedMembers = [...responseData]

  sortedMembers = sortedMembers.filter(human => `${human.name.first}${human.name.last}`
  .toLowerCase()
  .includes(searchInput.value.trim()));
  
  if (genderSelector.value === "All") {
    sortedMembers;
  } else if (genderSelector.value === "Female") {
    sortedMembers = sortedMembers.filter(human => human.gender === "female")
  } else {
    sortedMembers = sortedMembers.filter(human => human.gender === "male")
  }

  if (sortingSelector.value === 'upAge') {
    sortedMembers = sortedMembers.sort((a,b) => sortingAge(a, b) );
  } else if (sortingSelector.value === 'downAge') {
    sortedMembers = sortedMembers.sort((a, b) => sortingAge(b, a) );
  } else if (sortingSelector.value === 'AtoZ') {
    sortedMembers = sortedMembers.sort((a, b) => sortingNames(a, b));
  } else if (sortingSelector.value === 'ZtoA') {
    sortedMembers = sortedMembers.sort((a, b) => sortingNames(b, a));
  } else {
    sortedMembers;
  }
  listOfMembers.innerHTML = '';
  getPeoples(sortedMembers)
}

function sortingNames(a, b){
  return a.name.first == b.name.first ? 0 : a.name.first < b.name.first ? -1 : 1;
}

function sortingAge(a, b){
  return a.dob.age - b.dob.age;
}
