class Resident {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.gender = gender;
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
  constructor(name, gender, saying) {
    super("human", name, gender, saying);
    this.hands = 2;
    this.legs = 2;
  }
}

class Pet extends Resident {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.paws = 4;
  }
}

class Cat extends Pet {
  constructor(name, gender, saying) {
    super("cat", name, gender, saying);
  }
}

class Dog extends Pet {
  constructor(name, gender, saying) {
    super("dog", name, gender, saying);
  }
}

class CatWoman extends Human {
  constructor(name, gender, saying) {
    super(name, gender, saying);
  }
}

const man = new Human("José", "male", "Hola, amigo!");
const woman = new Human("Martina", "female", "Buenos días!");
const catwoman = new CatWoman("Nerea", "female");
const cat = new Cat("Lalo", "female", "¡miau miau!");
const dog = new Dog("Pako", "male", "¡guau guau!");

man.friends = woman.name;
woman.friends = [man.name, dog.name];
catwoman.saying = cat.saying + " muchachos!";

function showATinyWorldResidents(residents) {
  residents.forEach((resident) => resident.printPresentation());
}

const aTinyWorldResidents = [man, woman, cat, dog, catwoman];

showATinyWorldResidents(aTinyWorldResidents);
