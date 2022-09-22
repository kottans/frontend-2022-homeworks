/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _https://github.com/Nik3264/a-tiny-JS-world_
   Web app: _https://nik3264.github.io/a-tiny-JS-world/_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Animal {
  constructor({ species, name, gender, legs }) {
    this.species = species || "spesies not assigned";
    this.name = name || "name not assigned";
    this.gender = gender || "gender not assigned";
    this.legs = legs || "legs not assigned, may be 4";
    this.properties = ["species", "name", "gender", "legs"];
  }

  getProperties() {
    return this.properties.map((property) => {
      return `${property}: <strong>${this[property]}</strong>`;
    });
  }
}

class Dog extends Animal {
  constructor(name, gender) {
    super({ name, gender });
    this.species = "dog";
    this.legs = 4;
    Dog.setSaying("gav-gav!");
  }

  static setSaying(saying) {
    this._saying = saying;
  }
  static getSaying() {
    return this._saying;
  }
  getProperties() {
    return [
      ...super.getProperties(),
      `saying: <strong>${Dog.getSaying()}</strong>`,
    ];
  }
}

class Cat extends Animal {
  constructor(name, gender) {
    super({ name, gender });
    this.species = "cat";
    this.legs = 4;
    Cat.setSaying("mio-mi!");
  }

  static setSaying(saying) {
    this._saying = saying;
  }
  static getSaying() {
    return this._saying;
  }
  getProperties() {
    return [
      ...super.getProperties(),
      `saying: <strong>${Cat.getSaying()}</strong>`,
    ];
  }
}

class Catwoman extends Cat {
  constructor(name) {
    super(name);
    this.species = "catwoman";
    this.gender = "female";
    this.legs = 2;
    this.hands = 2;
  }

  getProperties() {
    return [...super.getProperties(), `hands: <strong>${this.hands}</strong>`];
  }
}

class Human extends Animal {
  constructor(name, gender, saying) {
    super({ name, gender });
    this.species = "men";
    this.legs = 2;
    this.hands = 2;
    this.saying = saying || "I may saying samething.";
  }
  getProperties() {
    return [
      ...super.getProperties(),
      `hands: <strong>${this.hands}</strong>`,
      `saying: <strong>${this.saying}</strong>`,
    ];
  }
}

function createInstance(classNam, number = 0) {
  const arrayOfInstans = [];
  for (let i = 0; i < number; i++) {
    arrayOfInstans.push(Object.create(classNam));
  }
  return arrayOfInstans;
}

const inhabitants = [
  ...createInstance(new Cat(), 2),
  ...createInstance(new Dog(), 2),
  ...createInstance(new Human("", "male","Доброго ранку! Ми з України!"), 3),
  ...createInstance(new Human("", "female"), 3),
  ...createInstance(new Catwoman("Judy"), 1),
];

print(
  inhabitants.map((instance) => instance.getProperties().join("; ")).join("\n")
);
Cat.setSaying("Hello! I'm cat!");
print(
  inhabitants.map((instance) => instance.getProperties().join("; ")).join("\n")
);

