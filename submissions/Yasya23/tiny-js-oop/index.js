class Inhabitants {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }

  showProperties() {
    return [this.species, this.name, this.gender, this.saying];
  }
}

class Human extends Inhabitants {
  constructor(name, gender, saying) {
    super("human", name, gender, saying);
    this.hands = 2;
    this.legs = 2;
  }

  showProperties() {
    return [
      ...super.showProperties().slice(0, 3),
      this.hands,
      this.legs,
      ...super.showProperties().slice(3, 4),
    ];
  }
}

class Animal extends Inhabitants {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.paws = 4;
  }
  showProperties() {
    return [
      ...super.showProperties().slice(0, 3),
      this.paws,
      ...super.showProperties().slice(3, 4),
    ];
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

inhabitants.forEach((inhabitant) =>
  print(inhabitant.showProperties().join("; "))
);
