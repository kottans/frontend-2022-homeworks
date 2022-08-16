/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Toby',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
};

const cat = {
   species: 'cat',
   name: 'Aimi',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow!'
};

const man = {
   species: 'human',
   name: 'Ihor',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi!'
};

const woman = {
   species: 'human',
   name: 'Marina',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hello!'
};

const catWoman = Object.create(cat);
catWoman.name = 'Cat-Woman';
catWoman.species = 'human';
catWoman.legs = 2;
catWoman.hands = 2;
catWoman.gender = 'female';

const inhabitants = [dog, cat, man, woman, catWoman];

function tellAboutObj(obj) {
   return `${obj.saying} I'm a ${obj.species}. My gender is ${obj.gender}. My name is ${obj.name}. I have ${obj.legs} legs, ${obj.hands} hands`;
}

inhabitants.forEach(item => print(aboutObj(item)));
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


