/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/SofiiaTrokhymchuk/a-tiny-JS-world
   Web app: https://sofiiatrokhymchuk.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here
const dog = {
   species: 'dog',
   name: 'Bima',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'Bark! ▼・ᴥ・▼'
};

const cat = {
   species: 'cat',
   name: 'Jessy',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'Meow! (=^･ω･^=)'
};

const male = {
   species: 'human',
   name: 'Ash Lynx',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Stay with me... I won\'t ask "forever." Just for now, Eiji.'
};

const female = {
   species: 'human',
   name: 'Temari',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Amazing. This slacker-clown outsmarted me!'
};

const catWoman = Object.create(cat);
catWoman.species = 'cat-woman';
catWoman.name = 'Hello Kitty';
catWoman.legs = 2;
catWoman.hands = 2;

function inhabitantToString(inhabitant){
   const friends = inhabitant.friends === undefined ? [0] : inhabitant.friends;
   return `Inhabitant: ${inhabitant.species}, <strong>${inhabitant.name}</strong>, ${inhabitant.gender}, ${inhabitant.legs}, ` + 
   `${inhabitant.hands}, <em>${inhabitant.saying}</em>. Friends: ${friends.join(", ")}`;
};

const inhabitants = [dog, cat, male, female, catWoman];

function addFriends(inhabitant, friendsList){
   inhabitant.friends = friendsList;
};

function addFriendsToInhabitants(){
   addFriends(dog, [cat.name, 'Yasya']);
   addFriends(female, ['Shikamaru']);
   addFriends(catWoman, [cat.name])
};

addFriendsToInhabitants();

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

  function printInhabitants(inhabitants){
   inhabitants.forEach(inhabitant => {
      print(inhabitantToString(inhabitant))
   });
  }

  printInhabitants(inhabitants);

