/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/crealime/a-tiny-JS-world
   Web app: https://crealime.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

function getRandomId() {
  return Math.floor(1000 + Math.random() * (9999 + 1 - 1000)) + new Date().getTime()
}

class Inhabitant {
  constructor(species, name, gender, saying) {
    this.id = getRandomId()
    this.species = species
    this.name = name
    this.gender = gender
    this.saying = saying
    this.friends = []
  }

  getFullName() {
    return this.name
  }
}

class Dog extends Inhabitant {
  constructor(name, gender, legs) {
    super('dog', name, gender, 'Woof-woof!')
    this.legs = legs
  }
}

class Cat extends Inhabitant {
  constructor(name, gender, legs) {
    super('cat', name, gender, 'Meow-meow!')
    this.legs = legs
  }
}

class Human extends Inhabitant {
  constructor(name, surname, gender, legs, hands, saying, society = false) {
    super('human', name, gender, saying, society)
    this.surname = surname
    this.legs = legs
    this.hands = hands
  }

  getFullName() {
    return `${super.getFullName()} ${this.surname}`
  }
}

class CatWoman extends Inhabitant {
  constructor(name, surname, saying, society = false) {
    super('cat-woman', name, 'female', saying, society)
    this.surname = surname
    this.legs = 2
    this.hands = 2
  }

  getFullName() {
    return `${this.name} ${this.surname}`
  }
}


const dog = new Dog('Marley', 'male', 4)
const cat = new Cat('Sophie', 'female', 4)
const man = new Human('Harry', 'Taylor', 'male', 2, 2, 'Hello everyone!')
const woman = new Human('Emily', 'Brown', 'female', 2, 2, 'Hi all!')
const pirate = new Human('John', 'Silver', 'male', 1, 2, 'Give no quarter!')
const catWoman = new CatWoman('Selina', 'Kyle', cat.saying)

dog.friends.push(cat.name, man.name)
cat.friends.push(dog.name, woman.name, catWoman.name)
man.friends.push(dog.name, woman.name)
woman.friends.push(cat.name, man.name)
catWoman.friends.push(cat.name)

const secretSociety = []
const allInhabitant = [dog, cat, man, woman, catWoman, pirate]

function addToSociety(society, obj) {
  society.push(obj.id)
}

addToSociety(secretSociety, catWoman)
addToSociety(secretSociety, pirate)

function isInSociety(society, objects) {
  const arrInSociety = []

  objects.forEach(el => {
    if (society.some(soc => soc === el.id)) arrInSociety.push(el.name)
  })

  return arrInSociety.join(', ')
}

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

function greetings(obj) {
  const getAcquaintance = `This is ${obj.getFullName()} and ${obj.gender === 'male' ? 'he' : 'she'} is a ${obj.species}.`
  const getGender = `${obj.gender === 'male' ? 'His' : 'Her'} gender is ${obj.gender}.`
  const getLimbs = `${obj.gender === 'male' ? 'He' : 'She'} have ${obj.hands || 0} ${obj.hands === 1 ? 'hand' : 'hands'} and ${obj.legs || 0} ${obj.legs === 1 ? 'leg' : 'legs'}.`
  const getFriends = `${obj.name} have ${obj.friends.length} ${obj.friends.length === 1 ? 'friend' : 'friends'}${obj.friends.length > 0 ? ': ' + obj.friends.join(', ') : ''}.`
  const getSaying = `${obj.gender === 'male' ? 'He' : 'She'} usually says hello like this: ${obj.saying}`

  return `${getAcquaintance} ${getGender} ${getLimbs} ${getFriends} ${getSaying}`
}

allInhabitant.forEach(el => {
  print(greetings(el))
})

const getMembers = `${isInSociety(secretSociety, allInhabitant)} ${secretSociety.length < 1 ? '' : secretSociety.length === 1 ? 'in a secret society...' : 'are in a secret society...'}`

print(' ')
print(getMembers)
