/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/OlexiyDobroskok/a-tiny-JS-world
   Web app: https://olexiydobroskok.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Resident {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.gender = gender;
    this.friends = friends;
    this.name = name;
    this.saying = saying;
  }
  printPresentation() {
    const properties = [
      this.species,
      this.name,
      this.gender,
      this.legs,
      this.paws,
      this.hands,
      this.saying,
      this.friends,
    ];
    const activeProperties = properties.filter(
      (prop) => prop !== undefined && prop !== ""
    );
    print(activeProperties.join("; "));
  }
}

class Human extends Resident {
  constructor(name, gender, saying, friends) {
    super("human", name, gender, saying, friends);
    this.hands = 2;
    this.legs = 2;
  }
}

class Pet extends Resident {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.paws = 4;
  }
}

class Cat extends Pet {
  constructor(name, gender, saying, friends) {
    super("cat", name, gender, saying, friends);
  }
}

class Dog extends Pet {
  constructor(name, gender, saying, friends) {
    super("dog", name, gender, saying, friends);
  }
}

class CatWoman extends Human {
  constructor(name, gender, saying, friends) {
    super(name, gender, saying, friends);
  }
}

const man = new Human("José", "male", "Hola, amigo!", ["Nerea", "Lalo"]);
const woman = new Human("Martina", "female", "Buenos días!", "Pako");
const cat = new Cat("Lalo", "female", "¡miau miau!", ["José", "Nerea"]);
const dog = new Dog("Pako", "male", "¡guau guau!", "Martina");

const catwoman = new CatWoman("Nerea", "female", cat.saying + " muchachos!", [
  "José",
  "Lalo",
]);

function showATinyWorldResidents(residents) {
  residents.forEach((resident) => resident.printPresentation());
}

const aTinyWorldResidents = [man, woman, cat, dog, catwoman];

showATinyWorldResidents(aTinyWorldResidents);
