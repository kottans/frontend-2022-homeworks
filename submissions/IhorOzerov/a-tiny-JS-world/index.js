const man = {
   creature: 'human',
   name: "Gregory",
   gender: 'male',
   hands: 2,
   legs: 2,
   say: "Hello, woman!",
   friends: ["Bandit", "Gangster"]
};
const woman = {
   creature: 'human',
   name: "Yohanna",
   gender: 'female',
   hands: 2,
   legs: 2,
   say: "Hello, man!",
   friends:"Gangster"
};
const dog = {
   creature: 'dog',
   name: "Bandit",
   gender: 'male',
   hands: 0,
   legs: 4,
   say: "Bark!",
   friends:  ["Gregory", "Yohanna"]
};
const cat = {
   creature: 'cat',
   name: "Gangster",
   gender: 'male',
   hands: 0,
   legs: 4,
   say: "Where is my money, Gregory?!",
   friends:  ["Gregory", "Vanessa"]
};
const catWoman = Object.create(cat);
catWoman.creature = "cat-woman";
catWoman.name = "Vanessa";
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;
catWoman.friends =  ["Yohanna", "Gangster"];

const extraWords = {
   creature: "I am ",
   name: "My name is ",
   gender: "I am a pretty ",
   hands: "I have a ",
   legs: "hands and ",
   friends: "legs I like to talk with ",
   say: "I would like to say "
}

const members = [man, woman, cat, dog, catWoman];
const memberProps = ['creature', 'name', 'gender', 'hands', 'legs', 'friends', 'say'];
members.forEach(member => 
   print((memberProps 
      .map(key => extraWords[key] + member[key]))
      .join(" ")
   )
);
