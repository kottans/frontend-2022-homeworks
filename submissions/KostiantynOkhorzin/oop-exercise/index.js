
class Inhabitan {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.keys = ['species', 'name', 'gender', 'saying'];
   }

   showPropsToPrint() {
      let props = [];
      this.keys.forEach((key) => {
         props.push(this[key]);
      })
      print(props.join('; '));
   }
};


class Human extends Inhabitan {
   constructor(name, gender, saying, legs = 2, hands = 2) {
      super('human', name, gender, saying);
      this.legs = legs;
      this.hands = hands;
      this.keys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
   }
};

class Animal extends Inhabitan {
   constructor(species, name, gender, saying, legs = 4) {
      super(species, name, gender, saying);
      this.legs = legs;
      this.keys = ['species', 'name', 'gender', 'legs', 'saying'];
   }
};

const dog = new Animal('dog', 'Toby', 'male', 'woof-woof!');
const cat = new Animal('cat', 'Tom', 'male', 'hello Jerry!');
const woman = new Human('Monica', 'female', 'hello Joe!');
const man = new Human('Joe', 'male', 'one hundred himars to these brave Ukrainians!');

const inhabitans = [dog, cat, woman, man];

inhabitans.forEach(inhabitan => inhabitan.showPropsToPrint());

