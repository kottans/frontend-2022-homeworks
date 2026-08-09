/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/YarHadi/a-tiny-JS-world
   Web app: https://yarhadi.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
   name;
   gender;
   saying;
 
   constructor(name, gender, saying) {
     this.name = name;
     this.gender = gender;
     this.saying = saying;
   }
   show() {
     const keys = ["species", "name", "gender", "legs", "hands", "saying"];
     print(keys.map((key) => this[key]).join(", "));
   }
 }
 
 class Animal extends Inhabitant {
   constructor(species, name, gender, saying) {
     super(name, gender, saying);
     this.species = species;
     this.legs = 4;
     this.hands = 0;
   }
 }
 
 class Human extends Inhabitant {
   constructor(name, gender, saying) {
     super(name, gender, saying);
     this.species = "human";
     this.legs = 2;
     this.hands = 2;
   }
 }
 
 const dog = new Animal("dog", "Mitsu", "female", "Woof-Woof!");
 const cat = new Animal("cat", "Flicker", "male", "Meow!");
 const woman = new Human("Alice", "female", "Hello!");
 const catWoman = new Human("Diana", "female", cat.saying);
 const man = new Human("Billy", "male", "Ass we can!");
 
 const inhabitants = [dog, cat, woman, catWoman, man];
 
 inhabitants.forEach((inhabitant) => inhabitant.show());

 