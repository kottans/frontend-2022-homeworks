function getData() {
	const requestURL = 'https://randomuser.me/api/?results=150&inc=name,gender,picture,dob';
	return fetch(requestURL)
	.then(response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(data => data.results)
}

function createHuman(person) {
	const human = document.createElement('li');
	human.classList.add('people__human');
	coloringCard(person, human);
	human.innerHTML = `
		<img class='people__img' src='${person.picture.large}'>
		<h3 class='people__name'>My name ${person.name.first}</h3>	
		<p class='people__age'>I am ${person.dob.age}</p>
		<img class='people__gender' src='${convertGender(person)}'>
	`
	return human;
}

const peopleList = document.querySelector('.people__list');
let receivedPeople = [];

function createPeopleHTML() {
	getData().then(people => {
		receivedPeople = people.slice();
		sortByAlphabet(receivedPeople);
		renderPeople(receivedPeople);
	})
}
createPeopleHTML();

function renderPeople(people) {
	peopleList.innerHTML = '';
	const peopleHtml = people.map(human => createHuman(human));
	peopleList.append(...peopleHtml);
}


let newPersonGender;
function convertGender(person) {
	if (person.gender == 'male') newPersonGender = './images/male-svgrepo-com.svg';
	if (person.gender == 'female') newPersonGender = './images/female-svgrepo-com.svg';
	return newPersonGender;
}
function coloringCard(person, human) {
	if (person.gender == 'male') human.classList.add('people__human_male');
	if (person.gender == 'female') human.classList.add('people__human_female');
}



const state = {
	sortBy: 'by-alphabet__a-z',
	filterGenderBy: 'value',
};

const form = document.querySelector('.filter');
form.addEventListener('change', filterData);
form.addEventListener('submit', filterPeopleByName)

function getCurrentInputId(elements) {
	const currentInput = Array.from(elements).find(selectedInput => selectedInput.checked);
	const currentInputId = currentInput.id;
	return currentInputId;
}

function filterData({currentTarget}) {
	const currentInputSortingId = getCurrentInputId(currentTarget.elements.sorting);
	state.sortBy = currentInputSortingId;
	
	const currentInputGenderId = getCurrentInputId(currentTarget.elements.gender);
	state.filterGenderBy = currentInputGenderId;
	
	let sortedPeople;
	if (state.sortBy == 'sort-by-age__ascending' || state.sortBy == 'sort-by-age__descending') {
		sortedPeople = sortByAge(receivedPeople);
	} else {
		sortedPeople = sortByAlphabet(receivedPeople);
	}
	
	const filteredPeople = filterByGender(sortedPeople);
	renderPeople(filteredPeople);
}

function filterByGender(people) {
	if (state.filterGenderBy === 'gender__all') return people;
	return people.filter(human => {
		if (human.gender == state.filterGenderBy) return human;
	})
}

function sortByAge(people) {
	let copyPeople = [...people];
	const sorterByAge = (a, b) => a.dob.age - b.dob.age;
	if (state.sortBy == 'sort-by-age__ascending') {
		copyPeople.sort(sorterByAge);
	} else {
		copyPeople.sort((a, b) => sorterByAge(b, a));
	}
	
	return copyPeople;
}

function sortByAlphabet(people) {
	if (state.sortBy == 'by-alphabet__a-z') people.sort((a,b) => a.name.first.localeCompare(b.name.first));
	if (state.sortBy == 'by-alphabet__z-a') people.reverse((a,b) => a.name.first.localeCompare(b.name.first));
	return people;
}


function filterPeopleByName({currentTarget}) {
	const currentInputNameValue = currentTarget.elements.name.value;
	const filteredByName = filterByName(currentInputNameValue, receivedPeople);
	renderPeople(filteredByName)
	currentTarget.elements.name.value = '';
}

function filterByName(data, people) {
	let copyPeople = people.filter(human => {
		return human.name.first.toLowerCase().includes(data.toLowerCase());
	})
	return copyPeople;
}
