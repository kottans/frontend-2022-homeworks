/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const man = {
    species: "human",
    name: "Tom",
    gender: "male",
    legs: 2,
    hands: 2,
    paws: 0,
    saying: "Hello Jenny!",
    friends: ["Jenny", "Felix"],
};
const woman = {
    species: "human",
    name: "Jenny",
    gender: "female",
    legs: 2,
    hands: 2,
    paws: 0,
    saying: "Hello Tom!",
    friends: ["Tom", "Felix"],
};
const dog = {
    species: "dog",
    name: "Rex",
    gender: "male",
    legs: 0,
    hands: 0,
    paws: 4,
    tail: 'tail',
    saying: "woof-woof!",
};
const cat = {
    species: "cat",
    name: "Felix",
    gender: "male",
    legs: 0,
    hands: 0,
    paws: 4,
    tail: "long fluffy tail",
    saying: "meow!",
    friends: ["Tom", "Jenny"],
};

const catWoman = {
    species: "human",
    name: "Halle",
    gender: "female",
    legs: 2,
    hands: 2,
    paws: 0,
    tail: "long not fluffy tail",
    get saying(){
        return cat.saying
    },
    friends: ["Felix"],
};
const inhabitants = [dog, cat, woman, man, catWoman];

const keys = [
    "species",
    "name",
    "gender",
    "legs",
    "hands",
    "paws",
    "tail",
    "saying",
    "friends",
];

inhabitants.forEach((inhabitant) => {
    print(
        keys
            .reduce(
                (output, key) =>
                    Object.hasOwn(inhabitant, key)
                        ? output.concat(inhabitant[key])
                        : output,
                []
            )
            .join(", ")
    );
});
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
