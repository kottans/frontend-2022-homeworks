class Animal {
   constructor (species, name, gender){
      this.species = species;
      this.name = name;
      this.gender = gender;
   }
}

class Human {
   constructor (name, species, gender, legs, hands, saying){
      this.name = name;
      this.species = species;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.saying = saying;
   }
}

class Woman extends Human {
   constructor(name, saying){
      super(name, 'Human', 'Woman', 2, 2, saying)
   }
}

class Man extends Human {
   constructor(name, saying){
      super(name, 'Human', 'Man', 2, 2, saying)
   }
}

class Dog extends Animal {
   constructor (name, gender, saying){
      super('Dog', name, gender);
      this.paws = 4;
      this.saying = saying;
   }
}

class Cat extends Animal {
   constructor (name, gender, saying){
      super('Cat', name, gender);
      this.paws = 4;
      this.saying = saying;
   }
}

class CatWoman extends Woman {
   constructor(name){
      super(name);
      this.species = 'Half-woman, half-cat';
      this.saying = cat.saying;
   }
}

const woman = new Woman('Olivia', 'Hello!');
const man = new Man('Johny', 'How are you my friend?');
const dog = new Dog ('Dollar', 'boy', 'Gav-gav!');
const cat = new Cat ('Bonya', 'girl', 'Meoooow');
const catWoman = new CatWoman ('Katty');

const allResidents = [woman, man, dog, cat, catWoman]

function printAllResidents(allResidentsArray) {
   for (let i = 0; i < allResidentsArray.length; i++){
      const prop = Object.keys(allResidentsArray[i]);
      const propToPrint = prop.map((propOfObj) => allResidentsArray[i][propOfObj])
      let strToPrint = propToPrint.join('; ');
      print(strToPrint);
   }
}

printAllResidents(allResidents);
