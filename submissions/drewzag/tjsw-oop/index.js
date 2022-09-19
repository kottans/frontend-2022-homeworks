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

  printInhabitants() {
    print(Object.values(this).join('; '), 'div')
  }
}

class Human extends Inhabitant {
  constructor(name, gender, legs, saying, hands) {
    super('human', name, gender, legs, saying)
    this.hands = hands
  }
}

class PetHuman extends Human {
  constructor(name, gender, legs, saying, hands) {
    super(name, gender, legs, saying, hands)
  }

  printInhabitants() {
    const values = Object.values(this)
    values.splice(4, 1, cat.saying)
    print(values.join('; '), 'div')
  }
}

const dog = new Inhabitant('dog', 'Jack', 'male', 4, 'Bark')
const cat = new Inhabitant('cat', 'Tom', 'male', 4, 'Meow')
const woman = new Human('Marry', 'female', 2, 'Hi, guys', 2)
const man = new Human('Boris', 'male', 2, 'Dobriy den, everybody!', 2)
const catWoman = new PetHuman('Cat Marry', 'female', 2, cat.saying, 2)

dog.printInhabitants()
cat.printInhabitants()
woman.printInhabitants()
man.printInhabitants()
catWoman.printInhabitants()
