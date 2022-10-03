/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/andysmokk/a-tiny-JS-world
   Web app: https://andysmokk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Inhabitant {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends.join(", ");
  }

  showPropertiesInhabitant() {
    const valuesInhabitant = [];
    const propertiesInhabitant = [
      "species",
      "name",
      "gender",
      "saying",
      "friends",
    ];

    propertiesInhabitant.forEach((property) => {
      property === "name"
        ? valuesInhabitant.push(`<strong>${this[property]}</strong>`)
        : property === "saying"
        ? valuesInhabitant.push(`<em>"${this[property]}"</em>`)
        : valuesInhabitant.push(this[property]);
    });

    return valuesInhabitant;
  }
}

class Human extends Inhabitant {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.hands = 2;
    this.legs = 2;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = super.showPropertiesInhabitant();
    propertiesInhabitant.splice(2, 0, this.hands, this.legs);
    return propertiesInhabitant;
  }
}

class NotHuman extends Inhabitant {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.legs = 4;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = super.showPropertiesInhabitant();
    propertiesInhabitant.splice(2, 0, this.legs);
    return propertiesInhabitant;
  }
}

class SuperHuman extends Human {
  constructor(species, name, gender, saying, friends, superPower) {
    super(species, name, gender, saying, friends);
    this.superPower = superPower;
  }

  showPropertiesInhabitant() {
    const propertiesInhabitant = super.showPropertiesInhabitant();
    propertiesInhabitant.splice(5, 0, this.superPower);
    return propertiesInhabitant;
  }
}

const man = new Human("human", "Momo", "male", "I am Momo", ["Kamila", "Boba"]);
const woman = new Human("human", "Kamila", "female", "I am Kamila", [
  "Momo",
  "Boba",
  "Chico",
]);
const cat = new NotHuman("cat", "Chico", "male", "Meow-meow", [
  "Kamila",
  "Kity",
]);
const dog = new NotHuman("dog", "Boba", "male", "Woof-woof", [
  "Kamila",
  "Momo",
  "Charly",
]);
const catWoman = new SuperHuman(
  "cat-woman",
  "Kity",
  "female",
  cat.saying + ", i love Batman",
  ["Chico"],
  "I can't fly"
);
const batMan = new SuperHuman(
  "bat-man",
  "Charly",
  "male",
  "I don't love Catwoman",
  ["Boba"],
  "I can fly"
);

const inhabitants = [man, cat, catWoman, woman, batMan, dog];

inhabitants.forEach((inhabitant) =>
  print(inhabitant.showPropertiesInhabitant().join("; "))
);
