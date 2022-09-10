import { print } from './js/lib.js';

const dog = {
   species: 'dog',
   name: 'Ozzy',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Woof-woof!',
};

const cat = {
   species: 'cat',
   name: 'Debbie',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'Meeeow!',
};

const women = {
   species: 'human',
   name: 'Gwen',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hi there!'
};

const man = {
   species: 'human',
   name: 'David',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'What\'s up?'
};

const catWomen = {
   species: 'cat-human',
   name: 'Dita',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying
};

const inhabitants = [dog, cat, women, man, catWomen];
const inhabitantsKeys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

inhabitants.forEach(inhabitant => {print(inhabitantsKeys.map(key => inhabitant[key]).join('; '))});
