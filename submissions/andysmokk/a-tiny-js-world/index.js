/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andysmokk/a-tiny-JS-world
   Web app: https://andysmokk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const man = {
  species: "human",
  name: "Momo",
  hands: 2,
  legs: 2,
  gender: "male",
  saying: "I am Momo",
  friends: ["Kamila", "Boba"],
};

const woman = {
  species: "human",
  name: "Kamila",
  hands: 2,
  legs: 2,
  gender: "female",
  saying: "I am Kamila",
  friends: ["Momo", "Boba", "Chico"],
};

const cat = {
  species: "cat",
  name: "Chico",
  hands: 0,
  legs: 4,
  gender: "male",
  saying: "meow-meow",
  friends: ["Kamila", "Kity"],
};

const dog = {
  species: "dog",
  name: "Boba",
  hands: 0,
  legs: 4,
  gender: "male",
  saying: "woof-woof",
  friends: ["Kamila", "Momo"],
};

const catWoman = {
  species: "cat-woman",
  name: "Kity",
  hands: 2,
  legs: 2,
  gender: "female",
  saying: cat.saying,
  friends: ["Chico"],
};

const population = [man, woman, cat, dog, catWoman];

const printPopulation = (inhabitantes) => {
  print(
    inhabitantes
      .map(({ species, name, hands, legs, gender, saying, friends }) =>
        [
          species,
          `<strong>${name}</strong>`,
          hands,
          legs,
          gender,
          `<em>"${saying}"</em>`,
          friends.join(", "),
        ].join("; ")
      )
      .join("\n")
  );
};

printPopulation(population);
