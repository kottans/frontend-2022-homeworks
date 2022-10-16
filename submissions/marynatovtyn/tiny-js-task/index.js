import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/marynatovtyn/a-tiny-JS-world
   Web app: https://marynatovtyn.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
   species: 'dog',
   name: 'Rex',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!',
   friendly: 'Roy, Willow'
 };

 const cat = {
   species: 'cat',
   name: 'Willow',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow!',
   friendly: 'none'
 };

 const woman = {
   species: 'human',
   name: 'Lily',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hi, Roy!',
   friendly: 'Willow, Rex, Roy'
 };

 const man = {
   species: 'human',
   name: 'Roy',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: "Hey, Lily!",
   friendly: 'Rex, Lily'
 };

 const catWoman = {
   species: 'cat-human',
   name: 'Kira',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friendly: 'Willow, Lily'
 };
// ======== OUTPUT ========

[dog, cat, woman, man, catWoman].forEach((inhabitant) => 
   print(inhabitant.species + '; ' + `<strong>${inhabitant.name}</strong>` + '; ' + inhabitant.gender + '; ' + inhabitant.legs + '; ' + inhabitant.hands + '; ' + `<em>${inhabitant.saying}</em>` + '; ' + inhabitant.friendly)
);
