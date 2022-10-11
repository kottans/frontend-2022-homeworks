const manNamesArr = ['Vasil', 'Yurij', 'Zahar', 'Taras', 'Olexiy', 'Oleg', 'Mykola', 'Sashko', 'Sergij', 'Bohdan']
const womanNamesArr = ['Hanna', 'Helena', 'Vasilisa', 'Yulya', 'Oksana', 'Olena', 'Olga', 'Myroslava', 'Svitlana', 'Bohdana']
const animalNamesArr = ['Joy', 'Happy', 'Lucky', 'Puffy']
const genderArr = ['male', 'female']

let catSay = 'meau';
let dogSay = 'woufff';
let humanSay = 'Glory to Ukraine!';

function randomSelect(arr){
  return arr[Math.floor(Math.random()*arr.length)]
}
let manName = randomSelect(manNamesArr)
let womanName = randomSelect(womanNamesArr)
let animalName = randomSelect(animalNamesArr)

const inhabitants = [
  { species: 'human', 
    gender: 'male',
    name: 'Vasil',
    saying: 'Slava natsiyi',
    friend: 'Hanna',
    legs: 2,
    hands: 2,
  },
  { species: 'human', 
    gender: 'female',
    name: 'Hanna',
    saying: 'Smert vorogam',
    friend: 'Vasil',
    legs: 2,
    hands: 2,
  },
];

class Inhabitant {  
  constructor(species, name, saying, friend, gender){
    this.species = species;
    this.name = name;
    this.saying = saying
    this.friend = friend;
    this.gender = gender;
  }
  accountInhabitants(){
    inhabitants.push(this);
  };
  commonProperties(){
    const { species, name, saying, friend, gender} = this;
    return [species, name, saying, friend, gender]
  }
};

class Animal extends Inhabitant{
  constructor( species, name, saying, friend, gender, paws, tail ){
    super(species, name, saying, friend, gender);
    this.paws = paws;
    this.tail = tail;
  };
  populate(){
    const { paws, tail} = this;
    const speciesProperties = [ paws, tail];
    print(this.commonProperties().concat(speciesProperties).join('; '),'div');
    this.accountInhabitants()
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
    super('human', name, humanSay, friend, gender);
    this.legs = legs;
    this.hands = hands;
  };
  populate(){
    const { legs, hands} = this;
    const speciesProperties = [ legs, hands];
    print(this.commonProperties().concat(speciesProperties).join('; '),'div');
    this.accountInhabitants()
  };
};

function createOne(className, name, friend, gender){
  className.toLowerCase() === 'human' 
  ? (new Human(name = randomSelect(womanNamesArr), friend = friend = randomSelect(inhabitants).name, gender = 'female')).populate()
  : className.toLowerCase() === 'cat' 
  ? (new Cat(name = randomSelect(animalNamesArr), friend = friend = randomSelect(inhabitants).name, gender = randomSelect(genderArr))).populate()
  : (new Dog(name = randomSelect(animalNamesArr), friend = friend = randomSelect(inhabitants).name, gender = randomSelect(genderArr))).populate()
};

function createMany(num, species){
  for (let i = 0; i<num; i++){
    createOne(species)
  };  
};
const vasya = new Human ('Vasya', womanName, 'male' );
vasya.populate();
createOne('human', womanName, animalName, 'male' );
createOne('human', randomSelect(womanNamesArr), animalName, 'female' );
createOne('dog', animalName, 'male', animalName);
createOne('cat', randomSelect(animalNamesArr), 'female', animalName);
createMany(4, 'human' );

const inputElement = document.createElement('form');
inputElement.classList.add('input--form');
document.getElementById('main').appendChild(inputElement);
inputElement.id = 'form';
inputElement.innerHTML = 
`
  <h3>Let's populate this tiny World!!!</h3>
  <section class="addNumber" >
    <label for="num">I wanna add inhabitants, say </label>
    <select name="num" id="num">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </section>
  <section class="species">
    <label for="species">It will be </label>
    <select name="species" id="species">
      <option value="human">Human</option>
      <option value="cat">Cat</option>
      <option value="dog">dog</option>
    </select>
  </section>
    
  <section class="submission">
    <input type='submit' value='Create!'>
  </section>
  `
const form = document.getElementById('form');
form.addEventListener('submit', useFormValue);
function useFormValue(event) {
  event.preventDefault();
   
  num = document.getElementById('num').value;
  species = document.getElementById('species').value;

  createMany(num, species);
};
