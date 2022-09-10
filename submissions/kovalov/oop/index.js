class Inhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.properties = ['species', 'name', 'gender', 'saying'];
  }
  toString() {
    return this.properties
      .map((propName) => this[propName])
      .join('; ');
  }
}

class Mammal extends Inhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.legs = 4;
    this.properties = [...this.properties, 'legs'];
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying) {
    super('human', name, gender, saying);
    this.legs = 2;
    this.hands = 2;
    this.properties = [...this.properties, 'legs', 'hands'];
  }
}

class Dog extends Mammal {
  constructor(name, gender) {
    super('dog', name, gender, 'woof');
  }
}

class Cat extends Mammal {
  constructor(name, gender) {
    super('cat', name, gender, 'meow');
  }
}

class Woman extends Human {
  constructor(name, saying) {
    super(name, 'female', saying);
  }
}

class Man extends Human {
  constructor(name, saying) {
    super(name, 'male', saying);
  }
}

const dog = new Dog('Patron', 'male');
const cat = new Cat('Murzyk', 'male');
const woman = new Woman('Anna', 'Hola');
const man = new Man('Joey', 'How you doin');

const inhabitantDetails = [
  String(dog),
  String(cat),
  String(woman),
  String(man),
];

inhabitantDetails.forEach((item) => print(item));
