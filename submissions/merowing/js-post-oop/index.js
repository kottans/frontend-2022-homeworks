import { print } from './js/lib.js';

class Creature {
   constructor(name, gender, say) {
      this.name = name;
      this.gender = gender;
      this.say = say;
   }
}

class Human extends Creature {
   constructor(name, gender, hands, legs, say) {
      super(name, gender, say);
      this.hands = hands;
      this.legs = legs;
      this.species = 'human';
   }

   set friends(names) {
      this._friends = names.map(friend => friend.name);
   }

   get friends() {
      return ` <strong>${this._friends}</strong>`;
   }

   message() {
      return `${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.hands}; ${this.legs}; <em>${this.say}</em>;${this.friends}`;
   }

}

class Animal extends Creature {
   constructor(name, gender, paws, say) {
      super(name, gender, say);
      this.paws = paws;
   }

   message() {
      return `${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.paws}; <em>${this.say}</em>;`;
   }
}

class Cat extends Animal {
   constructor(name, gender, paws, say) {
      super(name, gender, paws, say);
      this.species = 'cat';
   }
}

class FairyTaleCat extends Human {
   constructor(name, gender, hands, legs, say) {
      super(name, gender, hands, legs, say);
      this.species = 'fairy tale';
   }
}

class Dog extends Animal {
   constructor(name, gender, paws, say) {
      super(name, gender, paws, say);
      this.species = 'dog';
   }
}

const George = new Human('George', 'male', 2, 2, 'Hello OOP World!');
const Samantha = new Human('Samantha', 'female', 2, 2, 'Hi. my name is Sam!');
const Tom = new Cat('Tom', 'male animal', 4, 'Meow-meow');
const Allegra = new Dog('Allegra', 'female animal', 4, 'Woof-woof');
const Anne = new FairyTaleCat('Anne', 'female', 2, 2, '');
Anne.say = Tom.say;

George.friends = [Samantha, Tom];
Samantha.friends = [George, Allegra, Tom];
Anne.friends = [Samantha, Tom];

const creatures = [George, Samantha, Tom, Allegra, Anne];

creatures.forEach(creature => {
   print(creature.message())
});
