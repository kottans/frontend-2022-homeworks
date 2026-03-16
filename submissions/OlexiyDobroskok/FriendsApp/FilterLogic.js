import { validationOfEnteredData } from "./Service.js";
import { getValueInputField } from "./Service.js";
import { getValueRadioBtn } from "./Service.js";
import { sortPersons } from "./Sorting.js";
import * as filters from "./Filters.js";
import { updatePersonsList, updatePageList } from "./Render.js";

export function showFilteredPersons(persons) {
  const nameFilter = document.querySelector(".name__filter");
  const ageFilter = document.querySelector(".age__filter__by__number");
  validationOfEnteredData(nameFilter, "[^a-z]");
  validationOfEnteredData(ageFilter, "[^0-9]");
  let filteredPersonsByAge;
  let filteredPersonsByName;
  let filteredPersonsByGender;
  const inputValueAge = getValueInputField("age__filter__by__number");
  const inputValueName = getValueInputField("name__filter");
  const filterMethodValue = document.querySelector("#filter__method").value;
  if (inputValueAge !== "" && inputValueName !== "") {
    filteredPersonsByName =
      filterMethodValue === "extended"
        ? filters.filterExtendedName(persons, inputValueName)
        : filterMethodValue === "surname"
        ? filters.filterSurname(persons, inputValueName)
        : filters.filterFirstName(persons, inputValueName);
    filteredPersonsByAge = filters.filterAge(
      filteredPersonsByName,
      inputValueAge
    );
    filteredPersonsByGender = filters.genderFilter(
      filteredPersonsByAge,
      getValueRadioBtn("gender__filter")
    );
  } else if (inputValueName !== "") {
    filteredPersonsByName =
      filterMethodValue === "extended"
        ? filters.filterExtendedName(persons, inputValueName)
        : filterMethodValue === "surname"
        ? filters.filterSurname(persons, inputValueName)
        : filters.filterFirstName(persons, inputValueName);
    filteredPersonsByGender = filters.genderFilter(
      filteredPersonsByName,
      getValueRadioBtn("gender__filter")
    );
  } else if (inputValueAge !== "") {
    filteredPersonsByAge = filters.filterAge(persons, inputValueAge);
    filteredPersonsByGender = filters.genderFilter(
      filteredPersonsByAge,
      getValueRadioBtn("gender__filter")
    );
  } else {
    filteredPersonsByGender = filters.genderFilter(
      persons,
      getValueRadioBtn("gender__filter")
    );
  }
  const sortedPersons = sortPersons(
    filteredPersonsByGender,
    getValueRadioBtn("sort")
  );
  updatePageList(sortedPersons);
  updatePersonsList(sortedPersons);
}
