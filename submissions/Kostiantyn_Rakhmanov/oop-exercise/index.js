import { print } from './js/lib.js';

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
   printOut() {
      return ['species', 'name', 'gender', 'saying'].map(
         (prop) => `${prop}: ${this[prop]}`
      ).join('; ');
   }
}

class Animal extends Inhabitant {
   constructor (species, name, gender, saying) {
      super (species, name, gender, saying);
      this.legs = 4;
   }
   printOut() {
      return [
         super.printOut(),
         ...['legs'].map((prop) => `${prop}: ${this[prop]}`),
      ].join('; ');
   }
}

class Dog extends Animal {
   constructor (name, gender, saying) {
      super ('dog', name, gender, saying);
   }
}

class Cat extends Animal {
   constructor (name, gender, saying) {
      super ('cat', name, gender, saying);
   }
}

class Human extends Inhabitant {
   constructor (name, gender, saying) {
      super('human', name, gender, saying);
      this.hands = 2;
      this.legs = 2;
   }
   printOut() {
      return [
         super.printOut(),
         ...['hands','legs'].map((prop) => `${prop}: ${this[prop]}`),
      ].join('; ');
   }
}

class Woman extends Human {
   constructor (name, saying) {
      super (name, 'female', saying);
   }
}

class Man extends Human {
   constructor (name, saying) {
      super (name, 'male', saying);
   }
}

const toby = new Dog ('Toby', 'male', 'woof-woof');
const alice = new Cat ('Alice', 'female', 'meow');
const mary = new Woman ('Mary', 'Hi, John!');
const john = new Man ('John', 'Hi, Mary!');

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

const inhabitants = [toby, alice, mary, john];

inhabitants.forEach(inhabitant => print(inhabitant.printOut()));