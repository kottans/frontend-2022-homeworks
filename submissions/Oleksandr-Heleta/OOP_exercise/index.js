/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitants {
   constructor(species, name, gender, say) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.say = say;
   }
   createInhabitantsString() {
      return Object.values(this).join('; ');
   }
}

class Human extends Inhabitants {
   constructor(species, name, gender, say, legs, hands) {
      super(species, name, gender, say);
      this.legs = legs;
      this.hands = hands;
   }
}

class Animal extends Inhabitants {
   constructor(species, name, gender, say, paws) {
      super(species, name, gender, say);
      this.paws = paws;

   }
}

const dog = new Animal('dog', 'Bob', "male", "bark", 4);
const cat = new Animal('cat', 'Kitty', "female", "meow", 4);

const man = new Human('human', 'John', "male", "Hello Jenny!", 2, 2);
const woman = new Human('human', 'Jenny', "female", "Hi John!", 2, 2);

const catWoman = new Human('human', 'Jenny', "female", cat.say, 2, 2);

const persons = [dog, cat, man, woman, catWoman];

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


print(persons.map((person) => person.createInhabitantsString()).join('\n'));

