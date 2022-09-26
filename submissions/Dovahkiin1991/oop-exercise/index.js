import { print } from './js/lib.js';
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/Dovahkiin1991/a-tiny-JS-world
   Web app: https://dovahkiin1991.github.io/a-tiny-JS-world/
   */
// ======== OUTPUT ========
const UNSET_VALUE = 'unset';
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
        return `
            species - ${this.species = this.species || UNSET_VALUE};
            name - ${this.name = this.name || UNSET_VALUE}; 
            gender - ${this.gender = this.gender || UNSET_VALUE}; 
            legs - ${this.legs = this.legs || UNSET_VALUE}; 
            hands - ${this.hands = this.hands || UNSET_VALUE}; 
            saying - ${this.saying = this.saying || UNSET_VALUE};
        `;
    }
}

class Human extends Creature {
    constructor(species, name, gender, legs, hands) {
        super(species, name, gender, legs, hands, `Hey, my name is ${name}!`)
    }
}

class Man extends Human {
    constructor(name, gender, legs, hands, saying) {
        super('man', name, gender, legs, hands, saying)
    }
}

class Woman extends Human {
    constructor(name, gender, legs, hands, saying) {
        super('woman', name, gender, legs, hands, saying)
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