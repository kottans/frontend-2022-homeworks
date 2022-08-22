"use strict";

class Inhabitant {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
  say(event) {
    return this.vocabulary.hasOwnProperty(event)
      ? this.vocabulary[event]
      : "Nothing to say";
  }
  getInfo() {
    return `I'm ${this.species} and my name is ${this.name}.`;
  }
}

class Humans extends Inhabitant {
  constructor(name, gender) {
    super("Human", name);
    this.gender = gender;
    this.hands = 2;
    this.legs = 2;
  }
  getInfo() {
    return (
      super.getInfo() +
      ` I'm ${this.gender} with ${this.hands} hands and ${this.legs} legs.`
    );
  }
}

class FourLegged extends Inhabitant {
  constructor(name, gender) {
    super("Four-legged animal", name);
    this.gender = gender;
    this.paws = 4;
  }
  getInfo() {
    return super.getInfo() + ` I'm ${this.gender} with ${this.paws} paws.`;
  }
}

class CatlikeMutants extends Inhabitant {
  constructor(gender, name) {
    super("Mutant", name);
    this.gender = gender;
    this.hands = 2;
    this.legs = 2;
    this.say = this.say.bind(new Cat());
  }
  getInfo() {
    return (
      super.getInfo() +
      ` I'm ${this.gender} with ${this.hands} hands and ${this.legs} legs.`
    );
  }
}

class Man extends Humans {
  constructor(name) {
    super(name, "male");
    this.vocabulary = {
      hi: "Hey guys!",
    };
  }
  getInfo() {
    return `${this.say("hi")} ` + super.getInfo();
  }
}

class Woman extends Humans {
  constructor(name) {
    super(name, "female");
    this.vocabulary = {
      hi: "Hi cute!",
    };
  }
  getInfo() {
    return `${this.say("hi")} ` + super.getInfo();
  }
}

class Cat extends FourLegged {
  constructor(gender, name) {
    super(name, gender);
    this.vocabulary = {
      hi: "Nyav nyav!",
    };
  }
  getInfo() {
    return `${this.say("hi")} ` + super.getInfo();
  }
}

class Dog extends FourLegged {
  constructor(gender, name, birthday) {
    super(name, gender);
    this.vocabulary = {
      hi: "Woof woof!",
    };
  }
  getInfo() {
    return `${this.say("hi")} ` + super.getInfo();
  }
}

class WomanCat extends CatlikeMutants {
  constructor(name) {
    super("female", name);
  }
  getInfo() {
    return `${this.say("hi")} ` + super.getInfo();
  }
}

function initInhabitants() {
  //init some inhabitants for presentation
  return [
    new Man("Billy"),
    new Woman("Jinny"),
    new Cat("female", "Starling"),
    new Dog("male", "Oscar"),
    new WomanCat("Jessica"),
  ];
}

function printInhabitantsInfo(inhabitants) {
  inhabitants
    .map((person) => person.getInfo() + "\n")
    .forEach((info) => print(info));
}

printInhabitantsInfo(initInhabitants());
