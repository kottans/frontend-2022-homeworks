/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bmukha/a-tiny-JS-world
   Web app: https://bmukha.github.io/a-tiny-JS-world/
   */

class Character {
  constructor({ specie, name, gender, legs = 2, saying, friends = [] }) {
    this.specie = specie;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
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
  constructor({ name, gender, saying, friends }) {
    super({ specie: 'dog', name, gender, legs: 4, saying, friends });
  }
}

const beethoven = new Dog({
  name: 'Beethoven',
  gender: 'male',
  saying: 'woof',
  friends: ['Clyde'],
});

class Cat extends Character {
  constructor({ name, gender, saying, friends }) {
    super({ specie: 'cat', name, gender, legs: 4, saying, friends });
  }
}

const grizabella = new Cat({
  name: 'Grizabella',
  gender: 'female',
  saying: 'meow',
  friends: ['Bonnie'],
});

class Human extends Character {
  constructor({ name, gender, saying, friends }) {
    super({ specie: 'human', name, gender, saying, friends });
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
  constructor({ name, friends }) {
    super({ name, gender: 'female', saying: grizabella.saying, friends });
  }
}

const selina = new CatWomen({ name: 'Selina' });

[beethoven, grizabella, clyde, bonnie, selina].forEach((character) =>
  print(character.getPresentationString())
);
