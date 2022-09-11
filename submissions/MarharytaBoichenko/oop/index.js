class Inhabitant {
  constructor(name, species, friends, saying) {
    this.name = name;
    this.species = species;
    this.friends = friends;
    this.saying = saying;
    this.properties = ["name", "species", "friends", "saying"];
  }
  toPrint() {
    return this.properties
      .map((prop) => {
        const neededProp = this[prop] === undefined ? `no ${prop}` : this[prop];
        return `my ${prop}: ` + neededProp;
      })
      .join(", ");
  }
}

class Person extends Inhabitant {
  constructor(name, gender, friends, saying) {
    super(name, "human", friends, saying);
    this.gender = gender;
    this.hands = 2;
    this.legs = 2;
    this.properties = [...this.properties, "gender", "hands", "legs"];
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
    super(name, species, friends, saying);
    this.legs = legs;
    this.gender = gender;
    this.properties = [...this.properties, "gender", "legs"];
  }
}
class Cat extends Animal {
  constructor(name, species, legs, gender, friends) {
    super(name, species, legs, gender, friends, "meow");
  }
}

class Dog extends Animal {
  constructor(name, legs, gender, friends) {
    super(name, "dog", legs, gender, friends, "woof");
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
  new Man("Bob", ["cat", "John"]),
  new Woman("Kate"),
  new Cat("Tom", "cat", 4, "male"),
  new Dog("Jack", 4, "male"),
  new Catwoman("Jane", 2, "female", 2, ["Ann"]),
];

inhabitants.forEach((item) => {
  print(item.toPrint());
});
