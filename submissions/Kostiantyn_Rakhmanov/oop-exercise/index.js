import { print } from './js/lib.js';

class Inhabitant {
   constructor(species, name, gender,saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
}

class Animal extends Inhabitant {
   constructor (species, name, gender, saying) {
      super (species, name, gender, saying);
      this.legs = 4;
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
const mary = new Woman ('Mary', 'Hi, John');
const john = new Man ('John', 'Hi, Mary');

const inhabitants = [toby, alice, mary, john];
const props = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
   
inhabitants.map((item) => {
   print(props.map((prop) => item[prop]).join('; '));
});
