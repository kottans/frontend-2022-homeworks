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
    this.properties = [...this.properties, "hands", "legs"];
  }
}

class Man extends Person {
  constructor(name, friends, saying) {
    super(name, "man", friends, saying);
  }
}

class Woman extends Person {
  constructor(name, friends, saying) {
    super(name, "woman", friends, saying);
  }
}
class Animal extends Inhabitant {
  constructor(name, species, legs, gender, friends, saying) {
    super(name, species, gender, friends, saying);
    this.legs = legs;
    this.properties = [...this.properties, "legs"];
  }
}
class Cat extends Animal {
  constructor(name, species, legs, gender, friends) {
    super(name, species, legs, gender, friends, "meow");
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super(name, "dog", 4, gender, friends, "woof");
  }
}

class Catwoman extends Cat {
  constructor(name, legs, gender, hands, friends) {
    super(name, "catwoman", legs, gender, friends);
    this.hands = hands;
    this.properties = [...this.properties, "hands"];
  }
}

const inhabitants = [
  new Man("Bob", ["cat"], "hi"),
  new Woman("Kate", ["cat", "Bob"]),
  new Cat("Tom", "cat", 4, "male"),
  new Dog("Jack", "male", ["cat", "Jill"]),
  new Catwoman("Jane", 2, "female", ["Ann"]),
];

inhabitants.forEach((item) => {
  print(item.toPrint());
});
