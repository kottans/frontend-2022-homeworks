import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Semka094/a-tiny-JS-world
   Web app: https://semka094.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
  constructor({ species, name, gender, }) {
    this.name = name;
    this.species = species;
    this.gender = gender;
  }
}

class Human extends Inhabitant {
  constructor(props) {
    super(props);
    
    this.species = 'human';
    this.legs = 2;
    this.hands = 2;
  }
}

class Woman extends Human {
  constructor(props) {
    super(props);
    
    this.gender = 'female';
  }
}

class Man extends Human {
  constructor(props) {
    super(props);
    
    this.gender = 'male';
  }
}

class Animal extends Inhabitant {
  constructor(props) {
    super(props);
    
    this.species = 'animal';
    this.legs = 4;
    this.hands = 0;
  }
}

class Cat extends Animal {
  constructor(props) {
    super(props);

    this.saying = 'myau!';
  }
}

class Dog extends Animal {
  constructor(props) {
    super(props);

    this.saying = 'woof-woof!!';
  }
}

const knopa = new Cat({
  name: 'Knopa',
  gender: 'female',
});

const bubluk = new Dog({
  name: 'Bubluk',
  gender: 'male',
});

const olena = new Woman({
  name: 'Olena',
  saying: 'Hello there'
});

const kostia = new Man({
  name: 'Kostia',
  saying: 'Hi, folks!'
});

const objectToString = (object) => {
  return Object.entries(object).map(([key, value]) => `${key}: ${value}`).join(', ');

}

// ======== OUTPUT ========
print(objectToString(olena));
print(objectToString(kostia));
print(objectToString(bubluk));
print(objectToString(knopa));


