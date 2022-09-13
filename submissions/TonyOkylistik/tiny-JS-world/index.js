import {
   print
} from './js/lib.js';

const dog = {
   species: 'dog',
   name: 'JT',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!',
   friends: ['Inna', 'Tolik']
}

const cat = {
   species: 'cat',
   name: 'Sherry',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow-meow!',
   friends: ['Selina']
}

const woman = {
   species: 'woman',
   name: 'Inna',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: `Hi, girls!`,
   friends: ['Tolik', 'Sherry', 'JT', 'Selina']
}

const man = {
   species: 'man',
   name: 'Tolik',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello, guys!',
   friends: ['JT']
}

const catWoman = (form = cat) => {
   const catWoman = {...form}

   catWoman.species = 'cat-woman'
   catWoman.name = 'Selina'
   catWoman.gender = 'female'
   catWoman.friends = form.friends.filter(me => me !== "Selina")
   return catWoman
}

const population = [dog, cat, man, woman, catWoman(woman)]

print(population.map(obj => {
   const {species, name, gender, legs, hands, saying, friends} = obj
   const number = population.indexOf(obj) + 1
   const s = "<strong>", ss = "</strong>"

   return saying.charAt(0) === saying.charAt(0).toLocaleLowerCase() ? `${number}. ${s+saying+ss} It's a ${s+gender+' '+species+ss} with ${s+legs+ss} paws. And ${gender==="female" ? "she": "he"} is friends with ${s+friends+ss}.` : `${number}. ${s+saying+ss} My name is ${s+name+ss}. I'm a ${s+species+ss}. I have ${s+legs+ss} legs and ${s+hands+ss} hands. ${species=='cat-woman' ? `But sometimes I have a ${s+catWoman(cat).legs+ss} claws. My`: "My"} ${friends.length>1 ? "friends are" : "friend is"} ${s+friends+ss}.`
}).join('\n'))