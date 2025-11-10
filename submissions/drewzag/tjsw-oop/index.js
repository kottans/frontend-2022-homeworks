/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/drewzag/a-tiny-JS-world
   Web app: https://drewzag.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
  constructor(species, name, gender, legs, saying) {
    this.species = species
    this.name = name
    this.gender = gender
    this.legs = legs
    this.saying = saying
  }

  printInhabitants(args) {
    const characteristics = ['species', 'name', 'gender', 'legs', 'saying']
    if (args) {
      characteristics.push(args)
    }
    print(characteristics.map((value) => this[value]).join('; '))
  }
}

class Dog extends Inhabitant {
  constructor(species, name, gender, legs, saying) {
    super(species, name, gender, legs, saying)
  }
}

class Cat extends Inhabitant {
  constructor(species, name, gender, legs, saying) {
    super(species, name, gender, legs, saying)
  }
}

class Human extends Inhabitant {
  constructor(species, name, gender, legs, saying, hands) {
    super(species, name, gender, legs, saying)
    this.hands = hands
  }
  printInhabitants() {
    super.printInhabitants(['hands'])
  }
}

class CatWoman extends Human {
  constructor(species, name, gender, legs, saying, hands) {
    super(species, name, gender, legs, saying, hands)
  }
  set saying(say) {}
  get saying() {
    return cat.saying
  }
}

const dog = new Dog('dog', 'Jack', 'male', 4, 'Bark')
const cat = new Cat('cat', 'Tom', 'male', 4, 'Meow')
const woman = new Human('human', 'Marry', 'female', 2, 'Hi, guys', 2)
const man = new Human('human', 'Boris', 'male', 2, 'Dobriy den, everybody!', 2)
const catWoman = new CatWoman('cat woman', 'Cat Marry', 'female', 2, cat.saying, 2)

const inhabitants = [dog, cat, woman, man, catWoman]
inhabitants.forEach((inhabitant) => inhabitant.printInhabitants())
