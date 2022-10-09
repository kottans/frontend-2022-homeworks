/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/unabyband/a-tiny-JS-world
   Web app: https://unabyband.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(species, name, gender, legs, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
  }

  printInhabitant() {
    const friendsToPrint = this.friends
      ? this.friends.map((friend) => friend.name).join(", ")
      : `${this.species} has no friends!`;
    
    return [this.species, 
      `<strong>${this.name}</strong>`, 
      this.gender, 
      `On ${this.legs} legs`, 
      `<em>${this.saying}</em>`, 
      friendsToPrint].join('; ');
  }  
}

class Human extends Inhabitant {
  constructor(name, gender, saying, friends) {
    const legs = 2;
    const hands = 2;
    super("human", name, gender, legs, saying, friends);
    this.hands = hands;
  }

  printInhabitant() {
    return [this.species,
        `<strong>${this.name}</strong>`,
        this.gender,
        `On ${this.legs} legs`,
        `Has ${this.hands} hands`,
        `<em>${this.saying}</em>`,
        this.friends.map((friend) => friend.name).join(", ")].join('; ');
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, 4, saying, friends);
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super("dog", name, gender, "Bark!", friends);
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender, "Meow!");
  }
}

const inhabitants = [
  new Human("Jenny", "female", "Hi all, I'm Jenny"),
  new Human("Alice", "female", "Whats up! Alice's here"),
  new Human("Eva", "female", "Hello, I am Eva"),
  new Human("John", "male", "Cheers, It's a John"),
  new Human("Bob", "male", "Peace folks, I'm Bob"),
  new Human("Adam", "male", "I am Adam, Hi buds!"),
  new Cat("Tom", "male"),
  new Cat("Molly", "female"),
  new Dog("Rex", "male"),
  new Dog("Lizzy", "female"),
];

function addFriends(person, friendsList) {
  const friendsStorage = [];
  friendsList.forEach(friendName => {
    friendsStorage.push(inhabitants.find((friend) => friend.name == friendName));
  });
  inhabitants.find((inhabitant) => inhabitant.name == person).friends = friendsStorage;
}

addFriends("Jenny", ["John", "Molly"]);
addFriends("Alice", ["Bob", "Adam", "Tom"]);
addFriends("Eva", ["Adam", "Tom", "Lizzy"]);
addFriends("John", ["Jenny", "Molly", "Rex"]);
addFriends("Bob", ["Alice", "Adam", "Tom", "Rex"]);
addFriends("Adam", ["Eva", "Tom", "Lizzy"]);
addFriends("Rex", ["Bob"]);
addFriends("Lizzy", ["Eva", "Adam"]);

inhabitants.forEach((creature) => print(creature.printInhabitant()));

