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

const catwoman = {
   species: 'cat-woman',
   name: 'Selina',
   gender: 'female',
   legs: 2,
   hands: 2
}

dog.friends = [man.name, woman.name];
cat.friends = [catwoman.name];
catwoman.saying = cat.saying;

const inhabitans = [dog, cat, woman, man, catwoman];

const keys = ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'];

const convertObjToStr = (obj, arrKeys) => {
   return arrKeys.map(key => obj[key]).join('; ');
};

inhabitans.map(inhabitan => convertObjToStr(inhabitan, keys)).forEach(inhabitan => print(inhabitan));


 

