// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: "dog",
   name: "Toby",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "woof-woof!",
};

const cat = {
   species: "cat",
   name: "Lily",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "meow!",
};

const woman = {
   species: "human",
   name: "Linda",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "What a pretty kitten!",
};

const man = {
   species: "human",
   name: "Jim",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "Heyyo!",
};

const catWoman = {
   species: "cat-woman",
   name: "Ro",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
};

// ======== OUTPUT ========

const inhabitantsArr = [dog, cat, man, woman, catWoman];
inhabitantsArr.forEach((inhabitant) => {
   const inhabitantToArr = Object.values(inhabitant);
   print(inhabitantToArr.map((prop) => prop));
});
