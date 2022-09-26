/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/OlexiyDobroskok/a-tiny-JS-world
   Web app: https://olexiydobroskok.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const man = {
  species: "human",
  name: "José",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hola, amigo!",
  friends: ["Nerea", "Lalo"],
};

const woman = {
  species: "human",
  name: "Martina",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Buenos días!",
  friends: ["Pako"],
};

const cat = {
  species: "cat",
  name: "Lalo",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "¡miau miau!",
  friends: ["José", "Nerea"],
};

const dog = {
  species: "dog",
  name: "Pako",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "¡guau guau!",
  friends: ["Martina"],
};

const catwoman = {
  species: "human",
  name: "Nerea",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying + " muchachos!",
  friends: ["José", "Lalo"],
};

// ======== OUTPUT ========

const aTinyWorld = [man, woman, cat, dog, catwoman];
const properties = [
  "species",
  "name",
  "gender",
  "legs",
  "hands",
  "saying",
  "friends",
];

const residentsProperties = aTinyWorld.map((resident) => {
  return properties
    .map((prop) => {
      return resident[prop];
    })
    .filter((prop) => prop !== 0 && prop !== "");
});

residentsProperties.forEach((prop) => print(prop.join("; ")));
