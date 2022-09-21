import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/another96/a-tiny-JS-world
   Web app: https://another96.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
   species: 'dog',
   name: 'Toby',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
};
const cat = {
   species: 'cat',
   name: 'Garfield',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow'
};

const man = {
   species: 'human',
   name: 'Ted',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'My code has no errors'
};

const woman = {
   species: 'human',
   name: 'Jennifer',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'I found errors in your code'
};

// ======== OUTPUT ========
const myCreatures = [dog, cat, man, woman];
const objectKeys = ["species", "name", "gender", "legs", "hands", "saying"];
myCreatures.forEach((creature) => {
   print(objectKeys.map((keys) => creature[keys]).join('; '));
});
