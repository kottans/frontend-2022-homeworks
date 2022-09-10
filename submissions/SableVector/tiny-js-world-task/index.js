import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here


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


const inhabitants = {
   dog: {
      species: 'dog',
      legs: 4,
      hands: 0,
      name: 'Rex',
      gender: 'male',
      saying: 'woof-woof!'
   },
   cat: {
      species: 'cat',
      legs: 4,
      hands: 0,
      name: 'Roxi',
      gender: 'famale',
      saying: 'meow-meow!'
   },
   woman: {
      species: 'woman',
      hands: 2,
      legs: 2,
      name: 'Jenny',
      gender: 'famele',
      saying: 'Hello Jenny'
   },
   man: {
      species: 'man',
      hands: 2,
      legs: 2,
      name: 'John',
      gender: 'famele',
      saying: 'Hello John'
   },
   catwoman: {
      species: 'cat-woman',
      legs: 2,
      hands: 2,
      name: 'Jesika',
      gender: 'female',
   }
}

inhabitants.catwoman.saying = inhabitants.cat.saying;

for (let person in inhabitants) {
   const message = getPersonData(inhabitants[person]);

   print(message, 'h2');
}

function getPersonData(person) {
   let str = '';

   for (let option in person) {
      str += person[option] + '; ';
   }

   return str;
}