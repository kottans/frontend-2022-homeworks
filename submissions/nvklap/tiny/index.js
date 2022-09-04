/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
const dog = {
  species: 'dog',
  name: 'Hugo',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'Woof! Woof!',
};

const cat = {
  species: 'cat',
  name: 'Kitsya',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'Meow! Meow!',
};

const woman = {
  species: 'human',
  name: 'Dorothy',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Well...',
};

const man = {
  species: 'human',
  name: 'George',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: '...Hm',
};

const inhabitans = [dog, cat, woman, man];
const inhabitansPropertyNames = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
];

// ======== OUTPUT ========
inhabitans.forEach((inhabitant) =>
  print(
    inhabitansPropertyNames
      .map((propertyName) => inhabitant[propertyName])
      .join('; ')
  )
);
