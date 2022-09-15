class Inhabitants {
    constructor(saying, species, name, gender, friends, legs) {
        this.saying = saying + ", says the ";
        this.species = species;
        this.name = " by the name " + name + ".";
        this.gender = " " + gender + ".";
        this.friends = " Friends with " + friends + ".";
        this.legs = " Has " + legs;
    }
    printInhabitants() {
        return [this.saying + this.species + this.name + this.gender + this.friends + this.legs];
    }
}

class Humans extends Inhabitants {
    constructor(saying, name, gender, friends, legs, hands) {
        super(saying, "human", name, gender, friends, legs);
        this.hands = " " + hands;
    }
    printInhabitants() {
        return [super.printInhabitants() + this.hands];
    }
}

class Dog extends Inhabitants {
    constructor(saying, legs, name, gender, friends) {
        super(saying, "dog", legs, name, gender, friends);
    }
}

class Cat extends Inhabitants {
    constructor(saying, legs, name, gender, friends) {
        super(saying, "cat", legs, name, gender, friends);
    }
}

let man = new Humans("'Honey, where's my wooden leg?'", "Franke", "Male", ["Elvis", " Marilyn"], "1 leg", "& 2 hands.");
let woman = new Humans("'Well it's a good day for singing a song!'", "Marilyn", "Female", ["Franke", " Audrey"], "2 legs", "& 2 hands.");
let animal1 = new Dog("'Wooffle-wooffle!'", "Elvis", "Male", ["Franke", " Marilyn", " Audrey"], "4 legs.");
let animal2 = new Cat("'Hiss-hiss!'", "Audrey", "Female", "no one", "4 legs.");

const inhabitants = [man, woman, animal1, animal2];

inhabitants.map((item) => print(`<h5>${item.printInhabitants()}</h5>`));
