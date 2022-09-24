class Creature {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }

  friendsToString() {
    return this.friends.join(", ");
  }

  output() {
    const { name, species, gender, saying } = this;

    return `${name}; ${species}; ${gender}; ${saying}; ${this.friendsToString()}`;
  }
}

class Mammal extends Creature {
  constructor(species, name, gender, saying, friends, legs) {
    super(species, name, gender, saying, friends);
    this.legs = legs;
  }
  output() {
    return `${super.output()}; ${this.legs}`;
  }
}

class Animal extends Mammal {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends, 4);
  }
}

class Human extends Mammal {
  constructor(name, gender, saying, friends) {
    super("human", name, gender, saying, friends, 2);
    this.hands = 2;
  }
  output() {
    return `${super.output()}; ${this.hands}`;
  }
}

class Dog extends Animal {
  constructor(name, gender, saying, friends) {
    super("dog", name, gender, saying, friends);
  }
}

class Cat extends Animal {
  constructor(name, gender, saying, friends) {
    super("cat", name, gender, saying, friends);
  }
}

class Man extends Human {
  constructor(name, saying, friends) {
    super(name, "male", saying, friends);
  }
}

class Woman extends Human {
  constructor(name, saying, friends) {
    super(name, "female", saying, friends);
  }
}

class CatWoman extends Human {
  constructor(name, friends) {
    super(name, "female", sonya.saying, friends);
  }
}

const barbos = new Dog("Barbos", "male", "gav-gav kaje pes", [
  "definitely everybody in the world !",
]);
const sonya = new Cat("Sonya", "female", "meow-meow, skinbag...", [
  "definitely nobody except her own slaves",
]);
const oleksii = new Man("Oleksii", "Wanna be frontend ninja in future!", [
  "Alex",
  "Victoria",
  "every lovely kottan on the course",
]);
const victoria = new Woman(
  "Victoria",
  "When will you bring the money to home, honey?",
  ["Natasha", "Katya", "Lada"]
);
const anjela = new CatWoman("Anjela", [
  "definitely nobody except her own slaves, she's a cat, you know...",
]);

const tinyWorldInhabitants = [barbos, sonya, oleksii, victoria, anjela];

tinyWorldInhabitants.forEach((inhabitant) => print(inhabitant.output()));
