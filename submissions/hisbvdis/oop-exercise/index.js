/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/hisbvdis/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Creature {
  constructor(species, name, gender, saying, legs) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.props = [
      { prop: "species", preface: "I am a" },
      { prop: "name", preface: "My name is" },
      { prop: "gender", preface: "I am a" },
      { prop: "saying", preface: "I can say —" },
      { prop: "legs", preface: "I have legs:" },
    ];
  }

  getProps() {
    return this.props
      .map(({ prop, preface }) => `${preface} ${this[prop]}`)
      .join("; ");
  }
}

class Human extends Creature {
  constructor(name, gender, saying) {
    super("human", name, gender, saying, 2);
    this.hands = 2;
    this.props = [
      ...this.props,
      { prop: "hands", preface: "I have hands:" },
    ]
  }

  getProps() {
    return super.getProps()
  }
}

class Woman extends Human {
  constructor(name, saying) {
    super(name, "female", saying);
  }
}

class Man extends Human {
  constructor(name, saying) {
    super(name, "male", saying);
  }
}

class Animal extends Creature {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
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

const woman1 = new Woman("Bella", "Honey, i'm home!!!");
const woman2 = new Woman("Lisa", "Where have you been all night?");
const woman3 = new Woman("Margareth", "Mom told me...");

const man1 = new Man("Vasya", "Bring me some more beer");
const man2 = new Man("Vasya", "If a little, then maybe");

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

const inhabitants = [dog, cat, woman1, woman2, woman3, man1, man2];

inhabitants.forEach((instance) => print(instance.getProps()));
