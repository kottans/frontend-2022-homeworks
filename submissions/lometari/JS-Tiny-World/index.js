import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/lometari/a-tiny-JS-world
   Web app: https://lometari.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

let catWord;
let indwellers = {
    man: {
        species: "human",
        hands: 2,
        legs: 2,
        name: "Joey",
        sex: "male",
        say: "How you doin'?",
        chums: "Halle, Phoebe, Alfa, Tima",
    },
    woman: {
        species: "human",
        hands: 2,
        legs: 2,
        name: "Phoebe",
        sex: "female",
        say: "Smelly ca-a-a-a-at!",
        chums: "Joey, Alfa, Tima",
    },
    dog: {
        species: "dog",
        hands: 0,
        legs: 4,
        name: "Alfa",
        sex: "female",
        say: "Bow-wow!",
        chums: "Joey, Phoebe, Tima",
    },
    cat: {
        species: "cat",
        hands: 0,
        legs: 4,
        name: "Tima",
        sex: "male",
        say: "Meow!",
        chums: "Halle",
    },
    catWoman: {
        species: "human",
        hands: 2,
        legs: 2,
        name: "Halle",
        sex: "female",
        say: [catWord],
        chums: "Tima",
    },
};

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

function getWord() {
    catWord = indwellers.cat.say;
}

let indwellersArray = Object.getOwnPropertyNames(indwellers);

for (let i = 0; i < indwellersArray.length; i++) {
    let prop = indwellersArray[i];
    if (prop === "catWoman") {
        getWord();
    }
    print(
        indwellers[prop].species +
        "; " +
        indwellers[prop].name +
        "; " +
        indwellers[prop].sex +
        "; " +
        indwellers[prop].legs +
        "; " +
        indwellers[prop].hands +
        "; " +
        indwellers[prop].say +
        "; " +
        indwellers[prop].chums +
        ". "
    );
}

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
