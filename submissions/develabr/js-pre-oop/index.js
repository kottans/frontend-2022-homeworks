const cat = {
  species: 'cat',
  name: 'Kitty',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow!',
  friends: "cats don't needs any friends",
};

const catWoman = Object.create(cat);
catWoman.species = 'human';
catWoman.name = 'Catwoman';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;
catWoman.friends = cat.name;

const woman = {
  species: 'human',
  name: 'Selina Kyle',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hello, Batman. Do you know Catwoman?',
  friends: [cat.name, catWoman.name],
};

const man = {
  species: 'human',
  name: 'Bruce Wayne',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: "Hi! I'm Batman",
  friends: [catWoman.name, woman.name],
};

const dog = {
  species: 'dog',
  name: 'Spike',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!',
  friends: [woman.name, man.name],
};

const persons = [dog, cat, man, woman, catWoman];

const attributes = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
  'friends',
];

function personInfoItems(obj) {
  return attributes.map((key) => obj[key]).join('; ') + '.';
}

persons.map((item) => print(personInfoItems(item)));
