/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/unabyband/a-tiny-JS-world
   Web app: https://unabyband.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

const inhabitants = [
   (dog = {
     species: "dog",
     name: "Rex",
     gender: "male",
     legs: 4,
     hands: 0,
     saying: "woof",
     friends: "John, Jenny",
   }),
   (cat = {
     species: "cat",
     name: "Tom",
     gender: "male",
     legs: 4,
     hands: 0,
     saying: "meow",
     friends: "Jenny",
   }),
   (woman = {
     species: "human",
     name: "Jenny",
     gender: "female",
     legs: 2,
     hands: 2,
     saying: "Hi, John!",
     friends: "John, Tom",
   }),
   (man = {
     species: "human",
     name: "John",
     gender: "male",
     legs: 2,
     hands: 2,
     saying: "Hi, Jenny!",
     friends: "Jenny, Rex, Tom",
   }),
   (cat_woman = {
     species: cat.species + "-" + woman.species,
     name: woman.name,
     gender: "no gender",
     legs: woman.legs,
     hands: woman.hands,
     saying: cat.saying,
     friends: 0,
   }),
 ];
 
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
 
//  var test = man;
//  test.saying = "<h2>Where's the money, Lebowski?</h2>";
 
//  function printInhabitant(inhabitant) {
//   let str = "";
//   for (param in inhabitant) {
//     str += inhabitant[param] + '; ';
//   }
//   print (str);
//  }

function printInhabitant ({species, name, gender, legs, hands, saying, friends}) {

  const inhabitant = [species, "<strong>" + name + "</strong>", gender, legs, hands, "<em>" + saying + "</em>", friends];
  print (inhabitant.join("; "));
}
 
 inhabitants.forEach((resident) => printInhabitant(resident));
 