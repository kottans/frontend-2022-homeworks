import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   person: 'dog',
   name: 'Buran',
   gender: 'male',
   legs: 4,
   hands: 0,
   voice: 'woof!'
};

const cat = {
   person: 'cat',
   name: 'Yana',
   gender: 'female',
   legs: 4,
   hands: 0,
   voice: 'meow!'
};

const man = {
   person: 'human',
   name: 'Viktor',
   gender: 'male',
   legs: 2,
   hands: 2,
   voice: 'Congratulations!'
};

const woman = {
   person: 'human',
   name: 'Olena',
   gender: 'female',
   legs: 2,
   hands: 2,
   voice: 'Slava Ukraine!'
};

const catWoman = Object.create(cat);
catWoman.person = 'Cat-Woman';
catWoman.name = 'Selina Kyle';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const fictionalWorld = [dog, cat, man, woman, catWoman];
const propertyPersonage = ['person', 'name', 'gender', 'legs', 'hands', 'voice'];

fictionalWorld.map(personage => print(propertyPersonage.map(property => personage[property]).join(' - ')));
