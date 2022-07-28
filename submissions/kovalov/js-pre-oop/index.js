// const catWoman = Object.create(cat);
// catWoman.name = 'Cat-woman';
// catWoman.species = 'human';
// catWoman.gender = 'female';
// catWoman.legs = 2;
// catWoman.hands = 2;

// const inhabitants = [dog, cat, woman, man, catWoman];

// inhabitants.forEach((item) => print(Object.values(item).join('; ')));

// const dog = new Map();

function createInhabitant(obj) {
  return new Map(Object.entries(obj));
}

const dog = createInhabitant({
  species: 'dog',
  name: 'Patron',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof',
});

const cat = createInhabitant({
  species: 'cat',
  name: 'Murzyk',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow',
});

const woman = createInhabitant({
  species: 'human',
  name: 'Anna',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'hello',
});

const man = createInhabitant({
  species: 'human',
  name: 'Joey',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'How you doin?',
});

const inhabitants = [dog, cat, woman, man];

inhabitants
  .map((item) => Array.from(item.values()))
  .forEach((item) => print(item.join('; ')));
