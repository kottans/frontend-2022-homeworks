import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/D1telo/a-tiny-JS-world/blob/master/index.js
   Web app: https://d1telo.github.io/tiny-js/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: 'dog',
   name: 'Toby',
   gender: 'male',
   legs: 4,
   hands: null,
   voice: 'woof-woof!'
};

const cat = {
   species: 'cat',
   name: 'Tom',
   gender: 'female',
   legs: 4,
   hands: null,
   voice: 'meow-meow!'
};

const man = {
   species: 'human',
   name: 'Denys',
   gender: 'male',
   legs: 2,
   hands: 2,
   voice: 'Glory Ukraine!'
};

const woman = {
   species: 'human',
   name: 'Anna',
   gender: 'female',
   legs: 2,
   hands: 2,
   voice: 'Support Ukraine!'
};

const catWoman = Object.create(cat);
catWoman.species = 'CatWoman';
catWoman.name = 'Jesica';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const speciesAll = [dog, cat, man, woman, catWoman];
const qualityPersonage = ['species', 'name', 'gender', 'legs', 'hands', 'voice'];

speciesAll.map(personage => print(qualityPersonage.map(quality => personage[quality]).join(' - ')));

