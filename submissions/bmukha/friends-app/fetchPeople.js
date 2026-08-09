const fetchPeople = async () => {
  const url = 'https://randomuser.me/api';
  const numberOfPeople = 60;
  const fields = ['gender', 'name', 'cell', 'dob', 'email', 'picture'];
  try {
    return await fetch(
      `${url}/?results=${numberOfPeople}&inc=${fields.join()}&noinfo`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getPeopleFromResponse = async () => {
  const responseFromAPI = await fetchPeople();
  const responseObject = await responseFromAPI.json();
  const people = responseObject.results.map((person) => {
    return {
      age: person.dob.age,
      gender: person.gender,
      title: person.name.title,
      name: `${person.name.first} ${person.name.last}`,
      phone: person.cell,
      email: person.email,
      picture: person.picture.medium,
    };
  });
  return people;
};
