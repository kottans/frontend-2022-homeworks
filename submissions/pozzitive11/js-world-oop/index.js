class Inhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }

  getProperties() {
    return `${this.species}; My name ${this.name}; ${this.gender}; I have ${this.legs} legs and ${this.hands} hands; ${this.saying};` ;
  }
}

class Animals extends Inhabitant {
  constructor(species, name, gender, paw, saying) {
    super(species, name, gender, saying);
    this.paw = paw;
  }
  getProperties() {
    return `${this.species}; ${this.name}; ${this.gender}; I have ${this.paw} paws; ${this.saying};`;
  }
}

class Humans extends Inhabitant {
  constructor(species, name, gender, legs, hands, saying){
    super(species, name, gender, saying);
    this.legs = legs;
    this.hands = hands;
  }
}

class Dog extends Animals {
  constructor(species, name, gender, saying, paw) {
    super(species, name, gender, paw, saying);
  }
}

class Cat extends Animals {
  constructor(species, name, gender, paw) {
    super(species, name, gender, paw, "mew");
  }
}

class Catwoman extends Cat {
  constructor(species, name, gender, paws, saying) {
    super(species, name, gender, paws, saying);
  } 
}

class Man extends Humans {
  constructor(species, name, gender, legs, hands, saying) {
    super(species, name, gender, legs, hands, saying);
  }
}

class Woman extends Humans {
  constructor(species, name, gender, legs, hands, saying) {
    super(species, name, gender, legs, hands, saying);
  }
}

const dog = new Dog("dog", "Dick", "male", "woof-woof!", 4);
const cat = new Cat("cat", "Kitty", "female", 5);
const catwoman = new Catwoman("catwoman", "Nazar", "female", 2);
console.log(catwoman);
const woman = new Woman(
  "woman",
  "Dazdraperma",
  "female",
  2,
  2,
  "It used to be better"
);
const man = new Man("man", "Mike", "male", 2, 2, "Hello World!");

const inhabitants = [dog, cat, catwoman, woman, man];

inhabitants.forEach((inhabitant) => print(inhabitant.getProperties()));
