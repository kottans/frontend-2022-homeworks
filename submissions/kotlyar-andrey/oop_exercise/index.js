/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kotlyar-andrey/a-tiny-JS-world
   Web app: https://kotlyar-andrey.github.io/a-tiny-JS-world/
   */

class Creature {
  constructor(species, name, gender, phrase) {
    this._species = species;
    this._name = name;
    this._gender = gender;
    this._phrase = phrase;
    this._friends = [];
    this._properties = ["_species", "_name", "_gender", "saying"];
  }

  getFriends() {
    return this._friends && this._friends.length > 0
      ? this._friends.map((friend) => friend._name).join(", ")
      : "no friends";
  }

  setFriends(newFriends) {
    this._friends = [...newFriends];
  }

  getSaying() {
    return self._phrase;
  }

  setSaying(newPhrase) {
    this._phrase = newPhrase;
  }

  addProperties(...newProperties) {
    this._properties = [...this._properties, ...newProperties];
  }

  display() {
    const friends = this.getFriends();
    print(
      this._properties
        .map((prop) => this[prop])
        .join("; ")
        .concat(`; ${friends}`)
    );
  }
}

class Animal extends Creature {
  constructor(species, name, gender, phrase, legs, hands) {
    super(species, name, gender, phrase);
    this._legs = legs;
    this._hands = hands;
    this.addProperties("_legs", "_hands");
  }

  get saying() {
    return this._phrase;
  }
}

class HomoSapiens extends Animal {
  constructor(name, gender, phrase, legs, hands) {
    super("human", name, gender, phrase, legs, hands);
  }

  get saying() {
    return this._phrase;
  }
}

class Anomaly extends HomoSapiens {
  constructor(name, gender, phrase, legs, hands, linkTo) {
    super(name, gender, phrase, legs, hands);
    this._linkTo = linkTo;
    this._species = `human-${linkTo._species}`;
  }
  get saying() {
    return this._linkTo._phrase;
  }
}

const man = new HomoSapiens("Ivan", "male", "Hello", 2, 2);
const woman = new HomoSapiens("Maria", "female", "Hi", 2, 2);
const dog = new Animal("dog", "Bars", "male", "Woof", 4, 0);
const cat = new Animal("cat", "Jerry", "male", "Myau", 4, 0);
const parrot = new Animal("parrot", "Kuzya", "male", "How are you?", 2, 0);
const woman_cat = new Anomaly("Marta", "female", "", 2, 2, cat);
const man_parrot = new Anomaly("Petr", "male", "", 2, 2, parrot);

man.setFriends([woman, cat, dog]);
woman.setFriends([man, cat]);
dog.setFriends([cat]);
woman_cat.setFriends([man, cat]);

cat.setSaying("Hello, it's me, your cat");

const inhabitants = [man, woman, dog, cat, parrot, woman_cat, man_parrot];

inhabitants.forEach((creature) => {
  creature.display();
});
