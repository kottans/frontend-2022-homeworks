/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/AriadnaKravchuk/a-tiny-JS-world
   Web app: https://ariadnakravchuk.github.io/a-tiny-JS-world
*/

// ======== OBJECTS DEFINITIONS ========

const SPECIES = {
   HUMAN: "human",
   CAT: "cat",
   DOG: "dog"
}

const GENDER = {
   MALE: "male",
   FEMALE: "female"
}

class Inhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.friends = [];
   }

   addFriends(...friend) {
      if (!this.friends.includes(friend)) this.friends.push(friend);
   }
}

class Human extends Inhabitant {
   constructor(species, name, gender, saying, legs, hands) {
      super(species, name, gender, saying);
      this.legs = legs;
      this.hands = hands;
   }

   printAttributes() {
      print([
         this.species,
         this.name,
         this.gender,
         this.saying,
         this.legs,
         this.hands
      ].join("; "));
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying, paws) {
      super(species, name, gender, saying);
      this.paws = paws;
   }
   
   printAttributes() {
      print([
         this.species,
         this.name, 
         this.gender, 
         this.saying, 
         this.paws
      ].join("; ")); 
   }
}

class Dog extends Animal {
   constructor(name, gender, saying, paws) {
      super(SPECIES.DOG, name, gender, saying, paws);
   }
}

class Cat extends Animal {
   constructor(name, gender, saying, paws) {
      super(SPECIES.CAT, name, gender, saying, paws);
   }
}

class Man extends Human {
   constructor(name, saying, legs, hands) {
      super(SPECIES.HUMAN, name, GENDER.MALE, saying, legs, hands);
   }
}

class Woman extends Human {
   constructor(name, saying, legs, hands) {
      super(SPECIES.HUMAN, name, GENDER.FIMALE, saying, legs, hands);
   }
}

const dog = new Dog("Pie", GENDER.MALE, "woof-woof!", 4);
const cat = new Cat("Cake", GENDER.FEMALE, "meow!", 4);
const man = new Man("Dominic", "Hello!", 2, 2);
const woman = new Woman("Dominica", "Hello!", 2, 1);

dog.addFriends("Cake");
cat.addFriends("Pie", "Selina");
man.addFriends("Dominica");
woman.addFriends("Dominic", "Selina");

// ======== OUTPUT ========

const inhabitants = [dog, cat, man, woman];

inhabitants.forEach((inhabitant) => {
   inhabitant.printAttributes();
});
