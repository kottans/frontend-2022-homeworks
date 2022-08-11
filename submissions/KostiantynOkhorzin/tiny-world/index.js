const dog = {
   species: 'dog',
   name: 'Toby',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'woof-woof!'
}

const cat = {
   species: 'cat',
   name: 'Tom',
   gender: 'male',
   legs: 4,
   hands: 0,
   saying: 'hello Jerry'
}

const woman = {
   species: 'woman',
   name: 'Monica',
   gender: 'female',
   legs: 2,
   hands: 2,
   saying: 'hello Joe'
}

const man = {
   species: 'man',
   name: 'Joe',
   gender: 'male',
   legs: 2,
   hands: 2,
   saying: 'one hundred himars to these brave Ukrainians'
}

const inhabitans = [dog, cat, woman, man];

inhabitans.forEach((inhabitan) => {
   let str = '';
   for (let key in inhabitan) {
      str += `${inhabitan[key]}; `;
   }
   print(str);
});


 

