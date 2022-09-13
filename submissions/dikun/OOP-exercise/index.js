/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
	constructor(species, name, legs, gender, talk) {
		this. species = species;
		this.name = name;
		this. legs = legs;
		this.gender = gender;
		this.talk = talk;
	}

	inhabitantDescr() {
		return ['species', 'name', 'gender', 'legs', 'talk']		       
           .map(property => this[property])
           .join("; ");
	}
}

class Dog extends Inhabitant {
	constructor (name, gender) {
		super('dog', name, 4, gender, 'woof!');
	}
}

class Cat extends Inhabitant {
	constructor(name, gender) {
		super('cat', name, 4, gender, 'meow!');
	}
}

class Catwoman extends Cat { 
  constructor(name, gender) {
		super(name, gender);
    this.species = 'catwoman';
    this.legs = 2;
    this.hands = 2;
	}
  inhabitantDescr() {
    return `${super.inhabitantDescr()}; ${this.hands}`;
  }
}

class Human extends Inhabitant {
	constructor(name, gender, talk,) {
		super('human', name, 2, gender, talk);
		this.hands = 2;
	}

  inhabitantDescr() {
    return `${super.inhabitantDescr()}; ${this.hands}`;
  }
}

const dog = new Dog('Bim', 'male');
const cat = new Cat('Tom', 'male');
const man = new Human('Jack', 'male', 'Captain Jack Sparrow!');
const woman = new Human('Elizabeth', 'female', 'He is a Pirate.');
const catwoman = new Catwoman('Lisa', 'female');
const inhabitants = [dog, cat, man, woman, catwoman];


inhabitants.forEach((resident) => print(resident.inhabitantDescr()));

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


