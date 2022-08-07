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
  constructor(name, gender, saying) {
    super("animal", name, gender, saying);
    this.paw = 4;
  }
  getProperties() {
    return super.getProperties() + `; I have ${this.paw} paws;`;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying) {
    super("human", name, gender, saying);
    this.hands = 2;
    this.legs = 2;
  }

  getProperties() {
    return (
      super.getProperties() +
      `; I have ${this.legs} legs and ${this.hands} hands;`
    );
  }
}

class Dog extends Animal {
  constructor(name, gender, saying) {
    super(name, gender, saying);
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super(name, gender, "meow-meow");
  }
}
class Catwoman extends Cat {
  constructor(name, saying) {
    super(name, saying);
    this.species = "catwoman";
    this.gender = "female";
    this.hands = 2;
    this.legs = 2;
  }
  getProperties() {
    return (
      super.getProperties() +
      `; I have ${this.legs} paws and ${this.hands} paws;`
    );
  }
}

const dog = new Dog("Buddy", "male", "woof-woof!");
const cat = new Cat("Kitty", "female");
const catwoman = new Catwoman("Nazar");
const woman = new Human("Dazdraperma", "male", "It used to be better");
const man = new Human("Mike", "female", "Hello World!");

console.log(dog);

const inhabitants = [dog, cat, catwoman, woman, man];

inhabitants.forEach((inhabitant) => print(inhabitant.getProperties()));
