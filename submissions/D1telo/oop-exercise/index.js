import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
class Person{
   constructor(name,gender,saying){
      this.species = this.constructor.name;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
   getInfo(){
      return[this.species, this.name, this.gender, this.saying];
   }
}
class Human extends Person{
   legs = 2;
   hands = 2;
   constructor(name,gender,saying){
      super(name,gender,saying);
   }
   getInfo(){
      return [...super.getInfo(), this.legs, this.hands];
   }
}
class Animal extends Person{
   legs = 4;
   constructor(name,gender,saying){
      super(name,gender,saying);
   }
   getInfo(){
      return [...super.getInfo(), this.legs];
   }
}
class Dog extends Animal{
   constructor(name,gender,saying,legs){
      super(name,gender,saying,legs);
   }
}
class Cat extends Animal{
   constructor(name,gender,saying,legs){
      super(name,gender,saying,legs);
   }
}

const dogToby = new Dog('Toby','male','woof-woof!');
const catTom = new Cat('Tom','female','meow-meow!');
const manDen = new Human('Denys','male', 'Glory Ukraine!');
const womanAnna = new Human('Anna','female', 'Support Ukraine!');
const womanCat = new Human('Jesica','female',catTom.saying);

const person = [dogToby,catTom,manDen,womanAnna,womanCat];

person.map((person)=>{
   print(person.getInfo().join(','));
});