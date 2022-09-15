class Inhabitant {
    constructor(species, name, gender, legs, saying) {
        this.species = species;
        this.name = name;
        this.legs = legs;
        this.gender = gender;
        this.saying = saying;
    }
    inhabitantShowProps() {
        return `${this.species}; ${this.name}; ${this.gender}; ${this.legs}; ${this.saying}`;
    }
}
class Human extends Inhabitant {
    constructor(name, gender, saying, legs = 2, hands = 2) {
        super("human", name, gender, legs, saying);
        this.hands = hands;
    }
    inhabitantShowProps() {
        return `${super.inhabitantShowProps()}; ${this.hands}`;
    }
}

class Dog extends Inhabitant {
    constructor(name, gender, saying, legs = 4) {
        super("dog", name, gender, legs, saying);
    }
}

class Cat extends Inhabitant {
    constructor(name, gender, saying, legs = 4) {
        super("cat", name, gender, legs, saying);
    }
}

const dog = new Dog("Rex", "male", "bow-wow!");
const cat = new Cat("Dolly", "female", "purr-purr");
const man = new Human("Joe", "male", "My name is Joe Black");
const woman = new Human("Jessica", "female", "Hi guys");

[dog, cat, man, woman].forEach((inhabitant) =>
    print(inhabitant.inhabitantShowProps())
);
