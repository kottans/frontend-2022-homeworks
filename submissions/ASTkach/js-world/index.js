const dog = {
    species: "dog",
    name: "Elvis",
    gender: "male",
    legs: 4,
    hands: 0,
    saying: "wooffle-wooffle",
    friends: ["Franke", " Marilyn", " Audrey"],
};

const cat = {
    species: "cat",
    name: "Audrey",
    gender: "female",
    legs: 4,
    hands: 0,
    saying: "hiss-hiss",
    friends: "",
};

const woman = {
    species: "human",
    name: "Marilyn",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: "Well it's a good day for singing a song",
    friends: [" Franke", " Audrey"],
};

const man = {
    species: "human",
    name: "Franke",
    gender: "male",
    legs: 1,
    hands: 2,
    saying: "Honey, where's my wooden leg?",
    friends: [" Elvis", " Marilyn"],
};

let jsWorld = [dog, cat, woman, man];
let properties = ["species", "name", "gender", "legs", "hands", "saying", "friends"];

jsWorld.map((item) => print(properties.map((element) => item[element]).join(";")));
