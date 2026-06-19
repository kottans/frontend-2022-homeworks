/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/the-darkesttt/a-tiny-JS-world
   Web app: https://the-darkesttt.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Creature {

   constructor( name, gender, saying, species) {
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.species = species;
   }

   showValues() {
      return `${this.species}; ${this.name}; ${this.gender}; ${this.saying};`;
   }
}

class Animal extends Creature {
   constructor(name, gender, saying, paws, species) {
      super(name, gender, saying, species);
      this.paws = paws;
   }

   showValuesWithSuper() {
      return `${super.showValues()} ${this.paws};`
   }
}

class Cat extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying, 4, 'cat');
   }
}

class Dog extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying, 4, 'dog');
   }
}

class Human extends Creature {
   constructor(name, gender, saying) {
      super(name, gender, saying, 'homosapien');
      this.hands = 2;
      this.legs = 2;
   }

   showValuesWithSuper() {
      return `${super.showValues()} ${this.legs}; ${this.hands};`;
   }
}

const inhabitants = [
   new Dog('Robert', 'male', 'BARK!'),
   new Cat('Lily', 'female', 'meooow!'),
   new Human('Charlie', 'female', 'Hi John!'),
   new Human('John', 'male', 'Hi Charlie!'),
];

inhabitants.forEach((inhabitant) => {
   print(inhabitant.showValuesWithSuper());
});
