class Animal {
    constructor(name, gender, saying, legs) {
        this.name = name;
        this.gender = gender;
        this.saying = saying;
        this.legs = legs;
    }
    declareAnimal() {
        return [this.constructor.name, this.name, this.gender, this.saying, this.legs].join(";");
    }
}

class Human extends Animal {
    constructor(name, gender, saying = 'hello', legs = 2, arms = 2) {
        super(name, gender, saying, legs);
        this.arms = arms;
    }
    declareAnimal() {
        return [super.declareAnimal(), this.arms].join(";");
    }
}

class Dog extends Animal {
    constructor(name, gender, saying = 'woof', legs = 4) {
        super(name, gender, saying, legs)
    }
}

class Cat extends Animal {
    constructor(name, gender, saying = 'meow', legs = 4) {
        super(name, gender, saying, legs)
    }
}

const Tom = new Human('Tom', 'male');
const Dick = new Human('Dick', 'male');
const Harry = new Human('Harry', 'male');

const Polly = new Human('Polly', 'female');
const Molly = new Human('Molly', 'female');
const Mary = new Human('Mary', 'female');

const Buddy = new Dog('Buddy', 'male');
const Betty = new Dog('Betty', 'female');

const Kitty = new Cat('Kitty', 'female');
const Tiger = new Cat('Tiger', 'male');

const creatures = [Tom, Dick, Harry, Polly, Molly, Mary, Buddy, Betty, Kitty, Tiger];
const creaturePropsList = creatures.map(one => one.declareAnimal()).join('\n\n');
console.log(creaturePropsList);
