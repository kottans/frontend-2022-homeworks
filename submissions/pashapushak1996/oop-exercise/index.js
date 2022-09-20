class Inhabitant {
    constructor(name, gender, greeting) {
        this.species = this.constructor.name.toLowerCase();
        this.name = name;
        this.gender = gender;
        this.greeting = greeting;
        this.inhabitantProps = ['species', 'name', 'gender', 'greeting'];
    }

    valuesToString() {
        return this.inhabitantProps
            .filter((prop) => this[prop])
            .map((prop) => this[prop])
            .join('; ') + ';';
    }
}

class Human extends Inhabitant {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
        this.legs = 2;
        this.hands = 2;
    }

    valuesToString() {
        this.inhabitantProps.push('legs', 'hands');
        return super.valuesToString();
    }
}

class Animal extends Inhabitant {
    constructor(name, gender, greeting) {
        super(name, gender, greeting);
        this.paws = 4;
    }

    valuesToString() {
        this.inhabitantProps.push('paws');
        return super.valuesToString();
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

const inhabitants = [dog, cat, woman, man];

const inhabitantProps = ['species', 'name', 'gender', 'greeting', 'legs', 'hands', 'paws'];

arrayOfInhabitants.forEach((inhabitant,) => {
    const stringToPrint = inhabitant.valuesToString(inhabitantProps);

    print(stringToPrint);
});
