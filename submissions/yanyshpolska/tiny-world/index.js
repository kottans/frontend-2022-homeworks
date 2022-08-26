/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Yanyshpolska/a-tiny-JS-world
   Web app: https://yanyshpolska.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
  species: "dog",
  name: "Bobik",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};
const cat = {
  species: "cat",
  name: "Flow",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "meow!",
};
const woman = {
  species: "human",
  name: "Ann",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Hello, my darling!",
};
const womanCat = {
  species: "human",
  name: "Jess",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
};
const man = {
  species: "human",
  name: "Tom",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hi there!",
};

const inhabitants = [dog, cat, woman, womanCat, man];
const keys = ["species", "name", "gender", "legs", "hands", "saying"];

inhabitants.map((inhabitant) => {
  print(keys.map((key) => inhabitant[key]).join(", "));
});
