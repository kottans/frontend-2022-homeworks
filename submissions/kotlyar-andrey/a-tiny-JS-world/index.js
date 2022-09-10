/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kotlyar-andrey/a-tiny-JS-world
   Web app: https://kotlyar-andrey.github.io/a-tiny-JS-world/
   */

/**
 * Общий класс для всех жителей
 */
 class Creature {
  constructor(species, name, gender, phrase) {
    this._species = species;
    this._name = name;
    this._gender = gender;
    this._phrase = phrase;
    this._friends = [];
    this._properties = ["_species", "_name", "_gender"];
  }

  getFriends() {
    return this._friends && this._friends.length > 0
      ? this._friends.map(friend => friend._name).join(", ")
      : "no friends";
  }

  setFriends(newFriends) {
    this._friends = [...newFriends];
  }

  getSaying() {
    return this._phrase;
  }

  setSaying(newPhrase) {
    this._phrase = newPhrase;
  }

  addProperties(...newProperties) {
    this._properties = [...this._properties, ...newProperties];
  }

  getPropertiesData() {
    return this._properties.map(prop => this[prop]).join("; ");
  }

  getAnotherData() {
    const friends = this.getFriends();
    const saying = this.getSaying();
    return `; ${friends}; ${saying}`;
  }

  getInfo() {
    return this.getPropertiesData() + this.getAnotherData();
  }
}

/**
 * Общий класс для всех животных с ногами/лапами
 */
class Animal extends Creature {
  constructor(species, name, gender, phrase, legs) {
    super(species, name, gender, phrase);
    this._legs = legs;
    this.addProperties("_legs");
  }
}

/**
 * Общий класс для птиц
 */
class Bird extends Animal {
  constructor(species, name, gender, phrase) {
    super(species, name, gender, phrase, 2);
    this._wings = 2;
    this.addProperties("_wings");
  }
}

class Human extends Animal {
  constructor(name, gender, phrase) {
    super("human", name, gender, phrase, 2);
    this._hands = 2;
    this.addProperties("_hands");
  }
}

class Cat extends Animal {
  constructor(name, gender, phrase) {
    super("cat", name, gender, phrase, 4);
  }
}

class Dog extends Animal {
  constructor(name, gender, phrase) {
    super("dog", name, gender, phrase, 4);
  }
}

class Parrot extends Bird {
  constructor(name, gender, phrase) {
    super("parrot", name, gender, phrase);
  }
}

class Anomaly extends Human {
  constructor(name, gender, linkTo) {
    super(name, gender);
    this._linkTo = linkTo;
    this._species = `human-${linkTo._species}`;
  }
  getSaying() {
    return this._linkTo._phrase;
  }
}

const man = new Human("Ivan", "male", "Hello");
const woman = new Human("Maria", "female", "Hi");
const dog = new Dog("Bars", "male", "Woof");
const cat = new Cat("Jerry", "male", "Myau");
const parrot = new Parrot("Kuzya", "male", "How are you?");
const woman_cat = new Anomaly("Marta", "female", cat);
const man_parrot = new Anomaly("Petr", "male", parrot);

man.setFriends([woman, cat, dog]);
woman.setFriends([man, cat]);
dog.setFriends([cat]);
woman_cat.setFriends([man, cat]);

cat.setSaying("Hello, it's me, your cat");

const inhabitants = [man, woman, dog, cat, parrot, woman_cat, man_parrot];

inhabitants.forEach(creature => {
  print(creature.getInfo());
});
