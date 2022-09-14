class Inhabitant {
  constructor({species, name, gender}) {
    this.name = name;
    this.species = species;
    this.gender = gender;
  }
}

class Human extends Inhabitant {
  constructor(props) {
    super(props);

    this.saying = props.saying;
    this.species = 'human';
    this.legs = 2;
    this.hands = 2;
  }
}

class Woman extends Human {
  constructor(props) {
    super(props);

    this.gender = 'female';
  }
}

class Man extends Human {
  constructor(props) {
    super(props);

    this.gender = 'male';
  }
}

class Animal extends Inhabitant {
  constructor(props) {
    super(props);

    this.species = 'animal';
    this.legs = 4;
    this.hands = undefined;
  }
}

class Cat extends Animal {
  constructor(props) {
    super(props);

    this.saying = 'myau!';
  }
}

class Dog extends Animal {
  constructor(props) {
    super(props);

    this.saying = 'woof-woof!!';
  }
}

const knopa = new Cat({
  name: 'Knopa',
  gender: 'female',
});

const bubluk = new Dog({
  name: 'Bubluk',
  gender: 'male',
});

const olena = new Woman({
  name: 'Olena',
  saying: 'Hello there'
});

const kostia = new Man({
  name: 'Kostia',
  saying: 'Hi, folks!'
});

const inhabitants = [knopa, bubluk, olena, kostia];
const inhabitantKeys = ['species', 'name', 'gender', 'legs', 'hands', 'saying'];

inhabitants.forEach((inhabitant) => {
  console.log(
    inhabitantKeys.map((key) => inhabitant[key] ?? 'N/A').join('; ')
  )
});
