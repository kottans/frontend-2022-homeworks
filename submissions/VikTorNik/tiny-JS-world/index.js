import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class basePerson {
   constructor(person, name, gender, legs, hands, voice) {
      this.person = person;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.voice = voice;
   }
};

const dog = new basePerson('dog', 'Buran', 'male', 4, 0, 'woof!');
const cat = new basePerson('cat', 'Yana', 'female', 4, 0, 'meow!');
const man = new basePerson('human', 'Viktor', 'male', 2, 2, 'Congratulations!');
const woman = new basePerson('human', 'Olena', 'female', 2, 2, 'Slava Ukraine!');
const catWoman = Object.create(cat);
catWoman.person = 'Cat-Woman';
catWoman.name = 'Selina Kyle';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const fictionalWorld = [dog, cat, man, woman, catWoman];
fictionalWorld.map(p => print(Object.values(p).map(val => val).join(' - ')));

