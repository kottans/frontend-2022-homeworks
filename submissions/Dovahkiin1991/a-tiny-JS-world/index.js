import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Dovahkiin1991/a-tiny-JS-world
   Web app: https://dovahkiin1991.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
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
    name: 'Simba',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: 'meuw-meuw!'
};

const woman = {
    species: 'woman',
    name: 'Katie',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hey, my name is Katie!'
};

const man = {
    species: 'man',
    name: 'Alex',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hey, my name is Alex!'
};

// ======== OUTPUT ========
const inhabitantsList = [dog, cat, woman, man];

const inhabitantKeys = ["species", "name", "gender", "legs", "hands", "saying"];

inhabitantsList.map((inhabitant) => {
   print(inhabitantKeys.map((key) => inhabitant[key]).join(', '), 'div');
});