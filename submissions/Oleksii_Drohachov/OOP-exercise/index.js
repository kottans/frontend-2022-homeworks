class Creature {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }

  output() {
    const { name, species, gender, saying, friends } = this;

    return `${name}; ${species}; ${gender}; ${saying}; ${friends.join(", ")}`;
  }
}

class Mammal extends Creature {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.legs = 4;
  }
  output() {
    return `${super.output()}; ${this.legs}`;
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

class Dog extends Mammal {
  constructor(name, gender, saying, friends) {
    super("dog", name, gender, saying, friends);
  }
}

class Cat extends Mammal {
  constructor(name, gender, saying, friends) {
    super("cat", name, gender, saying, friends);
  }
}

const barbos = new Dog("Barbos", "male", "gav-gav kaje pes", [
  "definitely everybody in the world !",
]);
const sonya = new Cat("Sonya", "female", "meow-meow, skinbag...", [
  "definitely nobody except her own slaves",
]);
const oleksii = new Human(
  "Oleksii",
  "male",
  "Wanna be frontend ninja in future!",
  ["Alex", "Victoria", "every lovely kottan on the course"]
);
const victoria = new Human(
  "Victoria",
  "female",
  "When will you bring the money to home, honey?",
  ["Natasha", "Katya", "Lada"]
);
const anjela = new Human("Anjela", "female", sonya.saying, [
  "definitely nobody except her own slaves, she's a cat, you know...",
]);

const tinyWorldInhabitants = [barbos, sonya, oleksii, victoria, anjela];

tinyWorldInhabitants.forEach((inhabitant) => print(inhabitant.output()));
