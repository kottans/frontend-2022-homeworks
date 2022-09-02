class inhabitant {
  static viewArr = { animal: "animal", hum: "human" };
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

class Animals extends inhabitant {
  constructor(name, gender, legs, hands = "", soid) {
    super(inhabitant.viewArr.animal, name, gender, hands, legs, soid);
    this.legs = 4;
  }
}
const Dog = new Animals(
  (this.species = "Dog"),
  "Hachiko: The most loyal friend",
  inhabitant.genderArr.mele,
  4,
  "Wow my master is so cool he can drink 20 liters of beer"
);

const Cat = new Animals(
  (this.species = "Cat"),
  "Halle Berry",
  inhabitant.genderArr.famele,
  4,
  "Man quickly bring me some water"
);

const Man = new Human(
  (this.species = "Man"),
  "Benjamin Geza Affleck-Bold",
  inhabitant.genderArr.mele,
  2,
  2,
  "Im batman!"
);

const Woman = new Human(
  (this.species = "Woman"),
  "Lady Diana",
  inhabitant.genderArr.famele,
  2,
  2,
  "A man is great on earth and throughout the ages, but every iota of his greatness has grown out of a woman."
);

const catWoman = new Human(
  (this.species = "CatWoman"),
  "Lady Diana",
  inhabitant.genderArr.famele,
  2,
  2,
  "Man quickly bring me some water"
);

let allHebians = [Dog, Man, catWoman, Cat, Woman];

allHebians.forEach((item) => {
  print(item);
});
