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

    getInfo(){
        return (
            ['species', 'name', 'gender', 'saying']
                .map(prop => this[prop]).join('; ')
        )
    }
}

class Human extends Inhabitant{
    constructor(name, gender, saying) {
        super('human', name, gender, saying);
        this.legs = 2;
        this.hands = 2;
    }
    getInfo(){
        return super.getInfo() + ` ${this.legs}; ${this.hands};`
    }
}

class Man extends Human{
    constructor(name, saying){
        super(name, 'male', saying);
    }
}

class Woman extends Human{
    constructor(name, saying){
        super(name, 'female', saying);
    }
}

class Animal extends Inhabitant{
    constructor(species, name, gender, saying) {
        super(species, name, gender, saying);
        this.paws = 4;
    }
    getInfo(){
        return super.getInfo() + ` my paws: ${this.paws};`
    }
}

class Cat extends Animal{
    constructor(name, gender) {
        super('cat', name, gender, 'May!');
    }
}

class Dog extends Animal{
    constructor(name, gender) {
        super('dog', name, gender, 'Gav!');
    }
}

let man = new Man('Kyryl', 'Hello, World!');
let woman = new Woman('Inna', 'Hey, Kyryl!');
let cat = new Cat('Tom', 'male');
let dog = new Dog('Toby', 'male');

inhabitants = [man, woman, cat, dog];

inhabitants.forEach(inhabitant => {
    print(
        inhabitant.getInfo()
    );
});
