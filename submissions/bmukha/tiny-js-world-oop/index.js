/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/bmukha/a-tiny-JS-world
   Web app: https://bmukha.github.io/a-tiny-JS-world/
   */

class Character {
  constructor(specie, name, gender, saying, friends, legs) {
    this.specie = specie;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = friends;
  }

  props() {
    return ['specie', 'name', 'gender', 'legs', 'hands', 'saying', 'friends']
      .map((prop) =>
        Array.isArray(this[prop]) ? this[prop].join(', ') : this[prop]
      )
      .filter((value) => Boolean(value))
      .join('; ');
  }
}

class Dog extends Character {
  constructor(name, gender, saying, friends) {
    super('dog', name, gender, saying, friends, 4);
  }
}

const beethoven = new Dog('Beethoven', 'male', 'woof', ['Clyde']);

class Cat extends Character {
  constructor(name, gender, saying, friends) {
    super('cat', name, gender, saying, friends, 4);
  }
}

const grizabella = new Cat('Grizabella', 'female', 'meow', ['Bonnie']);

class Human extends Character {
  constructor(name, gender, saying, friends) {
    super('human', name, gender, saying, friends, 2);
    this.hands = 2;
  }
}

const clyde = new Human('Clyde', 'male', 'Get rich or die trying!', [
  'Bonnie',
  'Beethoven',
]);

const bonnie = new Human(
  'Bonnie',
  'female',
  'I have the right to not answer a questions!',
  ['Clyde', 'Grizabella']
);

class CatWomen extends Human {
  constructor(name, friends) {
    super(name, 'female', grizabella.saying, friends);
  }
}

const selina = new CatWomen('Selina', []);

[beethoven, grizabella, clyde, bonnie, selina].forEach((character) =>
  print(character.props())
);
