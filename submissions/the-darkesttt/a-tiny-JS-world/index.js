/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/the-darkesttt/a-tiny-JS-world
   Web app: https://the-darkesttt.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: 'dog',
   name: 'Robert',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'BARK!',
};

const cat = {
   species: 'cat',
   name: 'Lily',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meooow!',
};

const woman = {
   species: 'human',
   name: 'Charlie',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hi John!',
   friends: ['John', 'Lola'],
};

const man = {
   species: 'human',
   name: 'John',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi Charlie!',
   friends: ['Charlie', 'Lola'],
};

const catWoman = new Object();
Object.setPrototypeOf(catWoman, cat);
catWoman.species = 'human';
catWoman.name = 'Lola';
catWoman.legs = 2;
catWoman.hands = 2;
catWoman.saying = catWoman.saying;
catWoman.friends = ['John', 'Charlie'];

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
inhabitants.forEach(obj => {
   print(Object.values(obj).join('; '))
});
