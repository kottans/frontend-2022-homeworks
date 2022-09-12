import { print } from './js/lib.js';

const inhabitants = [
{
      species: 'dog',
      name: 'Toby',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'woof-woof',
      friends: ['Mary', 'John'],
      },
{
      species: 'cat',
      name: 'Alice',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'meow',
      friends: ['Mary', 'John'],
   },
{
      species: 'woman',
      name: 'Mary',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying: 'Hi, John!',
      friends: ['John', 'Alice', 'Toby'],
   },
{
      species: 'man',
      name: 'John',
      gender: 'male',
      legs: 2,
      hands: 2,
      saying: 'Hi, Mary!',
      friends: ['Mary', 'Toby', 'Alice'],
   },
];

for (let i = 0; i < inhabitants.length; i++) {
   const species = inhabitants[i].species;
   const name = inhabitants[i].name;
   const gender = inhabitants[i].gender;
   const legs = inhabitants[i].legs;
   const hands = inhabitants[i].hands;
   const saying = inhabitants[i].saying;
   const friends = inhabitants[i].friends;

   print('Inhabitant:' + species + '; name:' + name + '; gender:' + gender + '; legs:' + legs + '; hands:' + hands + '; saying:' + saying + '; friends:' + friends);
}
