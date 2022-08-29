/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   
   Code repository: https://github.com/NadiaVorontsova/a-tiny-JS-world-OOP
   Web app: https://nadiavorontsova.github.io/a-tiny-JS-world-OOP/
   */

// ======== CLASS DEFINITIONS ========
class Inhabitant {
   constructor(species, name, gender, saying, friend) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.friend = friend || 'no friend:(';
   }
   printInhabitant() {
      return `I am a <strong>${this.species}</strong>; My name is <strong>${this.name}</strong>; I am a <strong>${this.gender}</strong>;
      I say: <strong>'${this.saying}'</strong>; My friends: <strong>${this.friend}</strong>`;
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying, friend) {
      super('human', name, gender, saying, friend);
      this.legs = 2;
      this.hands = 2;
   }
   printHuman() {
      return `${this.printInhabitant()}; I have <strong>${this.hands} hands</strong> and <strong>${this.legs} legs</strong>;`;
   }
}

class Man extends Human {
   constructor(name, gender, friend) {
      super(name, gender, 'Hello everybody!', friend);
   }
}

class Woman extends Human {
   constructor(name, gender, friend) {
      super(name, gender, 'Hello my friend!', friend);
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying, friend) {
      super(species, name, gender, saying, friend);
      this.paws = 4;
      this.tail = 1;
   }
   printAnimal() {
      return `${this.printInhabitant()}; I have <strong>${this.paws} paws</strong> and <strong>${this.tail} tail</strong>;`;
   }
}

class Dog extends Animal {
   constructor(name, gender, friend) {
      super('dog', name, gender, 'woof-woof', friend);
   }
}

class Cat extends Animal {
   constructor(name, gender, friend) {
      super('cat', name, gender, 'meow^^', friend);
   }
}

class CatWoman extends Cat {
   constructor(name, gender, friend) {
      super(name, gender, friend);
      this.species = 'cat-human';
   }
}

// ======== OUTPUT ========

const outputElement = document.createElement('div');
const mainBlock = document.querySelector('main');
mainBlock.appendChild(outputElement);

const dog = new Dog('Ben', 'male');
const cat = new Cat('Sarah', 'female', 'Halle Berry');
const man = new Man('Yura', 'male', 'Oksana');
const woman = new Woman('Oksana', 'female', 'Yura');
const catWoman = new CatWoman('Halle Berry', 'female', 'Sarah');

const animals = [dog, cat, catWoman];
animals.map(animal => outputElement.insertAdjacentHTML('beforeend',animal.printAnimal()+'<br>'));

const people = [man, woman];
people.map(human => outputElement.insertAdjacentHTML('beforeend',human.printHuman()+'<br>'));
