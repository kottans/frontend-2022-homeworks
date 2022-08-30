/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/loki13btz/a-tiny-JS-world
   Web app: https://loki13btz.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: "dog",
  name: "Toby",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};
const cat = {
  species: "cat",
  name: "Onyx",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "meoooooow!",
};
const man = {
  species: "human",
  name: "Tom",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Hello, I am Tom!",
};
const woman = {
  species: "human",
  name: "Jiny",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "Have a good day!",
};
const catWoman = {
  species: "hulf-human",
  name: "Lisa",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: cat.saying,
};
const arr = [dog, cat, man, woman, catWoman];
// ... other objects ...
arr.forEach((element) => {
  print(Object.values(element).join(';'));
});

// ... other print-outs ...

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
