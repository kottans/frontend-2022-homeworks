/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Conversee12/a-tiny-JS-world.git
   Web app: https://conversee12.github.io/a-tiny-JS-world/
   */

class Inhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
   get tinyWorld() {
      return `${this.species}; ${this.name}; ${this.gender}; ${this.saying}`;
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying) {
      super('human', name, gender, saying);
      this.hands = 2;
      this.legs = 2;
   }
   get tinyWorld() {
      return `${this.species}; ${this.name}; ${this.gender}; ${this.hands}; ${this.legs}; ${this.saying}`;
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender, saying);
      this.paws = 4;
   }
   get tinyWorld() {
      return `${this.species}; ${this.name}; ${this.gender}; ${this.paws}; ${this.saying}`;
   }
}

class Man extends Human {
   constructor(name, saying) {
      super(name, 'male', saying);
   }
}

class Woman extends Human {
   constructor(name, saying) {
      super(name, 'female', saying);
   }
}

class Cat extends Animal {
   constructor(name, gender) {
      super('cat', name, gender, 'Meow');
   }
}

class Dog extends Animal {
   constructor(name, gender) {
      super('dog', name, gender, 'Hav-Hav');
   }
}

const inhabitants = [new Man("Vasyl", "Nothing can stop an idea whose time has come!"), new Woman("Oksana", "What's up?"),
new Cat("Pushok", "male"), new Dog("Reks", "male")];

inhabitants.forEach(residents => print(residents.tinyWorld));
