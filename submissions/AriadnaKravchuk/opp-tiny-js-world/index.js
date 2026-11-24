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

const SAYING = {
   DOG: "woof-woof!",
   CAT: "meow!"
}

class Inhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.friends = [];
   }

   addFriends(...friends) {
      friends.map((friend) => {
         if (!this.friends.includes(friend)) this.friends.push(friend);
      });
   }

   getFriendsNames() {
      return this.friends.map(({name}) => name);
   }

   getAttributes() {
      return [this.species, this.name, this.gender, this.saying];
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying, legs, hands) {
      super(SPECIES.HUMAN, name, gender, saying);
      this.legs = legs;
      this.hands = hands;
   }

   getAttributes() {
      return [...super.getAttributes(), this.legs, this.hands];
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying, paws) {
      super(species, name, gender, saying);
      this.paws = paws;
   }

   getAttributes() {
      return [...super.getAttributes(), this.paws];
   }
}

class Dog extends Animal {
   constructor(name, gender, paws) {
      super(SPECIES.DOG, name, gender, SAYING.DOG, paws);
   }
}

class Cat extends Animal {
   constructor(name, gender, paws) {
      super(SPECIES.CAT, name, gender, SAYING.CAT, paws);
   }
}

class Man extends Human {
   constructor(name, saying, legs, hands) {
      super(name, GENDER.MALE, saying, legs, hands);
   }
}

class Woman extends Human {
   constructor(name, saying, legs, hands) {
      super(name, GENDER.FEMALE, saying, legs, hands);
   }
}

const dog = new Dog("Pie", GENDER.MALE, 4);
const cat = new Cat("Cake", GENDER.FEMALE, 3);
const man = new Man("Dominic", "Hello!", 2, 2);
const woman = new Woman("Dominica", "Hello!", 2, 1);

dog.addFriends();
cat.addFriends(dog, dog);
man.addFriends(cat);
man.addFriends(woman);
woman.addFriends(man, dog, dog);

// ======== OUTPUT ========

const inhabitants = [dog, cat, man, woman];

inhabitants.forEach((inhabitant) => {
   print([
      ...inhabitant.getAttributes(),
      inhabitant.getFriendsNames().join(", ")
   ].join("; "));
});
