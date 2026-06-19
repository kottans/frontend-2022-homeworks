const manNames = ['Vasil', 'Yurij', 'Zahar', 'Taras', 'Olexiy', 'Oleg', 'Mykola', 'Sashko', 'Sergij', 'Bohdan'];
const womanNames = ['Hanna', 'Helena', 'Vasilisa', 'Yulya', 'Oksana', 'Olena', 'Olga', 'Myroslava', 'Svitlana', 'Bohdana'];
const animalNames = ['Joy', 'Happy', 'Lucky', 'Puffy'];
const genders = ['male', 'female'];

let catSay = 'meau';
let dogSay = 'woufff';
let humanSay = 'Glory to Ukraine!';

function randomSelect(arr){
  return arr[Math.floor(Math.random()*arr.length)]
};

let newInhabitants = [];

class Inhabitant {  
  constructor(species, name, saying, friend, gender, ...speciesProperties){
    this.species = species;
    this.name = name;
    this.saying = saying;
    this.friend = friend;
    this.gender = gender;
    this.speciesProperties = speciesProperties;
  };
  getInhabitantPropertiesList(){
    const { species, name, saying, friend, gender} = this;
    return [species, name, saying, friend, gender].concat(this.speciesProperties).join('; ')
  };
};

class Animal extends Inhabitant{
  constructor( species, name, saying, friend, gender, paws, tail){
    super(species, name, saying, friend, gender, paws, tail);
    this.paws = paws;
    this.tail = tail;
  };
};
class Dog extends Animal{
  constructor( name, friend, gender ){
    super('dog', name, dogSay, friend, gender, 4, 1);
  };
};

class Cat extends Animal{
  constructor( name, friend, gender){
    super('cat', name, catSay, friend, gender, 4, 1);
  };
};

class Human extends Inhabitant{
  constructor( name, friend, gender, legs = 2, hands = 2){
    super('human', name, humanSay, friend, gender, legs, hands);
    this.legs = legs;
    this.hands = hands;
  };
};

function createInstance (Class, name, friend, gender){
  if (name, friend, gender){
    return new Class(name, friend, gender)
  };
  if (Class === Human) {
    return new Human(
      name = randomSelect(womanNames), 
      friend = newInhabitants.length === 0 ? randomSelect(animalNames) : randomSelect(newInhabitants).name,
      gender = 'female')
  } else if (Class === Cat) {
    return new Cat(
      name = randomSelect(animalNames), 
      friend = newInhabitants.length === 0 ? randomSelect(animalNames) : randomSelect(newInhabitants).name, 
      gender= randomSelect(genders))
 } else {
    return new Dog(
      name = randomSelect(animalNames), 
      friend = newInhabitants.length === 0 ? randomSelect(animalNames) : randomSelect(newInhabitants).name, 
      randomSelect(genders))
 };
};

newInhabitants = [
  createInstance (Human), 
  createInstance (Human),
  createInstance (Human, 'Maria', 'FriendlyFriend', 'female' ),
  createInstance (Dog),
  createInstance (Cat),
];
newInhabitants.forEach(inhabitant => print(inhabitant.getInhabitantPropertiesList(), 'div'))

