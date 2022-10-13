import { print } from './js/lib.js';

class BasePersonage {
   constructor(personage, name, gender, legs, voice) {
      this.personage = [personage, 'Я відношуся до'];
      this.name = [name, 'Мене звати'];
      this.gender = [gender, 'Я за статтю'];
      this.legs = [legs, "Я маю таку кількість ніг -"];
      this.voice = [voice, 'Я кажу'];
   }

   getPerformance() {
      return ['personage', 'name', 'gender', 'legs', 'voice']
         .map(prop => `${this[prop][1]} ${this[prop][0]}`).join('; ');
   }
};

class Animal extends BasePersonage {
   constructor(personage, name, gender, voice) {
      super(personage, name, gender, 4, voice);
   }
}

class ExtendedCats extends Animal {
   constructor(personage, name, gender) {
      super(personage, name, gender, 'Meow!');
   }
}

class CatWoman extends ExtendedCats {
   constructor(name, gender) {
      super('cat-woman', name, gender);
      this.hands = [2, "Я маю таку кількість рук -"];
      this.legs[0] = 2;
   }

   getPerformance() {
      return `${super.getPerformance()}; ${this.hands[1]} ${this.hands[0]};`;
   }
}

class Cat extends ExtendedCats {
   constructor(name, gender) {
      super('cat', name, gender);
   }
}

class Dog extends Animal {
   constructor(name, gender) {
      super('dog', name, gender, 'Woof!');
   }
}

class BasePersonHuman extends BasePersonage {
   constructor(name, gender, voice) {
      super('human', name, gender, 2, voice);
      this.hands = [2, "Я маю таку кількість рук -"];
   }

   getPerformance() {
      return `${super.getPerformance()}; ${this.hands[1]} ${this.hands[0]};`;
   }
}

class Woman extends BasePersonHuman {
   constructor(name, voice) {
      super(name, 'female', voice);
   }
}

class Man extends BasePersonHuman {
   constructor(name, voice) {
      super(name, 'male', voice);
   }
}

const FICTIONALWORLD = [
   new Man('Viktor', 'Congratulations!'),
   new Woman('Olena', 'Slava Ukraine!'),
   new Dog('Buran', 'male'),
   new Cat('Yana', 'female'),
   new CatWoman('Selina Kyle', 'female'),

   new Man('Petr', 'Hello!'),
   new Man('Mark', 'Hey!'),
   new Woman('Natali', 'Hello!'),
   new Woman('Lesia', 'Hey!'),
   new Dog('Bublyk', 'male'),
   new Cat('Murchik', 'male'),
];

FICTIONALWORLD.forEach(personage => {
   print(personage.getPerformance());
});

