/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/franchukv/a-tiny-JS-world
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
      this.friends = friends ? friends : `no friends`;
      this.properties = ['species', 'gender', 'name', 'status', 'saying', 'friends',]
   }

   inhabinantPropetriesToString() {
      return this.properties.map((property) => this[property]).join('; ');
   }
}

class Human extends Inhabitants {
   constructor(gender, name, status, saying, friends) {
      super('human', gender, name, status, saying, friends);
      this.legs = 2;
      this.hands = 2;
      this.properties = [...this.properties, 'hands', 'legs'];
   }
}

class Man extends Human {
   constructor(name, status, saying, friends) {
      super('male', name, status, saying, friends);
   }
}

class Woman extends Human {
   constructor(name, status, saying, friends) {
      super('female', name, status, saying, friends);
   }
}

class Animal extends Inhabitants {
   constructor(species, gender, name, status, saying, friends) {
      super(species, gender, name, status, saying, friends);
      this.paws = 4;
      this.properties = [...this.properties, 'paws'];
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

const man = new Man('Drogo', 'Khal', 'Sheikh Ma Shieraki Anni');
const woman = new Woman('Daenerys', 'Daenerys of House Targaryen, First with Her Name, Breaker of Chains and Mother of Dragons', 'Drakaris', `Fell in love with ${man.name}`);
const dog = new Dog('male', 'Sharik', "Yard's terrier", 'woof-woof', `Only ${man.name} is friends`);
const cat = new Cat('female', 'Bastet', "Pharaoh's cat", 'Meow, bow to me', 'No friends, only servants');
const catwoman = new Woman('Selina Kyle', 'Superhero', cat.saying, `In astral connection with ${cat.name}`);

// ======== OUTPUT ========
const allInhabitants = [
   man.inhabinantPropetriesToString(),
   woman.inhabinantPropetriesToString(),
   dog.inhabinantPropetriesToString(),
   cat.inhabinantPropetriesToString(),
   catwoman.inhabinantPropetriesToString(),
];

allInhabitants.forEach((inhabitant) => print(inhabitant));
