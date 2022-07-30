const dog = {
  species: 'dog',
  name: 'Patron',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof',
};

const cat = {
  species: 'cat',
  name: 'Murzyk',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow',
};

const woman = {
  species: 'human',
  name: 'Anna',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'hello',
};

const man = {
  species: 'human',
  name: 'Joey',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'How you doin?',
};

const catWoman = Object.create(cat);
catWoman.name = 'Cat-woman';
catWoman.species = 'human';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const inhabitants = [dog, cat, woman, man, catWoman];

const inhabitantPropertyNames = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
];

const details = inhabitants.map((inhabitant) =>
  inhabitantPropertyNames.map((propName) => inhabitant[propName])
);

inhabitantDetails.forEach((inhabitant) =>
  print(inhabitant.join('; '))
);
