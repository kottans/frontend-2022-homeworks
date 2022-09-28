import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers" convenience:

   Code repository: _put repo URL here_
   Web app: _put project"s github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: "dog",
   name: "Rick",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "woof-woof!",
   hair: "brown"
};
const cat = {
   species: "cat",
   name: "Morty",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "mew-mew!",
   hair: "grey"
};
const man = {
   species: "human",
   name: "Greg",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "Hello, world!",
   hair: "blond"
};
const woman = {
   species: "human",
   name: "Greg",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "Hello, world!",
   hair: "red"
};
const catWomen = {
   species: "human",
   name: "Belatris",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
   hair: "brown"
};

// ======== OUTPUT ========

const list = [man, woman, cat, dog, catWomen]

function addInformation(somebody) {
   let result = [];

   for (let i in somebody) {
      result.push(`${i}: ${somebody[i]};`);
   }

   return result.join(' ');
}

list.forEach(inhabitant => print(addInformation(inhabitant)))
