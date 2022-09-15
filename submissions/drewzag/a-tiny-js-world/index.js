/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/drewzag/a-tiny-JS-world
   Web app: https://drewzag.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
  species: 'dog',
  name: 'Jack',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'bark-bark!',
}

const cat = {
  species: 'cat',
  name: 'Tom',
  gender: 'male',
  legs: 4,
  hands: 0,
  saying: 'meow',
}

const woman = {
  species: 'human',
  name: 'Marry',
  gender: 'female',
  legs: 2,
  hands: 2,
  saying: 'Hi, guys)',
}

const man = {
  species: 'human',
  name: 'Boris',
  gender: 'male',
  legs: 2,
  hands: 2,
  saying: 'Dobriy den, everybody!',
}

const catWoman = {
  species: 'cat-human',
  name: 'Cat Marry',
  gender: 'female',
  legs: 2,
  hands: 2,
  get saying() {
    return cat.saying
  },
}

// ======== OUTPUT ========

const inhabitants = [dog, cat, woman, man, catWoman]
const specs = ['species', 'name', 'gender', 'legs', 'hands', 'saying']

const printInhabitant = (inhabitant) => specs.map((spec) => inhabitant[spec])

inhabitants.forEach((inhabitant) => print(printInhabitant(inhabitant), 'div'))
