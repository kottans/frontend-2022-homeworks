import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details

   Code repository: https://github.com/igarok88/a-tiny-JS-world
   Web app: https://igarok88.github.io/a-tiny-JS-world/
   */

class Inhabitants {
  constructor(species, name, gender, legs, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
  }

  getInhabitantProps() {
    return [this.species, this.name, this.gender, this.legs, this.saying];
  }
}

class Human extends Inhabitants {
  constructor(species, name, gender, legs, hands, saying) {
    super(species, name, gender, legs, saying);
    this.hands = hands;
  }

  getInhabitantProps() {
    return [
      this.species,
      this.name,
      this.gender,
      this.legs,
      this.hands,
      this.saying,
    ];
  }
}

const dog = new Inhabitants("dog", "Sharik", "male", 4, "woof-woof!");
const cat = new Inhabitants("cat", "Mirzik", "male", 4, "meow-meow!");
const woman = new Human("woman", "Yulia", "famele", 2, 2, "Hi Ihor!");
const man = new Human("man", "Ihor", "male", 2, 2, "Hello Yulia!");

const inhabitants = [dog, cat, woman, man];

inhabitants.forEach((obj) => {
  print(obj.getInhabitantProps().join("; "));
});
