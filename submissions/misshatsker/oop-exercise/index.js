class MyInhabitant {
   static inhabitantProperties = ['species', 'name', 'gender', 'saying'];
   static delimiter = '; ';

   constructor(species, name, gender, saying) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.properties = [...MyInhabitant.inhabitantProperties];
   }

   getInhabitantInfo() {
      const values = this.properties.map((key) => this[key]);
      return values.join(MyInhabitant.delimiter);
   }
}

class Human extends MyInhabitant {
   constructor(name, gender, saying) {
      super('human', name, gender, saying);
      this.hands = 2;
      this.legs = 2;
      this.properties.push('hands', 'legs');
   }
}

class Animal extends MyInhabitant {
   constructor(name, gender, saying) {
      super('animal', name, gender, saying);
      this.legs = 4;
      this.properties.push('legs');
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
