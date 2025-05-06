import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers" convenience:

   Code repository: _put repo URL here_
   Web app: _put project"s github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Essence {
   constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
      this.attributes = [
         { attribute: "species", text: "I am a" },
         { attribute: "name", text: "My name is" },
         { attribute: "gender", text: "My gender:" },
         { attribute: "legs", text: "I have legs:" },
         { attribute: "saying", text: "My favorite phrase: " },
      ];
   }
   showEssenceAttributes() {
      return this.attributes.map(({ attribute, text }) => `${text} ${this[attribute]}`).join("; ");
   }
};

class Human extends Essence {
   constructor(name, gender, saying, hair) {
      super("human", name, gender, 2, saying);
      this.hands = 2;
      this.hair = hair;
      this.attributes = [
         ...this.attributes,
         { attribute: "hands", text: "I have hands:" },
         { attribute: "hair", text: "My hair color is:" },
      ];
   }
};

class Man extends Human {
   constructor(name, saying, hair) {
      super(name, "male", saying, hair);
   }
};

class Woman extends Human {
   constructor(name, saying, hair) {
      super(name, "famale", saying, hair);
   }
};

class Animal extends Essence {
   constructor(species, name, gender, saying, fur) {
      super(species, name, gender, 4, saying);
      this.fur = fur;
      this.attributes = [
         ...this.attributes,
         { attribute: "fur", text: "The color of my fur is:" },
      ];
   }
};
class Cat extends Animal {
   constructor(name, gender, fur) {
      super("cat", name, gender, "Meaw-meaaaaw", fur);
   }
};
class Dog extends Animal {
   constructor(name, gender, fur) {
      super("dog", name, gender, "Gav-gav", fur);
   }
};

const entities = [
   new Woman("Sara", "Hello!", "blond"),
   new Woman("Lily", "hi", "red"),
   new Woman("Sara", "Hello everybody", "brown"),
   new Man("Simon", "Yo-yo", "silver"),
   new Man("Bill", "I am top", "brown"),
   new Man("Boris", "Hello everybody", "blond"),
   new Cat("Tom", "female", "grey"),
   new Cat("Jerry", "male", "white"),
   new Dog("Pes Duck", "female", "black and white"),
   new Dog("Bob", "male", "brown"),
];

entities.forEach((essence) => {
   print(essence.showEssenceAttributes());
});
