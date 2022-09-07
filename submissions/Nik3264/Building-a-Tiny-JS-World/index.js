/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _https://github.com/Nik3264/a-tiny-JS-world_
   Web app: _https://nik3264.github.io/a-tiny-JS-world/_
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
   name: 'Vasya',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'mi-mi!'
 };
 const catwoman = {
   species: 'catwoman',
   name: 'Toby',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: cat.saying
 };
 const men = {
   species: 'men',
   name: 'Toby',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'hello!'
 };
 const woman = {
   species: 'woman',
   name: 'Tyna',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'wo hei!'
 };

 const arr = [dog, cat, catwoman, men, woman];

 const str = arr.map(el=>{
  el.name=`<strong>${el.name}</strong>`;
   return Object.values(el).join(', ');
 });
 print(str.join(";\n"));
 
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


