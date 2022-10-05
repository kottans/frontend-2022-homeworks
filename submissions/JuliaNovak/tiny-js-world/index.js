// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Inhabitant {
   constructor(species, name, gender, legs, hands, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.hands = hands;
      this.saying = saying;
   }

   display() {
      console.log(this);
      let values = "";
      for (const prop in this) {
         values += ` ${this[prop]}`;
      }
      print(values);
   }
}

class Human extends Inhabitant {
   constructor(name, gender, saying) {
      super("human", name, gender);
      this.legs = 2;
      this.hands = 2;
      this.saying = saying;
   }
}

class Animal extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender, saying);
      delete this.hands;
      this.legs = 4;
   }
}
class Cat extends Animal {
   constructor(name, gender, saying) {
      super("cat", name, gender);
      this.saying = saying;
   }
}

class Dog extends Animal {
   constructor(name, gender, saying) {
      super("dog", name, gender);
      this.saying = saying;
   }
}

class CatWoman extends Cat {
   constructor(species, name, gender, saying) {
      super(species, name, gender, saying);
      this.species = "catWoman";
      this.hands = 2;
      this.legs = 2;
   }
}

const dog = new Dog("Toby", "male", "Woof!");
const cat = new Cat("Lily", "female", "meow!");
const woman = new Human("Linda", "female", "What a pretty kitten!");
const man = new Human("Jim", "male", "Heyyo!");
const catWoman = new CatWoman("Ro", "female", cat.saying);

// ======== OUTPUT ========
const inhabitantsArr = [dog, cat, man, woman, catWoman];
inhabitantsArr.forEach((inhabitant) => inhabitant.display());
