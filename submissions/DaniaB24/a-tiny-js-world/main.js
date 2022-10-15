const cat = {
  species: 'cat',
  name: 'Mars',
  hands: undefined,
  gender: 'male',
  legs: 4,
  saying: 'mmeeow',
}
const dog = {
  species: 'dog',
  name: 'Lord',
  hands: undefined,
  gender: 'male',
  legs: 4,
  saying: 'woofff!!!',
}
const man = {
  species: 'human',
  name: 'Ron',
  hands: 2,
  gender: 'male',
  legs: 2,
  saying: 'ahoj!',
}
const women = {
  species: 'human',
  name: 'Hermione',
  hands: 2,
  gender: 'female',
  legs: 2,
  saying: 'hello!',
}
dog.friendly = [man.name, women.name];
cat.friendly = [women.name];
women.friendly = [man.name, dog.name, cat.name];
man.friendly = [dog.name, women.name];


const creatures = [man, dog, women, cat];

const propertyOfInhabitants = ['species','name', 'hands', 'gender', 'legs', 'saying', ]

const output = creatures.map(inhabitant => 
  propertyOfInhabitants.map(property => inhabitant[property]
     ).filter(element => element !== undefined).join('; ')
     ).join('\n');
     
print(output);
