const url = 'https://randomuser.me/api/?nat=ua&results=16&inc=gender,name,picture,dob,cell&noinfo';
const listOfMembers = document.querySelector(".list");

const respData = []
const getData = (url) => {
  try {
    fetch(url)  
      .then(response => response.json())
      .then((json) => {
        respData.push(...json.results);
        getPeoples(respData);
      });
  } catch (err) {
    alert("Try again please");
     console.log(err);
  }
}
getData(url);

function getPeoples(respData) {
  respData.forEach((user) => {
    const newCard = document.createElement('div');
    newCard.classList.add('human');
    listOfMembers.appendChild(newCard);
    newCard.innerHTML = `
      <img class="myFace" src="${user.picture.large}" alt="myFace">
      <p class="myGender">${user.gender}</p>
      <p class="myName">${user.name.first} ${user.name.last}</p>
      <p class="myAge">${user.dob.age}</p>
      <a href="tel:${user.cell}">${user.cell}</a>`
  });
}

const refresh = () => { listOfMembers.innerHTML = ''; }

const selector = document.querySelector('#sex');
selector.addEventListener("change", sortMembers);

const ageSelector = document.querySelector("#age");
ageSelector.addEventListener("change", sortMembers);

const findThat = document.querySelector("#searchFriend");
findThat.addEventListener("input", sortMembers);

const namesSort = document.querySelector('#namesSort');
namesSort.addEventListener("change", sortMembers);

function sortMembers() {
  let sortedMembers = [...respData]

  if (selector.value === "All") {
    sortedMembers;
  } else if (selector.value === "Female") {
    sortedMembers = sortedMembers.filter(element => element.gender === "female")
  } else {
    sortedMembers = sortedMembers.filter(element => element.gender === "male")
  }

  if (ageSelector.value === 'upAge') {
    sortedMembers = sortedMembers.sort((a,b) => a.dob.age == b.dob.age ? 0 : a.dob.age < b.dob.age ? -1 : 1);
  } else if (ageSelector.value === 'downAge') {
    sortedMembers = sortedMembers.sort((b,a) => a.dob.age == b.dob.age ? 0 : a.dob.age < b.dob.age ? -1 : 1);
  } else {
    sortedMembers;
  }

  sortedMembers = sortedMembers.filter(element => `${element.name.first}${element.name.last}`.includes(findThat.value.trim()));

  if (namesSort.value === 'AtoZ') {
    sortedMembers = sortedMembers.sort((a,b) => a.name.first == b.name.first ? 0 : a.name.first < b.name.first ? -1 : 1);
  } else if (namesSort.value === 'ZtoA') {
    sortedMembers = sortedMembers.sort((b, a) => a.name.first == b.name.first ? 0 : a.name.first < b.name.first ? -1 : 1);
  } else {
    sortedMembers;
  }
  console.log(sortedMembers)
  refresh();
  getPeoples(sortedMembers)
}
