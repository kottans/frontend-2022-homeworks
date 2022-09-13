class Inhabitant {
   constructor(species, name, gender, legs, saying){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying;
      this.props = ['species', 'name', 'gender', 'legs', 'saying']
   }
   showProps() {
      return this.props.map(prop => this[prop]).join('; ');
   }
}

class Human extends Inhabitant{
   constructor (species, name, gender, saying){
      super(species, name, gender, 2, saying);
      this.hands = 2;
      this.props = [...this.props, 'hands']
   }
}
class Woman extends Human{
   constructor(name, gender, saying){
      super('woman', name, gender, saying)
   }
}
class Man extends Human{
   constructor(name, gender, saying){
      super('man', name, gender, saying);
   }
}
class Dog extends Inhabitant{
   constructor(name, gender){
      super('dog', name, gender, 4, 'woof-woof')
   }
}
class Cat extends Inhabitant{
   constructor(name, gender){
      super('cat', name, gender, 4, 'meow-meow')
   }
}

const dog = new Dog('Timmy', 'male');
const cat = new Cat('Mars', 'male');
const woman = new Woman('Sarah', 'female', 'Hello, my name is Sarah!');
const man = new Man('Kevin', 'male', 'Hello, my name is Kevin!');
const inhabitants = [dog, cat, woman, man]; 

inhabitants.forEach((inhabitant) =>
  print(inhabitant.showProps())
);

