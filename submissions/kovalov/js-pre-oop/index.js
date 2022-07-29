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

const catWoman = {
  ...cat,
  name: 'Catwoman',
  species: 'human',
  gender: 'female',
  legs: 2,
  hands: 2,
};

const inhabitants = [dog, cat, woman, man, catWoman];

const keys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

const details = inhabitants.map((item) => {
  return keys.map((key) => item[key]);
});

details.forEach((item) => print(item.join('; ')));
