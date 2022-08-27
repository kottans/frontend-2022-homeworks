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
    constructor(gender, name, species = this.constructor.name) {
        this.species = species;
        this.gender = gender;
        this.name = name;
    }
    getInfo() {
        return `I'm ${this.constructor.name}. My name is ${this.name} and I am ${this.gender}.`;
    }
}

class Human extends Inhabitant {
    constructor(gender, name) {
        super(gender, name);
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

class Animal extends Inhabitant {
    constructor(gender, name) {
        super(gender, name);
        this.paws = 4;
    }
    getInfo() {
        return super.getInfo() + ` I have ${this.paws} paws.`;
    }
}

class Cat extends Animal {
    constructor(gender, name) {
        super(gender, name);
        this.vocabulary = {
            "hi": "Nyav nyav!"
        };
        this.say = new Saying(this);
    }
    getInfo() {
        return super.getInfo();
    }
}

class Dog extends Animal {
    constructor(gender, name) {
        super(gender, name);
        this.vocabulary = {
            "hi": "Woof woof!"
        };
        this.say = new Saying(this);
    }
    getInfo() {
        return super.getInfo();
    }
}

class WomanCat extends Human {
    //This class can easily be converted to HumansCat, if needed
    constructor(name) {
        super("female", name);
        this.say = new Saying(new Cat());
    }
    getInfo() {
        return super.getInfo();
    }
}

function initInhabitants() {
    //init some inhabitants for presentation
    return [
        new Human("male", "Harry"),
        new Human("female", "Jinny"),
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
