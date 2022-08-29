class Habitant {
  constructor(name, gender, saying, friends, legs) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
    this.legs = legs;
  }
}

class Human extends Habitant {
  constructor(name, gender, saying, friends, legs = 2, hands = 2) {
    super (name, gender, saying, friends, legs);
    this.hands = hands;
  }
  toString() {
    let {name, gender, saying, friends, legs, hands, constructor} = this;
    return `${saying}! My name is ${name}. I'm ${gender}, ${constructor.name.toLowerCase()}. I have ${hands} hands and ${legs} legs. I'm friends with ${friends}.`;
  }
}

class Cat extends Habitant {
  constructor(name, gender, saying, friends, legs = 4) {
    super(name, gender, saying, friends, legs);
  }
  scatterLitterBox() {
    let leftoverLitter = Math.random();
    if (leftoverLitter < 0.5) {
      return 'cat litter is everywhere. Time to clean.'
    } else {
      return 'around the tray is clean. Check if the cat is alive.'
    }
  }
  toString() {
    let {name, gender, saying, friends, legs, constructor} = this;
    return `${saying}! This cat's name is ${name}. It's ${gender}, ${constructor.name.toLowerCase()}. It has ${legs} legs. It's friends with ${friends}. By the way, ${this.scatterLitterBox()}`;
  }
}

class Dog extends Habitant {
  constructor(name, gender, saying, friends, company, legs = 4) {
    super(name, gender, saying, friends, legs);
    this.company = company;
  }
  sniff() {
    let index = Math.floor(Math.random() * this.company.length);
    if (this.company[index] instanceof Cat) {
      return 'Cat is among us. Woof-woof!'
    } else {
      return `No cat around. ${this.name} wags its tail.`
    }
  }
  toString() {
    let {name, gender, saying, friends, legs, constructor} = this;
    return `${saying}! This dog's name is ${name}. It's ${gender}, ${constructor.name.toLowerCase()}. It has ${legs} legs. It's friends with ${friends}. ${name} is sniffing. ${this.sniff()}`;
  }
}

class CatWoman extends Cat {
  constructor(name, gender, saying, friends, legs = 2, hands = 2) {
    super(name, gender, saying, friends, legs);
    this.hands = hands;
  }
}

CatWoman.prototype.toString = Human.prototype.toString;

const habitants = [];
habitants.push(new Human('Bob', 'male', 'I\'m vegan', 'no one'));
habitants.push(new Human('Mary', 'female', 'Hi everyone', 'Tom, Rex, Halle'));
habitants.push(new Cat('Tom', 'male', 'Mrrr', 'Mary, Halle'));
habitants.push(new Dog('Rex', 'male', 'Woof', 'Mary', habitants));
habitants.push(new CatWoman('Halle', 'female', 'Mrrr', 'Mary, Tom, Batman'));
 
habitants.forEach((habitant) => print(habitant));
