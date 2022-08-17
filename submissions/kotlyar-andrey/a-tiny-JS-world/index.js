/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kotlyar-andrey/a-tiny-JS-world
   Web app: https://kotlyar-andrey.github.io/a-tiny-JS-world/
   */

class Creature {
  constructor(species, name, gender, legs, hands, phrase, linkTo = null) {
    this._species = species;
    this._name = name;
    this._gender = gender;
    this._legs = legs;
    this._hands = hands;
    this._phrase = phrase;
    this._friends = [];
    this._link = linkTo;
    this._properties = [
      "species",
      "_name",
      "_gender",
      "_legs",
      "_hands",
      "saying",
      "friends",
    ];
  }

  get species() {
    return this._link
      ? `${this._species}-${this._link._species}`
      : this._species;
  }

  get friends() {
    return this._friends && this._friends.length > 0
      ? this._friends.map(friend => friend._name).join(", ")
      : "no friends";
  }

  set friends(newFriends) {
    this._friends = [...newFriends];
  }

  get saying() {
    return this._link ? this._link._phrase : this._phrase;
  }

  set saying(newFrase) {
    this._phrase = newFrase;
  }

  display() {
    print(this._properties.map(prop => this[prop]).join("; "));
  }
}

const cat = new Creature("cat", "Jerry", "male", 4, 0, "Myau");
const dog = new Creature("dog", "Bars", "male", 4, 0, "Woof");
const woman = new Creature("human", "Maria", "female", 2, 2, "Hi");
const man = new Creature("human", "Ivan", "male", 2, 2, "Hello");
const woman_cat = new Creature("human", "Marta", "female", 2, 2, "", cat);
const werewolf = new Creature("human", "Petr", "male", 4, 2, "", dog);

man.friends = [woman, cat, dog];
woman.friends = [man, cat];
dog.friends = [cat];
woman_cat.friends = [man, cat];

cat.saying = "new message for test woman-cats";

const inhabitants = [man, woman, dog, cat, woman_cat, werewolf];

inhabitants.forEach(creature => {
  creature.display();
});
