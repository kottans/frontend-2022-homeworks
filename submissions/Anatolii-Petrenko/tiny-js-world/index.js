import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Anatolii-Petrenko/a-tiny-JS-world
   Web app: https://anatolii-petrenko.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const man = {
  species: "human",
  name: "Antony",
  gender: "male",
  hands: 2,
  legs: 2,
  saying: "Hi Bro!",
};

const woman = {
  species: "human",
  name: "Jeeny",
  gender: "female",
  hands: 2,
  legs: 2,
  saying: "Hello! How it's going?",
};

const dog = {
  species: "dog",
  name: "Toby",
  gender: "male",
  hands: 0,
  legs: 4,
  saying: "Woof-Woof!",
};

const cat = {
  species: "cat",
  name: "Bella",
  gender: "female",
  hands: 0,
  legs: 4,
  saying: "Meow!",
};

const catWoman = {
  species: "human",
  name: "JeenyCat",
  gender: "female",
  hands: 2,
  legs: 2,
  saying: cat.saying,
};
// ======== OUTPUT ========
const inhabitants = [man, woman, dog, cat, catWoman];
const inhabitantsKeys = [
  "species",
  "name",
  "gender",
  "hands",
  "legs",
  "saying",
];
inhabitants.map((inhabitant) => {
  print(inhabitantsKeys.map((key) => key + ":" + inhabitant[key]).join("\n"));
});
