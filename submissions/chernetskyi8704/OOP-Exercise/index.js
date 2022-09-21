class Inhabitant {
  constructor(Species, Name, Gender, Saying) {
    this.Species = Species;
    this.Name = Name;
    this.Gender = Gender;
    this.Saying = Saying;
  }

  addBoldAndRedSemicolon(string) {
    return string.bold().fontcolor("red");
  }

  addRedBoldCollon(string) {
    return string.bold().fontcolor("red");
  }

  makeStringRedAndBold(string) {
    return string.bold().fontcolor("Red");
  }

  makeStringBold(string) {
    return string.bold();
  }

  saying() {
    return ["Saying"].map(
      (propertyOfTheInhabitant) =>
        ` ${
          this.makeStringRedAndBold(propertyOfTheInhabitant) +
          this.addRedBoldCollon(":")
        } ${this.makeStringBold(this.Saying)}` +
        this.addBoldAndRedSemicolon(";")
    );
  }

  displayData() {
    return (
      ["Species", "Name", "Gender"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon("; ")) +
      this.addBoldAndRedSemicolon(";")
    );
  }
}
class Human extends Inhabitant {
  constructor(Species, Name, Gender, Saying) {
    super(Species, Name, Gender, Saying);
    this.Hands = "2";
    this.Legs = "2";
  }

  displayData() {
    return (
      `${super.displayData()} ` +
      ["Hands", "Legs"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon(";")) +
      this.addBoldAndRedSemicolon("; ") +
      this.saying()
    );
  }
}

class Animal extends Inhabitant {}

class Man extends Human {
  constructor(Name, Gender, Saying) {
    super("Man🤵", Name, Gender, Saying);
  }
}

class Woman extends Human {
  constructor(Name, Gender, Saying) {
    super("Woman👩", Name, Gender, Saying);
  }
}

class Dog extends Animal {
  constructor(Name, Gender, Saying) {
    super("Dog🐶", Name, Gender, Saying);
    this.Paws = "4";
    this.Tail = "1";
  }

  displayData() {
    return (
      `${super.displayData()} ` +
      ["Paws", "Tail"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon("; ")) +
      this.addBoldAndRedSemicolon(";") +
      this.saying()
    );
  }
}

class Cat extends Animal {
  constructor(Name, Gender, Saying) {
    super("Cat🐱", Name, Gender, Saying);
    this.Paws = "4";
    this.Tail = "1";
  }

  displayData() {
    return (
      `${super.displayData()} ` +
      ["Paws", "Tail"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon("; ")) +
      this.addBoldAndRedSemicolon(";") +
      this.saying()
    );
  }
}

class Hamster extends Animal {
  constructor(Name, Gender, Saying) {
    super("Hamster🐹", Name, Gender, Saying);
    this.Paws = "4";
    this.Tail = "1";
  }

  displayData() {
    return (
      `${super.displayData()} ` +
      ["Paws", "Tail"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon("; ")) +
      this.addBoldAndRedSemicolon(";") +
      this.saying()
    );
  }
}

class Snake extends Animal {
  constructor(Name, Gender, Saying) {
    super("Snake🐍", Name, Gender, Saying);
    this.Tail = "1";
  }
  displayData() {
    return (
      `${super.displayData()} ` +
      ["Tail"]
        .map(
          (propertyOfTheInhabitant) =>
            `${
              this.makeStringRedAndBold(propertyOfTheInhabitant) +
              this.addRedBoldCollon(":")
            } ${this[propertyOfTheInhabitant].bold()}`
        )
        .join(this.addBoldAndRedSemicolon("; ")) +
      this.addBoldAndRedSemicolon(";") +
      this.saying()
    );
  }
}

const man = new Man("Dimitrij", "Male", "Nice to meet you👋");
const woman = new Woman("Kate", "Female", "Have a good day🤗");
const dog = new Dog("Molly", "Female", "Bring me more food🍗 WOOF-woof!");
const cat = new Cat("Whiskey", "Male", "Meeow... I'm tired of Molly😑");
const hamster = new Hamster("Zhuzha", "Female", "Here is so cold🤧");
const snake = new Snake("Nagini", "Female", "Ssssssss");

const allInhabitants = [man, woman, dog, cat, hamster, snake];

allInhabitants.map((inhabitant) => {
  print(inhabitant.displayData());
});
