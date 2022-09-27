import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
  Complete the below for code reviewers' convenience:

  Code repository: _https://github.com/Halv27/a-tiny-JS-world_
  Web app: _https://halv27.github.io/a-tiny-JS-world/_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const INHABITANT = {
  properties: ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'],
  species: {
    human: 'human',
    dog: 'dog',
    cat: 'cat',
  },
  gender: {
    male: 'male',
    female: 'female',
  },
};
const man = {
  species: INHABITANT.species.human,
  name: 'Sheldon',
  gender: INHABITANT.gender.male,
  legs: 2,
  hands: 2,
  saying: 'Bazinga!',
  friends: ['Penny', 'Sarah'],
};
const woman = {
  species: INHABITANT.species.human,
  name: 'Penny',
  gender: INHABITANT.gender.female,
  legs: 2,
  hands: 2,
  saying: 'Hi, Sheldon!',
  friends: ['Sheldon', 'Rex', 'Charlie'],
};
const dog = {
  species: INHABITANT.species.dog,
  name: 'Rex',
  gender: INHABITANT.gender.male,
  legs: 4,
  hands: 0,
  saying: 'Woof-woof!',
  friends: ['Penny', 'Charlie'],
};
const cat = {
  species: INHABITANT.species.cat,
  name: 'Charlie',
  gender: INHABITANT.gender.female,
  legs: 4,
  hands: 0,
  saying: 'Meow-meow!',
  friends: ['Penny', 'Rex', 'Sarah'],
};
const catWoman = {
  species: INHABITANT.species.human,
  name: 'Sarah',
  gender: INHABITANT.gender.female,
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: ['Sheldon', 'Charlie'],
};
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
  function convertToString(inhabitant) {
    return INHABITANT.properties.map(prop => `${inhabitant[prop]}`).join('; ');
  }
  const worldInhabitans = [man, woman, dog, cat, catWoman];
  worldInhabitans
  .map(inhabitant => convertToString(inhabitant))
  .forEach(inhabitantDescription => print(inhabitantDescription));

