export function genderFilter(personsData, value) {
  switch (value) {
    case "male":
      return personsData.filter((person) => person.gender === "male");
    case "female":
      return personsData.filter((person) => person.gender === "female");
    case "all":
      return personsData;
  }
}

export function filterSurname(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    return person.name.last.search(searchOptions) !== -1;
  });
}

export function filterFirstName(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    return person.name.first.search(searchOptions) !== -1;
  });
}

export function filterExtendedName(persons, value) {
  return persons.filter((person) =>
    (person.name.first + person.name.last)
      .toLowerCase()
      .includes(value.toLowerCase())
  );
}

export function filterAge(persons, value) {
  const searchOptions = new RegExp("^" + value, "i");
  return persons.filter((person) => {
    return person.dob.age.toString().search(searchOptions) !== -1;
  });
}
