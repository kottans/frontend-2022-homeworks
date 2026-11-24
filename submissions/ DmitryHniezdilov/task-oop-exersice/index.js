/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/DmitryHniezdilov/task-a-tiny-JS-world/tree/gh-pages
   Web app: https://dmitryhniezdilov.github.io/task-a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========

"use strict";

class Inhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying || `Hello, I'm ${this.name}`;
    this.friends = [];
  }

  addFriends(...newFriends) {
    this.friends = [...this.friends, ...newFriends];
  }

  printProps(
    speciesDesc = "Hello, I am ",
    nameDesc = ", my name is ",
    genderDesc = ", I am cool ",
    friendsDesc = ". My good friends ",
    sayingDesc = ". My speech:",
    ending = "."
  ) {
    const speciesText = this.species ? `${speciesDesc}${this.species}` : "";
    const nameText = this.name ? `${nameDesc}${this.name}` : "";
    const genderText = this.gender ? `${genderDesc}${this.gender}` : "";
    const listOfFriends = this.friends.length
      ? this.friends.map((friend) => friend.name).join(", ")
      : "";
    const friendsText = this.friends.length
      ? `${friendsDesc}${listOfFriends}`
      : "";
    const sayingText = `${sayingDesc} "${this.saying}"`;
    const sentence =
      speciesText + nameText + genderText + friendsText + sayingText + ending;
    print(sentence);
  }
}

class Human extends Inhabitant {
  constructor(name, gender, saying) {
    super("human", name, gender, saying);
    this.legs = 2;
    this.hands = 2;
  }

  printProps() {
    super.printProps(
      "Hi, I am ",
      undefined,
      undefined,
      undefined,
      undefined,
      `. I have ${this.legs} legs and ${this.hands} hands.`
    );
  }
}

class Man extends Human {
  constructor(name, saying) {
    super(name, "male", saying);
  }
}

class Woman extends Human {
  constructor(name, saying) {
    super(name, "female", saying);
  }

  printProps() {
    super.printProps(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.paws = 4;
  }

  printProps() {
    super.printProps(
      undefined,
      undefined,
      undefined,
      ". My friends ",
      undefined,
      `. I have ${this.paws} paws.`
    );
  }
}

class Dog extends Animal {
  constructor(name, male) {
    super("dog", name, male, "woof-woof!");
  }
}

class Cat extends Animal {
  constructor(name, male) {
    super("cat", name, male, "meow-meow!");
  }
}

class CharacterAnimal extends Inhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.paws = 4;
  }

  printProps() {
    super.printProps(
      undefined,
      undefined,
      undefined,
      undefined,
      ". I like to say ",
      `. I have ${this.paws} paws.`
    );
  }
}

class CatWoman extends Woman {
  constructor(name) {
    super(name);
    this.species = "cat-woman";
    this.saying = Object.getOwnPropertyDescriptor(new Cat(), "saying").value;
  }
}

const Murka = new Cat("Murka", "female");
const Tom = new Cat("Tom", "male");
const Togo = new Dog("Togo", "male");
const Hachiko = new Dog("Hachiko", "male");
const Winnie = new CharacterAnimal(
  "bear",
  "Winnie",
  "male",
  "Think, think, think!"
);
const Artur = new Man("Artur", "Do not borrow tomorrow's troubles today.");
const Maks = new Man("Maks");
const Fred = new Man("Fred");
const Marilyn = new Woman(
  "Marilyn",
  "A career is born in public – talent in privacy."
);
const Elena = new Woman("Elena");
const Alina = new Woman("Alina");
const Halle = new CatWoman("Halle");

Hachiko.addFriends(Murka, Togo);
Winnie.addFriends(
  Murka,
  Tom,
  Togo,
  Hachiko,
  Artur,
  Maks,
  Fred,
  Marilyn,
  Elena,
  Alina
);
Artur.addFriends(Hachiko, Murka, Alina, Elena, Fred);
Maks.addFriends(Tom, Togo, Marilyn, Fred);
Fred.addFriends(Artur, Hachiko, Winnie, Marilyn, Elena);
Marilyn.addFriends(Winnie, Maks, Elena);
Elena.addFriends(Murka, Artur, Fred, Marilyn);

const listOfInhabitants = [
  Murka,
  Tom,
  Togo,
  Hachiko,
  Winnie,
  Artur,
  Maks,
  Fred,
  Marilyn,
  Elena,
  Alina,
  Halle,
];

// ======== OUTPUT ========

listOfInhabitants.forEach((inhabitant) => inhabitant.printProps());
