/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/MarharytaBoichenko/a-tiny-JS-world
   Web app: _put project's github pages URL here_
   */

const man = {
  name: "John",
  species: "human",
  gender: "male",
  hands: 2,
  legs: 2,
  saying: "hello",
  friends: ["Bob", "Ann", "Nick"],
};
const woman = {
  name: "Ann",
  species: "human",
  gender: "female",
  hands: 2,
  legs: 2,
  saying: "hi",
};
const cat = {
  name: "Tom",
  species: "cat",
  gender: "male",
  hands: 0,
  legs: 4,
  saying: "mew",
  friends: ["Ann", "Jack"],
};
const dog = {
  name: "Jack",
  species: "dog",
  gender: "male",
  hands: 0,
  legs: 4,
  saying: "woof!",
};

const catWoman = Object.create(cat);
catWoman.name = "Jane";
catWoman.species = "catwoman";
catWoman.gender = "female";
catWoman.hands = 2;
catWoman.legs = 2;
catWoman.saying = cat.saying;

const inhabitants = [man, woman, cat, dog, catWoman];
const allProperties = [
  "name",
  "species",
  "gender",
  "hands",
  "legs",
  "saying",
  "friends",
];

inhabitants.forEach((item) => {
  print(
    allProperties
      .map((prop) => (item[prop] ? item[prop] : `no ${prop}`))
      .join(", ")
  );
});
