/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/OlexiyDobroskok/a-tiny-JS-world
   Web app: https://olexiydobroskok.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
class Inhabitant {
  constructor({
    species = "No species",
    name = "No name",
    gender = "No gender",
    saying = "Hello",
    friends = [],
  }) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
  }

  addFriend(person) {
    this.friends.push(person);
  }

  introduceYourSelf() {
    const template = `<strong>${this.saying}! My name is ${this.name}. Species: ${this.species}. Gender: ${this.gender}.`;
    if (this.friends.length !== 0) {
      const friendsName = this.friends.map((friend) => friend.name).join(", ");
      return template + `Friends: ${friendsName}.`;
    }
    return template + `Friends: Looking for friends!`;
  }
}

class Human extends Inhabitant {
  constructor({ name, gender, saying, legs = 2, hands = 2, friends }) {
    super({ species: "human", name, gender, saying, friends });
    this.hands = hands;
    this.legs = legs;
  }
  introduceYourSelf() {
    return (
      super.introduceYourSelf() +
      `<strong>I have ${this.hands} hands and ${this.legs} legs!</strong>`
    );
  }
}

class Man extends Human {
  constructor({ name, saying, friends, legs, hands }) {
    super({ name, gender: "male", saying, legs, hands, friends });
  }
}

class Woman extends Human {
  constructor({ name, saying, friends, legs, hands }) {
    super({ name, gender: "female", saying, legs, hands, friends });
  }
}

class Pets extends Inhabitant {
  constructor({ species, name, gender, paws = 4, saying, friends }) {
    super({ species, name, gender, saying, friends });
    this.paws = paws;
  }
  introduceYourSelf() {
    return (
      super.introduceYourSelf() + `<strong>I have ${this.paws} paws!</strong>`
    );
  }
}

class Cat extends Pets {
  static meow;
  constructor({ name, gender, saying = "¡miau miau", friends, paws }) {
    super({
      species: "cat",
      name,
      gender,
      saying,
      paws,
      friends,
    });
    Cat.meow = saying;
    this.saying = Cat.getMeow();
  }
  static getMeow() {
    return this.meow;
  }
}

class Dog extends Pets {
  static bark;
  constructor({ name, gender, saying = "¡guau guau", friends, paws }) {
    super({
      species: "dog",
      name,
      gender,
      saying,
      paws,
      friends,
    });
    Dog.bark = this.saying;
  }
}

class CatWoman extends Woman {
  constructor({ name, saying = "", friends, legs, hands }) {
    super({ name, saying, friends, legs, hands });
    this.saying = Cat.getMeow() + " " + saying;
  }
}

const manJose = new Man({ name: "José", saying: "Hola, amigo" });
const womanMartina = new Woman({ name: "Martina", saying: "Buenos días" });
const catLalo = new Cat({ name: "Lalo", gender: "female" });
const dogPako = new Dog({ name: "Pako", gender: "male" });
const catwomanNerea = new CatWoman({ name: "Nerea", saying: "muchachos" });

manJose.addFriend(catwomanNerea);
womanMartina.addFriend(dogPako);
catwomanNerea.addFriend(catLalo);
catwomanNerea.addFriend(manJose);

const worldPopulation = [
  manJose,
  womanMartina,
  catLalo,
  dogPako,
  catwomanNerea,
];

function showWorldPopulation() {
  const inhabitantNames = worldPopulation.map((inhabitant) => inhabitant.name);
  print(
    `<strong>Population: ${worldPopulation.length} inhabitants! It is: ${inhabitantNames}</strong>`
  );
  worldPopulation.forEach((inhabitant) =>
    print(inhabitant.introduceYourSelf())
  );
}

showWorldPopulation();
