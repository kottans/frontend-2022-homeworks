/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/the-darkesttt/a-tiny-JS-world
   Web app: https://the-darkesttt.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Creature {
   species;
   name;
   gender;
   saying;
   legs;

   constructor( name, gender, saying, legs) {
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.legs = legs;
   }

   showValues(inhabitant) {
      const valueKeys = [
         'species',
         'name',
         'gender',
         'saying',
         'legs',
      ];
      const inhabitantValues = valueKeys.map((key) => {
         return `${inhabitant[valueKeys[valueKeys.indexOf(key)]]}`;
      });
      return print(inhabitantValues.join('; '));
   }
}

class Animal extends Creature {
   constructor(name, gender, saying, legs) {
      super(name, gender, saying, legs);
   }
}

class Cat extends Animal {
   constructor(name, gender, saying, legs) {
      super(name, gender, saying, legs);
      this.species = 'cat';
   }
}

class Dog extends Animal {
   constructor(name, gender, saying, legs) {
      super(name, gender, saying, legs);
      this.species = 'dog';
   }
}

class Human extends Creature {
   hands;

   constructor(name, gender, saying, legs, hands) {
      super(name, gender, saying);
      this.species = 'human';
      this.hands = hands;
      this.legs = legs;
   }
}

const inhabitants = [
   new Dog('Robert', 'male', 'BARK!', 4),
   new Cat('Lily', 'female', 'meooow!', 4),
   new Human('Charlie', 'female', 'Hi John!', 2, 2),
   new Human('John', 'male', 'Hi Charlie!', 2, 2),
];

inhabitants.forEach((inhabitant) => {
   inhabitant.showValues(inhabitant);
});
