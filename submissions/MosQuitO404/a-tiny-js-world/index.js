import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/MosQuitO404/a-tiny-JS-world
   Web app: https://mosquito404.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const inhabitants = [

   {species: 'dog',
   name: 'Bayraktar',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Death to the enemies!'},
  
   {species: 'cat',
   name: 'Javelina',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'Glory to the Nation!'},
 
   {species: 'human',
   name: 'Orest',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Glory to Ukraine!'},

   {species: 'human',
   name: 'Marichka',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Glory to Heroes!'}

];

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

   const inhabProp = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

   print(inhabitants.map(obj => inhabProp.map(elem => obj[elem]).join('; ')).join('\n'));
   
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
