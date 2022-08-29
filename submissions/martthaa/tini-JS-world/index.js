class Inmate {
    constructor(species, name, gender, legs, friends, saying) {
       this.species = species;
       this.name = name;
       this.gender = gender;
       this.legs = legs;
       this.friends = friends;
       this.saying = saying;
    }
 
    DisplayData() {
       let propertiesForDispaly = ['species', 'name', 'gender', 'legs', 'friends', 'saying'];
       return propertiesForDispaly.map(property => `<b>${property}:</b> ${this[property]}`).join('\t');
    }
 };
 
 class Dog extends Inmate {
    constructor(name, gender, friends, saying) {
       super('dog', name, gender, 4, friends, saying || 'guf');
    }
 };
 
 class Cat extends Inmate {
    constructor(name, gender, friends, saying) {
       super('cat', name, gender, 4, friends, saying || 'meow');
    }
 
    get getSaying() {
       return this.saying;
    }
 }
 
 class Human extends Inmate {
    constructor(name, gender, friends, saying) {
       super('human', name, gender, 2, friends, saying);
       this.hands = 2;
       this.saying = saying || `Hello! I'm ${this.name}`;
    }
 
    DisplayData() {
       return super.DisplayData() + '\t' + `<b>hands:</b> ${this.hands}`;
    }
 }
 
 class Woman extends Human {
    constructor(name, friends, saying) {
       super(name, 'female', friends, saying);
    }
 }
 
 class Man extends Human {
    constructor(name, friends, saying) {
       super(name, 'male', friends, saying);
    }
 }
 
 class CatWoman extends Woman {
    constructor(name, friends) {
       super(name, friends, 'meow', Cat.prototype.getSaying);
    }
 }
 
 const cat = new Cat('Ponchik', 'male', ['Simba', 'Murchik']);
 const dog = new Dog('Brown', 'male', ['Sky', 'Boba'], 'guffyy');
 const man = new Man('Orest', ['Jan', 'Nazar']);
 const woman = new Woman('Sasha', ['Ulyana', 'Dima']);
 const catWoman = new CatWoman('Selina', ['Batman','Tom']);
 
 const inmates = [cat, dog, man, woman, catWoman];
 
 let OUTPUT = inmates.map(inmates => inmates.DisplayData()).join('\n');
 
 print(OUTPUT);