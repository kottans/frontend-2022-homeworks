class Inhabitant {
    constructor(name, gender, greeting) {
        this.species = this.constructor.name.toLowerCase();
        this.name = name;
        this.gender = gender;
        this.greeting = greeting;
    }
}

class Human extends Inhabitant {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
        this.legs = 2;
        this.hands = 2;
    }
}

class Animal extends Inhabitant {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
        this.paws = 4;
    }
}

class Cat extends Animal {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
    }
}

class Dog extends Animal {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
    }
}

const dog = new Dog('Tom', 'male', 'Howl!');
const cat = new Cat('Kitty', 'female', 'Meow!');
const woman = new Human('Jessy', 'female', 'Hello!');
const man = new Human('Ted', 'male', 'Hello my dear!');

const arrayOfInhabitants = [dog, cat, woman, man];

const arrayOfKeys = ['species', 'name', 'gender', 'greeting', 'legs', 'hands', 'paws'];

const pullValuesOfObj = (obj) => {
    const array = [];

    arrayOfKeys.forEach((key) => {
        obj[key] && array.push(obj[key]);
    });


    return array;
};

arrayOfInhabitants.forEach((inhabitant,) => {
    const arrayOfValues = pullValuesOfObj(inhabitant);

    const stringToPrint = arrayOfValues.join('; ') + ' ;';

    print(stringToPrint);
});
