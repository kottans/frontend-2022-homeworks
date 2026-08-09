import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/TetianaDiachenko/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
  species: "dog",
  name: "Baff",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Woof!",
  friends: ["Muhtar", "Rex", "Bony"]
};

const cat = {
  species: "cat",
  name: "Melka",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "Meow!",
  friends: ["Murka", "Flo", "Gaby"]
};

const woman = {
  species: "human",
  name: "Ann",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Hello, girls!",
  friends: ["Kate", "Tania", "Sofia"]
};

const man = {
  species: "human",
  name: "Nick",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hello, boys!",
  friends: ["Andriy", "Bob", "Jack"]
};

const catWoman = {
  species: "cat",
  name: "Mursia",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: ["Murka", "Flo", "Gaby"]
};

const creatures = [dog, cat, woman, man, catWoman];
const objKeys = ["species", "name", "gender", "legs", "hands", "saying", "friends"];
// ======== OUTPUT ========


creatures.forEach((creature) => {
      print(objKeys.map((keys) => creature[keys]).join("; "));
   });
