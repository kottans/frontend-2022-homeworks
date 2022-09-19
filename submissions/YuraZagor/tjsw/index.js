const inhabitants = [];

let catSay = 'meau';
let dogSay = 'woufff';
let manSay = 'Wanna_beer_with_ice-cream!';
let womanSay = 'Are_U_hungry,_dear?';

let womanName = 'Maria';
let manName = 'Grumio';
let heDogName = 'Happy';
let sheDogName = 'Panda';
let tomCatName = 'Lucky';
let kittyName = 'Sweety';

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
      <option value="animal">Animal</option>
	  </select>
  </section>

  <section class="gender">
    <label for="gender">boy or girl shall I choose? </label>
	  <select name="gender" id="gender">
      <option value="male">male</option>
      <option value="female">female</option>
	  </select>
  </section>

  <section class="naming">
    <label for="naming">So let's come along with a name  </label>
    <textarea id="naming" name="naming" rows="1" cols="15" placeholder = 'name'></textarea>
  </section>

  <section class="saying-selection">
    <label for="saying">Seems that kinda inhabitants would say</label>
    <input list="sayings" id="saying" name="saying" placeholder = 'saying'>
    <datalist id="sayings">
      <option value=${catSay}></option>
      <option value=${dogSay}></option>
      <option value=${manSay}></option>
      <option value=${womanSay}></option>

    </datalist>
  </section>

  <section class="friend">
  <label for="friend">They are best friends with </label>
	  <select name="friend" id="friend">
    <option value=${manName}>${manName}</option>
    <option value=${womanName}>${womanName}</option>
    <option value=${heDogName}>${heDogName}</option>
    <option value=${sheDogName}>${sheDogName}</option>
    <option value=${tomCatName}>${tomCatName}</option>
    <option value=${kittyName}>${kittyName}</option>
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
  gender = document.getElementById('gender').value;
  friend = document.getElementById('friend').value;

  document.getElementById('naming').value ? name = document.getElementById('naming').value : name ='Joy';
  document.getElementById('saying').value ? saying = document.getElementById('saying').value : saying = "Glory to Ukraine";

  multipleCreation(num, species, gender, name, saying, friend);
};  

class Inhabitant {
  constructor(species, gender, name, saying, friend){
    this.species=species;
    this.gender=gender;
    this.name=name;
    this.saying=saying;
    this.friend=friend;
  }
  depict(){
    return `${this.species}; ${this.name}; ${this.gender}; ${this.saying}; ${this.friend}`
  };
  populate(){
    inhabitants.push(this);
    print(this.depict(),'div');
  };
};

class Animal extends Inhabitant{
  constructor( species, gender, name = sheDogName, saying = dogSay, friend = womanName, paws=4, tail=1 ){
    super(species, gender, name, saying, friend);
    this.paws=paws;
    this.tail=tail;
  };
  depict(){
    return `${this.species}; ${this.name}; ${this.gender}; ${this.paws}; ${this.tail}; ${this.saying}; ${this.friend}`
  };
};

class Human extends Inhabitant{
  constructor( species, gender, name = manName, saying = manSay, friend=sheDogName, legs=2, hands=2 ){
    super(species, gender, name, saying, friend);
    this.legs=legs;
    this.hands=hands;
  };
  depict(){
    return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${this.hands}; ${this.saying}; ${this.friend}`
  };
};

function creation(species, gender, name, saying, friend, legsPaws, handsTail){
  species.toLowerCase() === 'human' 
  ? (new Human(species, gender, name, saying, friend, legsPaws, handsTail)).populate()
  : (new Animal(species, gender, name, saying, friend, legsPaws, handsTail)).populate()
};

function multipleCreation(num, species, gender, name, saying, friend, legsPaws, handsTail){
  for (let i = 0; i<num; i++){
    creation(species, gender, name, saying, friend, legsPaws, handsTail)
  };
  
};
