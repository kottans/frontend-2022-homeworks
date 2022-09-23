/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bmukha/a-tiny-JS-world
   Web app: https://bmukha.github.io/a-tiny-JS-world/
   */

class Character {
  constructor(parameters) {
    ({
      specie: this.specie,
      name: this.name,
      gender: this.gender,
      legs: this.legs = 2,
      saying: this.saying,
      friends: this.friends = [],
    } = parameters);
  }

  getPresentationString() {
    return ['specie', 'name', 'gender', 'legs', 'saying', 'friends']
      .map((prop) =>
        Array.isArray(this[prop]) ? this[prop].join(', ') : this[prop]
      )
      .filter((value) => Boolean(value))
      .join('; ');
  }
}

class Dog extends Character {
  constructor(parameters) {
    super({ specie: 'dog', legs: 4, ...parameters });
  }
}

const beethoven = new Dog({
  name: 'Beethoven',
  gender: 'male',
  saying: 'woof',
  friends: ['Clyde'],
});

class Cat extends Character {
  constructor(parameters) {
    super({ specie: 'cat', legs: 4, ...parameters });
  }
}

const grizabella = new Cat({
  name: 'Grizabella',
  gender: 'female',
  saying: 'meow',
  friends: ['Bonnie'],
});

class Human extends Character {
  constructor(parameters) {
    super({ specie: 'human', ...parameters });
    this.hands = 2;
  }
  getPresentationString() {
    return `${super.getPresentationString()}; ${this.hands}`;
  }
}

const clyde = new Human({
  name: 'Clyde',
  gender: 'male',
  saying: 'Get rich or die trying!',
  friends: ['Bonnie', 'Beethoven'],
});

const bonnie = new Human({
  name: 'Bonnie',
  gender: 'female',
  saying: 'I have the right to not answer a questions!',
  friends: ['Clyde', 'Grizabella'],
});

class CatWomen extends Human {
  constructor(parameters) {
    super({ gender: 'female', saying: grizabella.saying, ...parameters });
  }
}

const selina = new CatWomen({ name: 'Selina' });

[beethoven, grizabella, clyde, bonnie, selina].forEach((character) =>
  print(character.getPresentationString())
);
