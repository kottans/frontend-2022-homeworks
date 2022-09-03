const dog = {
   species: 'dog',
   name: 'Brown',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof',
   friends:['Sky', 'Boba']
}

const cat = {
   species: 'cat',
   name: 'Ponchik',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'meow-meow',
   friends: ['Simba', 'Murchik']
}

const man = {
   species: 'man',
   name: 'Orest',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'Hello!',
   friends: ['Jan', 'Nazar']
}

const woman = {
   species: 'woman',
   name: 'Sasha',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'Hi!',
   friends: ['Ulyana', 'Dima']
}

const catWoman = {
   species: 'cat-woman',
   name: 'Selina',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: cat.saying,
   friends: ['Batman','Tom']
}
const inhabitants = [dog, cat, man, woman, catWoman]
const introduceInhabitants = (inhabitants) => {
   const inhabitantValues = Object.values(inhabitants)
   const inhabitant = inhabitantValues.map(item => Array.isArray(item) ? item.map(nestedItem => nestedItem).join(', ') : item).join('; ')
   return inhabitant;
}
inhabitants.forEach((item) => {
   print(introduceInhabitants(item))
})