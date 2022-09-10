class Habitant {
  constructor(name, gender, saying, friends, legs) {
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friends = friends;
    this.legs = legs;
  }
  toString() {
    let {name, gender, saying, friends, legs} = this;
    return [name, gender, saying, friends, legs].join(';');
  }
}

class Human extends Habitant {
  constructor(name, gender, saying, friends, legs = 2, hands = 2) {
    super (name, gender, saying, friends, legs);
    this.hands = hands;
  }
  toString() {
    let {hands, constructor: {name: species}} = this;
    let [name, gender, saying, friends, legs] = super.toString().split(';');
    return `${saying}! My name is ${name}. I'm ${gender}, ${species.toLowerCase()}. I have ${hands} hands and ${legs} legs. I'm friends with ${friends}.`;
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
    let {constructor: {name: species}} = this;
    let [name, gender, saying, friends, legs] = super.toString().split(';');
    return `${saying}! This cat's name is ${name}. It's ${gender}, ${species.toLowerCase()}. It has ${legs} legs. It's friends with ${friends}. By the way, ${this.scatterLitterBox()}`;
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
    let {constructor: {name: species}} = this;
    let [name, gender, saying, friends, legs] = super.toString().split(';');
    return `${saying}! This dog's name is ${name}. It's ${gender}, ${species.toLowerCase()}. It has ${legs} legs. It's friends with ${friends}. ${name} is sniffing. ${this.sniff()}`;
  }
}

class CatWoman extends Cat {
  constructor(name, gender, saying, friends, legs = 2, hands = 2) {
    super(name, gender, saying, friends, legs);
    this.hands = hands;
  }
}

CatWoman.prototype.toString = Human.prototype.toString;

let habitants = [
  {
    habitantClass: Human,
    habitantProperties: ['Bob', 'male', 'I\'m vegan', 'no one']
  },
  {
    habitantClass: Human,
    habitantProperties: ['Mary', 'female', 'Hi everyone', 'Tom, Rex, Halle']
  },
  {
    habitantClass: Cat,
    habitantProperties: ['Tom', 'male', 'Mrrr', 'Mary, Halle']
  },
  {
    habitantClass: Dog,
    habitantProperties: ['Rex', 'male', 'Woof', 'Mary', null]
  },
  {
    habitantClass: CatWoman,
    habitantProperties: ['Halle', 'female', 'Mrrr', 'Mary, Tom, Batman']
  }
].map(({habitantClass, habitantProperties}) => new habitantClass(...habitantProperties));

habitants.find(habitant => habitant instanceof Dog).company = habitants;

habitants.forEach(habitant => print(habitant));
