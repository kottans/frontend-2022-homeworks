/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitants {
	constructor(species, name, legs, gender, talk) {
		this. species = species;
		this.name = name;
		this. legs = legs;
		this.gender = gender;
		this.talk = talk;
	}

	inhabitantsDescr() {
		return ["species", "name", "gender", "legs", "talk"]		       
           .map(property => this[property])
           .join("; ");
	}
}

class Dog extends Inhabitants {
	constructor (name, gender, talk) {
		super('dog', name, 4, gender, talk);
	}
}

class Cat extends Inhabitants {
	constructor(name, gender, talk) {
		super('cat', name, 4, gender, talk);
	}
}

class Human extends Inhabitants {
	constructor(name, gender, talk,) {
		super('human', name, 2, gender, talk);
		this.hands = 2;
	}

  inhabitantsDescr() {
    return `${super.inhabitantsDescr()}; ${this.hands}`;
  }
}

const dog = new Dog('Bim', 'male', 'woof!');
const cat = new Cat('Tom', 'male', "meow!");
const man = new Human('Jack', 'male', "Captain Jack Sparrow!");
const woman = new Human('Elizabeth', 'female', "He's A Pirate.");
const inhabitants = [dog, cat, man, woman];


inhabitants.forEach((resident) => print(resident.inhabitantsDescr()));

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


