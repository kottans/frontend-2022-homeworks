const sort = {
  byAgeIncrease(persons) {
    persons.sort(
      (firstPerson, secondPerson) => firstPerson.dob.age - secondPerson.dob.age
    );
  },
  byAgeDecrease(persons) {
    persons.sort(
      (firstPerson, secondPerson) => secondPerson.dob.age - firstPerson.dob.age
    );
  },
  byAlphabet(persons) {
    persons.sort((firstPerson, secondPerson) => {
      if (firstPerson.name.last < secondPerson.name.last) {
        return -1;
      }
      if (firstPerson.name.last > secondPerson.name.last) {
        return 1;
      }
      return 0;
    });
  },
  byAlphabetReverse(persons) {
    persons.sort((firstPerson, secondPerson) => {
      if (firstPerson.name.last > secondPerson.name.last) {
        return -1;
      }
      if (firstPerson.name.last < secondPerson.name.last) {
        return 1;
      }
      return 0;
    });
  },
};

export function sortPersons(persons, value) {
  const personsCopied = [...persons];
  switch (value) {
    case "increase":
      sort.byAgeIncrease(personsCopied);
      break;
    case "decrease":
      sort.byAgeDecrease(personsCopied);
      break;
    case "alphabet":
      sort.byAlphabet(personsCopied);
      break;
    case "alphabet__reverse":
      sort.byAlphabetReverse(personsCopied);
      break;
  }
  return personsCopied;
}
