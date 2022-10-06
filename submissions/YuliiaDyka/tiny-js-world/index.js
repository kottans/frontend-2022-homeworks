/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: https://github.com/Yuliiadd/a-tiny-JS-world
   Web app: https://yuliiadd.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const man = {
   species: 'Human',
   name: 'Joe',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'How you doing?'
};
const woman = {
   species: 'Human',
   name: 'Monica',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'I know!'
};
const cat = {
   species: 'cat',
   name: 'Taras',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Meeeeoow!'
};
const dog = {
   species: 'dog',
   name: 'Chappy',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Woooof!'
};

const catWoman = Object.assign({}, cat);
catWoman.species = 'Cat-woman';
catWoman.name = 'Halle Berry';
catWoman.gender = 'female';
catWoman.legs = 2;
catWoman.hands = 2;

const livingBeings = [man, woman, cat, dog, catWoman];

livingBeings.forEach(({species, name, gender, legs, hands, saying})=> {
   print([species, name, gender, legs, hands, saying].join("; "));
});
