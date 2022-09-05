class Inhabitants {
  constructor(species, name, gender) {
    this.species = species;
    this.name = name;
    this.gender = gender;
  }

  showProperties() {
    return `${this.species}; ${this.name}; ${this.gender}`;
  }
}

class Human extends Inhabitants {
  constructor(name, gender, saying) {
    super("human", name, gender);
    this.hands = 2;
    this.legs = 2;
    this.saying = saying;
  }

  showProperties() {
    return `${super.showProperties()}; ${this.hands}; ${this.legs}; ${
      this.saying
    }`;
  }
}

class Animal extends Inhabitants {
  constructor(species, name, gender, saying) {
    super(species, name, gender);
    this.paws = 4;
    this.saying = saying;
  }
  showProperties() {
    return `${super.showProperties()}; ${this.paws}; ${this.saying}`;
  }
}

class Cat extends Animal {
  constructor(name, gender, saying) {
    super("cat", name, gender, saying);
  }
}

class Dog extends Animal {
  constructor(name, gender, saying) {
    super("dog", name, gender, saying);
  }
}

const dog = new Dog("Bob", "male", "woof");
const cat = new Cat("Grey", "male", "meow");
const catWoman = new Cat("Lily", "female", "meow");
const man = new Human("Anton", "male", "Have a good day!");
const woman = new Human("Anna", "female", "Good luck!");

const inhabitants = [dog, cat, catWoman, man, woman];

inhabitants.forEach(function (inhabitant) {
  print(inhabitant.showProperties());
});
