import { print } from './js/lib.js';

class Creature {
   constructor(name, gender, legs, say) {
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.say = say;
   }

   message() {
      return `${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.hands}; ${this.legs}; <em>${this.say}</em>;${this.friends}`;
   }
}

class Human extends Creature {
   constructor(name, gender, hands, legs, say) {
      super(name, gender, legs, say);
      this.species = 'human';
      this.hands = hands;
   }

   set friends(names) {
      this._friends = names.map(friend => friend.name);
   }

   get friends() {
      return ` <strong>${this._friends}</strong>`;
   }

}

class Animal extends Creature {
   constructor(name, gender, legs, say) {
      super(name, gender, legs, say);
      this.species = 'animal';
      this.hands = 0;
      this.friends = '';
   }
}

class Cat extends Animal {
   constructor(name, gender, legs, say) {
      super(name, gender, legs, say);
   }
}

class FairyTaleCat extends Human {
   constructor(name, gender, hands, legs, say) {
      super(name, gender, hands, legs, say);
      this.species = 'fairy tale human';
   }
}

class Dog extends Animal {
   constructor(name, gender, legs, say) {
      super(name, gender, legs, say);
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
