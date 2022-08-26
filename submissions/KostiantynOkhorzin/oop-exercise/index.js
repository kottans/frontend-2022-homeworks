
class Inhabitan {
   constructor(species, name, gender, legs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
   }

   showProps() {
      return ['species', 'name', 'gender', 'legs', 'saying'].map(key => this[key]).join('; ');
   }
};

class Human extends Inhabitan {
   constructor(name, gender, saying, legs = 2, hands = 2) {
      super('human', name, gender, legs, saying);
      this.hands = hands;
   }

   showProps() {
      return `${super.showProps()} ${this.hands};`
   }
};

class Dog extends Inhabitan {
   constructor(name, gender, saying, legs = 4) {
      super('dog', name, gender, saying);
      this.legs = legs;
   }
};

class Cat extends Inhabitan {
   constructor(name, gender, saying, legs = 4) {
      super('cat', name, gender, legs, saying);
   }
};

const dog = new Dog('Toby', 'male', 'woof-woof!');
const cat = new Cat('Tom', 'male', 'hello Jerry!');
const woman = new Human('Monica', 'female', 'hello Joe!');
const man = new Human('Joe', 'male', 'one hundred himars to these brave Ukrainians!');

const inhabitans = [dog, cat, woman, man];

inhabitans.forEach(inhabitan => print(inhabitan.showProps()));

