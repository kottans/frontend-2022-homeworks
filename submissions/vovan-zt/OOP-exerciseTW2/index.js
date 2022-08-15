/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:
*/
class WorldInhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
    }
      
    getMeaning() {
      return `${this.species}; ${ this.name}; ${this.gender}; ${this.saying}; `
    }
   
}

class Human extends WorldInhabitant { 
   constructor(species, name, gender, saying, legs = 2, hands = 2, friends = '') {
   super(species, name, gender, saying);
   this.legs = legs;
   this.hands = hands;
   this.friends = friends;
   }

   getMeaning() {
      return super.getMeaning() + `${this.legs}; ${this.hands}; ${this.friends}`;
    }


}

class Animal extends WorldInhabitant { 
   constructor(species, name, gender, saying, paws = 4 ) {
   super(species, name, gender, saying);
   this.paws = paws;
   }

   getMeaning() {
      return super.getMeaning() + `${this.paws};`;
    }

}

 const man = new Human('Alex', 'Joey', 'male', 'I want to sleep', 2, 2, 'Ivan, Stepan');
 
 const woman = new Human('human', 'Lena', 'female', 'Hello');
 
 const cat = new Animal('cat', 'Luna', 'female','murrr');
  
 const dog = new Animal('dog','Rasti','male','woof-woof');

 const catWoman = new Human('catwoman','Selina', 'female', cat.saying);



 [man, woman, cat, dog, catWoman].forEach(item => print(item.getMeaning()))
