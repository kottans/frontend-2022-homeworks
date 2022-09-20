const dog = {
  species: "dog",
  name: "Jeff",
  gender: "male",
  paws: 4,
  tail: 1,
  saying: "bow-wwou!",
};
const cat = {
  species: "cat",
  name: "Lucky",
  gender: "female",
  paws: 4,
  tail: 1,
  saying: "meaaawurrr!",
};
const woman = {
  species: "human",
  name: "Maria",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Are U hungry, dear?",
};
const man = {
  species: "human",
  name: "Grumio",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Wanna beer with ice-cream!",
};
const cat_woman = {
  species: "human",
  name: "Anabelle",
  gender: "female",
  legs: 2,
  hands: 2,
};
const inhabitants = [dog, cat, woman, man, cat_woman,];

dog.friend = [man.name, woman.name, cat.name].join(", ");
cat.friend = woman.name;
woman.friend = cat.name;
man.friend = [woman.name, dog.name].join(", ");
cat_woman.friend = woman.name;

cat_woman.saying = cat.saying;

inhabitants.forEach( inhabitant => print(`(${inhabitant.species}; ${inhabitant.name}; ${inhabitant.gender}; ${inhabitant.legs ? inhabitant.legs : inhabitant.paws}; ${inhabitant.hands ? inhabitant.hands : inhabitant.tail}; ${inhabitant.saying}; ${inhabitant.friend}`),'div');
