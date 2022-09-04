class Inhabitant {
  constructor(name, saying, gender) {
    this.name = name;
    this.saying = saying;
    this.gender = gender;
  }
  getStr() {
    return `${this.name} ${this.saying} ${this.gender} `;
  }
}
class Animal extends Inhabitant {
  constructor(name, saying, gender) {
    super(name, saying, gender);
  }
  getProperties() {
    return super.getStr() + this.species + this.paws;
  }
}
class Human extends Inhabitant {
  constructor(name, saying, gender) {
    super(name, saying, gender);
    this.legs = 2;
    this.hands = 2;
    this.species = "Homo sapiens";
  }
  getProperties() {
    return super.getStr() + this.species + this.legs + this.hands;
  }
}
class Cat extends Animal {
  constructor(name, saying, gender) {
    saying = saying || "meow";
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Felis catus";
  }
}
class Dog extends Animal {
  constructor(name, saying, gender) {
    saying = saying || "woof";
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Canis familiaris";
  }
}
class Man extends Human {
  constructor(name, saying) {
    super(name, saying);
    this.gender = "male";
  }
}
class Woman extends Human {
  constructor(name, saying) {
    super(name, saying);
    this.gender = "female";
  }
}
class CatWoman extends Cat {
  constructor(name, saying, gender) {
    super(name, saying, gender);
    this.legs = 2;
    this.hands = 2;
    this.species = "сatwoman";
  }
  getProperties() {
    return super.getStr() + this.species + this.legs + this.hands;
  }
}
const inhabitants = [
  new Cat("Eugene", "Meow", "male"),
  new Dog("Toby", "Woof-Woof", "male"),
  new Man("John", "I am a man"),
  new Woman("Yennefer", "Nice to meet you"),
  new CatWoman("Violet Flower", null, "female"),
].forEach((inhabitant) => {
  print(inhabitant.getProperties());
});
