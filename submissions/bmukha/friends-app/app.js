import {
  handleMenuButtonClick,
  handleFilterByGenderButtonClick,
  handleSortButtonClick,
  handleNameInputChange,
  handleMinAndMaxAgeInput,
} from './eventHandlers.js';

import { renderCards, renderSpinner } from './renderers.js';

import { fetchPeople } from './fetchPeople.js';

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
      'name-ascending': (item1, item2) =>
        item1.name < item2.name ? -1 : item1.name === item2.name ? 0 : 1,
      'name-descending': (item1, item2) =>
        item1.name > item2.name ? -1 : item1.name === item2.name ? 0 : 1,
      'age-ascending': (item1, item2) =>
        +item1.age < +item2.age ? -1 : item1.age === item2.age ? 0 : 1,
      'age-descending': (item1, item2) =>
        +item1.age > +item2.age ? -1 : item1.age === item2.age ? 0 : 1,
    };

    this.arrayToRender = this.initialArray
      .filter((item) => {
        return (
          genderOptions[this.filter.gender].includes(item.gender) &&
          item.age >= this.filter.minAge &&
          item.age <= this.filter.maxAge &&
          item.name.toLowerCase().includes(this.filter.name.toLowerCase())
        );
      })
      .sort(sortingOptions[this.sort]);
  },
};

const setMinAndMaxAgeInStateFromArrayOfPeople = (array) => {
  state.filter.maxAge = state.filter.minAge = array[0].age;
  for (let i = 1; i < array.length; i++) {
    if (array[i].age < state.filter.minAge) {
      state.filter.minAge = array[i].age;
      continue;
    }
    if (array[i].age > state.filter.maxAge) {
      state.filter.maxAge = array[i].age;
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
  state.initialArray = await fetchPeople();
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
