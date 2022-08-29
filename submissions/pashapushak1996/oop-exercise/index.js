class Inhabitant {
    constructor(species, name, gender, greeting, legs) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.greeting = greeting;
        this.legs = legs;
    }
}

class Human extends Inhabitant {
    constructor(name, gender, greeting, legs, hands) {
        super(name, gender, greeting, legs);
        this.species = 'human';
        this.hands = hands;
    }
}

const dog = new Inhabitant('dog', 'Tom', 'male', 'Howl!', 4);
const cat = new Inhabitant('cat', 'Kitty', 'female', 'Meow!', 4);
const woman = new Human('Jessy', 'female', 'Hello!', 2, 2);
const man = new Human('Ted', 'male', 'Hello my dear!', 2, 2);

const arrayOfInhabitants = [dog, cat, woman, man];

const arrayOfKeys = ['species', 'name', 'gender', 'greeting', 'legs', 'hands'];

const pullValuesOfObj = (obj) => {
    const array = [];

    arrayOfKeys.forEach((key) => {
        obj[key] && array.push(obj[key])
    });

    return array;
};

arrayOfInhabitants.forEach((inhabitant,) => {
    const arrayOfValues = pullValuesOfObj(inhabitant);

    const stringToPrint = arrayOfValues.join('; ') + ' ;';

    print(stringToPrint);
});
