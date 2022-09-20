import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const data = [
   {
      id: 0,
      species: 'human',
      name: 'George',
      gender: 'male',
      legs: 2,
      hands: 2,
      say: 'Hello OOP World!',
      friends: [1, 2],
   },
   {
      id: 1,
      species: 'human',
      name: 'Samantha',
      gender: 'female',
      legs: 2,
      hands: 2,
      say: 'Hi, my name is Sam!',
      friends: [0, 3],
   },
   {
      id: 2,
      species: 'cat',
      name: 'Tom',
      gender: 'male animal',
      legs: 4,
      say: 'Meow-meow',
   },
   {
      id: 3,
      species: 'dog',
      name: 'Allegra',
      gender: 'female animal',
      legs: 4,
   },
   {
      id: 4,
      species: 'fairyTaleCat',
      name: 'Anne',
      gender: 'female',
      legs: 2,
      hands: 2,
      friends: [0, 1, 2],
   }
];

class Creature {
   constructor(id, name, gender, say) {
      this.id = id;
      this.name = name;
      this.gender = gender;
      this.say = say;
   }

   message() {
      return `${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.hands}; ${this.legs}; <em>${this.say}</em>;`;
   }
}

class Human extends Creature {
   constructor(id, name, gender, hands, legs, say, friends) {
      super(id, name, gender, say);
      this.species = 'human';
      this.hands = hands;
      this.legs = legs;
      this.friends = friends;
   }

   message() {
      return super.message() + ` ${this.friends.join(', ')}`;
   }
}

class Animal extends Creature {
   constructor(id, name, gender, legs) {
      super(id, name, gender);
      this.species = 'animal';
      this.hands = 0;
      this.legs = legs;
   }
}

class Cat extends Animal {
   constructor(id, name, gender, legs) {
      super(id, name, gender, legs);
      this.say = 'Meow-meow';
   }
}

class FairyTaleCat extends Cat {
   constructor(id, name, gender, hands, legs, friends) {
      super(id, name, gender, legs);
      this.species = 'fairy tale human';
      this.hands = hands;
      this.friends = friends;
   }

   message() {
      return super.message() + ` ${this.friends.join(', ')}`;
   }
}

class Dog extends Animal {
   constructor(id, name, gender, legs) {
      super(id, name, gender, legs);
      this.say = 'Woof-woof';
   }
}

const friendlist = friends => {
   return friends.map(id => {
      const listOfNames = data.reduce((names, creature) => {
         if(id === creature.id) names.push(creature.name);

         return names;
      }, []);

      return listOfNames;
   });
};

data.forEach(creature => {
   let type;

   if(creature.species === 'human') {
      const { id, name, gender, hands, legs, say, friends } = creature;
      type = new Human(id, name, gender, hands, legs, say, friendlist(friends));
   }

   if(creature.species === 'cat') {
      const { id, name, gender, legs } = creature;
      type = new Cat(id, name, gender, legs);
   }

   if(creature.species === 'dog') {
      const { id, name, gender, legs } = creature;
      type = new Dog(id, name, gender, legs);
   }

   if(creature.species === 'fairyTaleCat') {
      const { id, name, gender, hands, legs, friends } = creature;
      type = new FairyTaleCat(id, name, gender, hands, legs, friendlist(friends));
   }

   if(type) print(type.message());
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
