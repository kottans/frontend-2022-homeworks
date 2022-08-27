class Inhabitants {
    constructor(species, name, gender, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    }

    tellAboutClass() {
        return `${this.saying} My name is ${this.name} I am ${this.species} ${this.gender}.`;
    }
}

class Animal extends Inhabitants{ 
    constructor(species, name, gender, saying) {
        super(species, name, gender, saying);
        this.legs = 4;
    }

    tellAboutClass() {
        return super.tellAboutClass() + `I have ${this.legs} legs`;
    }
}

class Cat extends Animal {
    constructor(name, gender, saying) {
        super('cat', name, gender, saying);
    }
}

class Dog extends Animal {
    constructor(name, gender, saying) {
        super('dog', name, gender, saying);
    }
}

class Human extends Inhabitants{
    constructor(name, gender, saying) {
        super('human', name, gender, saying);
        this.hands = 2;
        this.legs = 2;
    }

    tellAboutClass() {
        return super.tellAboutClass() + `I have ${this.hands} hands and ${this.legs} legs`;
    }
}

class Man extends Human {
    constructor(name, saying) {
        super(name, 'male', saying);
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super(name, 'female', saying);
    }
}

const john = new Man('John', 'Hi');
const mary = new Woman('Mary', 'Hello');
const boris = new Dog('Boris', 'male', 'Woof');
const sam = new Cat('Sam', 'female', 'Meoow');

const inhabitants = [john, mary, boris, sam];
inhabitants.forEach( item => print(item.tellAboutClass()));
