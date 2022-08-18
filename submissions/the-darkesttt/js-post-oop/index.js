/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/the-darkesttt/a-tiny-JS-world
   Web app: https://the-darkesttt.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Creature {
   species;
   name;
   gender;
   saying;
   legs;
   hands;

   constructor( name, gender, saying) {
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }

   showValues(obj) {
      print(Object.values(obj).join('; '));
   }
}

class Animal extends Creature {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.legs = 4;
      this.hands = 0;
   }
}

class Cat extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.species = 'cat';
   }
}

class Dog extends Animal {
   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.species = 'dog';
   }
}

class Human extends Creature {

   constructor(name, gender, saying) {
      super(name, gender, saying);
      this.species = 'human';
      this.hands = 2;
      this.legs = 2;
   }
}

const inhabitants = [
   new Dog('Robert', 'male', 'BARK!'),
   new Cat('Lily', 'female', 'meooow!'),
   new Human('Charlie', 'female', 'Hi John!'),
   new Human('John', 'male', 'Hi Charlie!'),
];

inhabitants.forEach((obj) => {
   obj.showValues(obj);
})