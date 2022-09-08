/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/YarHadi/a-tiny-JS-world
   Web app: https://yarhadi.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: "dog",
   name: "Mitsu",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "Woof-Woof!",
};
    
const cat = {
   species: "cat",
   name: "Flicker",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "Meow!",
};
    
const woman = {
   species: "human",
   name: "Alice",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "Hello!",
};
    
const catWoman = {
   species: "human",
   name: "Diana",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
};

const man = {
   species: "human",
   name: "Billy",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "Ass we can!",
};
    
const inhabitants = [dog, cat, woman, catWoman, man];

const keys = ["species", "name", "gender", "legs", "hands", "saying"];

inhabitants.map((inhabitant) => {
   print(keys.map((key) => inhabitant[key]).join(", "));
});

