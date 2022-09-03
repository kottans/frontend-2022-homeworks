const cat = {
  species: 'cat',
  name: 'Kitty',
  gender: 'female',
  legs: 4,
  hands: 0,
  saying: 'meow!',
  friends: "cats don't needs any friends",
};

const catWoman = {
  species: 'human',
  name: 'Catwoman',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: cat.saying,
  friends: cat.name,
};

const woman = {
  species: 'human',
  name: 'Selina Kyle',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hello, Batman. Do you know Catwoman?',
  friends: [cat.name, catWoman.name],
};

const man = {
  species: 'human',
  name: 'Bruce Wayne',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: "Hi! I'm Batman",
  friends: [catWoman.name, woman.name],
};

const dog = {
  species: 'dog',
  name: 'Spike',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'woof-woof!',
  friends: [woman.name, man.name],
};

const persons = [dog, cat, man, woman, catWoman];

const attr = [
  'species',
  'name',
  'gender',
  'legs',
  'hands',
  'saying',
  'friends',
];

function tellMeAboutYou(obj) {
  const arr = [];
  attr.forEach((key) => {
    obj[key] && arr.push(obj[key]);
  });
  return arr.join('; ') + '.';
}

persons.map((item) => print(tellMeAboutYou(item)));
