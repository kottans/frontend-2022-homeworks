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

function printInhabitant ({species, name, gender, legs, hands, saying, friends}) {

   const inhabitant = [species, "<strong>" + name + "</strong>", gender, legs, hands, "<em>" + saying + "</em>", friends];
   print (inhabitant.join("; "));
 }
  
inhabitants.forEach((resident) => printInhabitant(resident));


