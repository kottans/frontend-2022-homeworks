/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/helengreent/a-tiny-JS-world/tree/populate-world
   Web app: https://helengreent.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

// const dog = {
//   species: "dog",
//   name: "Rex",
//   gender: "male",
//   legs: 4,
//   hands: 0,
//   saying: "woof",
// };

// const cat = {
//   species: "cat",
//   name: "Archie",
//   gender: "male",
//   legs: 4,
//   hands: 0,
//   saying: "meow",
// };

// const man = {
//   species: "human",
//   name: "Nate",
//   gender: "male",
//   legs: 2,
//   hands: 2,
//   saying: "Hello",
// };

// const woman = {
//   species: "human",
//   name: "Serena",
//   gender: "female",
//   legs: 2,
//   hands: 2,
//   saying: "Hey!",
// };

// const catWoman = {
//   species: "catWoman",
//   name: "Blair",
//   gender: "female",
//   legs: 2,
//   hands: 2,
//   saying: cat.saying,
// };
// const populations = [dog, cat, man, woman, catWoman];
// const properties = ["species", "name", "gender", "legs", "hands", "saying"];

class Populations {
  constructor(species, name, gender, legs, saying) {
   this.species = species;
   this.name = name;
   this.gender = gender;
   this.legs = legs;
   this.saying = saying;
}
getOutput() {
 const properties = ['species', 'name', 'gender', 'legs', 'saying'];
 return properties.map(prop => prop + ':'+ this[prop])
 .join('; '); 
}
}
class HumanBeing extends Populations {
 constructor(species, name, gender, saying, hands) {
     super(species, name, gender, 2, saying);
     this.hands = 2;
 }
 getOutput() {
   return super.getOutput() + '; hands: ' + this.hands;
 } 
}

class Human extends HumanBeing {
 constructor(name, gender, saying) {
   super('human', name, gender, saying);
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

class Animal extends Populations {
 constructor(species, name, gender, saying) {
     super(species, name, gender, 4, saying);
 }
}

class Dog extends Animal {
 constructor(name, gender) {
     super('dog', name, gender, 'woof');
 }
}

class Cat extends Animal {
 constructor(name, gender) {
     super('cat', name, gender);
     this.saying = Cat.say()
 }
 static say() {
   return 'meow';
 } 
}

class CatWoman extends HumanBeing {
 constructor(name) {
     super('catWoman', name, 'female', Cat.say());
 }
}

let man = new Man('Nate', 'Hello');
let woman = new Woman('Serena', 'Hey!');
let cat = new Cat('Archie', 'male');
let dog = new Dog('Rex', 'male');
let catWoman = new CatWoman('Blair');

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

// const message = (arr, types) =>
// arr.map((item) => types.map((type) => item[type]).join("; ")).join("\n");
// print(message(populations,properties));

const populations = [man, woman, catWoman, cat, dog];
populations.forEach(populations => print(populations.getOutput()))
