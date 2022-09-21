class Mammals {
   constructor (name, species, gender, saying){
      this.name = name;
      this.species = species;
      this.gender = gender;
      this.saying = saying;
   }

   getProps (){
      return [
         this.name,
         this.species,
         this.gender,
         this.saying,
      ]
   }
}

class Human extends Mammals {
   constructor (name, gender, saying){
      super(name, 'Human', gender, saying);
      this.legs = 2;
      this.hands = 2;
   }

   getProps (){
      return super.getProps().concat([this.legs, this.hands])
   }
}

class Woman extends Human {
   constructor(name, saying){
      super(name, 'Woman', saying)
   }
}

class Animal extends Mammals {
   constructor(name, gender, saying){
      super(name, 'Animal', gender, saying);
      this.paws = 4;
   }

   getProps (){
      return super.getProps().concat([this.paws])
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

allResidents.forEach((resident) => 
   print(resident.getProps().join('; '))
);
