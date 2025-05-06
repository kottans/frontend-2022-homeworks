class MyInhabitant {
   static delimiter = '; ';

   constructor(species, name, gender, saying, legs) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.legs = legs;
      this.propertyNames = ['species', 'name', 'gender', 'saying', 'legs'];
   }

   getInhabitantInfo() {
      return this.propertyNames.map((key) => this[key])
         .join(MyInhabitant.delimiter);
   }

   pushPropertyName(newProperty) {
      this.propertyNames.push(newProperty);
      return this.propertyNames;
   }
}

class Human extends MyInhabitant {
   constructor(name, gender, saying) {
      super('human', name, gender, saying, 2);
      this.hands = 2;
      this.pushPropertyName('hands');
   }
}

class Animal extends MyInhabitant {
   constructor(name, gender, saying) {
      super('animal', name, gender, saying, 4);
   }
}

class Dog extends Animal {
   constructor(name, gender) {
      super(name, gender, 'Woof-woof!');
   }
}

class Cat extends Animal {
   constructor(name, gender) {
      super(name, gender, 'Meow-meow!');
   }
}

const inhabitants = [
   new Human('Lilu', 'female', 'Aloha!'),
   new Human('Sofi', 'female', 'Hi!'),
   new Human('Mila', 'female', 'What`s up?'),
   new Human('Bob', 'male', 'Have a nice day!'),
   new Human('Mike', 'male', 'How are you?'),
   new Human('Vasya', 'male', 'Hey!'),
   new Dog('Mira', 'female'),
   new Dog('Baksik', 'male'),
   new Cat('Tyson', 'female'),
   new Cat('Valet', 'male')
];

inhabitants.forEach((inhabitant) =>
   print(inhabitant.getInhabitantInfo()));
