const boxForm = document.querySelector(".main-box-left-panel");
const boxFriends = document.querySelector(".main-box-list");
const searchForm = document.querySelector("#search-form");
const filterNameAgeForm = document.querySelector("#filter-name-age-form");
const filterNameInputs = document.querySelectorAll(".filter-name-input");
const filterAgeInputs = document.querySelectorAll(".filter-age-input");
const filterGenderInputs = document.querySelectorAll(".filter-gender-input");
const filterGenderForm = document.querySelector("#filter-gender-form");
const inputNames = document.getElementsByName("nameSortInput");
const inputAge = document.getElementsByName("ageInput");

export {
  boxForm,
  boxFriends,
  searchForm,
  filterNameAgeForm,
  filterNameInputs,
  filterAgeInputs,
  filterGenderInputs,
  filterGenderForm,
  inputNames,
  inputAge,
};
