class WorldInhabitant {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.prop = [species, name, gender, saying];
   }

   getMeaning() {
      return this.prop.map(meaning => meaning);
   }    
}

class Human extends WorldInhabitant { 
   constructor(species, name, gender, saying, legs = 2, hands = 2, friends = '') {
      super(species, name, gender, saying);
      this.legs = legs;
      this.hands = hands;
      this.prop = [species, name, gender, saying, legs, hands, friends];
   }
}

class Animal extends WorldInhabitant { 
   constructor(species, name, gender, saying, paws = 4) {
      super(species, name, gender, saying);
      this.paws = paws;
      this.prop = [species, name, gender, saying, paws];
   }
}

 const man = new Human('human', 'Jon', 'male', 'I want to sleep');

 const woman = new Human('human', 'Lena', 'female', 'Hello', 2, 2, man.name );
 
 const cat = new Animal('cat', 'Luna', 'female','murrr');
  
 const dog = new Animal('dog','Rasti','male','woof-woof');

 const catWoman = new Human('catwoman','Selina', 'female', cat.saying);

 [man, woman, cat, dog, catWoman].forEach(inhabitant => print(inhabitant.getMeaning().join('; ')))
