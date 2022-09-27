import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/MosQuitO404/a-tiny-JS-world
   Web app: https://mosquito404.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
   }
   
   get showProperties() {
      return ['species', 'name', 'gender', 'legs', 'saying'].map(property => this[property]).join('; ');
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender, 4, saying);
   }
}

class Dog extends Animal {
   constructor(name, gender) {
      super('Dog', name, gender, 'Woof-woof!');
   }
}

class Cat extends Animal {
   constructor(name, gender) {
      super('Cat', name, gender, 'Meow-meow!');
   }
}

class Human extends Inhabitant {
   constructor(name, gender, hands, saying) {
      super('Human', name, gender, 2, saying);
      this.hands = hands;
   }

   get showProperties() {
      return `${super.showProperties}; ${this.hands}`;
   };
}

class Man extends Human {
   constructor(name, saying) {
      super(name, 'male', 2, saying);
   }
}

class Woman extends Human {
   constructor(name, saying) {
      super(name, 'female', 2, saying);
   }
}

const inhabitants = [
   new Man('Orest', 'Glory to Ukraine!'),
   new Man('Taras', 'Glory to Heroes!'),
   new Man('Bogdan', 'Glory to the Nation!'),
   new Woman('Marichka', 'Death to the enemies!'),
   new Woman('Oksana', 'Good evening! We are from Ukraine!'),
   new Woman('Zoryana', 'Russian warship, go f#ck yourself!'),
   new Dog('Bayraktar', 'male'),
   new Dog('Muha', 'female'),
   new Cat('Sherman', 'male'),
   new Cat('Javelina', 'female')
];

inhabitants.forEach(inhabitant => {
   print(inhabitant.showProperties);   
});
   
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
