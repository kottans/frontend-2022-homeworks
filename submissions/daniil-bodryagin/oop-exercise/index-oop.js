import { print } from './js/lib.js';

class Creature {
  constructor ({name, gender, legs, phrase}) {
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.phrase = phrase;
    this._friends = [];
    this.species = this.constructor.name;
  }

  set friends(listOfFriends) {
    this._friends = listOfFriends;
  }

  get friends() {
    return this._friends.map(({name}) => name).join(', ');
  }

  toString() {
    const {species, name, gender, legs, phrase, friends} = this;
    return [species, name, gender, legs, phrase, friends].join('; ');
  }
}

class Human extends Creature {
  constructor ({name, gender, legs = 2, hands = 2, phrase = 'Hello!'}) {
    super({name, gender, legs, phrase});
    this.hands = hands;
  }

  toString() {
    const {hands} = this;
    const creatureString = super.toString();
    const [species, name, gender, legs, phrase, friends] = creatureString.split('; ');
    return [species, name, gender, legs, hands, phrase, friends].join('; ');
  }
}

class Cat extends Creature {
  constructor ({name, gender, legs = 4}) {
    const phrase = Cat.getPhrase();
    super({name, gender, legs, phrase});
  }

  toString() {
    return super.toString();
  }

  static getPhrase() {
    return 'Meow';
  }
}

class Dog extends Creature {
  constructor ({name, gender, legs = 4}) {
    const phrase = Dog.getPhrase();
    super({name, gender, legs, phrase});
  }

  toString() {
    return super.toString();
  }

  static getPhrase() {
    return 'Woof-woof';
  }
}

class Catwoman extends Human {
  constructor ({name, gender, legs, hands}) {
    const phrase = Cat.getPhrase();
    super({name, gender, legs, hands, phrase});
  }
}

const inhabitantsConfig = [
  {
    species: Dog,
    name: 'Barbos',
    gender: 'male',
    friends: ['Eve', 'Adam']
  },
  {
    species: Dog,
    name: 'Pirate',
    gender: 'male',
    friends: ['Kain', 'Avan', 'Luna']
  },
  {
    species: Dog,
    name: 'Luna',
    gender: 'female',
    friends: ['Eve', 'Adam', 'Abel', 'Avan', 'Pirate']
  },
  {
    species: Cat,
    name: 'Sonya',
    gender: 'female',
    friends: ['Eve']
  },
  {
    species: Cat,
    name: 'Mashka',
    gender: 'female',
    friends: ['Avan']
  },
  {
    species: Cat,
    name: 'Murka',
    gender: 'female',
    friends: ['Selina']
  },
  {
    species: Human,
    name: 'Eve',
    gender: 'female',
    phrase: 'Hello! Glad to see you!',
    friends: ['Barbos', 'Sonya', 'Adam']
  },
  {
    species: Human,
    name: 'Lili',
    gender: 'female',
    phrase: 'Don\'t bother me, please',
    friends: []
  },
  {
    species: Human,
    name: 'Avan',
    gender: 'female',
    phrase: 'There are not many people here...',
    friends: ['Adam', 'Abel', 'Kain', 'Eve']
  },
  {
    species: Human,
    name: 'Adam',
    gender: 'male',
    phrase: 'Hi! Today is cool!',
    friends: ['Barbos', 'Eve']
  },
  {
    species: Human,
    name: 'Kain',
    gender: 'male',
    phrase: 'What\'s up!',
    friends: ['Sonya', 'Eve']
  },
  {
    species: Human,
    name: 'Abel',
    gender: 'male',
    phrase: 'How do you do',
    friends: ['Selina', 'Eve']
  },
  {
    species: Catwoman,
    name: 'Selina',
    gender: 'female',
    friends: ['Sonya', 'Murka']
  }
]

function findInhabitant(name) {
  return inhabitants.find(({name: inhabitantName}) => name == inhabitantName);
}

const inhabitants = inhabitantsConfig.map(({species, ...config}) => new species(config));
inhabitantsConfig.forEach(({name, friends}) => {
  const currentInhabitant = findInhabitant(name);
  const currentFriends = friends.map(friendName => findInhabitant(friendName));
  currentInhabitant.friends = currentFriends;
});
inhabitants.forEach(inhabitant => print(inhabitant));
