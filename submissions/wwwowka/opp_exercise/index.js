import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
    constructor(species, name, gender, saying, friends, legs, hands){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.saying = saying;
      this.friends = friends;
    }
    print(){
      return ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'].map(key => this[key]).join('; ');
  }
}

class Dog extends Inhabitant{
  constructor(name, gender, saying){
    super('dog', name, gender, saying);
    this.legs = 4;
  }
}

class Cat extends Inhabitant{
  constructor(name, gender, saying, friends){
    super('cat', name, gender, saying, friends);
    this.legs = 4;
  }
}

class Human extends Inhabitant{
  constructor(name, gender, legs, hands, saying, friends){
    super('human', name, gender, legs, hands, saying, friends);
    this.legs = 2;
    this.hands = 2;
  }
}

class Hybrid extends Inhabitant{
  constructor(name, gender, legs, hands, saying, friends){
    super('cat-human', name, gender, legs, hands, saying, friends);
    this.legs = 2;
    this.hands = 2;
    this.saying = cat.saying;
  }
}

const dog = new Dog    ('Life', 'male', 'woof-woof!');
const cat = new Cat    ('Mia', 'female', 'meow-yuu');
const woman = new Human('Ann', 'female', 'Hello!');
const man = new Human  ('Bob', 'male', 'Are you ready kids?');
const catWoman = new Hybrid('Selina', 'female');

dog.friends = [cat.name, man.name, woman.name, catWoman.name];
cat.friends = '-';
woman.friends = [man.name, catWoman.name, cat.name];
man.friends =  [woman.name, dog.name];
catWoman.friends = '-';

// ======== OUTPUT ========
const inhabitants = [dog, cat, woman, man, catWoman]
inhabitants.forEach( item => print(item.print()));


/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

 //Print examples:
 /*  print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
