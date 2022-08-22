/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Tedzury/Tiny_JS_world
   Web app: https://tedzury.github.io/Tiny_JS_world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
catsPhrase = 'meow-meow skinbag';

const tinyWorldInhabitants = [
   {
      species: 'dog',
      name: 'Barbos',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'gav-gav kaje pes',
      friends: ['definitely everybody in the world !']
   },
   {
      species: 'cat',
      name: 'Sonya',
      gender: 'female',
      legs: 4,
      hands: 0,
      saying : catsPhrase,
      friends: ['definitely nobody except her own slaves']
   },
   {
      species: 'human',
      name: 'Oleksii',
      gender: 'male',
      legs: 2,
      hands: 2,
      saying: 'Wanna be frontend ninja in future!',
      friends: ['Alex', 'Victoria', 'every lovely kottan on the course']
   },
   {
      species: 'human',
      name: 'Victoria',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying: 'When will you bring the money to home, honey? ',
      friends: ['Natasha', 'Katya', 'Lada']
   },
   {
      species: 'catWoman',
      name: 'Anjela',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying : catsPhrase,
      friends: ['definitely nobody except her own slaves, she\'s a cat, you know...']
   }

]



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

   function formOutput(obj) {

      const outputArr = Object.values(obj);

      for (let i = 0; i < outputArr.length; i++) {
         if (Array.isArray(outputArr[i])) {
            outputArr[i] = outputArr[i].join(', ')
         }
      }

      const result = outputArr.join('; ');
      return result
   }
   
   tinyWorldInhabitants.forEach( item => print(formOutput(item)));
   



