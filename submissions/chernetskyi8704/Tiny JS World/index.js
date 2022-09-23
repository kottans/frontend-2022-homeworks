/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }

  displayData() {
    return ["species", "name", "gender", "saying"]
      .map((propertyOfTheInhabitant) => this[propertyOfTheInhabitant])
      .join("; ");
  }
}

class Person extends Inhabitant {
  constructor(species, name, gender, saying, hands, legs) {
    super(species, name, gender, saying);
    this.hands = hands;
    this.legs = legs;
  }

  displayData() {
    // return `${super.displayData()}; ${this.hands}; ${this.legs};`;
    return (
      `${super.displayData()}` +
      ["hands", "legs"]
        .map((propertyOfTheInhabitant) => this[propertyOfTheInhabitant])
        .join("; ") +
      ";"
    );
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, saying, paws, tail) {
    super(species, name, gender, saying);
    this.paws = paws;
    this.tail = tail;
  }

  displayData() {
    return (
      `${super.displayData()}` +
      ["paws", "tail"]
        .map((propertyOfTheInhabitant) => this[propertyOfTheInhabitant])
        .join("; ") +
      ";"
    );
  }
}

class Man extends Person {
  constructor(name, gender, saying, hands, legs) {
    super("Man", name, gender, saying, hands, legs);
  }
}
class Woman extends Person {
  constructor(name, gender, saying, hands, legs) {
    super("Woman", name, gender, saying, hands, legs);
  }
}
class Dog extends Animal {
  constructor(name, gender, saying, paws, tail) {
    super("Dog", name, gender, saying, paws, tail);
  }
}
class Cat extends Animal {
  constructor(name, gender, saying, paws, tail) {
    super("Cat", name, gender, saying, paws, tail);
  }
}

const man = new Man("Dimitrij", "male", "Nice to meet you!", 2, 2);
const woman = new Woman("Kate", "male", "Have a good day!", 2, 2);
const dog = new Dog("Molly", "female", "WOOF-WOOF!", 4, 1);
const cat = new Cat("Whiskey", "female", "Meow!", 4, 1);

// ======== OUTPUT ========
const allInhabitants = [man, woman, dog, cat];

allInhabitants.map((inhabitant) => {
  print(inhabitant.displayData());
});
