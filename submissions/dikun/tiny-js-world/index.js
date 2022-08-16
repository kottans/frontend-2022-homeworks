/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
	species: "dog",
	name: "Bim",
	gender: "male",
	legs: 4,
	hands: 0,
	talk: "woof!"
};

const cat = {
	species: "cat",
	name: "Tom",
	gender: "male",
	legs: 4,
	hands: 0,
	talk: "meow!"
};

const man = {
	species: "human",
	name: "Jack",
	gender: "male",
	legs: 2,
	hands: 2,
	talk: "Captain Jack Sparrow!"
};

const woman = {
	species: "human",
	name: "Elizabeth",
	gender: "female",
	legs: 2,
	hands: 2,
	talk: "He's A Pirate."
};

const catwoman = {
	species: "human",
	name: "Lisa",
	gender: "female",
	legs: 2,
	hands: 2	
};

catwoman.talk = cat.talk;

const inhabitants = [dog, cat, man, woman, catwoman];
const properties = ["species", "name", "gender", "legs", "hands", "talk"];

const inhabitantsDescr = inhabitants.map((inhabitan) => properties.map(property => inhabitan[property]));

inhabitantsDescr.map((resident) => print(resident.join("; ")));

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


