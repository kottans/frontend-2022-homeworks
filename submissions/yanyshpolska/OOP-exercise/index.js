/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Yanyshpolska/a-tiny-JS-world
   Web app: https://yanyshpolska.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor(name, saying, sex) {
    this.name = name;
    this.type = this.constructor.name;
    this.saying = saying;
    this.sex = sex;
  }
  getInfo() {
    return [this.name, this.type, this.saying, this.sex];
  }
}

class Human extends Inhabitant {
  hands = 2;
  legs = 2;
  constructor(name, type, saying, sex) {
    super(name, type, saying, sex);
  }
  getInfo() {
    return [...super.getInfo(), this.hands, this.legs];
  }
}

class Animal extends Inhabitant {
  tail = 1;
  legs = 4;
  constructor(name, type, saying, sex) {
    super(name, type, saying, sex);
  }
  getInfo() {
    return [...super.getInfo(), this.tail, this.legs];
  }
}

class Cat extends Animal {
  constructor(name, type, saying, sex, legs, tail) {
    super(name, type, saying, sex, legs, tail);
  }
}

class Dog extends Animal {
  constructor(name, type, saying, sex, legs, tail) {
    super(name, type, saying, sex, legs, tail);
  }
}

const manTom = new Human("Tom", "Hi there!", "male");
const womanAnn = new Human("Ann", "Hello!", "female");
const catFlow = new Cat("Flow", "meow!", "female");
const dogBobik = new Dog("Bobik", "woof-woof!", "male");
const womanCat = new Human("Jess", catFlow.saying, "female");

const inhabitants = [manTom, womanAnn, catFlow, dogBobik, womanCat];

inhabitants.map((inhabitant) => {
  print(inhabitant.getInfo().join(", "));
});
