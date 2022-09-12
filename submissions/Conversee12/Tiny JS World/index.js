/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Conversee12/a-tiny-JS-world.git
   Web app: https://conversee12.github.io/a-tiny-JS-world/
   */

const man = {
   species: 'human',
   name: 'Vasyl',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Nothing can stop an idea whose time has come!',
};

const woman = {
   species: 'human',
   name: 'Oksana',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'What\'s up?',
};

const dog = {
   species: 'dog',
   name: 'Reks',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Hav-Hav',
};

const cat = {
   species: 'cat',
   name: 'Pushok',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'Meow',
};
const inhabitants = [man, woman, dog, cat];

const inhabitantDescription = ["species", "name", "gender", "legs", "hands", "saying"];

inhabitants.forEach(residents => print(inhabitantDescription.map(property => residents[property]).join("; ")));
