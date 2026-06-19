const url = 'https://randomuser.me/api/?results=50';
const cardsContainer = document.querySelector('.cards--container');
const inputsForm = document.querySelector('.form');
const inputValue = inputsForm.value;
let searchResult;
let sortedUsers;

let sortedData;
let genderFilteredData;
let forPrintData;

const fetchUsers = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    } else {
      const { results } = await response.json();
      console.log(results)
      return results;		  
    }
  } catch (e) {
    console.error(e);
  }
};

async function interactiveFriendsLoad(inputValue) {
  const loadedResults = await fetchUsers();
  searchByUserName(loadedResults);
  
  switch (inputValue) {
    case 'Reset':
      resetUsers(loadedResults)
    case 'ageUp':
    case 'ageDown':
    case 'az':
    case 'za':
      forPrintData = genderFilteredData ? [...genderFilteredData] : [...loadedResults];
      sortedData = sortUsers([...loadedResults], inputValue);
      forPrintData = sortUsers(forPrintData, inputValue);
      break;
    case 'male':
    case 'female':
    case 'all':
      genderFilteredData = filterByGender([...loadedResults], inputValue);
      forPrintData = filterByGender(sortedData ? sortedData : loadedResults, inputValue);
      break;
    case '':
      break;
    default:
      forPrintData = loadedResults;
      break;
    }; 
  fillCardContainer(forPrintData)
};  
interactiveFriendsLoad();
  
inputsForm.onclick = function(event){
  let input = event.target.closest('input');
  if (!input) return;
  interactiveFriendsLoad(input.value);
};

function fillCardContainer(data) {
  let userCard;
  cardsContainer.innerHTML = '';
  data.forEach(datapiece => {
    userCard = createCard(datapiece);
    cardsContainer.innerHTML += userCard;
  });
};

function createCard( {picture, name, dob, cell, location, email}) {
  const card = `
      <article class="user-card">
        <div class="user--img">
          <img class="user--image" src="${picture.large}" alt="" >
        </div>
        <div class="user-info">
          <h3 class="user-name">${name.first}</h3>
          <h3 class="user-name">${name.last}</h3>
          <p class="user-age">${dob.age} years old</p>
          <a href='tel:${cell}' class="user-contacts"> ${cell} </a>
          <p class="user-location"> ${location.country} </p> 
          <p class="user-location"> ${location.city} </p> 
          <a href='mailto:${email}' class="user-contacts"> e-mail </a> 
        </div>
      </article>
      `;
	return card;
};

function sortUsers(data, inputValue) {
  
  if (inputValue === 'ageUp' || inputValue === 'ageDown') {
    data.sort((a, b) => a.dob.age - b.dob.age);
    return inputValue === 'ageUp' ? data : data.reverse();
  }
  if (inputValue === 'az' || inputValue === 'za') {
    data.sort((a, b) => a.name.first.localeCompare(b.name.first));
    return inputValue === 'az' ? data : data.reverse();
  }
  return data
};

function filterByGender(data, inputValue) {
  if (inputValue === 'female') {
    return data.filter((user) => user.gender === 'female');
  }
  if (inputValue === 'male') {
    return data.filter((user) => user.gender === 'male');
  }
  return data
};

function resetUsers(data) {
    fillCardContainer(data);
    searchInput.value = '';
    document.getElementById('sex--any').checked = true;
    document.getElementById('empty').checked = true;
};

const searchInput = document.querySelector('#user--names');

function searchByUserName(data) {
  searchResult = [...data];
  searchInput.addEventListener('input', () => {
    searchResult = data.filter((user) => user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (searchResult.length === 0) {
      document.querySelector('.cards--container').innerHTML = `
        <h2 class="no-matches-title">No corresponding user, try some other variants ...</h2>
      `;
    } else {
      fillCardContainer(searchResult);
    }
  });
};

