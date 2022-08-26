
class Inhabitan {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.keys = ['species', 'name', 'gender', 'saying'];
   }

   showProps() {
      return ['species', 'name', 'gender', 'saying'].map(key => this[key]).join('; ');
   }
};

class Human extends Inhabitan {
   constructor(name, gender, saying, legs = 2, hands = 2) {
      super('human', name, gender, saying);
      this.legs = legs;
      this.hands = hands;
   }

   connectsProps() {
      const props = super.showProps().split('; ');
      const propsStart = props.slice(0, props.indexOf('gender'));
      const propsEnd = props.slice(props.indexOf('gender'));
      return [...propsStart, this.legs, this.hands, ...propsEnd].join('; ');
   }

   showProps() {
      return this.connectsProps();
   }
};

class Animal extends Inhabitan {
   constructor(species, name, gender, saying, legs = 4) {
      super(species, name, gender, saying);
      this.legs = legs;
   }

   connectsProps() {
      const props = super.showProps().split('; ');
      const propsStart = props.slice(0, props.indexOf('gender'));
      const propsEnd = props.slice(props.indexOf('gender'));
      return [...propsStart, this.legs, ...propsEnd].join('; ');
   }

   showProps() {
      return this.connectsProps();
   }
};

const dog = new Animal('dog', 'Toby', 'male', 'woof-woof!');
const cat = new Animal('cat', 'Tom', 'male', 'hello Jerry!');
const woman = new Human('Monica', 'female', 'hello Joe!');
const man = new Human('Joe', 'male', 'one hundred himars to these brave Ukrainians!');

const inhabitans = [dog, cat, woman, man];

inhabitans.forEach(inhabitan => print(inhabitan.showProps()));

