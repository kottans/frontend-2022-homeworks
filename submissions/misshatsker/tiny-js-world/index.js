const human = {
   species: 'human',
   legs: 2,
   hands: 2
};

const animal = {
   species: 'animal',
   legs: 4,
   hands: 0
};

const woman = {
   ...human,
   name: 'Lilu',
   gender: 'female',
   saying: 'Aloha!'
};

const man = {
   ...human,
   name: 'Bob',
   gender: 'male',
   saying: 'Have a nice day!'
};

const dog = {
   ...animal,
   name: 'Mira',
   gender: 'female',
   saying: 'Woof-woof!'
};

const cat = {
   ...animal,
   name: 'Tyson',
   gender: 'male',
   saying: 'Meow-meow!'
};

const inhabitants = [
   woman,
   man,
   dog,
   cat
];

const inhabitantProperties = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
const delimiter = '; ';
function getInhabitantInfo(inhabitant) {
   const  values = inhabitantProperties.map((key) => inhabitant[key]);
   return values.join(delimiter);
}

inhabitants.forEach((inhabitant) =>
   print(getInhabitantInfo(inhabitant)));
