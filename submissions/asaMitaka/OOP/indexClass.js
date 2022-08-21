class Animal {
    constructor(species, name, saying, gender) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = 4;
    }

    tellAboutClass() {
        return `${this.saying} My name is ${this.name} I am ${this.species} ${this.gender}. I have ${this.legs} legs`;
    }
}

class Cat extends Animal {
    constructor(name, saying, gender) {
        super('cat', name, saying, gender);
    }
}

class Dog extends Animal {
    constructor(name, saying, gender) {
        super('dog', name, saying, gender);
    }
}

class Human {
    constructor(name, saying, gender) {
        this.species = 'human';
        this.name = name;
        this.saying = saying;
        this.hands = 2;
        this.legs = 2;
        this.gender = gender;
    }

    tellAboutClass() {
        return `${this.saying} My name is ${this.name} I am ${this.species} ${this.gender}. I have ${this.hands} hands and ${this.legs} legs`;
    }
}

class Man extends Human {
    constructor(name, saying) {
        super(name, saying, 'male');
    }
}

class Woman extends Human {
    constructor(name, saying) {
        super(name, saying, 'female');
    }
}

const john = new Man('John', 'Hi');
const mary = new Woman('Mary', 'Hello');
const boris = new Dog('Boris', 'Woof', 'male');
const sam = new Cat('Sam', 'Meoow', 'female');

const inhabitants = [john, mary, boris, sam];
inhabitants.forEach( item => print(item.tellAboutClass()));
