/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andysmokk/a-tiny-JS-world
   Web app: https://andysmokk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(species, name, legs, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.legs = legs;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = [
      this.species,
      this.name,
      this.legs,
      this.gender,
      this.saying,
      this.friends,
    ];

    return propertiesInhabitant.map((property) =>
      property === this.name
        ? `<strong>${property}</strong>`
        : property === this.saying
        ? `<em>"${property}"</em>`
        : Array.isArray(property)
        ? property.join(", ")
        : property
    );
  }
}

class Human extends Inhabitant {
  constructor(species, name, legs, gender, saying, friends) {
    super(species, name, legs, gender, saying, friends);
    this.hands = 2;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = super.showPropertiesInhabitant();
    propertiesInhabitant.splice(2, 0, this.hands);
    return propertiesInhabitant;
  }
}

class NotHuman extends Inhabitant {
  constructor(species, name, legs, gender, saying, friends) {
    super(species, name, legs, gender, saying, friends);
  }

  showPropertiesInhabitant() {
    return super.showPropertiesInhabitant();
  }
}

class SuperHuman extends Human {
  constructor(species, name, legs, gender, saying, friends, superPower) {
    super(species, name, legs, gender, saying, friends);
    this.superPower = superPower;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = super.showPropertiesInhabitant();
    propertiesInhabitant.splice(5, 0, this.superPower);
    return propertiesInhabitant;
  }
}

const man = new Human("human", "Momo", 2, "male", "I am Momo", [
  "Kamila",
  "Boba",
]);
const woman = new Human("human", "Kamila", 2, "female", "I am Kamila", [
  "Momo",
  "Boba",
  "Chico",
]);
const cat = new NotHuman("cat", "Chico", 4, "male", "Meow-meow", [
  "Kamila",
  "Kity",
]);
const dog = new NotHuman("dog", "Boba", 4, "male", "Woof-woof", [
  "Kamila",
  "Momo",
  "Charly",
]);
const catWoman = new SuperHuman(
  "cat-woman",
  "Kity",
  2,
  "female",
  cat.saying + ", i love Batman",
  ["Chico"],
  "I can't fly"
);
const batMan = new SuperHuman(
  "bat-man",
  "Charly",
  2,
  "male",
  "I don't love Catwoman",
  ["Boba"],
  "I can fly"
);

const inhabitants = [man, cat, catWoman, woman, batMan, dog];

inhabitants.forEach((inhabitant) =>
  print(inhabitant.showPropertiesInhabitant().join("; "))
);
