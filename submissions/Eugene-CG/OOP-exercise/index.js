class Inhabitant {
  constructor(name, saying, gender, species) {
    this.name = name;
    this.saying = saying;
    this.gender = gender;
    this.species = species;
  }
  getProperties() {
    return `Name:${this.name} | Saying:${this.saying} | Gender:${this.gender} | Species:${this.species} |`;
  }
}
class Animal extends Inhabitant {
  constructor(name, saying, gender, species, paws) {
    super(name, saying, gender, species);
    this.paws = paws;
  }
  getProperties() {
    return super.getProperties() + ` Paws:${this.paws}`;
  }
}
class Human extends Inhabitant {
  constructor(name, saying, gender) {
    super(name, saying, gender, "Homo sapiens");
    this.legs = 2;
    this.hands = 2;
  }
  getProperties() {
    return super.getProperties() + ` Legs:${this.legs} | Hands:${this.hands}`;
  }
}
class Cat extends Animal {
  constructor(name, gender) {
    super(name, "meow", gender, "Felis catus", 4);
  }
}
class Dog extends Animal {
  constructor(name, gender) {
    super(name, "woof", gender, "Canis familiaris", 4);
  }
}
class Man extends Human {
  constructor(name, saying) {
    super(name, saying, "male");
  }
}
class Woman extends Human {
  constructor(name, saying) {
    super(name, saying, "female");
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
