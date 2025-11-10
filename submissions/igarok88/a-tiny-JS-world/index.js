import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

   Code repository: https://github.com/igarok88/a-tiny-JS-world
   Web app: https://igarok88.github.io/a-tiny-JS-world/
   */

const dog = {
  species: "dog",
  name: "Sharik",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};
const cat = {
  species: "cat",
  name: "Mirzik",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "moow-moow!",
};
const woman = {
  species: "woman",
  name: "Yulia",
  gender: "famele",
  legs: 2,
  hands: 2,
  saying: "Hi Ihor!",
};
const man = {
  species: "man",
  name: "Ihor",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hello Yulia!",
};

const inhabitants = [dog, cat, woman, man];
const inhabitantKeys = ["species", "name", "gender", "legs", "hands", "saying"];

inhabitants.forEach((obj) => {
  print(inhabitantKeys.map((key) => obj[key]).join("; "));
});
