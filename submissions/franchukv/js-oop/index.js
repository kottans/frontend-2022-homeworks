/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/franchukv/a-tiny-JS-world/
   Web app: https://franchukv.github.io/a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========
class Inhabitants {
   constructor(species, gender, name, status, saying, friends) {
      this.species = species;
      this.gender = gender;
      this.name = name;
      this.status = status;
      this.saying = saying;
      this.friends = friends;
      this.properties = ['species', 'gender', 'name', 'status'];
   }

   objToString() {
      return this.properties.map((property) => this[property]).join('; ');
   }

   toMakeFriends() {
      return this.properties.push('friends');
   }

}

class Human extends Inhabitants {
   constructor(species, gender, name, status, saying, friends) {
      super(species, gender, name, status, saying, friends);
      this.hands = 2;
      this.feets = 2;
      this.properties = [...this.properties, 'hands', 'feets', 'saying'];
   }
}

class Animal extends Inhabitants {
   constructor(species, gender, name, status, saying, friends) {
      super(species, gender, name, status, saying, friends);
      this.feets = 4;
      this.properties = [...this.properties, 'feets', 'saying'];
   }
}

class Man extends Human {
   constructor(name, status, saying, friends) {
      super('human', 'male', name, status, saying, friends);
   }
}

class Woman extends Human {
   constructor(name, status, saying, friends) {
      super('human', 'female', name, status, saying, friends);
   }
}

class Dog extends Animal {
   constructor(gender, name, status, saying, friends) {
      super('dog', gender, name, status, saying, friends);
   }
}

class Cat extends Animal {
   constructor(gender, name, status, saying, friends) {
      super('cat', gender, name, status, saying, friends);
   }
}

const man = new Man('Drogo', 'Khal', 'Sheikh Ma Shieraki Anni.');
const woman = new Woman('Daenerys', 'Daenerys of House Targaryen, First with Her Name, Breaker of Chains and Mother of Dragons', 'Drakaris!', `Fell in love with ${man.name}.`);
const dog = new Dog('male', 'Sharik', "Yard's terrier", 'woof-woof!', `Only ${man.name} is friends.`);
const cat = new Cat('female', 'Bastet', "Pharaoh's cat", 'Meow, bow to me!', 'No friends, only servants!');
const catwoman = new Woman('Selina Kyle', 'Superhero', cat.saying, `In astral connection with ${cat.name}.`);

// ======== OUTPUT ========
const allInhabitants = [
   man.objToString(),
   woman.objToString(woman.toMakeFriends()),
   dog.objToString(dog.toMakeFriends()),
   cat.objToString(cat.toMakeFriends()),
   catwoman.objToString(catwoman.toMakeFriends()),
];

allInhabitants.forEach((inhabitant) => print(inhabitant));
