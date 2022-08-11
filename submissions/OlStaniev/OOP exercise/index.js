class Inhabitants {
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

class People extends Inhabitants {
   constructor(name, gender, legs, hands, saying) {
      super(name, gender, legs, saying)
      this.hands = hands
   }
   prepareToPrint() {
      return [this.name, this.gender, this.legs, this.hands, this.saying].join(';')
   }
}

class PeopleWithFriends extends People {
   constructor(name, gender, legs, hands, saying, friends) {
      super(name, gender, legs, hands, saying)
      this.friends = friends
   }
   prepareToPrint() {
      return [this.name, this.gender, this.legs, this.hands, this.saying, this.friends].join(';')
   }
}

const dog = new Inhabitants('Bob', 'male', 4, 'woof!')
const cat = new Inhabitants('Kitty', 'female', 4, 'meow!')
const woman = new People('Sara', 'female', 2, 2, 'Hello!')
const catWoman = new People('Bella', 'female', 2, 2, `${cat.saying}`)
const man = new PeopleWithFriends('Mario', 'male', 2, 2, 'Hi!', ['Bob', 'Tom', 'Eva'])

const inhabitants = [cat, dog, woman, catWoman, man]

inhabitants.forEach(inhabitant => print(inhabitant.prepareToPrint()))
