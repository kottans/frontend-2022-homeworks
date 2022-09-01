/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========

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

// ======== OUTPUT ========
const keys = {
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
      .map(key => keys[key] + member[key]))
      .join(" ")
   )
);
 
/*
print("Hi, I am a " + man.creature + ';' + man.name + ';' + man.gender + ';' + 
  man.hands + ';' +man.legs + ';' + man.say + ';' + man.friends);
print(dog.creature + ';' + dog.name + ';' + dog.gender + ';' + 
  dog.paws + ';' + dog.say + ';' + dog.friends);*/
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
