class Inhabitant {
   constructor(specie, name, gender, legs, saying) {
      this.specie = specie;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying
   }
   prepareToPrint() {
      return [this.specie, this.name, this.gender, this.legs, this.saying].join(';')
   }
}

class Person extends Inhabitant {
   constructor(specie, name, gender, legs, hands, saying, friends) {
      super(specie, name, gender, legs, saying)
      this.hands = hands
      this.friends = friends || []
   }
   prepareToPrint() {
      return super.prepareToPrint() + ';' + this.friends.join(';')
   }
}

class Animal extends Inhabitant {
   constructor(specie, name, gender, legs, saying, tail) {
      super(specie, name, gender, legs, saying)
      this.tail = tail
   }
   prepareToPrint() {
      return super.prepareToPrint() + ';' + this.tail
   }
}

const dog = new Animal('dog', 'Bob', 'male', 4, 'woof!', 1)
const cat = new Animal('cat', 'Kitty', 'female', 4, 'meow!', 1)
const woman = new Person('human', 'Sara', 'female', 2, 2, 'Hello!')
const catWoman = new Person('human', 'Bella', 'female', 2, 2, `${cat.saying}`)
const man = new Person('human', 'Mario', 'male', 2, 2, 'Hi!', ['Bob', 'Tom', 'Eva'])

const inhabitants = [cat, dog, woman, catWoman, man]

inhabitants.forEach(inhabitant => print(inhabitant.prepareToPrint()))
