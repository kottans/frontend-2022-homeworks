const dog = {
  species: "dog",
  name: "Barbos",
  gender: "male",
  legs: 4,
  hands: 0,
  saying: "gav-gav kaje pes",
  friends: ["definitely everybody in the world !"],
};

const cat = {
  species: "cat",
  name: "Sonya",
  gender: "female",
  legs: 4,
  hands: 0,
  saying: "meow-meow, skinbag...",
  friends: ["definitely nobody except her own slaves"],
};

const man = {
  species: "human",
  name: "Oleksii",
  gender: "male",
  legs: 2,
  hands: 2,
  saying: "Wanna be frontend ninja in future!",
  friends: ["Alex", "Victoria", "every lovely kottan on the course"],
};

const woman = {
  species: "human",
  name: "Victoria",
  gender: "female",
  legs: 2,
  hands: 2,
  saying: "When will you bring the money to home, honey?",
  friends: ["Natasha", "Katya", "Lada"],
};

const catWoman = {
  species: "catWoman",
  name: "Anjela",
  gender: "female",
  legs: 2,
  hands: 2,
  friends: [
    "definitely nobody except her own slaves, she's a cat, you know...",
  ],
};

catWoman.__proto__ = cat;

const tinyWorldInhabitants = [dog, cat, man, woman, catWoman];

const keys = [
  "species",
  "name",
  "gender",
  "legs",
  "hands",
  "saying",
  "friends",
];

tinyWorldInhabitants.forEach((person) => {
  print(
    keys
      .map((key) =>
        Array.isArray(person[key]) ? person[key].join(", ") : person[key]
      )
      .join(" ; ")
  );
});
