class Inhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }

  getProperties() {
    return `${this.species}; My name ${this.name}; ${this.gender}; ${this.saying}`;
  }
}
class Animal extends Inhabitant {
  constructor(species, name, gender, paw, saying) {
    super(species, name, gender, saying);
    this.paw = paw;
  }
  getProperties() {
    return super.getProperties() + `; I have ${this.paw} paws;`;
  }
}

class Human extends Inhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.legs = 2;
    this.hands = 2;
  }

  getProperties() {
    return (
      super.getProperties() +
      `; I have ${this.legs} legs and ${this.hands} hands;`
    );
  }
}

class Dog extends Animal {
  constructor(species, name, gender, saying, paw) {
    super(species, name, gender, paw, saying);
  }
}

class Cat extends Animal {
  constructor(species, name, gender, paw) {
    super(species, name, gender, paw, "meow-meow");
  }
}
class Catwoman extends Cat {
  constructor(species, name, gender, paws, saying) {
    super(species, name, gender, paws, saying);
  }
}

class Man extends Human {
  constructor(name, gender, saying) {
    super("man", name, gender, saying);
  }
}

class Woman extends Human {
  constructor(name, gender, saying) {
    super("woman", name, gender, saying);
  }
}

const dog = new Dog("dog", "Dick", "male", "woof-woof!", 4);
const cat = new Cat("cat", "Kitty", "female", 5);
const catwoman = new Catwoman("catwoman", "Nazar", "female", 2);
const woman = new Woman("Dazdraperma", "female", "It used to be better");
const man = new Man("Mike", "male", "Hello World!");

const inhabitants = [dog, cat, catwoman, woman, man];

inhabitants.forEach((inhabitant) => print(inhabitant.getProperties()));
