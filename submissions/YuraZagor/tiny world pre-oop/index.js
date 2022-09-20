const dog = {
  species: "dog",
  name: "JEff",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "bow-wwou!",
  friend: 'everyone',
};
const cat = {
  species: "cat",
  name: "Klizma",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "meaaawurrr!",
  friend: 0,
};
const woman = {
  species: "human",
  name: "Maria",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "Are U hungry, dear?",
  friend: 'dog'
};
const man = {
  species: "human",
  name: "Grumio",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Wanna beer with ice-cream!",
  friend: "Maria"
};
const cat_woman = {
  species: "catmandu",
  name: "Anabelle",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friend: "Grumio"
};

const inhabitants = [dog, cat, woman, man, cat_woman,];

inhabitants.forEach( inhabitant => print(`(${inhabitant.species}; ${inhabitant.name}; ${inhabitant.gender}; ${inhabitant.legs}; ${inhabitant.hands}; ${inhabitant.saying}; ${inhabitant.friend}`),'div');

