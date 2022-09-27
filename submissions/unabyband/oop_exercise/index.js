/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/unabyband/a-tiny-JS-world
   Web app: https://unabyband.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor (species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = `<strong>${name}</strong>`;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = `<em>${saying}</em>`;
    this.friends = friends;
  }

  printInhabitant () {
    print([this.species, this.name, this.legs, this.hands, this.saying, this.friends].join('; '));
  }
}

class Human extends Inhabitant {
  constructor (name, gender, saying, friends) {
    super('human', name, gender, 2, 2, saying, friends);
  }
}

class Animal extends Inhabitant {
  constructor (name, gender, saying, friends) {
    super('animal', name, gender, 4, 0, saying, friends);
  }
}

class Dog extends Animal {
  constructor (name, gender, friends) {
    super(name, gender, 'Bark!', friends);
  }
}

class Cat extends Animal {
  constructor (name, gender) {
    super(name, gender, 'Meow!', 'Cats have no friends');
  }
}

const inhabitants = [
  new Human('Jenny', 'female', "Hi all, I'm Jenny", 'John, Molly'),
  new Human('Alice', 'female', "Whats up! Alice's here", 'Bob, Adam, Tom'),
  new Human('Eva', 'female', "Hello, I am Eva", 'Adam, Tom, Lizzy'),
  new Human('John', 'male', "Cheers, It's a John", 'Jenny, Molly'),
  new Human('Bob', 'male', "Peace folks, I'm Bob", 'Alice, Adam, Tom, Rex'),
  new Human('Adam', 'male', "I am Adam, Hi buds!", 'Eva, Tom, Lizzy'),
  new Cat('Tom', 'male'),
  new Cat('Molly', 'female'),
  new Dog('Rex', 'male', 'Bob'),
  new Dog('Lizzy', 'female', 'Eva, Adam') 
 ];

inhabitants.forEach((creature) => creature.printInhabitant());
 

