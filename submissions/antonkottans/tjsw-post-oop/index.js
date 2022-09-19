class Creature {
  constructor({ name, gender, friends = [], species, saying }) {
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.friends = friends;
    this.saying = saying;
  }

  propsToString() {
    return `Name: ${this.name}; Species:${this.species}; Gender:${
      this.gender
    }; Saying:${this.saying}; Friends:${this.friendsNameToString()}`;
  }

  friendsNameToString() {
    return this.friends.length === 0
      ? "no friends"
      : this.friends.map((friend) => friend.name).join(", ");
  }

  addFriends(...newFriends) {
    this.friends = [...this.friends, ...newFriends];
  }
}

class Animal extends Creature {
  constructor({ name, gender, friends, paws, species, saying }) {
    super({ name, gender, friends, species, saying });
    this.paws = paws;
  }

  propsToString() {
    return `${super.propsToString()}; Paws: ${this.paws}`;
  }
}

class Human extends Creature {
  constructor({ name, gender, friends, legs, hands, saying }) {
    super({ name, gender, friends, species: "human", saying });
    this.legs = legs;
    this.hands = hands;
  }

  propsToString() {
    return `${super.propsToString()}; Legs: ${this.legs}; Hands: ${this.hands}`;
  }
}

class Dog extends Animal {
  constructor({ name, gender, friends, paws, tail = "ordinary tail", saying }) {
    super({ name, gender, friends, paws, tail, species: "dog", saying });
    this.tail = tail;
  }

  propsToString() {
    return `${super.propsToString()}; Tail: ${this.tail}`;
  }
}

class Cat extends Animal {
  constructor({
    name,
    gender,
    friends,
    paws,
    tail = "ordinary tail",
    saying = "meow!",
  }) {
    super({ name, gender, friends, paws, tail, species: "cat", saying });
    this.saying = saying;
    this.tail = tail;
  }

  propsToString() {
    return `${super.propsToString()}; Tail: ${this.tail}`;
  }
}

class CatWoman extends Human {
  constructor({
    name,
    gender,
    friends,
    legs,
    hands,
    tail = "ordinary Cat-woman tail",
    saying = "meow!",
  }) {
    super({
      name,
      gender,
      friends,
      legs,
      hands,
      species: "cat-woman",
    });
    this.tail = tail;
    this.saying = saying;
  }

  propsToString() {
    return `${super.propsToString()}; Tail: ${this.tail}`;
  }
}

const Halle = new CatWoman({
  name: "Halle",
  gender: "female",
  legs: 2,
  hands: 2,
  tail: "long, not fluffy tail",
  saying: Cat.saying,
});

const Felix = new Cat({
  name: "Felix",
  gender: "male",
  paws: 4,
  tail: "long, fluffy tail",
});

const Rex = new Dog({
  name: "Rex",
  gender: "male",
  paws: 4,
  tail: "small tail",
  saying: "woof-woof!",
});

const Tom = new Human({
  name: "Tom",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Hello Jenny!",
});

const Jenny = new Human({
  name: "Jenny",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Hello Tom!",
});

Halle.addFriends(Felix);
Felix.addFriends(Tom, Jenny);
Tom.addFriends(Jenny, Felix);
Jenny.addFriends(Tom, Felix);

const inhabitants = [Rex, Felix, Jenny, Tom, Halle];

inhabitants.forEach((inhabitant) => print(inhabitant.propsToString()));

