import { print } from "./js/lib.js";
/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/d-pozniak/a-tiny-JS-world
   Web app: https://d-pozniak.github.io/a-tiny-JS-world/
   */
class Animal {
    constructor({
                    species: species,
                    name: name,
                    gender: gender,
                    legs: legs = 4,
                    says: says,
                }) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.says = says;
    }
    getKeyList() {
        return ["species", "name", "gender", "legs", "says"];
    }
    getStringOfValues() {
        return this.getKeyList()
            .map((key) => this[key])
            .join("; ");
    }
}
class Cat extends Animal {
    species = "Cat";
    says = "Meow!";
    constructor(name, gender, legs) {
        super({ name, gender, legs });
    }
}
class Dog extends Animal {
    species = "Dog";
    says = "Woof!";
    constructor(name, gender, legs) {
        super({ name, gender, legs });
    }
}
class Human extends Animal {
    species = "Human";
    constructor(name, gender, says, legs = 2, hands = 2) {
        super({ name, gender, says, legs });
        this.hands = hands;
    }
    getKeyList() {
        const keyList = super.getKeyList();
        keyList.splice(super.getKeyList().indexOf("legs"), 0, "hands");
        return keyList;
    }
}

const HUMANS = [
        new Human("John", "male", "Hey guys!"),
        new Human("Peter", "male", "How are you?"),
        new Human("Steve", "male", "I love sunny weather."),
        new Human("Mary", "female", "Let it snow."),
        new Human("Jane", "female", "How is it going?"),
        new Human("Jade", "female", "Can I have some cookies?"),
    ],
    DOGS = [
        new Dog("Bobik", "male"),
        new Dog("Spikey", "male"),
        new Dog("Jo", "female"),
    ],
    CATS = [
        new Cat("Murchik", "male"),
        new Cat("Kitty", "female"),
        new Cat("Benjamin", "male"),
    ],
    HABITANTS = HUMANS.concat(DOGS, CATS);

HABITANTS.forEach((habitant) => print(habitant.getStringOfValues()));
