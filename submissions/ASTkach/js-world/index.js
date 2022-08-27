/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
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

let result = jsWorld.map((item) => {
    return item.species + "; " + 
           item.name + "; " + 
           item.gender + "; " + 
           item.legs + "; " + 
           item.hands + "; " + 
           item.saying + "; " + 
           item.friends;
});

for (let i = 0; i < result.length; i++) {
    print(`<strong>${result[i]}</strong>`);
}

// ======== OUTPUT ========
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
