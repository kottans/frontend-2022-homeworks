const url = 'https://randomuser.me/api';
const numberOfPeople = 60;
const fields = ['gender', 'name', 'cell', 'dob', 'email', 'picture'];
export const fetchPeople = async () => {
  const peopleArray = [];
  try {
    const response = await fetch(
      `${url}/?results=${numberOfPeople}&inc=${fields.join()}&noinfo`
    );
    const data = await response.json();
    data.results.forEach((people) =>
      peopleArray.push({
        age: people.dob.age,
        gender: people.gender,
        title: people.name.title,
        name: `${people.name.first} ${people.name.last}`,
        phone: people.cell,
        email: people.email,
        picture: people.picture.medium,
      })
    );
  } catch (error) {
    console.log(error);
  }
  return peopleArray;
};
