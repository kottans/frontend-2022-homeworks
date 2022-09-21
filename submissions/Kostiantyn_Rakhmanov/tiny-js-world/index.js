import { print } from './js/lib.js';

const dog = {
      species: 'dog',
      name: 'Toby',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'woof-woof',
      friends: ['Mary', 'John'],
   };
const cat = {
      species: 'cat',
      name: 'Alice',
      gender: 'male',
      legs: 4,
      hands: 0,
      saying: 'meow',
      friends: ['Mary', 'John'],
   };
const woman = {
      species: 'woman',
      name: 'Mary',
      gender: 'female',
      legs: 2,
      hands: 2,
      saying: 'Hi, John!',
      friends: ['John', 'Alice', 'Toby'],
   };
const man = {
      species: 'man',
      name: 'John',
      gender: 'male',
      legs: 2,
      hands: 2,
      saying: 'Hi, Mary!',
      friends: ['Mary', 'Toby', 'Alice'],
   };

const inhabitants = [dog, cat, woman, man];
const props = ['Inhabitant', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'];

inhabitants.forEach((item) => {
   print(props.map((key) => item[key]).join('; '));
});
