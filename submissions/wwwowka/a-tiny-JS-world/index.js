import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
   const dog = {
      species: 'dog',
      name: 'Life',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'woof-woof!'
    };

    const cat = {
      species: 'cat',
      name: 'Mia',
      gender: 'female',
      legs: 4,
      hands: 0,
      saying: 'meow-yuu'
    };

    const man = {
       species: 'human',
       name: 'Bob',
       gender: 'male',
       legs: 2,
       hands: 2,
       saying: 'Are you ready kids?'
     };

     const woman = {
        species: 'human',
        name: 'Ann',
        gender: 'female',
        legs: 4,
        hands: 0,
        saying: 'Hello!'
      };
      
     const catWoman = Object.create(cat);
     catWoman.species = 'cat-human';
     catWoman.name = 'Selina';
     catWoman.legs = 2;
     catWoman.hands = 2;

     dog.friends = cat.name + ', ' + man.name + ', ' + woman.name + ', ' + catWoman.name;
     cat.friends = '-';
     man.friends = dog.name + ', ' + woman.name;
     woman.friends = cat.name + ', ' + man.name + ', ' + catWoman.name;
    
// ======== OUTPUT ========
const inhabitants = [dog, cat, woman, man, catWoman]
const keys = ["species", "name", "gender", "legs", "hands", "saying", "friends"]

inhabitants.map((inhabitant) =>
    print(keys.map((key) => inhabitant[key]).join("; "))
)

/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

 //Print examples:
 /*  print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
