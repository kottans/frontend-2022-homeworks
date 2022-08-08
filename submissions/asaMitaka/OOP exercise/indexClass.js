/* Main Class */
class Mammal  {
    constructor (name, gender, legs, hands, wings, saying) {
        this.species = 'mammal';
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.wings = wings;
        this.saying = saying;
    }

    aboutMe() {
        return `${this.saying} My name is ${this.name}. I'm ${this.species} ${this.gender}. I have ${this.legs} legs, ${this.wings} wings, ${this.hands} hands.`;
    }
}

/* Human */
class Human extends Mammal{
    constructor (name, gender, saying = 'Hello') {
        super();
        this.species = 'human';
        this.name = name;
        this.gender = gender;
        this.legs = 2;
        this.hands = 2;
        this.saying = saying;
    }

    aboutMe() {
        return `${this.saying} My name is ${this.name}. I'm ${this.species} ${this.gender}. I have ${this.legs} legs, ${this.hands} hands.`;
    }
}

class Man extends Human {
    constructor (name, saying = 'hi', species, legs, hands) {
        super(species, legs, hands);
        this.name = name;
        this.gender = 'male';
        this.saying = saying;
    }
}

class Woman extends Human {
    constructor (name, saying = 'hello', species, legs, hands) {
        super(species, legs, hands);
        this.name = name;
        this.gender = 'female';
        this.saying = saying;
    }
}

/* Dog */
class Dog extends Mammal {
    constructor (name, gender, saying = 'Woof-Woof', ) {
        super();
        this.species = 'dog';
        this.name = name;
        this.gender = gender;
        this.legs = 4;
        this.hands = 0;
        this.saying = saying;
    }

    aboutMe() {
        return `${this.saying} My name is ${this.name}. I'm ${this.species} ${this.gender}. I have ${this.legs} legs.`;
    }
}

/* Cat */
class Cat extends Mammal {
    constructor (name, gender, saying='Meow') {
        super();
        this.species = 'cat';
        this.name = name;
        this.gender = gender;
        this.legs = 4;
        this.hands = 0;
        this.saying = saying;
    }

    aboutMe() {
        return `${this.saying} My name is ${this.name}. I'm ${this.species} ${this.gender}. I have ${this.legs} legs.`;
    }
}

let john = new Man('John', 'Hello');
let cassy = new Woman('Cassy', 'Hi!');
let ralph = new Dog('Ralph', 'male', 'Woooooof');
let aimi = new Cat('Aimi', 'female', 'meeeeeeoooooooow');

const inhabitants = [
    john, cassy, ralph, aimi
];

inhabitants.forEach( item => print(item.aboutMe()));
