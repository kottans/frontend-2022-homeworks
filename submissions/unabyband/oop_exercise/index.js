/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/unabyband/a-tiny-JS-world
   Web app: https://unabyband.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor (species, name, gender, limbs, saying, friends = 'Cats have no friends!') {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.limbs = limbs;
    this.saying = saying;
    this.friends = friends;
  }

  printInhabitant () {
    print(`${this.species}; <strong>${this.name}</strong>; ${this.gender}; ${this.limbs.join('; ')}; <em>${this.saying}</em>; ${this.friends}`);
  }
}

class Human extends Inhabitant {
  constructor (name, gender, saying, friends) {
    super('human', name, gender, [2, 2], saying, friends);
  }
}

class Animal extends Inhabitant {
  constructor (name, gender, saying, friends) {
    super('animal', name, gender, [4], saying, friends);
  }
}

class Dog extends Animal {
  constructor (name, gender, friends) {
    super(name, gender, 'Bark!', friends);
  }
}

class Cat extends Animal {
  constructor (name, gender) {
    super(name, gender, 'Meow!');
  }
}

const inhabitants = [
  new Human('Jenny', 'female', "Hi all, I'm Jenny"),
  new Human('Alice', 'female', "Whats up! Alice's here"),
  new Human('Eva', 'female', "Hello, I am Eva"),
  new Human('John', 'male', "Cheers, It's a John"),
  new Human('Bob', 'male', "Peace folks, I'm Bob"),
  new Human('Adam', 'male', "I am Adam, Hi buds!"),
  new Cat('Tom', 'male'),
  new Cat('Molly', 'female'),
  new Dog('Rex', 'male'),
  new Dog('Lizzy', 'female') 
 ];
 
 /*Here's my function for adding friends to inhabitants, 
 the first argument is index of subject at inhabitants array
 all next arguments are indexes of his friends.
 I know, it's optional, but hoping my solution is not too primitive*/

 function addFriends(...arguments) {
  let friendsList = [];
  for(let i = 1; i < arguments.length; i++) {
    friendsList.push(inhabitants[arguments[i]].name);
  }
  inhabitants[arguments[0]].friends = friendsList.join(', ');
 }

addFriends(0, 3, 7);
addFriends(1, 4, 5, 6);
addFriends(2, 5, 6, 9);
addFriends(3, 0, 7);
addFriends(4, 1, 5, 6, 8);
addFriends(5, 2, 6, 9);
addFriends(8, 4);
addFriends(9, 1, 2);

 inhabitants.forEach((creature) => creature.printInhabitant());
 
 
 
