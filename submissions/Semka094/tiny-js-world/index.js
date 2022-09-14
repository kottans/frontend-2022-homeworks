import {print} from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Semka094/a-tiny-JS-world
   Web app: https://semka094.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const knopa = {
  name: 'Knopa',
  gender: 'female',
  species: 'animal',
  legs: 4,
  hands: undefined,
  saying: "miay!"
};

const bubluk = {
  name: 'Bubluk',
  gender: 'male',
  species: 'animal',
  hands: undefined,
  legs: 4,
  saying: "woof-woof!"
};

const olena = {
  name: 'Olena',
  saying: 'Hello there',
  gender: 'female',
  species: 'human',
  hands: 2,
  legs: 2,
};

const kostia = {
  name: 'Kostia',
  saying: 'Hi, folks!',
  gender: 'male',
  species: 'human',
  hands: 2,
  legs: 2,
};

const inhabitants = [knopa, bubluk, olena, kostia];
const inhabitantKeys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

inhabitants.forEach((inhabitant) => {
  print(
    inhabitantKeys.map((key) => inhabitant[key] ?? 'N/A').join('; ')
  )
});
