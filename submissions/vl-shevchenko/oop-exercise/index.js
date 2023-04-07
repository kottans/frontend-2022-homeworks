class Inhabitants {
   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
   }
   info() {
      return (this.species + ';' + this.name + ';' + this.gender + ';' + this.saying);
   }
};

class People extends Inhabitants {
   constructor(species, name, gender, legs, hands, saying) {
      super(species, name, gender, saying);
      this.legs = legs;
      this.hands = hands;
   }
   info() {
      return super.info() + ';' + this.legs + ';' + this.hands;
   }
};

class Animals extends Inhabitants {
   constructor(species, name, gender, paws, saying) {
      super(species, name, gender, saying);
      this.paws = paws;

   }
   info() {
      return super.info() + ';' + this.paws + ';';
   }
};


let toby = new Animals('dog', 'Toby', 'male', '4', 'woof-woof');
let zhorik = new Animals('cat', 'Zhorik', 'male', '4', 'moooow!');
let kate = new People('woman', 'Kate', 'female', '2', '2', 'What did you say?');
let john = new People('man', 'John', 'male', '2', '2', 'Im fine.');

let city = [toby, zhorik, kate, john];

city.map((city) => {
   print(city.info());
});

