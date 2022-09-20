class Animal {
  constructor(limb, name, gender, saying) {
    this.values = [limb, name, gender, saying];
  }
  getValues() {
    return this.values;
  }
}
class Human extends Animal {
  constructor(limb, name, gender, saying) {
    super(limb, name, gender, saying);
  }
}

const dog = new Animal(4, "Bobik", "man", "woof-woof");
const cat = new Animal(4, "Murka", "woman", "meow!");
const woman = new Human(4, "Mary", "woman", "Hello");
const man = new Human(4, "Oleg", "man", "Hi");

const inhabitants = [
  dog.getValues(),
  cat.getValues(),
  woman.getValues(),
  man.getValues(),
];

print(inhabitants.join("; "));
