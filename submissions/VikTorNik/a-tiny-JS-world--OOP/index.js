import { print } from './js/lib.js';

class BasePerson {
   constructor(person, name, gender, legs, voice) {
      this.person = person;
      this.name = name;
      this.gender = gender;
      this.legs = legs;
      this.voice = voice;
   }
};

class Animal extends BasePerson {
   constructor(person, name, gender, voice) {
      super(person, name, gender, 4, voice);
   }
}

class ExtendedCats extends Animal {
   constructor(person, name, gender) {
      super(person, name, gender, 'Meow!');
   }
}

class CatWoman extends ExtendedCats {
   constructor(name, gender) {
      super('cat-woman', name, gender);
      this.hands = 2;
      this.legs = 2;
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

class Say extends BasePerson {
   constructor() {
      super('Я відношуся до', 'Мене звати', 'Я', 'ноги', 'Я кажу');
      this.hands = 'руки';
   }
}

class BasePersonHuman extends BasePerson {
   constructor(name, gender, voice) {
      super('human', name, gender, 2, voice);
      this.hands = 2;
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
   new CatWoman('Selina Kyle', 'female')];

const DESCRIPTION = new Say();

FICTIONALWORLD.map(unitWorld => {
   let storyYourself = [];
   unitWorld.hasOwnProperty('voice') ? storyYourself.push(`${unitWorld.voice}`) : false;
   unitWorld.hasOwnProperty('name') ? storyYourself.push(`${DESCRIPTION.name} ${unitWorld.name}.`) : false;
   unitWorld.hasOwnProperty('gender') ? storyYourself.push(`${DESCRIPTION.gender} ${unitWorld.gender}.`) : false;
   unitWorld.hasOwnProperty('person') ? storyYourself.push(`${DESCRIPTION.person} ${unitWorld.person}.`) : false;
   unitWorld.hasOwnProperty('hands') ? storyYourself.push(`У мене ${unitWorld.hands} ${DESCRIPTION.hands}.`) : false;
   unitWorld.hasOwnProperty('legs') ? storyYourself.push(`У мене ${unitWorld.legs} ${DESCRIPTION.legs}.`) : false;
   print(storyYourself.join(' '));
});

