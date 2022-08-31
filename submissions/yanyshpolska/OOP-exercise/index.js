/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Yanyshpolska/a-tiny-JS-world
   Web app: https://yanyshpolska.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, saying, sex, legs, species) {
    this.name = name;
    this.saying = saying;
    this.legs = legs;
    this.sex = sex;
    this.species = species;
  }
  getInfo() {
    return (
      this.name +
      ", " +
      this.saying +
      ", " +
      this.legs +
      ", " +
      this.sex +
      ", " +
      this.species
    );
  }
}

class Human extends Inhabitant {
  constructor(name, saying, sex, legs, species, hands) {
    super(name, saying, sex, legs, species);
    this.hands = hands;
  }
  getInfo() {
    return super.getInfo() + ", " + this.hands;
  }
}

class Animal extends Inhabitant {
  constructor(name, saying, sex, legs, species, tail) {
    super(name, saying, sex, legs, species);
    this.tail = tail;
  }
  getInfo() {
    return super.getInfo() + ", " + this.tail;
  }
}

const manTom = new Human("Tom", "Hi there!", "male", 2, "human", 2);
const womanAnn = new Human("Ann", "Hello!", "female", 2, "human", 2);
const catFlow = new Animal("Flow", "meow!", "female", 4, "cat", 1);
const dogBobik = new Animal("Bobik", "woof-woof!", "male", 4, "dog", 1);
const womanCat = new Human("Jess", catFlow.saying, "female", 2, "human", 2);

const inhabitants = [manTom, womanAnn, catFlow, dogBobik, womanCat];

inhabitants.map((inhabitant) => {
  print(inhabitant.getInfo());
});
