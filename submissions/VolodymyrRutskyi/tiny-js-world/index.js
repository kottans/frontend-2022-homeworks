class Inhabitant {
   constructor(species, name, gender, saying){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.props = ['species', 'name', 'gender', 'saying']
   }
   showProps() {
      return this.props.map(prop => this[prop]).join('; ');
   }
}

class Human extends Inhabitant{
   constructor (name, gender, saying){
      super('human', name, gender, saying);
      this.hands = 2;
      this.legs = 2;
      this.props = [...this.props, 'hands', 'legs']
   }
}
class Woman extends Human{
   constructor(name, saying){
      super(name, 'female', saying)
   }
}
class Man extends Human{
   constructor(name, saying){
      super(name, 'male', saying);
   }
}
class Dog extends Inhabitant{
   constructor(name, gender){
      super('dog', name, gender, 'woof-woof');
      this.legs = 4;
      this.props = [...this.props, 'legs']
   }
}
class Cat extends Inhabitant{
   constructor(name, gender){
      super('cat', name, gender, 'meow-meow');
      this.legs = 4;
      this.props = [...this.props, 'legs']
   }
}

const dog = new Dog('Timmy', 'male');
const cat = new Cat('Mars', 'male');
const woman = new Woman('Sarah', 'Hello, my name is Sarah!');
const man = new Man('Kevin', 'Hello, my name is Kevin!');
const inhabitants = [dog, cat, woman, man]; 

inhabitants.forEach((inhabitant) =>
  print(inhabitant.showProps())
);