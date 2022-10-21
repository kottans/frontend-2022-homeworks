import { print } from './js/lib.js';

class Creature {
   constructor(name, gender, species, say) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.say = say;
   }

   message() {
      return {
         species: this.species,
         name: `<strong>${this.name}</strong>`,
         gender: this.gender,
         say: `<em>${this.say}</em>`,
      };
   }
}

class Human extends Creature {
   constructor(name, gender, hands, legs, say, species, friends) {
      super(name, gender, species, say);
      this.legs = legs;
      this.hands = hands;
      this.friends = friends;
   }

   message() {
      const { species, gender, name, say } = super.message();
      const friends = this.friends.map(friend => {
         return friend.name;
      }).join(', ');

      return [
         species,
         name,
         gender,
         this.legs,
         this.hands,
         say,
         friends,
      ].join('; ');
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
   constructor(name, gender, paws, say, species) {
      super(name, gender, species);
      this.say = say;
      this.paws = paws;
   }

   message() {
      const { species, gender, name, say } = super.message();
      const hands = 0;

      return [
         species,
         name,
         gender,
         this.paws,
         hands,
         say,
      ].join('; ');
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
