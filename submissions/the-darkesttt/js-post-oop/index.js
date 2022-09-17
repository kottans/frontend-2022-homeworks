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
      const valueKeys = [
         'species',
         'name',
         'gender',
         'saying'
      ];
      const inhabitantValues = valueKeys.map((key) => {
         return `${this[key]}`;
      });
      return inhabitantValues;
   }
}

class Animal extends Creature {
   constructor(name, gender, saying, paws, species) {
      super(name, gender, saying, species);
      this.paws = paws;
   }

   showValues() {
      const valueKeys = [
         'paws'
      ];
      let inhabitantValues = valueKeys.map((key) => {
         return `${this[key]}`;
      });
      let inhabitantValuesNew = super.showValues().concat(inhabitantValues);
      return print(inhabitantValuesNew.join('; '));
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

   showValues() {
      const valueKeys = [
         'legs',
         'hands',
      ];
      let inhabitantValues = valueKeys.map((key) => {
         return `${this[key]}`;
      });
      let inhabitantValuesNew = super.showValues().concat(inhabitantValues);
      return print(inhabitantValuesNew.join('; '));
   }
}

const inhabitants = [
   new Dog('Robert', 'male', 'BARK!'),
   new Cat('Lily', 'female', 'meooow!'),
   new Human('Charlie', 'female', 'Hi John!'),
   new Human('John', 'male', 'Hi Charlie!'),
];

inhabitants.forEach((inhabitant) => {
   inhabitant.showValues();
});
