const Inhabitant = class {
  constructor(species, name, gender, saying, friend) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.saying = saying;
    this.friend = friend;
  }
  introducing() {
    return `${this.species} is my species, ${this.name} is my name, ${this.gender} is my gender, "${this.saying}" is my slogan, ${this.friend} is my friend`;
  }
};
const Human = class extends Inhabitant {
  constructor(name, gender, saying, friend) {
    super("Human", name, gender, saying, friend);
    this.hands = 2;
    this.legs = 2;
  }
  introducing() {
    return [
      super.introducing(),
      `I have ${this.hands} hands and ${this.legs} legs`,
    ].join(", ");
  }
};
const Man = class extends Human {
  constructor(name, friend) {
    super(name, "male", "Hello everyone!", friend);
  }
};
const Woman = class extends Human {
  constructor(name, friend) {
    super(name, "female", "Hi all!", friend);
  }
};
const Animal = class extends Inhabitant {
  constructor(species, name, gender, saying, friend) {
    super(species, name, gender, saying, friend);
    this.paws = 4;
    this.tail = 1;
  }
  introducing() {
    return [
      super.introducing(),
      `My ${this.paws} paws and ${this.tail} tail help me runnig fast`,
    ].join(", ");
  }
};
const Cat = class extends Animal {
  constructor(name, gender, friend) {
    super("Cat", name, gender, "hsssshhhhh", friend);
  }
};
const Dog = class extends Animal {
  constructor(name, gender, friend) {
    super("Dog", name, gender, "woof-woof!", friend);
  }
};
const CatWoman = class extends Woman {
  constructor(name, friend) {
    super(name, friend);
    this.species = "Cat-Human";
    this.saying = cat.saying;
    this.tail = cat.tail;
  }
  introducing() {
    return [
      super.introducing(),
      `and ${this.tail} tail. It makes me special`,
    ].join(" ");
  }
};

const cat = new Cat("Cloud", "male", "Sarah");
const dog = new Dog("Ice", "male", "David");
const woman = new Woman("Sarah", "David");
const man = new Man("David", "Sarah");
const catWoman = new CatWoman("Kitty", "Cloud");
const inhabitants = [dog, cat, man, woman, catWoman];
inhabitants.map((inhabitant) => print(inhabitant.introducing()));
