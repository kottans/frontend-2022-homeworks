/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
  constructor(species, name, gender, saying, legs) {
    this.species = species;
    this.name = name;
    this.saying = saying;
    this.gender = gender;
    this.legs = legs;
  }
  say() {
    return (
      "Hi! I'm " +
      this.species +
      ". My name is " +
      this.name +
      ". My gender is " +
      this.gender +
      ". I've " +
      this.legs +
      " legs" +
      " . I want to say " +
      this.saying +
      "."
    );
  }
}

//
class Human extends Creature {
  constructor(name, gender, saying, legs = 2) {
    super("human", name, gender, saying, legs);
  }
}
class Animal extends Creature {
  constructor(species, name, gender, saying, legs = 4) {
    super(species, name, gender, saying, legs);
  }
}
class Cat extends Animal {
  constructor(name, gender, saying, legs) {
    super("cat", name, gender, saying, legs);
  }
}
class Dog extends Animal {
  constructor(name, gender, legs) {
    super("dog", name, gender, legs);
  }
}
class Man extends Human {
  constructor(name, gender, saying, legs) {
    super(name, gender, saying, legs);
  }
}
class Woman extends Human {
  constructor(name, gender, saying, legs) {
    super(name, gender, saying, legs);
  }
}
const cat = new Cat("Mars", "male", "mmeeow");
const dog = new Dog("Sara", "female", "woofff!!!");
const man = new Man("Ron", "male", "ahoj!");
const woman = new Woman("Hermione", "female", "hiiii");

const creatures = [cat, dog, man, woman];
console.log(creatures);

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
