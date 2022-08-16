class Inhabitant {
   constructor(name, gender, legs, saying) {
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.saying = saying
   }
   prepareToPrint() {
      return [this.name, this.gender, this.legs, this.saying].join(';')
   }
}

class Person extends Inhabitant {
   constructor(name, gender, legs, hands, saying, friends) {
      super(name, gender, legs, saying)
      this.hands = hands
      this.friends = friends || []
   }
   prepareToPrint() {
      return super.prepareToPrint() + ';' + this.friends.join(';')
   }
}

class Animal extends Inhabitant {
   constructor(name, gender, legs, saying, tail) {
      super(name, gender, legs, saying)
      this.tail = tail
   }
   prepareToPrint() {
      return super.prepareToPrint() + ';' + this.tail
   }
}

const dog = new Animal('Bob', 'male', 4, 'woof!', 1)
const cat = new Animal('Kitty', 'female', 4, 'meow!', 1)
const woman = new Person('Sara', 'female', 2, 2, 'Hello!')
const catWoman = new Person('Bella', 'female', 2, 2, `${cat.saying}`)
const man = new Person('Mario', 'male', 2, 2, 'Hi!', ['Bob', 'Tom', 'Eva'])

const inhabitants = [cat, dog, woman, catWoman, man]

inhabitants.forEach(inhabitant => print(inhabitant.prepareToPrint()))
