class Mammal  {
    constructor (name, gender, legs, saying) {
        this.species = 'mammal';
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.saying = saying;
    }

    tellAboutClass() {
        return `${this.saying} My name is ${this.name}. I'm ${this.species} ${this.gender}. I have ${this.legs} legs.`;
    }
}

class Human extends Mammal{
    constructor (name, gender, saying) {
        super(name, gender);
        this.species = 'human';
        this.legs = 2;
        this.hands = 2;
        this.saying = saying;
    }

    tellAboutClass() {
        return `${super.tellAboutClass()} I have ${this.hands} hands.`;
    }
}

class Man extends Human {
    constructor (name, saying = 'Hello.') {
        super(name, saying);
        this.gender = 'male';
        this.saying = saying;
    }
}

class Woman extends Human {
    constructor (name, saying = 'Hi') {
        super(name, saying);
        this.gender = 'female';
        this.saying = saying;
    }
}

class Dog extends Mammal {
    constructor (name, gender, saying = 'woof') {
        super(name, gender);
        this.species = 'dog';
        this.legs = 4;
        this.saying = saying;
    }
}

class Cat extends Mammal {
    constructor (name, gender, saying = 'Meow') {
        super(name, gender);
        this.species = 'cat';
        this.legs = 4;
        this.saying = saying;
    }
}

const john = new Man('John');
const cassy = new Woman('Cassy', 'Hi!');
const ralph = new Dog('Ralph', 'male', 'Woooooof');
const aimi = new Cat('Aimi', 'female', 'Meeeeeeoooooooow');

const inhabitants = [john, cassy, ralph, aimi];

inhabitants.forEach( item => print(item.tellAboutClass()));
