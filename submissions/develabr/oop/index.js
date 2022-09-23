class Creature {
  constructor(species, name, gender, saying, friends) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
    this.args = ['species', 'name', 'gender', 'saying', 'friends'];
  }
  personInfoItems() {
    return this.args.map((key) => this[key]).join('; ');
  }
}

class Animal extends Creature {
  constructor(species, name, gender, saying, friends) {
    super(species, name, gender, saying, friends);
    this.leg = 4;
    this.args = [...this.args, 'leg'];
  }
}

class Human extends Creature {
  constructor(name, gender, saying, friends) {
    super('human', name, gender, saying, friends);
    this.leg = 2;
    this.hands = 2;
    this.args = [...this.args, 'leg', 'hands'];
  }
}

class Cat extends Animal {
  constructor(name, gender, friends) {
    super('cat', name, gender, 'meow!', friends);
  }
}

class Dog extends Animal {
  constructor(name, gender, friends) {
    super('dog', name, gender, 'woof-woof!', friends);
  }
}

class Man extends Human {
  constructor(name, saying, friends) {
    super(name, 'male', saying, friends);
  }
}

class Woman extends Human {
  constructor(name, saying, friends) {
    super(name, 'female', saying, friends);
  }
}

class Catwoman extends Human {
  constructor(name, saying, friends) {
    super(name, 'female', saying, friends);
  }
}

const cat = new Cat('Kitty', 'female', ["cats don't needs any friends"]);
const catWoman = new Catwoman('Catwoman', cat.saying, [cat.name]);
const woman = new Woman('Selina Kyle', 'Hello, Batman. Do you know Catwoman?', [
  cat.name,
  catWoman.name,
]);
const man = new Man('Bruce Wayne', "Hi! I'm Batman", [
  catWoman.name,
  woman.name,
]);
const dog = new Dog('Spike', 'male', [woman.name, man.name]);

const persons = [dog, cat, man, woman, catWoman];

persons.map((person) => print(person.personInfoItems()));
