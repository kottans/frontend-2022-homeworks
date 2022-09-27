import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/dd44it/a-tiny-JS-world
   Web app: https://dd44it.github.io/a-tiny-JS-world
   */

// ======== OBJECTS DEFINITIONS ========

const man = {
   "name": "Bill",
   "species": "human",
   "age": 44,
   "hand": 2,
   "leg": 2,
   "gender": "male",
   "saying": "hello fellas!"
}

const women = {
   "name": "Amanda",
   "species": "human",
   "age": 32,
   "hand": 2,
   "leg": 2,
   "gender": "female",
   "saying": "hello friends!"
}

const cow = {
   "name": "Tiffany",
   "species": "cow",
   "age": 3,
   "hand": 0,
   "leg": 4,
   "gender": "female",
   "saying": "moo"
}

const cat = {
   "name": "Jack",
   "species": "cat",
   "age": 5,
   "hand": 0,
   "leg": 4,
   "gender": "male",
   "saying": "meow"
}

const dog = {
   "name": "Bully",
   "species": "dog",
   "age": 9,
   "hand": 0,
   "leg": 4,
   "gender": "male",
   "saying": "woof-woof"
}

const catWomen = {
   "name": "Kira",
   "species": "human",
   "age": 35,
   "hand": 2,
   "leg": 2,
   "gender": "female",
   "saying": cat.saying
}


// ======== OUTPUT ========
const listPerson = [man, women, cat, cow, catWomen, dog]

function isHasHand(player){
   return `${player.hand ? "I have " + player.hand + ' hand' : "I don't have hand but I have " + player.leg + " leg" }`
}

function showBioPlayer(player){
   return `Hi I'm ${player.name}. My species is ${player.species} and you know ${isHasHand(player)}. My gender is ${player.gender} and I am ${player.age} years old. When I meet with friends, I say ${player.saying}`
}

listPerson.forEach(player => {
   print(showBioPlayer(player)) 
})
