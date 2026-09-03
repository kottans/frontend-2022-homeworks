function getData() {
	const requestURL = 'https://randomuser.me/api/?results=150&inc=name,gender,picture,dob';
	return fetch(requestURL)
	.then(response => {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(data => data.results);
}

function createHuman(person) {
	const human = document.createElement('li');
	human.classList.add('people__human');
	coloringCards(person, human);
	human.innerHTML = `
	<img class='people__img' src='${person.picture.large}'>
	<h3 class='people__name'>My name's ${person.name.first}</h3>	
	<p class='people__age'>I am ${person.dob.age}</p>
	<img class='people__gender' src='${convertGender(person)}'>
	`;
	return human;
}

const peopleList = document.querySelector('.people__list');

let receivedPeople = [];

function createPeopleHTML() {
	getData().then(people => {
		receivedPeople = [...people];
		renderPeople(people);
	})
}
createPeopleHTML();

function renderPeople(people) {
	peopleList.innerHTML = '';
	const peopleHTML = people.map(human => createHuman(human));
	peopleList.append(...peopleHTML);
}

function convertGender(person) {
	let newPersonGender;
	if (person.gender == 'male') newPersonGender = './images/male-svgrepo-com.svg';
	if (person.gender == 'female') newPersonGender = './images/female-svgrepo-com.svg';
	return newPersonGender;
}
function coloringCards(person, human) {
	if (person.gender == 'male') human.classList.add('people__human_male');
	if (person.gender == 'female') human.classList.add('people__human_female');
}



const state = {
	sortBy: 'value',
	filterGenderBy: 'value',
};

const form = document.querySelector('.filter');
form.addEventListener('input', processMainData);

const resetButton = document.querySelector('.filter-reset__button')
resetButton.addEventListener('click', resetFilters);

function getCurrentInputId(elements) {
	const currentInput = Array.from(elements).find(selectedInput => selectedInput.checked);
	const currentInputId = currentInput.id;
	return currentInputId;
}

function processMainData({ currentTarget }) {
	if (currentTarget.elements.sorting.value == 'on') {
		const InputSortingId = getCurrentInputId(currentTarget.elements.sorting);
		state.sortBy = InputSortingId;
	}
	
	const InputGenderId = getCurrentInputId(currentTarget.elements.gender);
	state.filterGenderBy = InputGenderId;
	
	let sortedPeople;
	if (state.sortBy.includes('age')) {
		sortedPeople = sortByAge(receivedPeople);
	} else {
		sortedPeople = sortByAlphabet(receivedPeople);
	}
	
	const filteredPeopleByGender = filterByGender(sortedPeople);
	
	const InputNameValue = currentTarget.elements.name.value;
	const filteredPeopleByName = filterByName(InputNameValue, filteredPeopleByGender);
	
	renderPeople(filteredPeopleByName);
}

function filterByGender(people) {
	if (state.filterGenderBy === 'gender__all') return people;
	return people.filter(human => {
		return human.gender == state.filterGenderBy;
	})
}

function sortByAge(people) {
	const copyPeople = [...people];
	const sorterByAge = (a, b) => a.dob.age - b.dob.age;
	if (state.sortBy == 'sort-by-age__ascending') copyPeople.sort(sorterByAge);
	if (state.sortBy == 'sort-by-age__descending') copyPeople.sort((a, b) => sorterByAge(b, a));
	
	return copyPeople;
}

function sortByAlphabet(people) {
	const copyPeople = [...people];
	if (state.sortBy == 'by-alphabet__a-z') copyPeople.sort((a, b) => a.name.first.localeCompare(b.name.first));
	if (state.sortBy == 'by-alphabet__z-a') copyPeople.sort((b, a) => a.name.first.localeCompare(b.name.first));
	return copyPeople;
}

function filterByName(inputNameValue, people) {
	return people.filter(human => {
		return human.name.first.toLowerCase().includes(inputNameValue.toLowerCase());
	});
}

function resetFilters() {
	form.reset();
	state.sortBy = 'value';
	renderPeople(receivedPeople);
}
