class Inhabitant {
  constructor(name, species, gender, friends, saying) {
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.friends = friends;
    this.saying = saying;
    this.properties = ["name", "species", "gender", "friends", "saying"];
  }
  toPrint() {
    return this.properties
      .filter((prop) => {
        return Boolean(this[prop]) != false;
      })
      .map((prop) => `my ${prop}: ` + this[prop])
      .join(", ");
  }
}

class Person extends Inhabitant {
  constructor(name, gender, friends, saying) {
    super(name, "human", gender, friends, saying);
    this.hands = 2;
    this.legs = 2;
  }

  toPrint() {
    return super.toPrint() + `, my hands: ${this.hands}, my legs: ${this.legs}`;
  }
}

class Man extends Person {
  constructor(name, friends, saying) {
    super(name, "man", friends, saying);
  }

  toPrint() {
    return super.toPrint();
  }
}

class Woman extends Person {
  constructor(name, friends, saying) {
    super(name, "woman", friends, saying);
  }

  toPrint() {
    return super.toPrint();
  }
}
class Animal extends Inhabitant {
  constructor(name, species, paws, gender, friends, saying) {
    super(name, species, gender, friends, saying);
    this.paws = paws;
  }

  toPrint() {
    return super.toPrint() + `, my paws: ${this.paws}`;
  }
}
class Cat extends Animal {
  constructor(name, species, paws, gender, friends) {
    super(name, species, paws, gender, friends, "meow");
  }

  toPrint() {
    return super.toPrint();
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super(name, "dog", 4, gender, friends, "woof");
  }

  toPrint() {
    return super.toPrint();
  }
}

class Catwoman extends Cat {
  constructor(name, paws, gender, hands, friends) {
    super(name, "catwoman", paws, gender, friends);
    this.hands = hands;
  }

  toPrint() {
    return super.toPrint() + `, my hands: ${this.hands}`;
  }
}

const inhabitants = [
  new Man("Bob", ["cat"], "hi"),
  new Woman("Kate", ["cat", "Bob"]),
  new Cat("Tom", "cat", 4, "male"),
  new Dog("Jack", "male", ["cat", "Jill"]),
  new Catwoman("Jane", 2, "female", 2, ["Ann"]),
];

inhabitants.forEach((inhabitant) => {
  print(inhabitant.toPrint());
});
