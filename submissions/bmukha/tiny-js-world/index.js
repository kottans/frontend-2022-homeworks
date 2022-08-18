/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bmukha/a-tiny-JS-world
   Web app: https://bmukha.github.io/a-tiny-JS-world/
   */

const dog = {
  species: 'dog',
  name: 'Beethoven',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof',
  friends: ['Clyde'],
};

const cat = {
  species: 'cat',
  name: 'Grizabella',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow',
  friends: ['Bonnie'],
};

const man = {
  species: 'human',
  name: 'Clyde',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Get rich or die trying!',
  friends: ['Bonnie', 'Beethoven'],
};

const woman = {
  species: 'human',
  name: 'Bonnie',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'I have the right to not answer a questions!',
  friends: ['Clyde', 'Grizabella'],
};

const catwoman = {
  species: 'human',
  name: 'Selina',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: [],
};

const characters = [dog, cat, man, woman, catwoman];

const props = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
  'friends',
];

characters.forEach((character) => {
  print(
    props
      .map((prop) =>
        Array.isArray(character[prop])
          ? character[prop].join(', ')
          : character[prop]
      )
      .filter((value) => Boolean(value))
      .join('; ')
  );
});
