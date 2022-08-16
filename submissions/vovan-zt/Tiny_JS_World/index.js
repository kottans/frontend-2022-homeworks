/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/
const dog = {
   species: "animal",
   name: "Rasti",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "woof-woof!",
};
   
const cat = {
   species: "animal",
   name: "Luna",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "mur",
};
   
const woman = {
   species: "human",
   name: "Lena",
   lastName: 'Jons',
   children: 2,
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "Hello",
   friends: 'Alex, Lena',
};
   
const man = {
   species: "human",
   name: "Alex",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "I want to sleep",
};
   
const catWoman = {
   species: "catwoman",
   name: "Selina",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
};

const WorldInhabitant = [dog, cat, woman, man, catWoman];

const  WorldInhabitantKeys =  ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'];

const objPrint = WorldInhabitant.map((obj) => {
   let arr = [];
   WorldInhabitantKeys.forEach(keys => {
      arr.push(obj[keys]);
   })
   return arr;
});

objPrint.forEach(item => {
   print(item.join('; '))
});
