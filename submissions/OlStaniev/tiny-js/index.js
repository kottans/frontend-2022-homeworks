const dog = {
   name: 'Bob',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof!'
}

const cat = {
   name: 'Kitty',
   gender: 'female',
   legs: 4,
   hands: 0,
   saying: 'meow!'
}

const woman = {
   name: 'Sara',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello!'
}

const man = {
   name: 'Mario',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hi!'
}

const inhabitants = [cat, dog, woman, man]
const inhabitantsInformation = inhabitants.map(({name, gender, legs, hands,saying}) => [`${name}; ${gender}; ${legs}; ${hands}; ${saying}`])

inhabitantsInformation.forEach(inhabitant => print(inhabitant))
