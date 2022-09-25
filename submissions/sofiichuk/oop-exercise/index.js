class Animal {
    constructor(name, gender, saying) {
        this.name = name;
        this.gender = gender;
        this.saying = saying;
    }
}

class Human extends Animal {
    constructor(name, gender, saying, legs = 2, arms = 2) {
        super(name, gender, saying);
        this.legs = legs;
        this.arms = arms;
    }
}

class Pet extends Animal {
    constructor(name, gender, saying, legs = 4) {
        super(name, gender, saying);
        this.legs = legs;
    }
}

class Man extends Human {
    constructor(name, gender = 'male', saying = 'hi', legs, arms) {
        super(name, gender, saying, legs, arms);
    }
}

class Woman extends Human {
    constructor(name, gender = 'female', saying = 'hello', legs, arms) {
        super(name, gender, saying, legs, arms);
    }
}

class Dog extends Pet {
    constructor(name, gender, saying = 'woof', legs) {
        super(name, gender, saying, legs);
    }
}

class Cat extends Pet {
    constructor(name, gender, saying = 'meow', legs) {
        super(name, gender, saying, legs);
    }
}

const Tom = new Man('Tom');
const Dick = new Man('Dick');
const Harry = new Man('Harry');

const Polly = new Woman('Polly');
const Molly = new Woman('Molly');
const Mary = new Woman('Mary');

const Buddy = new Dog('Buddy', 'male');
const Betty = new Dog('Betty', 'female');

const Kitty = new Cat('Kitty', 'female');
const Tiger = new Cat('Tiger', 'male');

const creatures = [Tom, Dick, Harry, Polly, Molly, Mary, Buddy, Betty, Kitty, Tiger];
const creaturePropsList = creatures.map(props => `${Object.values(props).join(";")}`)
    .join('\n\n');
print(creaturePropsList);
