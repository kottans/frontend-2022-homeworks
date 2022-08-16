const dog = {
  species: "dog",
  name: "Ronnie",
  gender: "male",
  paws: 4,
  legs: 0,
  hands: 0,
  saying: "Woof!",
};

const cat = {
  species: "cat",
  name: "Reggie",
  gender: "male",
  paws: 4,
  legs: 0,
  hands: 0,
  saying: "Meoooow!",
};

const woman = {
  species: "human",
  name: "Agnes",
  gender: "female",
  paws: 0,
  legs: 2,
  hands: 2,
  saying: "Hi, my name is Agnes",
};

const man = {
  species: "human",
  name: "Mark",
  gender: "male",
  paws: 0,
  legs: 2,
  hands: 2,
  saying: `Hello, I am Mark`,
  friends: [cat, dog],
};

const catWoman = Object.create(cat);

catWoman.species = "catwoman";
catWoman.name = "Selina";
catWoman.gender = "female";
catWoman.paws = 0;
catWoman.legs = 2;
catWoman.hands = 2;

const inhabitants = [dog, cat, woman, man, catWoman];
const properties = [
  "species",
  "name",
  "gender",
  "paws",
  "legs",
  "hands",
  "saying",
  "friends",
];

for (let inhabitant of inhabitants) {
  print(
    properties
      .map((key) => {
        if (key === "friends" && key in inhabitant) {
          let friends = [];
          inhabitant[key].forEach((friend) => friends.push(friend.name));
          return friends.join(", ") + ";";
        }
        return inhabitant[key];
      })
      .join("; ")
  );
}
