const dog = {
  species: "dog",
  name: "Brovko",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "woof-woof!",
};
const cat = {
  species: "cat",
  name: "Murka",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "meow!",
};
const woman = {
  species: "human",
  name: "Stefania",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "I am Stefania!",
};
const man = {
  species: "human",
  name: "Marko",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "I am Marko!",
};
const cat_woman = {
  species: "supernatural",
  name: "Batgirl",
  gender: "female",
  legs: 2,
  hands: 2,
};

Object.setPrototypeOf(cat_woman, cat);
const inhabitants = [dog, cat, woman, man, cat_woman];
const keys = ["species", "name", "gender", "legs", "hands", "saying", "friend"];

inhabitants.forEach((inhabitant) => {
  const filteredArr = inhabitants.filter((inh) => inh !== inhabitant);
  inhabitant.friend =
    filteredArr[Math.floor(Math.random() * filteredArr.length)].name;
  print(keys.map((key) => inhabitant[key]).join("; "));
});
