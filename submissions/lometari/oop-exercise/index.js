import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/lometari/a-tiny-JS-world
   Web app: https://lometari.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
let dwellers = [];

class Dweller {
    constructor(species, name, sex, phrase, chums) {
        this.species = species;
        this.name = name;
        this.sex = sex;
        this.phrase = phrase;
        this.chums = chums;
        dwellers.push(this);
    }

    sayFirst() {
        return (
            "Hi! I'm " +
            this.name +
            "! " +
            "About me: " +
            this.species +
            ", " +
            this.sex +
            ". "
        );
    }
    sayMiddle() {}
    sayLast() {
        return (
            "Love to say: " +
            this.phrase +
            " " +
            "I love hanging out with " +
            this.chums +
            ". "
        );
    }
    introduce() {
        return this.sayFirst() + this.sayMiddle() + this.sayLast();
    }
}

class Human extends Dweller {
    constructor(species, name, sex, phrase, chums, handsAmount, legsAmount) {
        super(species, name, sex, phrase, chums);
        this.handsAmount = handsAmount;
        this.legsAmount = legsAmount;
    }

    sayMiddle() {
        return (
            "I got " + this.handsAmount + " hands & " + this.legsAmount + " legs. "
        );
    }
    connection() {
        return (theCatWoman.phrase = cat.phrase);
    }
}
class Animal extends Dweller {
    constructor(species, name, sex, phrase, chums, pawsAmount) {
        super(species, name, sex, phrase, chums);
        this.pawsAmount = pawsAmount;
    }
    sayMiddle() {
        return "I got " + this.pawsAmount + " paws. ";
    }
}

const man = new Human(
    "human",
    "Joey",
    "male",
    '"How you doin\'?"',
    "Halle, Phoebe, Alfa, Tima",
    2,
    2,
);
const woman = new Human(
    "human",
    "Phoebe",
    "female",
    '"Smelly ca-a-a-a-at!"',
    "Joey, Alfa, Tima",
    2,
    2,
);
const cat = new Animal("cat", "Tima", "male", "Meow!", "Halle", 4);
const dog = new Animal(
    "dog",
    "Alfa",
    "female",
    "Bow-wow!",
    "Joey, Phoebe, Tima",
    4,
);
const theCatWoman = new Human(
    "Super-human",
    "Halle",
    "female",
    [cat.phrase],
    "Tima",
    2,
    2,
);

cat.phrase = "Mi-mi-meow!";

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
for (let i = 0; i < dwellers.length; i++) {
    if (dwellers[i].species === "Super-human") {
        dwellers[i].connection();
    }
    print(dwellers[i].introduce());
}


/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */
