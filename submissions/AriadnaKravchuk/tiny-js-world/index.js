/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/AriadnaKravchuk/a-tiny-JS-world
   Web app: https://ariadnakravchuk.github.io/a-tiny-JS-world
*/

// ======== OBJECTS DEFINITIONS ========

const dog = {
   species: "dog",
   name: "Pie",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "woof-woof!",
   friends: ["Cake"]
};

const cat = {
   species: "cat",
   name: "Cake",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "meow!",
   friends: ["Pie", "Selina"]
};

const man = {
   species: "human",
   name: "Dominic",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "Hello!",
   friends: ["Dominica"]
};

const woman = {
   species: "human",
   name: "Dominica",
   gender: "female",
   legs: 2,
   hands: 1,
   saying: "Hello!",
   friends: ["Dominic", "Selina"]
};

const catWoman = {
   species: "human",
   name: "Selina",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friends: ["Cake", "Dominica"]
};

// ======== OUTPUT ========

function printInhabitant(inhabitant) {
   let result = "";

   for (let val in inhabitant) {
      result += inhabitant[val] + "; ";
   }

   print(result);
}

const inhabitants = [dog, cat, man, woman, catWoman];
inhabitants.forEach(printInhabitant);
