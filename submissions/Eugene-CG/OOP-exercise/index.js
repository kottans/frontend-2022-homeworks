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
  constructor(name, saying, gender, species, paws) {
    super(name, saying, gender);
    this.species = species;
    this.paws = paws;
  }
  getProperties() {
    return super.getStr() + `${this.species} ${this.paws}`;
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
    return super.getStr() + `${this.species} ${this.legs} ${this.hands}`;
  }
}
class Cat extends Animal {
  constructor(name, gender, saying = "meow") {
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Felis catus";
  }
}
class Dog extends Animal {
  constructor(name, gender, saying = "woof") {
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Canis familiaris";
  }
}
class Man extends Human {
  constructor(name, saying, gender = "male") {
    super(name, saying, gender);
  }
}
class Woman extends Human {
  constructor(name, saying, gender = "female") {
    super(name, saying, gender);
  }
}
const inhabitants = [
  new Cat("Eugene", "male"),
  new Dog("Toby", "male"),
  new Man("John", "I am a man"),
  new Woman("Yennefer", "Nice to meet you"),
].forEach((inhabitant) => {
  print(inhabitant.getProperties());
});
