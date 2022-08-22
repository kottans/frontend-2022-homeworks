class Inhabitant {
   constructor(specie, name, gender, legs, saying) {
      this.specie = specie
      this.name = name
      this.gender = gender
      this.legs = legs
      this.saying = saying
   }
   prepareToPrint() {
      return [this.specie, this.name, this.gender, this.legs, this.saying].join('; ')
   }
}

class Person extends Inhabitant {
   constructor(name, gender, legs, saying, hands, friends) {
      super(name, gender, legs, saying)
      this.hands = hands
      this.friends = friends || []
   }
   prepareToPrint() {
      return 'human; ' + super.prepareToPrint() + [this.hands, this.friends.join(', ')].join('; ')
   }
}

class Animal extends Inhabitant {
   constructor(specie, name, gender, legs, saying, tail) {
      super(specie, name, gender, legs, saying)
      this.tail = tail
   }
   prepareToPrint() {
      return super.prepareToPrint() + '; ' + this.tail + ';'
   }
}

const dog = new Animal('dog', 'Bob', 'male', 4, 'woof!', 1)
const cat = new Animal('cat', 'Kitty', 'female', 4, 'meow!', 1)
const woman = new Person('Sara', 'female', 2, 'Hello!', 2)
const catWoman = new Person('Bella', 'female', 2, `${cat.saying}`, 2)
const man = new Person('Mario', 'male', 2, 'Hi!', 2, ['Bob', 'Tom', 'Eva'])

const inhabitants = [cat, dog, woman, catWoman, man]

inhabitants.forEach(inhabitant => print(inhabitant.prepareToPrint()))
