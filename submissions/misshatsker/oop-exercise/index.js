class MyInhabitant {
   constructor(species, name, gender, limbs, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.limbs = limbs;
      this.saying = saying;
   }

   static inhabitantProperties = ['species', 'name', 'gender', 'limbs', 'saying'];
   static delimiter = '; ';

   getInhabitantInfo() {
      const values = MyInhabitant.inhabitantProperties.map((key) => this[key]);
      return values.join(MyInhabitant.delimiter);
   }
}

class Human extends MyInhabitant {
   constructor(name, gender, saying) {
      super('human', name, gender, [2, 2], saying);
   }
}

class Animal extends MyInhabitant {
   constructor(name, gender, saying) {
      super('animal', name, gender, [4], saying);
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
