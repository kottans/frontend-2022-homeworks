/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Eugene-CG/a-tiny-JS-world
   Web app: https://eugene-cg.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const cat = {
  species: "cat",
  name: "Eugene",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Hey Fellas!",
};
const dog = {
  species: "dog",
  name: "Toby",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};
const man = {
  species: "man",
  name: "John",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "I am a man",
};
const woman = {
  species: "dog",
  name: "Yennefer",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Nice to meet you",
};
const catWoman = Object.create(null, {
  species: {
    value: "catwoman",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  name: {
    value: "Violet Flower",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  gender: {
    value: "female",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  legs: { value: 2, writable: true, enumerable: true, configurable: true },
  hands: { value: 2, writable: true, enumerable: true, configurable: true },
});
Object.setPrototypeOf(catWoman, cat);

const inhabitants = [cat, dog, man, woman, catWoman];
const inhabitantsKeys = [
  "species",
  "name",
  "gender",
  "legs",
  "hands",
  "saying",
];
let output = [];

inhabitants.forEach((obj) => {
  output.push(
    inhabitantsKeys.reduce((accumulator, prop) => {
      return (accumulator += obj[prop] + "; ");
    }, "")
  );
});
print(output.join("\n"));

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
