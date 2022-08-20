class Inhabitan {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
};

class Human extends Inhabitan {
   constructor(species, name, gender, saying, legs = 2, hands = 2) {
       super(species, name, gender, saying);
       this.legs = legs;
       this.hands = hands;
   }

   showPropsToPrint() {
      print([this.species, this.name, this.gender, this.legs, this.hands, this.saying].join('; '));
   }
};

class Animal extends Inhabitan {
   constructor(species, name, gender, saying, legs = 4) {
       super(species, name, gender, saying);
       this.legs = legs;
   }

   showPropsToPrint() {
      print([this.species, this.name, this.gender, this.legs, this.saying].join('; '));
   }
};

const dogToby = new Animal('dog', 'Toby', 'male', 'woof-woof!');
const catTom = new Animal('cat', 'Tom', 'male', 'hello Jerry!');
const womanMonica = new Human('woman', 'Monica', 'female', 'hello Joe!');
const manJoe = new Human('man', 'Joe', 'male', 'one hundred himars to these brave Ukrainians!');

const inhabitans = [dogToby, catTom, womanMonica, manJoe];

inhabitans.forEach(inhabitan => inhabitan.showPropsToPrint());


