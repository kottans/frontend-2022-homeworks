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
   species: "human",
   name: "Lena",
   lastName: 'Jons',
   children: 2,
   gender: "female",
   legs: 2,
   hands: 2,
   saying: "Hello",
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

const  WorldInhabitantKeys =  ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

const WorldInhabitantPrint = WorldInhabitant.map(inhabitant => WorldInhabitantKeys.map(meaning => inhabitant[meaning]));

WorldInhabitantPrint.forEach(inhabitant => {
   print(inhabitant.join('; '))
});

