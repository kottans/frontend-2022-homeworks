/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitants {
   constructor(species, name, gender, legs, say) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.say = say;
      this.propertiesOrder = ['species', 'name', 'gender', 'legs', 'say']
   }

   addProperty(property, order) {
      this.propertiesOrder.splice(order, 0, property);
   }

   createString() {
      return this.propertiesOrder.map((property) => this[property] || 'none');
   }
}

class Human extends Inhabitants {
   constructor(name, gender, say) {
      super('human', name, gender, 2, say);
      this.hands = 2;
      this.addProperty('hands', 4);
   }
}

class Animal extends Inhabitants {
   constructor(species, name, gender, say) {
      super(species, name, gender, 4, say);
   }
}

class Dog extends Animal {
   constructor(name, gender) {
      super('dog', name, gender, "bark");
   }
}

class Cat extends Animal {
   constructor(name, gender) {
      super('cat', name, gender, "meow");
   }
}

class CatWoman extends Human {
   constructor(name, gender) {
      super(name, gender)
      this.mutation = new Cat();
      this.say = this.mutation.say
   }
}


const dog = new Dog('Bob', "male");
const cat = new Cat('Kitty', "female");

const man = new Human('John', "male", "Hello Jenny!");
const woman = new Human('Jenny', "female", "Hi John!");

const catWoman = new CatWoman('Jenny', "female");

const persons = [dog, cat, man, woman, catWoman];

function createString(persons) {
   return persons.map((person) => person.createString()).join('\n');
}


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


print(createString(persons));


