const woman = {
    species: 'human',
    name: 'line',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'bye',
};
const man = {
    species: 'human',
    name: 'Joey',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'hi',
};
const dog = {
    species: 'dog',
    name: 'Dik',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof',
};
const cat = {
    species: 'cat',
    name: 'Tom',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'mau',
};
  
  
const inhabitants = [dog, cat, woman, man];
  
const keys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];
  
const description = inhabitants.map((inhabitant) => {
    return keys.map(key => inhabitant[key]);
});
  
description.map(el => print(el.join('; ')));
  
