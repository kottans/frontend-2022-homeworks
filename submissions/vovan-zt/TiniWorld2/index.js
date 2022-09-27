class WorldInhabitant {
  constructor(species, name, gender, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.prop = [species, name, gender, saying];
  }

  getMeaning() {
    return this.prop.map((meaning) => meaning).join("; ");
  }
}
class Human extends WorldInhabitant {
  constructor(name, gender, saying, friends = null) {
    super("human", name, gender, saying);
    this.legs = 2;
    this.hands = 2;
    this.friends = friends;
    this.prop = [...this.prop, this.legs, this.hands, this.friends];
  }
}
class Animal extends WorldInhabitant {
  constructor(species, name, gender, saying) {
    super(species, name, gender, saying);
    this.paws = 4;
    this.prop = [...this.prop, this.paws];
  }
}
class Dog extends Animal {
  constructor(name, gender) {
    super("dog", name, gender, "woof!");
  }
}
class Cat extends Animal {
  constructor(name, gender) {
    super("cat", name, gender, "meow!");
  }
}
class CatWoman extends Human {
  constructor(name, saying) {
    super(name, "woman", saying);
  }
}

const man = new Human("Jon", "male", "I want to sleep!");

const woman = new Human("Lena", "female", "Hello!", man.name);

const cat = new Cat("Luna", "female");

const dog = new Dog("Rasti", "male");

const catWoman = new CatWoman("Selina", cat.saying);

[man, woman, cat, dog, catWoman].forEach((inhabitant) =>
  print(inhabitant.getMeaning())
);
