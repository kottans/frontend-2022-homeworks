class Inhabitants {
   constructor(name, species, gender, saying) {
      this.name = name;
      this.species = species;
      this.gender = gender;
      this.saying = saying;
   }
   prepareforPrinting() {
      return [this.name, this.species, this.gender, this.saying].join('; ');
   }
}

class Humans extends Inhabitants {
   constructor(name, gender, saying) {
      super(name, 'human', gender, saying);
      this.legs = 2;
      this.hands = 2;
   }
   prepareforPrinting() {
      return [super.prepareforPrinting(), this.legs, this.hands].join('; ');
   }
}

class Auadrupeds extends Inhabitants {
   constructor(name, species, gender, saying) {
      super(name, species, gender, saying);
      this.legs = 4;
   }
   prepareforPrinting() {
      return [super.prepareforPrinting(), this.legs].join('; ');
   }
}

class Dog extends Auadrupeds {
   constructor(name, gender, saying) {
      super(name, 'dog', gender, saying);
   }
}
class Cat extends Auadrupeds {
   constructor(name, gender, saying) {
      super(name, 'cat', gender, saying);
   }
}

const AlexMan = new Humans('Alex', 'male', 'Call me Thirteenth!');
const JohnMan = new Humans('John', 'male', 'My name is John');
const HarryMan = new Humans('Harry', 'male', 'Where is my magic wand?');

const AliceWomen = new Humans('Alice', 'female', 'I have special DNA');
const EmmaWomen = new Humans('Emma', 'female', 'Who is there?');
const StacyWomen = new Humans('Stacy', 'female', 'Hi!');

const BaxterDog = new Dog('Baxter', 'male', 'Woof-woof!');
const ArniDog = new Dog('Arni', 'male', 'Woof-woof!');

const LunyaCat = new Cat('Lunya', 'female', 'Meeooow!');
const TaychikCat = new Cat('Taychik', 'male', 'Meeooow!');


const inhabitants = [AlexMan, JohnMan, HarryMan, AliceWomen, EmmaWomen, StacyWomen, BaxterDog, ArniDog, LunyaCat, TaychikCat];
inhabitants.forEach(inhabitant => {
   print(inhabitant.prepareforPrinting());
});
