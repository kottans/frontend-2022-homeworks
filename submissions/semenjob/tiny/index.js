// const content = document.querySelector(".content");
// const inhabitantsOfTheWorld = [
//   (man = {
//     species: "human",
//     name: "Benjamin Geza Affleck-Bold",
//     gender: "male",
//     legs: 2,
//     hands: 2,
//     said: "Im batman",
//   }),
//   (woman = {
//     species: "human",
//     name: "Lady Diana",
//     gender: "Famele",
//     legs: 2,
//     hands: 2,
//     said: "A man is great on earth and throughout the ages, but every iota of his greatness has grown out of a woman.",
//   }),
//   (dog = {
//     species: "dog",
//     name: "Hachiko: The most loyal friend",
//     gender: "male",
//     legs: 4,
//     hands: 0,
//     said: "Wow my master is so cool he can drink 20 liters of beer",
//   }),
//   (cat = {
//     species: "cat",
//     gender: "male",
//     legs: 4,
//     hands: 0,
//     said: "Man quickly bring me some water",
//   }),
//   (catWoman = {
//     species: "cathuman",
//     name: "Halle Berry",
//     gender: "Famele",
//     legs: 2,
//     hands: 2,
//   }),
// ];

// Object.setPrototypeOf(catWoman, cat);

// const valueInhabitantsWorld = [
//   "species",
//   "name",
//   "gender",
//   "legs",
//   "hands",
//   "said",
// ];

// const listInhabitantsWorld = inhabitantsOfTheWorld.map((item) =>
//   valueInhabitantsWorld.map((value) => item[value])
// );
// const contents = listInhabitantsWorld.join("\n\n");

// content.innerHTML = contents;

class inhabitant {
  static viewArr = { dog: "dog", cat: "cat", hum: "human" };
  static genderArr = { mele: "male", famele: "female" };

  constructor(species, name, gender, hands, legs, soid) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.hands = hands;
    this.legs = legs;
    this.soid = soid;
  }

  toString() {
    let keys = this.props
      .map((item) => {
        return this[item];
      })
      .join("; ");
    return keys;
  }

  props = ["species", "name", "gender", "legs", "soid"];
}

class Human extends inhabitant {
  constructor(name, gender, legs, hands, soid) {
    super(inhabitant.viewArr.hum, name, gender, legs, soid);
    this.hands = hands;
    this.props.splice(this.props.indexOf("legs"), 0, "hands");
  }
}

class Dog extends inhabitant {
  constructor(name, gender, legs, hands = "", soid) {
    super(inhabitant.viewArr.dog, name, gender, hands, legs, soid);
  }
}

class Cat extends inhabitant {
  constructor(name, gender, legs, hands = "", soid) {
    super(inhabitant.viewArr.cat, name, gender, hands, legs, soid);
  }
}

const dog = new Dog(
  "Hachiko: The most loyal friend",
  inhabitant.genderArr.mele,
  4,
  "Wow my master is so cool he can drink 20 liters of beer"
);

const cat = new Cat(
  "Halle Berry",
  inhabitant.genderArr.famele,
  4,
  "Man quickly bring me some water"
);

const man = new Human(
  "Benjamin Geza Affleck-Bold",
  inhabitant.genderArr.mele,
  2,
  2,
  "Im batman!"
);

const woman = new Human(
  "Lady Diana",
  inhabitant.genderArr.famele,
  2,
  2,
  "A man is great on earth and throughout the ages, but every iota of his greatness has grown out of a woman."
);

const catWoman = new Human(
  "Lady Diana",
  inhabitant.genderArr.famele,
  2,
  2,
  "A man is great on earth and throughout the ages, but every iota of his greatness has grown out of a woman."
);

let allHebians = [dog, man, catWoman, cat, woman];

allHebians.forEach((item) => {
  print(item);
});
