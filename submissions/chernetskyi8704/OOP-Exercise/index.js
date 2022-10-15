const dog = {
  species: "dog",
  legs: 4,
  hands: 0,
  name: "Molly",
  gender: "female",
  saying: "WOOF-WOOF!",
};

const cat = {
  species: "cat",
  legs: 4,
  hands: 0,
  name: "Whiskey",
  gender: "male",
  saying: "Meow!",
};

const woman = {
  species: "human",
  legs: 2,
  hands: 2,
  name: "Kate",
  gender: "female",
  saying: "Have a good day!",
};

const man = {
  species: "human",
  legs: 2,
  hands: 2,
  name: "Dimitrij",
  gender: "male",
  saying: "Nice to meet you!",
};

const allInhabitants = [dog, cat, woman, man];
const keys = ["species", "legs", "hands", "name", "gender", "saying"];

allInhabitants.map((inhabitant) => {
  print(keys.map((key) => inhabitant[key]).join("; "));
});
