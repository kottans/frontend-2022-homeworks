/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   
   Code repository: https://github.com/NadiaVorontsova/a-tiny-JS-world
   Web app: https://nadiavorontsova.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
   species: 'dog',
   name: 'Ben',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof'
};

const cat = {
   species: 'cat',
   name: 'Sarah',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow^^'
};

const man = {
   species: 'human',
   name: 'Yura',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello everybody!',
   friends: 'Oksana'
};

const woman = {
   species: 'human',
   name: 'Oksana',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello everybody!',
   friends: 'Yura'
};

const catWoman = {
   species: 'cat-human',
   name: 'Halle Berry',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying
};

// ======== OUTPUT ========

const inhabitancy = [dog, cat, man, woman, catWoman];

function checkFriends(inhabitant, inProp) {
   if (inhabitant.friends) {
      return inhabitant.friends;
   } else {
      return 'no friends';
   }
}

function printInhabitancy(inhabitant) {
   return `${inhabitant.species}; ${inhabitant.name}; ${inhabitant.gender}; ${inhabitant.legs}; ${inhabitant.hands}; ${inhabitant.saying}; ${checkFriends(inhabitant)};`;
}

inhabitancy.map((inhabitant) => print(printInhabitancy(inhabitant), 'div'));
