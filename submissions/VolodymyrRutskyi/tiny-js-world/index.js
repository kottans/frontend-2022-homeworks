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
const dog = {
   species: 'dog',
   name: 'Timmy',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
   };
   
const cat = {
   species: 'cat',
   name: 'Mars',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'meow-meow!'
   };

const woman = {
   species: 'woman',
   name: 'Sarah',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello, my name is Sarah!'
   };

const man = {
   species: 'man',
   name: 'Kevin',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello, my name is Kevin'
   };

const catWoman = Object.create(cat);
catWoman.name = 'Cat-woman';
catWoman.species = 'human';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const inhabitants = [dog, cat, woman, man, catWoman];

const inhabitantPropertyNames = [
   'species',
   'name',
   'gender',
   'legs',
   'hands',
   'saying',
 ];

const inhabitantDetails = inhabitants.map((inhabitant) =>
 inhabitantPropertyNames.map((propName) => inhabitant[propName])
); 

inhabitantDetails.forEach((inhabitant) =>
  print(inhabitant.join('; '))
);