/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/crealime/a-tiny-JS-world
   Web app: https://crealime.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

function getRandomId() {
  return  new Date().getTime() + '_' + Math.floor(10000 + Math.random() * (99999 + 1 - 10000))
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
    super('cat', name, gender, Cat.say())
    this.legs = legs
  }

  static say() {
    return 'Meow-meow!'
  }
}

class Human extends Inhabitant {
  constructor(name, surname, gender, legs, hands, saying) {
    super('human', name, gender, saying)
    this.surname = surname
    this.legs = legs
    this.hands = hands
  }

  getFullName() {
    return `${super.getFullName()} ${this.surname}`
  }
}

class CatWoman extends Inhabitant {
  constructor(name, surname) {
    super('cat-woman', name, 'female', Cat.say())
    this.surname = surname
    this.legs = 2
    this.hands = 2
  }

  getFullName() {
    return `${super.getFullName()} ${this.surname}`
  }
}

const fullInfo =  {
  sayFullInfo() {
    return `${this.saying} My name is ${this.getFullName()} and I am a ${this.species}. My gender is ${this.gender}. I have ${this.hands || 0} ${this.hands === 1 ? 'hand' : 'hands'} and ${this.legs || 0} ${this.legs === 1 ? 'leg' : 'legs'}. I have ${this.friends.length} ${this.friends.length === 1 ? 'friend' : 'friends'}${this.friends.length > 0 ? ': ' + this.friends.map(friend => friend.name).join(', ') : ''}.`
  }
}

Object.assign(Human.prototype, fullInfo)
Object.assign(CatWoman.prototype, fullInfo)

const dog = new Dog('Marley', 'male', 4)
const cat = new Cat('Sophie', 'female', 4)
const man = new Human('Harry', 'Taylor', 'male', 2, 2, 'Hello everyone!')
const woman = new Human('Emily', 'Brown', 'female', 2, 2, 'Hi all!')
const pirate = new Human('John', 'Silver', 'male', 1, 2, 'Give no quarter!')
const catWoman = new CatWoman('Selina', 'Kyle')

dog.friends.push(cat, man)
cat.friends.push(dog, woman, catWoman)
man.friends.push(dog, woman)
woman.friends.push(cat, man)
catWoman.friends.push(cat)


const allInhabitants = [dog, cat, man, woman, catWoman, pirate]

class Society {
  constructor() {
    if (typeof Society.instance === 'object') {
      return Society.instance
    }
    this.members = []
    Society.instance = this
    return Society.instance
  }

  addToSociety(member) {
    this.members.push(member.id)
  }

  #isInSociety(inhabitants) {
    return inhabitants.filter(inhabitant => this.members.includes(inhabitant.id)).map(inhabitant => inhabitant.name)
  }

  getMembersOfSociety(inhabitants) {
    const names = this.#isInSociety(inhabitants)

    if (names.length === 0) return 'Perhaps the secret society is too secret'

    const textAfterNames = names.length === 1 ? 'in a secret society...' : 'are in a secret society...'

    return `${names.join(', ')} ${textAfterNames}`
  }
}

const secretSociety = new Society()

secretSociety.addToSociety(catWoman)
secretSociety.addToSociety(pirate)

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

function getFullInfo(inhabitant) {
  const getAcquaintance = `This is ${inhabitant.getFullName()} and ${inhabitant.gender === 'male' ? 'he' : 'she'} is a ${inhabitant.species}.`
  const getGender = `${inhabitant.gender === 'male' ? 'His' : 'Her'} gender is ${inhabitant.gender}.`
  const getLimbs = `${inhabitant.gender === 'male' ? 'He' : 'She'} have ${inhabitant.hands || 0} ${inhabitant.hands === 1 ? 'hand' : 'hands'} and ${inhabitant.legs || 0} ${inhabitant.legs === 1 ? 'leg' : 'legs'}.`
  const getFriends = `${inhabitant.name} have ${inhabitant.friends.length} ${inhabitant.friends.length === 1 ? 'friend' : 'friends'}${inhabitant.friends.length > 0 ? ': ' + inhabitant.friends.map(friend => friend.name).join(', ') : ''}.`
  const getSaying = `${inhabitant.gender === 'male' ? 'He' : 'She'} usually says hello like this: ${inhabitant.saying}`

  return `${getAcquaintance} ${getGender} ${getLimbs} ${getFriends} ${getSaying}`
}

allInhabitants.forEach(inhabitant => {
  print(getFullInfo(inhabitant))
})

print(' ')

allInhabitants.forEach(inhabitant => {
  if ('sayFullInfo' in inhabitant) {
    print(inhabitant.sayFullInfo())}
})

print(' ')

print(secretSociety.getMembersOfSociety(allInhabitants))
