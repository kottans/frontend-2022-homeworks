import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/natata-tutorial/a-tiny-JS-world
   Web app: https://natata-tutorial.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Jack',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
};
const cat = {
   species: 'cat',
   name: 'Lili',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow!'
};
const woman = {
   species: 'woman',
   name: 'Nata',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'hi!'
};
const man = {
   species: 'man',
   name: 'Oleg',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'hey!',
   friends: cat.name,
};
const catWoman = {
   species: 'cat-woman',
   name: 'Cat Nata',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: cat.saying,
};
// ======== OUTPUT ========


const population = [cat, dog, man, woman, catWoman];
const objFields = ["species", "name", "gender", "legs", "hands", "saying", "friends"];

population.map((soul) => {
   print(objFields.map(key => key + ": " + soul[key] + "; ").join(" "));
}

);
