/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/vasylpaliy/a-tiny-JS-world
   Web app: https://vasylpaliy.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
  species: 'dog',
  name: 'Toby',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!'
};
const cat = {
  species: 'cat',
  name: 'Garfield',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow'
};

const man = {
  species: 'human',
  name: 'Ted',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'My code has no errors'
};

const woman = {
  species: 'human',
  name: 'Jennifer',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'I found errors in your code'
};



// ======== OUTPUT ========

let myCreatures = [dog, cat, man, woman];

let printObject = function (obj) {
  let values = "";
  for (let i in obj) {
    values += obj[i] + "; ";
  }
  return values;
}
for (let i in myCreatures) {
  print(printObject(myCreatures[i]));
}




