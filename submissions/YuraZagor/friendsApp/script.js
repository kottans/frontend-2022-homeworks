const url = 'https://randomuser.me/api/?results=50';


let newUsers = '';
const cardsContainer = document.querySelector('.cards--container');
const sortInput = document.querySelectorAll('.checkbox--icon');

const fetchUsers = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const { results } = await response.json();
        return results;		  
      }
    } catch (e) {
      console.error(e);
    }
};

const initApp = async () => {
  const usersData = await fetchUsers();
  fillCardContainer(usersData);
  enableInputsToSort(usersData);
  searchByUserName(usersData);
  resetUsers([...usersData]);
};
initApp();

function fillCardContainer(data) {
  let userCard;
  cardsContainer.innerHTML = '';
  data.forEach((card) => {
    userCard = createCard(card);
    cardsContainer.innerHTML += userCard;
  });
}

function createCard({ picture, name, dob, cell, gender, location }) {
	const card = `
		<div class="user-card ${gender}">
			<div class="user--img">
				<img class="user--image" src="${picture.large}" alt="" >
			</div>
			<div class="user-info">
				<h3 class="user-name">${name.first} ${name.last}</h3>
				<p class="user-age">${dob.age} years old</p>
				<p class="user-phone"> ${cell}"</p> 
				<p class="user-country"> ${location.country} </p4> 
				<p class="user-city"> ${location.city} </p5> 
			</div>
		</div>
	`;
	return card;
}

const enableInputsToSort = (data) => {
  sortInput.forEach((el) =>
    el.addEventListener('click', () => {
      newUsers = sortUsers(data, el.id);
      if (el.checked && el.classList.contains('gender')) {
        newUsers = filterByGender(newUsers, el.id);
      }
      fillCardContainer(newUsers);
    })
  );
};

function sortUsers(data, id) {
  
  if (id === 'ageUp' || id === 'ageDown') {
    data.sort((a, b) => a.dob.age - b.dob.age);
    document.getElementById('sex--any').checked = true
    return id === 'ageUp' ? data : data.reverse();
  }
  if (id === 'az' || id === 'za') {
    data.sort((a, b) => a.name.first.localeCompare(b.name.first));
    document.getElementById('sex--any').checked = true
    return id === 'az' ? data : data.reverse();
  }
  return data;
}

function filterByGender(data, id) {
  if (id === 'female') {
    return data.filter((user) => user.gender === 'female');
  }
  if (id === 'male') {
    return data.filter((user) => user.gender === 'male');
  }
  return data;
}

const searchInput = document.querySelector('#user--names');
const searchByUserName = (data) => {
  newUsers = [...data];
  searchInput.addEventListener('input', () => {
    newUsers = data.filter((user) => user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) || user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (newUsers.length === 0) {
      document.querySelector('.cards--container').innerHTML = `
        <h2 class="no-matches-title">No corresponding user, try some other variants ...</h2>
      `;
    } else {
      fillCardContainer(newUsers);
    }
  });
};

const resetUsers = (data) => {
  document.querySelector('.reset--button').addEventListener('click', (e) => {
    e.preventDefault();
    fillCardContainer(data);
	 searchInput.value = '';
   document.getElementById('sex--any').checked = true
   document.getElementById('empty').checked = true
  });
};
