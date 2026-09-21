import { fetchFriends } from "./fetchFriends.js";
import {
  sortByName,
  sortByGender,
  sortNameByAlphabet,
  sortByAge,
} from "./filters.js";
import { renderFriends } from "./renders.js";
import {
  boxForm,
  searchForm,
  filterNameAgeForm,
  filterNameInputs,
  filterAgeInputs,
  filterGenderInputs,
  filterGenderForm,
  inputNames,
  inputAge,
} from "./refs.js";
import { addClassActive } from "./styles.js";

const listFriend = await fetchFriends();
let sortedFriends = [];

renderFriends(listFriend);

const onFilter = (friends) => {
  const valueNameInput = searchForm.nameInput.value;
  const valueGenderInput = filterGenderForm.genderInput.value;
  const valueSortNameInput = filterNameAgeForm.nameSortInput.value;
  const valueAgeInput = filterNameAgeForm.ageInput.value;

  const sortedByName = sortByName(friends, valueNameInput);
  sortedFriends = sortedByName;

  const sortedByGender = sortByGender(sortedFriends, valueGenderInput);
  sortedFriends = sortedByGender;

  const sortedNameByAlphabet = sortNameByAlphabet(
    sortedFriends,
    valueSortNameInput
  );
  sortedFriends = sortedNameByAlphabet;

  const sortedByAge = sortByAge(sortedFriends, valueAgeInput);
  sortedFriends = sortedByAge;

  renderFriends(sortedFriends);
};

const onClick = ({ target }) => {
  inputNames.forEach((input) => {
    input.value === target.value
      ? (input.checked = true)
      : (input.checked = false);
  });

  inputAge.forEach((input) => {
    input.value === target.value
      ? (input.checked = true)
      : (input.checked = false);
  });

  addClassActive(filterNameInputs);
  addClassActive(filterAgeInputs);
};

boxForm.addEventListener("input", () => onFilter(listFriend));
filterNameAgeForm.addEventListener("click", (e) => onClick(e));
filterGenderForm.addEventListener("click", () =>
  addClassActive(filterGenderInputs)
);
