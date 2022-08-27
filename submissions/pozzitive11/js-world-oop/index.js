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
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
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
    return super.getProperties() + `; I have ${this.legs} legs and ${this.hands} hands;`;
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super("dog", name, gender, "Woof-woof!");
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender, "meow-meow");
  }
}
class Catwoman extends Cat {
  constructor(name, gender) {
    super(name, gender);
    this.species = 'catwoman';
  }
}

const dog = new Dog("Buddy", "male");
const cat = new Cat("Kitty", "female");
const catwoman = new Catwoman("Nazar", "female");
const woman = new Human("Dazdraperma", "female", "It used to be better");
const man = new Human("Mike", "male", "Hello World!");

const inhabitants = [dog, cat, catwoman, woman, man];

inhabitants.forEach((inhabitant) => print(inhabitant.getProperties()));
