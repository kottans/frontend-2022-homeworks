import { print } from "./js/lib.js";

class Creature {
  constructor(name, gender, friends) {
    this.name = name;
    this.gender = gender;
    this.friends = friends;
  }
}
console.log();
class Humans extends Creature {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.legs = 2;
    this.hands = 2;
  }
  greeting() {
    return `${this.saying} My name is ${this.name}. I'm a ${
      this.species
    }. I have ${this.legs} legs and ${this.hands} hands. My ${
      this.friends.length > 1 ? "friends are" : "friend is"
    } ${this.friends}.`;
  }
}
class Man extends Humans {
  constructor(name, friends, hands, legs) {
    super(name, friends, hands, legs);
    this.species = "man";
    this.gender = "male";
    this.saying = `Hi, guys!`;
    this.friends = ["Inna", "JT", "Sherry"];
  }
}
class Woman extends Humans {
  constructor(name, friends) {
    super(name, friends);
    this.species = "woman";
    this.gender = "female";
    this.saying = `Hi, girls!`;
    this.friends = ["Tolik", "JT"];
    console.log(this.name);
  }
}
class Animals extends Creature {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.paws = 4;
  }
  greeting() {
    return `${this.saying} It's a ${this.gender} ${this.species} - ${this.name} with ${this.paws} paws. ${this.name} is friends with ${this.friends}.`;
  }
}

class Dog extends Animals {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "dog";
    this.saying = "woof-woof!";
  }
}

class Cat extends Animals {
  constructor(name, gender, friends) {
    super(name, gender, friends);
    this.species = "cat";
    this.saying = "meow-meow!";
  }
}

function change() {
  let random = new Date().getSeconds() % 2;
  return random === 0 ? Cat : Woman;
}
class CatWoman extends change() {
  constructor(species, saying, paws, hands, legs) {
    super(species, saying, paws, hands, legs);
    this.gender = "female";
    this.name = "Selina";
    this.friends = [cat.name];
    console.log(this.name);
  }
}

const man = new Man("Tolik", ["JT"]);
const dog = new Dog("JT", "male", ["Inna", "Tolik"]);
const cat = new Cat("Sherry", "female", ["Selina"]);
const woman = new Woman("Inna", ["Tolik", "Sherry", "JT", "Selina"]);
const catWoman = new CatWoman();

const population = [dog, cat, man, woman, catWoman];

population.forEach((i, index) => print(`${index + 1}.  ${i.greeting()}`));
