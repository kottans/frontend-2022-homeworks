export const handleMenuButtonClick = ({ target }) => {
  target.src.includes('bars-solid.svg')
    ? target.setAttribute('src', './img/xmark-solid.svg')
    : target.setAttribute('src', './img/bars-solid.svg');
  document.getElementById('aside').classList.toggle('hidden');
};

const toggleFocusOfGroupOfButtons = (currentButton, buttonClass) => {
  document.querySelectorAll(`.${buttonClass}`).forEach((button) => {
    if (currentButton === button) {
      button.classList.add('is-pressed');
    } else {
      button.classList.remove('is-pressed');
    }
  });
};

const handleGroupOfButtons = ({ target }, buttonClass, state) => {
  const currentButton =
    target.tagName === 'IMG' ? target.parentElement : target;
  if (currentButton.classList.contains('is-pressed')) return;
  toggleFocusOfGroupOfButtons(currentButton, buttonClass);
  const value = currentButton.dataset.type.split(' ');
  if (value[0] === 'filter') {
    state.filter[value[1]] = value[2];
  }
  if (value[0] === 'sort') {
    state.sort = value[1];
  }
};

export const handleFilterByGenderButtonClick = (target, state) => {
  handleGroupOfButtons(target, 'filter-gender-button', state);
};

export const handleSortButtonClick = (target, state) => {
  handleGroupOfButtons(target, 'sort-button', state);
};

export const handleResetButtonClick = (state) => {
  const defaultGenderButton = document.querySelector(
    `[data-type="filter gender all"]`
  );
  toggleFocusOfGroupOfButtons(defaultGenderButton, 'filter-gender-button');
  state.filter.gender = 'all';

  const minAgeField = document.getElementById('min-age-input');
  minAgeField.value = state.filter.minAge = minAgeField.min;

  const maxAgeField = document.getElementById('max-age-input');
  maxAgeField.value = state.filter.maxAge = maxAgeField.max;

  const nameInput = document.getElementById('name-input');
  nameInput.value = state.filter.name = '';

  const defaultSortButton = document.querySelector(
    `[data-type="sort initial"]`
  );
  toggleFocusOfGroupOfButtons(defaultSortButton, 'sort-button');
  state.sort = 'initial';
};

export const handleNameInputChange = ({ target }, state) => {
  state.filter.name = target.value;
};

export const handleMinAndMaxAgeInput = ({ target }, state) => {
  const current = target.id.split('-')[0];
  const opposite = current === 'max' ? 'min' : 'max';
  const newValue = target.value;
  let valueToUse;
  if (newValue < target.min) {
    valueToUse = target.min;
  } else if (newValue > target.max) {
    valueToUse = target.max;
  } else {
    valueToUse = newValue;
  }
  target.setAttribute('value', valueToUse);
  document
    .getElementById(`${opposite}-age-input`)
    .setAttribute(`${current}`, valueToUse);
  state.filter[`${current}Age`] = valueToUse;
};
