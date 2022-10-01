/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/unabyband/a-tiny-JS-world
   Web app: https://unabyband.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor (species, name, gender, legs, hands, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.friends = friends;
  }

  printInhabitant () {
    const nameToPrint = `<strong>${this.name}</strong>`;
    const talkToPrint = `<em>${this.saying}</em>`;
    const friendsToPrint = this.friends ? this.friends.map(friend => friend.name).join(', ') : 'Cats have no friends';
    const limbs = this.hands !=0 ? `On ${this.legs} legs and has ${this.hands} hands` : `On ${this.legs} paws`;

    print([this.species, nameToPrint, this.gender, limbs, talkToPrint, friendsToPrint].join('; '));
  }
}

class Human extends Inhabitant {
  constructor (name, gender, saying, friends) {
    super('human', name, gender, 2, 2, saying, friends);
  }
}

class Animal extends Inhabitant {
  constructor (species, name, gender, saying, friends) {
    super(species, name, gender, 4, 0, saying, friends);
  }
}

class Dog extends Animal {
  constructor (name, gender, friends) {
    super('Dog', name, gender, 'Bark!', friends);
  }
}

class Cat extends Animal {
  constructor (name, gender) {
    super('Cat', name, gender, 'Meow!');
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

 function addFriends (person, friendsList) {
  let friendsStorage = [];
  for (let i=0; i<friendsList.length; i++)
  {
    inhabitants.forEach(friend => {if(friend.name == friendsList[i]) {
    friendsStorage.push(friend);
  }});
  }
  inhabitants.forEach(inhabitant => {if(inhabitant.name == person) {
    inhabitant.friends = friendsStorage;
  }});
}

addFriends('Jenny', ['John', 'Molly']);
addFriends('Alice', ['Bob', 'Adam', 'Tom']);
addFriends('Eva', ['Adam', 'Tom', 'Lizzy']);
addFriends('John', ['Jenny' ,'Molly' ,'Rex']);
addFriends('Bob', ['Alice', 'Adam', 'Tom', 'Rex']);
addFriends('Adam', ['Eva', 'Tom', 'Lizzy']);
addFriends('Rex', ['Bob']);
addFriends('Lizzy', ['Eva', 'Adam']);

inhabitants.forEach((creature) => creature.printInhabitant());

