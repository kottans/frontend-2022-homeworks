class Inhabitants {
   constructor(name, species, gender, saying) {
      this.name = name;
      this.species = species;
      this.gender = gender;
      this.saying = saying;
   }
   prepareforPrinting() {
      return `${this.name}; ${this.species}; ${this.gender}; ${this.saying};`
   }
}

class Humans extends Inhabitants {
   constructor(name, species, gender, saying, legs = 2, hands = 2) {
      super(name, species, gender, saying);
      this.legs = legs;
      this.hands = hands;
   }
   prepareforPrinting() {
      return `${super.prepareforPrinting()} ${this.legs}; ${this.hands}`;
   }
}

class Animals extends Inhabitants {
   constructor(name, species, gender, saying, legs = 4) {
      super(name, species, gender, saying);
      this.legs = legs;
   }
   prepareforPrinting() {
      return `${super.prepareforPrinting()} ${this.legs}`;
   }
}

class Dog extends Animals {
   constructor(name, species, gender, saying, legs) {
      super(name, species, gender, saying, legs);
   }
}
class Cat extends Animals {
   constructor(name, species, gender, saying, legs) {
      super(name, species, gender, saying, legs);
   }
}

const AlexMan = new Humans('Alex', 'human', 'male', 'Call me Thirteenth!');
const JohnMan = new Humans('John', 'human', 'male', 'My name is John');
const HarryMan = new Humans('Harry', 'human', 'male', 'Where is my magic wand?');

const AliceWomen = new Humans('Alice', 'human', 'female', 'I have special DNA');
const EmmaWomen = new Humans('Emma', 'human', 'female', 'Who is there?');
const StacyWomen = new Humans('Stacy', 'human', 'female', 'Hi!');

const BaxterDog = new Dog('Baxter', 'dog', 'male', 'Woof-woof!');
const ArniDog = new Dog('Arni', 'dog', 'male', 'Woof-woof!');

const LunyaCat = new Cat('Lunya', 'cat', 'female', 'Meeooow!');
const TaychikCat = new Cat('Taychik', 'cat', 'male', 'Meeooow!');


const inhabitants = [AlexMan, JohnMan, HarryMan, AliceWomen, EmmaWomen, StacyWomen, BaxterDog, ArniDog, LunyaCat, TaychikCat];
inhabitants.forEach(inhabitant => {
   print(inhabitant.prepareforPrinting());
});
