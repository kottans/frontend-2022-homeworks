/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
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

function objToString(obj) {
   let result = "";
//    for (var key in obj) {
//       result += obj[key] + ";"
//    };
   obj.forEach(creature => {
        creature;
   });
   print(result.substring(0, result.length - 1));
};

livingBeings.forEach(item => {
   objToString(item);
});
