import { print } from './js/lib.js';

class Creature {
   constructor(name, gender, species, hands) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.hands = hands;
   }

   message() {
      return `${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.hands};`;
   }
}

class Human extends Creature {
   constructor(name, gender, hands, legs, say, species) {
      super(name, gender, species, hands);
      this.say = say;
      this.legs = legs;
   }

   set friends(names) {
      this._friends = names.map(friend => friend.name);
   }

   get friends() {
      return ` <strong>${this._friends}</strong>`;
   }

   message() {
      return `${super.message()} ${this.legs}; <em>${this.say}</em>;${this.friends}`;
   }

}

class Man extends Human {
   constructor(name, gender, hands, legs, say, species = 'man') {
      super(name, gender, hands, legs, say, species);
   }
}

class Woman extends Human {
   constructor(name, gender, hands, legs, say, species = 'woman') {
      super(name, gender, hands, legs, say, species);
   }
}

class FairyTaleCat extends Human {
   constructor(name, gender, hands, legs, say = '', species = 'fairy tale cat') {
      super(name, gender, hands, legs, say, species);
   }
}

class Animal extends Creature {
   constructor(name, gender, paws, say, species, hands = 0) {
      super(name, gender, species, hands);
      this.say = say;
      this.paws = paws;
   }

   message() {
      return `${super.message()} ${this.paws}; <em>${this.say}</em>;`;
   }
}

class Cat extends Animal {
   constructor(name, gender, paws, say, species = 'cat') {
      super(name, gender, paws, say, species);
   }
}

class Dog extends Animal {
   constructor(name, gender, paws, say, species = 'dog') {
      super(name, gender, paws, say, species);
   }
}

const George = new Man('George', 'male', 2, 2, 'Hello OOP World!');
const Samantha = new Woman('Samantha', 'female', 2, 2, 'Hi. my name is Sam!');
const Tom = new Cat('Tom', 'male animal', 4, 'Meow-meow');
const Allegra = new Dog('Allegra', 'female animal', 4, 'Woof-woof');
const Anne = new FairyTaleCat('Anne', 'female', 2, 2);
Anne.say = Tom.say;

George.friends = [Samantha, Tom];
Samantha.friends = [George, Allegra, Tom];
Anne.friends = [Samantha, Tom];

const creatures = [George, Samantha, Tom, Allegra, Anne];

creatures.forEach(creature => {
   print(creature.message())
});
