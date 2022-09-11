class Entity {
   constructor (name, species, gender, saying){
      this.name = name;
      this.species = species;
      this.gender = gender;
      this.saying = saying;
   }
}

class Human extends Entity {
   constructor (name, gender, saying){
      super(name, 'Human', gender, saying);
      this.legs = 2;
      this.hands = 2;
   }
}

class Woman extends Human {
   constructor(name, saying){
      super(name, 'Woman', saying)
   }
}

class Animal extends Entity {
   constructor(name, gender, saying){
      super(name, 'Animal', gender, saying);
      this.paws = 4;
   }
}

class Man extends Human {
   constructor(name, saying){
      super(name, 'Man', saying)
   }
}

class CatWoman extends Woman {
   constructor(name){
      super(name, cat.saying);
   }
}

class Dog extends Animal {
   constructor(name, gender, saying){
      super(name, gender, saying)
   }
} 

class Cat extends Animal {
   constructor(name, gender, saying){
      super(name, gender, saying)
   }
}

const woman = new Woman('Olivia', 'Hello!')
const cat = new Cat('Bonya', 'Girl', 'Meeeeow!')
const dog = new Dog('Dollar', 'Boy', 'Gav-gav!')
const man = new Man('Johny', 'Hellllllooooo!')
const catWoman = new CatWoman('Kitty')

const allResidents = [woman, man, dog, cat, catWoman]
const allProp = ['name', 'species', 'gender', 'saying', 'legs', 'hands', 'paws']


function toPrint (arrayAllResidents) {
   const propToPrint = allProp.filter((propOfObj) => arrayAllResidents[propOfObj] !== undefined)
      .map((propOfObj) => arrayAllResidents[propOfObj]).join('; ');
   print(propToPrint);
}

function printAllObjects(arrayAllObjects){
   arrayAllObjects.forEach((characters) => {
      toPrint(characters);
   })
}

printAllObjects(allResidents);
