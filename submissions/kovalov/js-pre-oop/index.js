const dog = {
  name: 'Patron',
  gender: 'male',
  species: 'dog',
  legs: 4,
  hands: 0,
  saying: 'woof',
};

const cat = {
  name: 'Murzyk',
  gender: 'male',
  species: 'cat',
  legs: 4,
  hands: 0,
  saying: 'meow',
};

const woman = {
  name: 'Anna',
  gender: 'female',
  species: 'human',
  legs: 2,
  hands: 2,
  saying: 'hello',
};

const man = {
  name: 'Joey',
  gender: 'male',
  species: 'human',
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

inhabitants.forEach((item) => print(Object.values(item).join('; ')));
