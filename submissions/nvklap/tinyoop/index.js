/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(species, name, gender, saying, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.legs = legs;
  }

  getProperties() {
    return ['species', 'name', 'gender', 'saying', 'legs']
      .map((property) => this[property])
      .join('; ');
  }
}

class Human extends Inhabitant {
  constructor(gender, name, saying, legs = 2) {
    super('human', name, gender, saying, legs);
    this.hands = 2;
  }
  getProperties() {
    return `${super.getProperties()}; ${this.hands}`;
  }
}

class Woman extends Human {
  constructor(name, saying) {
    super('female', name, saying);
  }
}

class Man extends Human {
  constructor(name, saying) {
    super('male', name, saying);
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, legs = 4) {
    super('dog', name, gender, 'Woof!', legs);
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, legs = 4) {
    super('cat', name, gender, 'Meow!', legs);
  }
}

// // ======== OUTPUT ========
const dog = new Dog('Hugo', 'male');
const cat = new Cat('Kitsya', 'female');
const man = new Man('George', '...Hm');
const woman = new Woman('Dorothy', 'Well...');

const inhabitants = [dog, cat, man, woman];
inhabitants.forEach((inhabitant) => print(inhabitant.getProperties()));
