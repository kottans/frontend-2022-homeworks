import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
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

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
