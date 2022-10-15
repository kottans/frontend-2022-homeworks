import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const data = {
   man: {
      id: 0,
      hands: 2,
      legs: 2,
      name: 'George',
      species: 'human',
      gender: 'male',
      say: 'Hello world!',
      friends: [1, 2],
   },
   woman: {
      id: 1,
      hands: 2,
      legs: 2,
      name: 'Samantha',
      gender: 'female',
      say: 'Hi, I\'m Sam',
      friends: [0, 3],
   },
   cat: {
      id: 2,
      legs: 4,
      name: 'Tom',
      gender: 'male animal',
      species: 'cat',
      say: 'meow-meow',
   },
   dog: {
      id: 3,
      legs: 4,
      name: 'Allegra',
      gender: 'female animal',
      species: 'dog',
      say: 'woof-woof',
   },
   catWoman: {
      id: 4,
      hands: 2,
      legs: 2,
      name: 'Anne',
      gender: 'female',
      species: 'human animal',
      friends: [0, 1, 2],
   }
};
data.catWoman.say = data.cat.say;
data.woman.species = data.man.species;

const sequences = ['species', 'name', 'gender', 'hands', 'legs', 'say', 'friends'];
const creatures = ['man', 'woman', 'cat', 'dog', 'catWoman'];

creatures.forEach(value => {
   let creature = data[value];

   let message = sequences.map(creatureProperty => {
      let value = '';
      
      switch(creatureProperty) {
         case 'name':
            value = `<strong>${creature[creatureProperty]}</strong>`;
            break;
         case 'say':
            value = `<em>${creature[creatureProperty]}</em>`;
            break;
         case 'friends':
            if(creature[creatureProperty]) {
               value = getFriends(creature[creatureProperty]);
            }
            break;
         case 'hands':
            value = creature[creatureProperty] | 0;
            break;
         default:
            value = creature[creatureProperty];
      }

      return value;

   }).join('; ');

   print(message);
});

function getFriends(friendsId) {
   return friendsId.map(id => {
      const filteredCreatures = creatures.filter(creature => id === data[creature]['id'])[0];
      return data[filteredCreatures]['name'];

   }).join(', ');
}

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
