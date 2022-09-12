class Animal {
    constructor(species, name, gender, legs, arms, saying) {
        this.species = species;
        this.name = name;
        this.gender = gender;
        this.legs = legs;
        this.arms = arms;
        this.saying = saying;
    }
}

class Human extends Animal {
    constructor(species = 'human', name, gender, legs = 2, arms = 2, saying) {
        super(species, name, gender, legs, arms, saying)
    }
}

class Man extends Human {
    constructor(name, gender = 'male', legs, arms, saying = 'hi') {
        super('human', name, gender, legs, arms, saying)
    }
}

class Woman extends Human {
    constructor(name, gender = 'female', legs, arms, saying = 'hello') {
        super('human', name, gender, legs, arms, saying)
    }
}

const Tom = new Man('Tom');
const Dick = new Man('Dick');
const Harry = new Man('Harry');

const Polly = new Woman('Polly');
const Molly = new Woman('Molly');
const Mary = new Woman('Mary');

class Dog extends Animal {
    constructor(name, gender, legs = 4, arms, saying = 'woof') {
        super('dog', name, gender, legs, arms, saying)
        delete this.arms
    }
}

class Cat extends Animal {
    constructor(name, gender, legs = 4, arms, saying = 'meow') {
        super('cat', name, gender, legs, arms, saying)
        delete this.arms
    }
}

const Buddy = new Dog('Buddy', 'male');
const Betty = new Dog('Betty', 'female');

const Kitty = new Cat('Kitty', 'female');
const Tiger = new Cat('Tiger', 'male');

const creatures = [Tom, Dick, Harry, Polly, Molly, Mary, Buddy, Betty, Kitty, Tiger];
const creaturePropsList = creatures.map(props => `${Object.values(props).join(";")}`)
    .join('\n\n');
print(creaturePropsList);
