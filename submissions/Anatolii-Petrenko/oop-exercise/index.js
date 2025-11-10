import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Anatolii-Petrenko/a-tiny-JS-world/tree/populate-world-oop
   Web app: https://anatolii-petrenko.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, gender, saying) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }
  getInfo() {
    return [
      `Name: ${this.name}`,
      `Gender: ${this.gender}`,
      `Greeting: ${this.saying}`,
    ];
  }
}

class Human extends Inhabitant {
  species = "Human";
  hands = 2;
  legs = 2;
  constructor(name, gender, saying) {
    super(name, gender, saying);
  }
  getInfo() {
    return [
      this.species,
      ...super.getInfo(),
      `Hands: ${this.hands}`,
      `Legs: ${this.legs}`,
    ];
  }
}

class Animal extends Inhabitant {
  constructor(name, gender, saying) {
    super(name, gender, saying);
  }
  species = "Animal";
  legs = 4;
  tail = 1;
  getInfo() {
    return [
      this.species,
      ...super.getInfo(),
      `Legs: ${this.legs}`,
      `Tail: ${this.tail}`,
    ];
  }
}

class Cat extends Animal {
  species = "Cat";
  constructor(name, gender, saying, species, legs, tail) {
    super(name, gender, saying, species, legs, tail);
  }
}

class Dog extends Animal {
  species = "Dog";
  constructor(name, gender, saying, species, legs, tail) {
    super(name, gender, saying, species, legs, tail);
  }
}
// ======== OUTPUT ========
const man = new Human("Antony", "male", "Hi Bro!");
const woman = new Human("Jeeny", "female", "Hello! How it's going?");
const cat = new Cat("Bella", "female", "Meow!");
const dog = new Dog("Toby", "male", "Woof-Woof!");
const catWoman = new Human("JeenyCat", "female", woman.saying);

const inhabitants = [man, woman, dog, cat, catWoman];

inhabitants.map((inhabitant) => {
  print(inhabitant.getInfo().join("\n"));
});
