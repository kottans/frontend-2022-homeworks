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
const populationProperties = [
  "species",
  "name",
  "hands",
  "legs",
  "gender",
  "saying",
  "friends",
];

const printPopulation = (inhabitantes, inhabitantProperties) => {
  inhabitantes.forEach((inhabitant) =>
    print(
      inhabitantProperties
        .map((property) =>
          property === "name"
            ? `<strong>${inhabitant[property]}</strong>`
            : property === "saying"
            ? `<em>"${inhabitant[property]}"</em>`
            : inhabitant[property]
        )
        .join("; ")
    )
  );
};

printPopulation(population, populationProperties);

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
