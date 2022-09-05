// class Animal {
//    constructor (species, name, gender){
//       this.species = species;
//       this.name = name;
//       this.gender = gender;
//    }
// }

class Entity {
   constructor (options){
      this.name = options.name;
      this.species = options.species;
      this.gender = options.gender;
      this.saying = options.saying;
   }
}

class Human extends Entity {
   constructor(options){
      super(options);
      this.species = 'Human';
      this.legs = 2;
      this.hands = 2;
   }
}

class Animal extends Entity {
   constructor(options){
      super(options);
      this.paws = 4;
   }
}

class Woman extends Human {
   constructor(options){
      super(options)
      this.gender = 'Woman';
   }
}

class Man extends Human {
   constructor(options){
      super(options)
      this.gender = 'Man';
   }
}

class CatWoman extends Woman {
   constructor(options){
      super(options);
      this.species = 'Half-woman, half-cat';
      this.saying = cat.saying;
   }
}

class Dog extends Animal {
   constructor(options){
      super(options)
      this.species = 'Dog'
   }
} 

class Cat extends Animal {
   constructor(options){
      super(options)
      this.species = 'Cat'
   }
}

const woman = new Woman({
   name: 'Olivia',
   saying: 'Hello!',
})

const man = new Man({
   name: 'Johny',
   saying: 'How are you my friend?',
})

const dog = new Dog({
   name: 'Dollar',
   gender: 'Boy',
   saying: 'Gav-gav!',
})

const cat = new Cat({
   name: 'Bonya',
   gender: 'Girl',
   saying: 'Meeeeooow!',
})

const catWoman = new CatWoman({
   name: 'Kitty',
})

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
