/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/Eugene-CG/a-tiny-JS-world
   Web app: https://eugene-cg.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
  constructor(name, saying, gender) {
    this.name = name;
    this.saying = saying;
    this.gender = gender;
  }
  getName() {
    return `name:${this.name}; `;
  }
  getSaying() {
    return `saying:${this.saying}; `;
  }
  getGender() {
    return `gender:${this.gender}; `;
  }
  getSpecies() {
    return `species:${this.species}; `;
  }
  getLegs() {
    return `legs:${this.legs}; `;
  }
  getHands() {
    return `hands:${this.hands}; `;
  }
  getPaws() {
    return `paws:${this.paws}; `;
  }
}
class Animal extends Inhabitant {
  constructor(name, saying, gender) {
    super(name, saying, gender);
    // this.paws = 4;
    // this.species = "animal";
  }
  getProperties() {
    return (
      super.getName() +
      super.getSaying() +
      super.getGender() +
      super.getSpecies() +
      super.getPaws()
    );
  }
}
class Human extends Inhabitant {
  constructor(name, saying, gender) {
    super(name, saying, gender);
    this.legs = 2;
    this.hands = 2;
    this.species = "Homo sapiens";
  }
  getProperties() {
    return (
      super.getName() +
      super.getSaying() +
      super.getGender() +
      super.getSpecies() +
      super.getLegs() +
      super.getHands()
    );
  }
}
class Cat extends Animal {
  constructor(name, saying = "Meow", gender) {
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Felis catus";
  }
}
class Dog extends Animal {
  constructor(
    name,
    saying = "By default Im sating helo guyc my name dog  im e dog nice to meet me ",
    gender
  ) {
    super(name, saying, gender);
    this.paws = 4;
    this.species = "Canis familiaris";
  }
}
class Man extends Human {
  constructor(name, saying) {
    super(name, saying);
    this.gender = "male";
  }
}
class Woman extends Human {
  constructor(name, saying) {
    super(name, saying);
    this.gender = "female";
  }
}
class CatWoman extends Cat {
  constructor(name) {
    super(name);
    this.legs = 2;
    this.hands = 2;
    this.species = "сatwoman";
    this.gender = "female";
  }
  getProperties() {
    return (
      super.getName() +
      super.getSaying() +
      super.getGender() +
      super.getSpecies() +
      super.getLegs() +
      super.getHands()
    );
  }
}
const inhabitants = [
  new Cat("Eugene", "Meow", "male"),
  new Dog("Toby", "Woof-Woof", "male"),
  new Man("John", "I am a man"),
  new Woman("Yennefer", "Nice to meet you"),
  new CatWoman("Violet Flower"),
].forEach((inhabitant) => {
  print(inhabitant.getProperties());
});
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
