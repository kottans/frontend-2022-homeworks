// ======== OBJECTS DEFINITIONS ========

const human = {
   species: 'human',
   legs: 2,
   hands: 2
};

const animal = {
   species: 'animal',
   legs: 4,
   hands: 0
};

const woman = {
   ...human,
   name: 'Lilu',
   gender: 'female',
   saying: 'Aloha!'
};

const man = {
   ...human,
   name: 'Bob',
   gender: 'male',
   saying: 'Have a nice day!'
};

const dog = {
   ...animal,
   name: 'Mira',
   gender: 'female',
   saying: 'Woof-woof!'
};

const cat = {
   ...animal,
   name: 'Tyson',
   gender: 'male',
   saying: 'Meow-meow!'
};

const inhabitants = [
   woman,
   man,
   dog,
   cat
];

function getInhabitantInfo(inhabitant) {
   return `${inhabitant.species}; ${inhabitant.name}; ${inhabitant.gender}; ${inhabitant.legs}; ${inhabitant.hands}; ${inhabitant.saying}`;
}

// ======== OUTPUT ========

inhabitants.forEach((inhabitant) =>
   print(getInhabitantInfo(inhabitant)))
