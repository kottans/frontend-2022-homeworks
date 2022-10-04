/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(species, name, gender, saying, legs) {
    this.species = species;
    this.name = name;
    this.saying = saying;
    this.gender = gender;
    this.legs = legs;
  }
  say() {
    return `
      Hi! I'm ${this.species}. My name is ${this.name}. My gender is ${this.gender}. I've ${this.legs} legs. I want to say ${this.saying}.`;
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying, hands = 2) {
    super("human", name, gender, saying, 2);
    this.hands = hands;
  }
  say() {
    return super.say() + ("I have " + this.hands + " hands.");
  }
}
class Animal extends Inhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying, 4);
  }
}
class Cat extends Animal {
  constructor(name, gender, saying) {
    super("cat", name, gender, saying);
  }
}
class Dog extends Animal {
  constructor(name, gender, saying) {
    super("dog", name, gender, saying);
  }
}
class Man extends Human {
  constructor(name, saying) {
    super(name, "male", saying);
  }
}
class Woman extends Human {
  constructor(name, saying) {
    super(name, "female", saying);
  }
}

const cat = new Cat("Mars", "male", "mmeeow");
const dog = new Dog("Sara", "female", "woofff");
const man = new Man("Ron", "ahoj");
const woman = new Woman("Hermione", "hiiii");

const creatures = [cat, dog, man, woman];

// ======== OUTPUT ========
creatures.forEach((creature) => print(creature.say()));

/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
