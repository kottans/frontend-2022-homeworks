import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/DeamonFire/a-tiny-JS-world
   Web app: https://deamonfire.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
   species: 'dog',
   name: 'Azov',
   gender: 'male',
   hands: 0,
   legs: 4,
   say: 'Glory to Ukraine!'
};

const cat = {
   species: 'cat' ,
   name: 'Izyum',
   gender: 'female',
   hands: 0,
   legs: 4,
   say: 'Glory to heroes!'
};

const woman = {
   species: 'human',
   name: 'Darynka',
   gender: 'female',
   hands: 2,
   legs: 2,
   say: 'Glory to the Nation!'
};

const man = {
   species: 'human',
   name: 'Dmytro',
   gender: 'male',
   hands: 2,
   legs: 2,
   say: 'Death to enemies!'
};

const catWoman = {
   species: 'catHuman',
   name: 'Ania',
   gender: 'female',
   hands: 2,
   legs: 2,
   say: cat.say
};

const habitansWorld = [dog, cat, woman, man, catWoman];
const props = ['species', 'name', 'gender', 'hands', 'legs', 'say'];

// ======== OUTPUT ========
const residents = habitansWorld
  .map((habitans) => props.map((prop) => habitans[prop]).join("; "))
  .join("<br>");
print(residents, "div");
