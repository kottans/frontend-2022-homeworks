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
      this.properties = [
         "name",
         "species",
         "gender",
         "legs",
         "hands",
         "saying",
      ];
   }

   get props() {
      return this.properties.map((value) => this[value]);
   }

   display(inhabitantsArr) {
      inhabitantsArr.map((inhabitant) => {
         print(inhabitant.props);
      });
   }
}

class Human extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender);
      this.legs = 2;
      this.hands = 2;
      this.saying = saying;
   }
}

class Cat extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender);
      this.legs = 4;
      this.hands = 0;
      this.saying = saying;
   }
}

class Dog extends Inhabitant {
   constructor(species, name, gender, saying) {
      super(species, name, gender);
      this.legs = 4;
      this.hands = 0;
      this.saying = saying;
   }
}

class CatWoman extends Cat {
   constructor(species, name, gender, saying) {
      super(species, name, gender, saying);
      this.hands = 2;
      this.legs = 2;
   }
}

const dog = new Dog("dog", "Toby", "male", "Woof!");
const cat = new Cat("cat", "Lily", "female", "meow!");
const woman = new Human("woman", "Linda", "female", "What a pretty kitten!");
const man = new Human("man", "Jim", "male", "Heyyo!");
const catWoman = new CatWoman("catWoman", "Ro", "female", cat.saying);

// ======== OUTPUT ========
const inhabitantsArr = [dog, cat, man, woman, catWoman];
const displayMethod = new Inhabitant();
displayMethod.display(inhabitantsArr);
