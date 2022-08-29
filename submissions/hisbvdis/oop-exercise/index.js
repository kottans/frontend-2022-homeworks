/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/hisbvdis/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }

  getProps() {
    return Object.getOwnPropertyNames(this).map((prop) => this[prop]);
  }
}

class Human extends Creature {
  constructor(name, gender, saying) {
    super("human", name, gender, saying);
    this.hands = 2;
    this.legs = 2;
  }
}

class Woman extends Human {
  constructor(name) {
    super(name, "female", "Where have you been all night?");
  }
}

class Man extends Human {
  constructor(name) {
    super(name, "male", "Bring me some more beer");
  }
}

class Animal extends Creature {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.species = species;
    this.legs = 4;
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super("dog", name, gender, "Woof-woof");
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender, "Meow");
  }
}

const dog = new Dog("Snoop", "male");
const cat = new Cat("Kitty", "female");
const woman = new Woman("Bella", "female");
const man = new Man("Vasya", "male");

// ======== OUTPUT ========
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

const inhabitants = [dog, cat, woman, man];

inhabitants.forEach((instance) => print(instance.getProps()));
