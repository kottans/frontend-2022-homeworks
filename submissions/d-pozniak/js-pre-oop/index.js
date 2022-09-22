import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/d-pozniak/a-tiny-JS-world
   Web app: https://d-pozniak.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
    species: "dog",
    hands: 0,
    legs: 4,
    name: "Bill",
    gender: "male",
    says: "Woof!",
};
const woman = {
    species: "human",
    hands: "2",
    legs: "2",
    name: "Pam",
    gender: "female",
    says: "Kottans` community is the best!",
};
const cat = {
    species: "cat",
    hands: 0,
    legs: 4,
    name: "Mattew",
    gender: "male",
    says: "Meow!",
};
const man = {
    species: "human",
    hands: "2",
    legs: "2",
    name: "Paul",
    gender: "male",
    says: "Why don`t we go grab something to eat?",
};
const catWoman = Object.create(cat, {
    species: { value: "hero" },
    hands: { value: "2" },
    legs: { value: "2" },
    name: { value: "Sally" },
    gender: { value: "female" },
});
// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */
const keyList = ["species", "name", "gender", "legs", "hands", "says"];
const habList = [man, woman, cat, dog, catWoman];
function createString(obj, keys) {
    return keys.map((key) => obj[key]).join("; ");
}
function printWorldHabitants(objects, features) {
    objects.forEach((obj) => print(createString(obj, features), "div"));
}
printWorldHabitants(habList, keyList);
