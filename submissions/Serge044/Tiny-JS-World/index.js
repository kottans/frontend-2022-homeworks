import { print } from "./js/lib.js";

const man = {
  species: "human",
  name: "Emmett",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Great Scott!",
};

const woman = {
  species: "human",
  name: "Sarah",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "You're talking about things I haven't done yet in the past tense.",
};

const dog = {
  species: "dog",
  name: "Rex",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};

const cat = {
  species: "cat",
  name: "Garfield",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "Feed me!",
};

const catWomen = {
  species: "cat-human",
  name: "Selina",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
};

const myInhabitants = [man, woman, dog, cat, catWomen];

const orderOfKeys = ["species", "name", "gender", "legs", "hands", "saying"];

const allInhabitants = myInhabitants.map((myInhabitants) =>
  orderOfKeys.map((key) => myInhabitants[key])
);

allInhabitants.forEach((arrayOfValues) => print(arrayOfValues.join("; ")));
