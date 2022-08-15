/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/
const dog = {
   species: "dog",
   name: "Rasti",
   gender: "male",
   legs: 4,
   hands: 0,
   saying: "woof-woof!",
};
   
const cat = {
   species: "cat",
   name: "Luna",
   gender: "female",
   legs: 4,
   hands: 0,
   saying: "mur",
};
   
const woman = {
   species: "woman",
   name: "Lena",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "Hello",
   friends: 'Alex, Lena',
};
   
const man = {
   species: "man",
   name: "Alex",
   gender: "male",
   legs: 2,
   hands: 2,
   saying: "I want to sleep",
   friends: 'Leo, Ivan',
};
   
const catWoman = {
   species: "catwoman",
   name: "Selina",
   gender: "female",
   legs: 2,
   hands: 2,
   saying: cat.saying,
};

const objName = [dog, cat, woman, man, catWoman];

const objPrint = objName.map((obj) => {
   let arr=[]
   for (let key in obj) { 
      arr.push(obj[key])
   }
   return arr
});

objPrint.forEach(item => {
   print(item.join('; '))
})

