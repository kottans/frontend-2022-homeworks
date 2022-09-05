/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const inhabitants = [
   {
      species: 'dog',
      name: 'Toby',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'woof-woof!'
   },
   {
      species: 'cat',
      name: 'Zhorik',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'moooow!'
   },
   {
      species: 'woman',
      name: 'Kate',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying: 'What did you say?'
   },
   {
      species: 'man',
      name: 'John',
      gender: 'male',
      legs: 2,
      hands: 2,
      saying: 'Im fine.'
   },

];
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

for (let i = 0; i < inhabitants.length; i++) {
   let species = inhabitants[i].species;
   let name = inhabitants[i].name;
   let gender = inhabitants[i].gender;
   let legs = inhabitants[i].legs;
   let hands = inhabitants[i].hands;
   let saying = inhabitants[i].saying;

   print(`${species}; <strong>${name}</strong>; ${gender}; ${legs}; ${hands}; <em>${saying}</em>`);
}
