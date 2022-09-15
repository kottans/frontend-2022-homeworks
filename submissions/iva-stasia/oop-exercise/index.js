import { print } from './js/lib.js';

class Inhabitant {
   constructor(species, name, gender, legs, saying) {
      this.species = species,
      this.name = name,
      this.gender = gender,
      this.legs = legs,
      this.saying = saying
   }

   toPrint() {
      return `${this.species}. ${this.saying}! My name's ${this.name} and I'm ${this.gender}. I have ${this.legs} legs.`
   }
};

class Human extends Inhabitant {
   constructor({species = 'Human', name, gender, legs = '2', saying, hands = '2'}) {
      super(species, name, gender, legs, saying)
      this.hands = hands
   }

   toPrint() {
      return `${super.toPrint()} As a human, I also have ${this.hands} hands.`
   }
};

class Animal extends Inhabitant {
   constructor({species, name, gender, legs = '4', saying}) {
      super(species, name, gender, legs, saying)
   }
};

class Man extends Human {
   constructor({species, name, gender = 'male', legs, saying, hands}) {
      super({species, name, gender, legs, saying, hands})
   }
};

class Woman extends Human {
   constructor({species, name, gender = 'female', legs, saying, hands}) {
      super({species, name, gender, legs, saying, hands})
   }
};

class Dog extends Animal {
   constructor({species = 'Dog', name, gender, legs, saying}) {
      super({species, name, gender, legs, saying})
   }
};

class Cat extends Animal {
   constructor({species = 'Cat', name, gender, legs, saying}) {
      super({species, name, gender, legs, saying})
   }
};

class CatWoman extends Woman {
   constructor({species = 'Cat-Human', name, gender, legs, saying = cat.saying, hands}) {
      super({species, name, gender, legs, saying, hands})
   }
};

const man = new Man({name: 'Leon', saying: 'Glad to see you'});
const woman = new Woman({name: 'Matilda', saying: 'Hello'});
const dog = new Dog({name: 'Pretty', gender: 'male', saying: 'Woof-woof'});
const cat = new Cat({name: 'Kitty', gender: 'female', saying: 'Meeeow'});
const catWomen = new CatWoman({name: 'Selina'});

const inhabitants = [dog, cat, woman, man, catWomen];

inhabitants.forEach(inhabitant => {print(inhabitant.toPrint())});
