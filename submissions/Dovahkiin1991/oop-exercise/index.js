import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Dovahkiin1991/a-tiny-JS-world
   Web app: https://dovahkiin1991.github.io/a-tiny-JS-world/
   */
// ======== OUTPUT ========
class Creature {
    constructor(species, name, gender, legs, hands, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.hands = hands;
        this.saying = saying;
    }

    listOfProperties() {
        const list = ['species', 'name', 'gender', 'legs', 'hands', 'saying'].flatMap((property) => {
            if (this[property]) {
                return `${property} - ${this[property]}`;
            } else {
                return [];
            }
        }).join('; ');

        return list;
    }
}

class Human extends Creature {
    constructor(name, gender, legs, hands) {
        super('Human', name, gender, legs, hands, `Hey, my name is ${name}!`)
    }
}

class Man extends Human {
    constructor(name, gender, legs, hands, saying) {
        super(name, gender, legs, hands, saying)
    }
}

class Woman extends Human {
    constructor(name, gender, legs, hands, saying) {
        super(name, gender, legs, hands, saying)
    }
}

class Animal extends Creature {
    constructor(species, name, gender, legs, hands, saying) {
        super(species, name, gender, legs, hands, saying)
    }
}

class Cat extends Animal {
    constructor(name, gender, legs) {
        super('cat', name, gender, legs, '', 'meuw-meuw!');
    }
}
class Dog extends Animal {
    constructor(name, gender, legs) {
        super('dog', name, gender, legs, '', 'woof-woof!');
    }
}

const inhabitantsList = [
    new Man('Alex', 'male', 2, 2),
    new Woman('Katie', 'female', 2, 2),
    new Cat('Simba', 'female', 4),
    new Dog('Toby', 'male', 4),
];

inhabitantsList.map((inhabitant) => {
    print(inhabitant.listOfProperties(), 'div');
});