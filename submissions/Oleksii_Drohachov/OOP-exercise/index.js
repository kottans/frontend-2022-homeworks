class Creature {
  constructor(name, gender, saying, friends) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
    this.propsArray = [
      "species",
      "name",
      "gender",
      "legs",
      "hands",
      "saying",
      "friends",
    ];
  }
  output = () => {
    return this.propsArray
      .map((property) =>
        Array.isArray(this[property])
          ? this[property].join(", ")
          : this[property]
      )
      .join("; ");
  };
}

class Animal extends Creature {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
    this.legs = 4;
    this.hands = 0;
  }
}

class Human extends Creature {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
    this.species = "human";
    this.legs = 2;
    this.hands = 2;
  }
}

class Dog extends Animal {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
    this.species = "dog";
  }
}

class Cat extends Animal {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
    this.species = "cat";
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

tinyWorldInhabitants.forEach((item) => print(item.output()));
