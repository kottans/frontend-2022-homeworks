/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kotlyar-andrey/a-tiny-JS-world
   Web app: https://kotlyar-andrey.github.io/a-tiny-JS-world/
   */

function Creature(species, name, gender, legs, hands, saying) {
  this.species = species;
  this.name = name;
  this.gender = gender;
  this.legs = legs;
  this.hands = hands;
  this.saying = saying;

  this.properties = [
    "species",
    "name",
    "gender",
    "legs",
    "hands",
    "saying",
    "friendsNames",
  ];

  this.display = function () {
    if (this.friends) {
      this.friendsNames = this.friends.map((friend) => friend.name).join(", ");
    } else {
      this.friendsNames = "undefined :(";
    }
    print(this.properties.map((prop) => this[prop]).join("; "));
  };
}

const cat = new Creature("cat", "Jerry", "male", 4, 0, "Myau");
const dog = new Creature("dog", "Bars", "male", 4, 0, "Woof");
const woman = new Creature("human", "Maria", "female", 2, 2, "Hi");
const man = new Creature("human", "Ivan", "male", 2, 2, "Hello");

man.friends = [woman, cat, dog];
woman.friends = [man, cat];
dog.friends = [man];

const inhabitants = [man, woman, dog, cat];

inhabitants.forEach((creature) => {
  creature.display();
});
