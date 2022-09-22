import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleSortButtonClick,
  handleNameInputChange,
  handleMinAndMaxAgeInput,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { getPeopleFromResponse } from './fetchPeople.js';

export const state = {
  initialArray: [],
  arrayToRender: [],
  filter: {
    gender: 'all',
    minAge: 0,
    maxAge: 200,
    name: '',
  },
  sort: 'initial',
  prepareArrayToRender() {
    const genderOptions = {
      all: ['male', 'female'],
      male: ['male'],
      female: ['female'],
    };
    const sortingOptions = {
      initial: () => 0,
      'name-ascending': (currentPerson, nextPerson) => {
        if (currentPerson.name < nextPerson.name) {
          return -1;
        } else if (currentPerson.name < nextPerson.name) {
          return 1;
        } else {
          return 0;
        }
      },
      'name-descending': (currentPerson, nextPerson) => {
        if (currentPerson.name > nextPerson.name) {
          return -1;
        } else if (currentPerson.name > nextPerson.name) {
          return 1;
        } else {
          return 0;
        }
      },
      'age-ascending': (currentPerson, nextPerson) =>
        currentPerson.age - nextPerson.age,
      'age-descending': (currentPerson, nextPerson) =>
        nextPerson.age - currentPerson.age,
    };

    this.arrayToRender = this.initialArray
      .filter((person) => {
        return (
          genderOptions[this.filter.gender].includes(person.gender) &&
          person.age >= this.filter.minAge &&
          person.age <= this.filter.maxAge &&
          person.name.toLowerCase().includes(this.filter.name.toLowerCase())
        );
      })
      .sort(sortingOptions[this.sort]);
  },
};

const setMinAndMaxAgeInStateFromArrayOfPeople = (people) => {
  state.filter.maxAge = state.filter.minAge = people[0].age;
  for (let i = 1; i < people.length; i++) {
    if (people[i].age < state.filter.minAge) {
      state.filter.minAge = people[i].age;
      continue;
    }
    if (people[i].age > state.filter.maxAge) {
      state.filter.maxAge = people[i].age;
    }
  }
};

const setMinAndMaxValuesInFilterFields = () => {
  const minAgeField = document.getElementById('min-age-input');
  const maxAgeField = document.getElementById('max-age-input');
  minAgeField.setAttribute('max', state.filter.maxAge);
  minAgeField.setAttribute('value', state.filter.minAge);
  minAgeField.setAttribute('min', state.filter.minAge);
  maxAgeField.setAttribute('min', state.filter.minAge);
  maxAgeField.setAttribute('value', state.filter.maxAge);
  maxAgeField.setAttribute('max', state.filter.maxAge);
};

document.addEventListener('DOMContentLoaded', async () => {
  renderSpinner();
  state.initialArray = await getPeopleFromResponse();
  setMinAndMaxAgeInStateFromArrayOfPeople(state.initialArray);
  setMinAndMaxValuesInFilterFields();
  renderCards(state.initialArray);
  document
    .querySelectorAll('.filter-gender-button')
    .forEach((button) =>
      button.addEventListener('click', handleFilterByGenderButtonClick)
    );
  document
    .querySelectorAll('.sort-button')
    .forEach((button) =>
      button.addEventListener('click', handleSortButtonClick)
    );

  document
    .getElementById('menu-button')
    .addEventListener('click', handleMenuButtonClick);

  document.getElementById('name-input').addEventListener('input', (event) => {
    handleNameInputChange(event);
  });

  document
    .querySelectorAll('.age-input')
    .forEach((element) =>
      element.addEventListener('input', handleMinAndMaxAgeInput)
    );
});
