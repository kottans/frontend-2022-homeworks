import { print } from './js/lib.js';

let InhabitantsOfTheWorld = {
   addFriends(nameFriend) {
      return this.friends = [...this.friends, ... nameFriend]
   },
   getDog() {
      return {species: 'dog', name: this.name, gender: this.gender, legs: this.legs, hands: 0, saying: 'woof-woof!', friends: this.friends};
   },
   getCat() {
      return {species: 'cat', name: this.name, gender: this.gender, legs: this.legs, hands: 0, saying: 'meow-meow!', friends: this.friends};
   },
   getMan() {
      return {species: 'man', name: this.name, gender: this.gender, legs: this.legs, hands: this.hands, saying: this.saying, friends: this.friends};
   },
   getWoman() {
      return {species: 'woman', name: this.name, gender: this.gender, legs: this.legs, hands: this.hands, saying: this.saying, friends: this.friends};
   },
};

let CreateInhabitantsOfTheWorld = function (name, gender, legs, hands, saying) {
   let inhabitant = Object.create(InhabitantsOfTheWorld);
   inhabitant.name = name, 
   inhabitant.gender = gender, 
   inhabitant.legs = legs, 
   inhabitant.hands = hands, 
   inhabitant.saying = saying;
   inhabitant.friends = [];
   return inhabitant;
      // name,
      // gender,
      // legs,
      // hands,
      // saying,
      // friends: [...people],
}

let dog = CreateInhabitantsOfTheWorld('Caesar', 'male', 4);
let cat = CreateInhabitantsOfTheWorld('Musya', 'female', 4);
let man = CreateInhabitantsOfTheWorld('Myk', 'male', 2, 2, 'hello bro!');
let woman =  CreateInhabitantsOfTheWorld('Magda', 'female', 2, 2, "I'll kill you!");

dog.addFriends([cat.name, man.name, woman.name]);
cat.addFriends([dog.name, man.name, woman.name]);
man.addFriends([dog.name, cat.name, woman.name]);
woman.addFriends([dog.name, cat.name, man.name]);

dog = dog.getDog();
cat = cat.getCat();
man = man.getMan();
woman = woman.getWoman();

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.
   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

   const inhabitants = [dog, cat, man, woman];
   inhabitants.map(({species, name, gender, legs, hands, saying, friends}) => 
     print(`species: <strong style="color: darkblue">${species}</strong>;
       name: <strong style="color: red">${name}</strong>; 
       gender: <strong style="color: green">${gender}</strong>;
       legs: <strong style="color: black">${legs}</strong>;
       hands: <strong style="color: gray">${hands}</strong>;
       saying: <strong style="color: blue">${saying}</strong>;
       friends: <strong style="color: darkorchid">${friends}</strong>;`));
       
/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');
   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

   