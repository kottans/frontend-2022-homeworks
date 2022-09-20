const KEYS_VALUE_SEPARATOR = ": ";
const PROPS_SEPARATOR = "; ";

class Creature {
  constructor({ name, gender, friends = [], species, saying }) {
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.friends = friends;
    this.saying = saying;
  }

  createArrayOfProps() {
    return [
      this.name,
      this.species,
      this.gender,
      this.saying,
      this.friendsToString(),
    ];
  }

  friendsToString() {
    return this.friends.length
      ? this.friends.map((friend) => friend.name).join(", ")
      : "no friends";
  }

  addFriends(...newFriends) {
    return (this.friends = [...this.friends, ...newFriends]);
  }
}

class Animal extends Creature {
  constructor({ name, gender, friends, paws, species, saying }) {
    super({ name, gender, friends, species, saying });
    this.paws = paws;
  }

  createArrayOfProps() {
    return [...super.createArrayOfProps(), this.paws];
  }
}

class AnimalWithTail extends Animal {
  constructor({ name, gender, friends, paws, species, saying, tail }) {
    super({ name, gender, friends, paws, species, saying });
    this.tail = tail;
  }

  createArrayOfProps() {
    return [...super.createArrayOfProps(), this.tail];
  }
}

class Human extends Creature {
  constructor({ name, gender, friends, legs, hands, saying }) {
    super({ name, gender, friends, species: "human", saying });
    this.legs = legs;
    this.hands = hands;
  }

  createArrayOfProps() {
    return [...super.createArrayOfProps(), this.legs, this.hands];
  }
}

class Dog extends AnimalWithTail {
  constructor({ name, gender, friends, paws, tail = "ordinary tail", saying }) {
    super({ name, gender, friends, paws, tail, species: "dog", saying });
  }
}

class Cat extends AnimalWithTail {
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

  createArrayOfProps() {
    return [...super.createArrayOfProps(), this.tail];
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

inhabitants.forEach((inhabitant) =>
  print(inhabitant.createArrayOfProps().join(PROPS_SEPARATOR))
);

