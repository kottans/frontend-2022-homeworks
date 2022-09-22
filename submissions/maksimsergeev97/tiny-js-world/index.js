import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const dog = {
   species: "dog",
   name: "Muhtar",
   gender: "male",
   hands: 0,
   legs: 4,
   say: "gryaf-gryaf"
},
     cat = {
      species: "cat",
      name: "Kate",
      gender: "female",
      hands: 0,
      legs: 4,
      say: "meow-meow"
},
     man = {
      species: "human",
      name: "Boris",
      gender: "male",
      hands: 2,
      legs: 2,
      say: "Добрий день, everybody!"
},
     woman = {
      species: "human",
      name: "Alexa",
      gender: "female",
      hands: 2,
      legs: 2,
      say: "Hi! I`m Aaaaalexa!"
},
      catWoman = Object.create(cat, {
         species: {value: 'superhuman'}, 
         name: {value: 'Selina'}, 
         gender: {value: 'female'}, 
         hands: {value: 2}, 
         legs: {value: 2}
      })

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
   
   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
   const objects = [dog, cat, man, woman, catWoman],
         keys = ['species', 'name', 'gender', 'hands', 'legs', 'say'];

   objects.forEach (item => {
      print(keys.map(key => item[key]).join('; '));
   })
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
