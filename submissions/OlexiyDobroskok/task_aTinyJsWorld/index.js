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
  const allProperties = [];
  properties.forEach((prop) => {
    if (resident[prop] !== 0) {
      allProperties.push(resident[prop]);
    }
  });
  return allProperties;
});

residentsProperties.forEach((prop) => print(prop.join("; ")));
