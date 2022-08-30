/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Habitat {
  static SPECIES = { DOG: "dog", CAT: "cat", HUMAN: "human" };
  static GENDER = { MALE: "male", FEMALE: "female" };
  static LIMBS = { HANDS: "hands", LEGS: "legs" };
  static PROPS = {
    SPECIES: "species",
    NAME: "name",
    GENDER: "gender",
    SAYING: "saying",
  };
  friends = [];
  limbs = {};
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
  }
  addLegs(quantity) {
    this.limbs[Habitat.LIMBS.LEGS] = quantity;
  }

  addFriend(habitat) {
    if (!this.friends.includes(habitat)) {
      this.friends.push(habitat);
    }
    if (!habitat.friends.includes(this)) {
      habitat.friends.push(this);
    }
  }

  toString() {
    const props = [
      this[Habitat.PROPS.SPECIES],
      this[Habitat.PROPS.NAME],
      this[Habitat.PROPS.GENDER],
    ];
    const limbs = [];
    for (let limb in this.limbs) {
      limbs.push(`${limb} - ${this.limbs[limb]}`);
    }
    props.push(limbs.join(", "));
    props.push(this[Habitat.PROPS.SAYING]);
    props.push(
      this.friends
        .map((friend) => `${friend.species} ${friend.name}`)
        .join(", ")
    );
    return props.join("; ");
  }
}

class Human extends Habitat {
  constructor(name, gender, legs, hands, saying) {
    super(Habitat.SPECIES.HUMAN, name, gender, saying);
    this.addLegs(legs);
    this.addHands(hands);
  }
  addHands(quantity) {
    this.limbs[Habitat.LIMBS.HANDS] = quantity;
  }
}

class Dog extends Habitat {
  constructor(name, gender, legs, saying) {
    super(Habitat.SPECIES.DOG, name, gender, saying);
    this.addLegs(legs);
  }
}

class Cat extends Habitat {
  constructor(name, gender, legs, saying) {
    super(Habitat.SPECIES.CAT, name, gender, saying);
    this.addLegs(legs);
  }
}

const dog = new Dog("Sharik", Habitat.GENDER.MALE, 4, "gav-gav!");
const cat = new Cat("Murka", Habitat.GENDER.FEMALE, 4, "Myau");
const man = new Human("Igor", Habitat.GENDER.MALE, 2, 2, "Hello, everebody!");
const woman = new Human(
  "Nata",
  Habitat.GENDER.FEMALE,
  2,
  2,
  "Hi. My name is Nata"
);

dog.addFriend(cat);
dog.addFriend(cat);
man.addFriend(cat);
man.addFriend(woman);

// ======== OUTPUT ========
[dog, cat, man, woman].forEach((habitat) => print(habitat));

/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
