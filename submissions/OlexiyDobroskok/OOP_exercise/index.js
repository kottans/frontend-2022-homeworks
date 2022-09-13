const inhabitantDefaultProperties = {
  species: "No species",
  name: "No name",
  gender: "No gender",
  saying: "Hello",
  friends: "",
};

const humanDefaultProperties = {
  hands: 2,
  legs: 2,
};

const petsDefaultProperties = {
  paws: 4,
};

class Inhabitant {
  static worldPopulation = [];
  constructor({
    species,
    name,
    gender,
    saying,
    friends,
  } = inhabitantDefaultProperties) {
    this.species = species ?? inhabitantDefaultProperties.species;
    this.name = name ?? inhabitantDefaultProperties.name;
    this.gender = gender ?? inhabitantDefaultProperties.gender;
    this.saying = saying ?? inhabitantDefaultProperties.saying;
    this.friends = friends ?? inhabitantDefaultProperties.friends;
    Inhabitant.worldPopulation.push(this);
  }

  addFriend({ name }) {
    this.friends += name + "; ";
  }

  introduceYourSelf() {
    if (this.friends === "") {
      this.friends = "Looking for friends!";
    }
    return `<strong>${this.saying}! My name is ${this.name}. Species: ${this.species}. Gender: ${this.gender}. Friends: ${this.friends} </strong>`;
  }
}

class Human extends Inhabitant {
  constructor({
    name,
    gender,
    saying,
    legs,
    hands,
    friends,
  } = humanDefaultProperties) {
    super({ species: "human", name, gender, saying, friends });
    this.hands = hands ?? humanDefaultProperties.hands;
    this.legs = legs ?? humanDefaultProperties.legs;
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
  constructor({
    species,
    name,
    gender,
    paws,
    saying,
    friends,
  } = petsDefaultProperties) {
    super({ species, name, gender, saying, friends });
    this.paws = paws ?? petsDefaultProperties.paws;
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
      paws,
      saying,
      friends,
    });
    Cat.meow = this.saying;
  }
}

class Dog extends Pets {
  static bark;
  constructor({ name, gender, saying = "¡guau guau", friends, paws }) {
    super({
      species: "dog",
      name,
      gender,
      paws,
      saying,
      friends,
    });
    Dog.bark = this.saying;
  }
}

class CatWoman extends Woman {
  constructor({ name, saying = "", friends, legs, hands }) {
    super({ name, saying, friends, legs, hands });
    this.saying = Cat.meow + " " + saying;
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

function showWorldPopulation() {
  const inhabitantNames = Inhabitant.worldPopulation.map(
    (inhabitant) => inhabitant.name
  );
  print(
    `<strong>Population: ${Inhabitant.worldPopulation.length} inhabitants! It is: ${inhabitantNames}</strong>`
  );
  Inhabitant.worldPopulation.forEach((inhabitant) =>
    print(inhabitant.introduceYourSelf())
  );
}

showWorldPopulation();
