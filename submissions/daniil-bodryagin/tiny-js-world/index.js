import { print } from './js/lib.js';

const dog = {
   hands: 0,
   legs: 4,
   name: 'Barbos',
   gender: 'male',
   phrase: 'Woof-woof!',
   species: 'dog',
}

const cat = {
   hands: 0,
   legs: 4,
   name: 'Sonya',
   gender: 'female',
   phrase: 'Meow!',
   species: 'cat'
}

const woman = {
   hands: 2,
   legs: 2,
   name: 'Eve',
   gender: 'female',
   phrase: 'Hello! Glad to see you!',
   species: 'human'
}

const man = {
   hands: 2,
   legs: 2,
   name: 'Adam',
   gender: 'male',
   phrase: 'Hi! Today is cool!',
   species: 'human'
}

const catwoman = {
   hands: 2,
   legs: 2,
   name: 'Selina',
   gender: 'female',
   species: 'human'
}

catwoman.phrase = cat.phrase;

const friendsList = [
   {inhabitant: dog, friends: [woman, man]},
   {inhabitant: cat, friends: [woman]},
   {inhabitant: woman, friends: [dog, cat, man]},
   {inhabitant: man, friends: [dog, woman]},
   {inhabitant: catwoman, friends: [cat, man]}
]

friendsList.forEach(({inhabitant, friends}) => 
                     inhabitant.friends = friends.map(({name}) => name).join(', '))

const inhabitants = [dog, cat, woman, man, catwoman];
inhabitants.map(({species, name, gender, hands, legs, phrase, friends}) => 
               [species, name, gender, hands, legs, phrase, friends].join('; '))
           .forEach(message => print(message));
