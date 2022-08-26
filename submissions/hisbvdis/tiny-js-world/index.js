/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/hisbvdis/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
  species: "dog",
  name: "Snoop",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Woof-woof",
};

const cat = {
  species: "cat",
  name: "Kitty",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "Meow",
};

const woman = {
  species: "human",
  name: "Bella",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Where have you been?",
};

const man = {
  species: "human",
  name: "Jack",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Bring me some more beer",
};

const catWoman = cat;
catWoman.name = "Woman-Cat";
catWoman.legs = 2;
catWoman.hands = 2;


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


const inhabitants = [dog, cat, woman, man, catWoman];

inhabitants
  .map((habitant) => Object.values(habitant))
  .map((array) => array.join("; "))
  .forEach((string) => print(string))
