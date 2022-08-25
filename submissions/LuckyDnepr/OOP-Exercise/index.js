"use strict";

class Saying {
    constructor(person, vocabulary = "vocabulary") {
        return function (aventForAnswer) {
            return person[vocabulary].hasOwnProperty(aventForAnswer) ?
                person[vocabulary][aventForAnswer] :
                "Nothing to say";
        };
    }
}

class Inhabitant {
    constructor(species, gender, name) {
        this.species = species;
        this.gender = gender;
        this.name = name;
    }
    getInfo() {
        return `I'm ${this.species}. My name is ${this.name} and I am ${this.gender}.`;
    }
}

class Humans extends Inhabitant {
    constructor(gender, name) {
        super("Human", gender, name);
        this.hands = 2;
        this.legs = 2;
        this.vocabulary = {
            "hi": "Hi all!"
        };
        this.say = new Saying(this);
    }
    getInfo() {
        return (
            super.getInfo() + ` I have ${this.hands} hands and ${this.legs} legs.`
        );
    }
}

class Animals extends Inhabitant {
    constructor(gender, name) {
        super("Animal", name, gender);
        this.paws = 4;
    }
    getInfo() {
        return super.getInfo() + ` I have ${this.paws} paws.`;
    }
}

class Cat extends Animals {
    constructor(gender, name) {
        super(name, gender);
        this.vocabulary = {
            "hi": "Nyav nyav!"
        };
        this.say = new Saying(this);
    }
    getInfo() {
        return `I'm ${this.constructor.name}. ` + super.getInfo();
    }
}

class Dog extends Animals {
    constructor(gender, name) {
        super(name, gender);
        this.vocabulary = {
            "hi": "Woof woof!"
        };
        this.say = new Saying(this);
    }
    getInfo() {
        return `I'm ${this.constructor.name}. ` + super.getInfo();
    }
}

class WomanCat extends Humans {
    //This class can easily be converted to HumansCat, if needed
    constructor(name) {
        super("female", name);
        this.say = new Saying(new Cat());
    }
    getInfo() {
        return `I'm ${this.constructor.name}. ` + super.getInfo();
    }
}

function initInhabitants() {
    //init some inhabitants for presentation
    return [
        new Humans("male", "Harry"),
        new Humans("female", "Jinny"),
        new Cat("female", "Starling"),
        new Dog("male", "Oscar"),
        new WomanCat("Jessica")
    ];
}

function printInhabitantsInfo(inhabitants) {
    inhabitants
        .map((person) => person.say("hi") + " " + person.getInfo() + "\n")
        .forEach((info) => print(info));
}

printInhabitantsInfo(initInhabitants());
