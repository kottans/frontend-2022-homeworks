/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kirill8210/a-tiny-JS-world
   Web app: https://kirill8210.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant{
    constructor(species, name, gender, saying){
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    }
    getShow(){
        return `${this.species}; ${this.name}; ${this.gender}; ${this.saying};`
    }
}

class Human extends Inhabitant{
    constructor(species, name, gender, saying, legs, hands) {
        super(species, name, gender, saying);
        this.legs = legs;
        this.hands = hands;
    }
    getShow(){
        return super.getShow() + ` ${this.legs}; ${this.hands};`
    }
}

class Animals extends Inhabitant{
    constructor(species, name, gender, saying, legs) {
        super(species, name, gender, saying);
        this.legs = legs;
    }
    getShow(){
        return super.getShow() + ` ${this.legs};`
    }
}

let man = new Human('man', 'Kyryl', 'male', 'Hello, World!', 2, 2);
let woman = new Human('woman', 'Inna', 'female', 'Hello, World!', 2, 2);
let cat = new Animals('cat', 'Tom', 'male','May!', 4);
let dog = new Animals('dog', 'Toby', 'male','Gav!', 4);

inhabitants = [man, woman, cat, dog];

inhabitants.forEach(inhabitant => {
    print(
        inhabitant.getShow()
    );
});
