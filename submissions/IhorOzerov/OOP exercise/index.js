class Inhabitant {
   constructor(creature, name, gender, legs, friends, say) {
      this.creature = creature
      this.name = name
      this.gender = gender
      this.legs = legs
      this.friends = friends
      this.say = say
   }
   inhabitantSpeech(creatureText, nameText, genderText, legsText, friendsText, sayText) { 
      return `${creatureText}${this.creature}` + `${nameText}${this.name}` +
         `${genderText}${this.gender}` + `${legsText}${this.legs}` +
         `${friendsText}${this.friends}` + `${sayText}${this.say}`
   }
}

class Animal extends Inhabitant{
   constructor(creature, name, gender, friends, say) {
      super(creature, name, gender, 4, friends, say);
   }
   inhabitantSpeech() {
      return super.inhabitantSpeech(`Sup, i am a `, `, my name is `, `, i am cool `, `. With all of my `,
      ` legs and my friends, `, ` I want `) 
   }
}

class Cat extends Animal{
   constructor(name, gender, friends) {
      super("Cat", name, gender, friends, "to say Where is my money, Gregory?!");
   }
}

class Dog extends Animal{
   constructor(name, gender, friends) {
      super("Dog", name, gender, friends, "to say that you are breathtaking!");
   }
}

class Human extends Inhabitant{
   constructor(name, gender, friends, say) {
      super("Human", name, gender, 2, friends, say);
      this.hands = 2
   }
   inhabitantSpeech(handsText) {
      return super.inhabitantSpeech(`Hi, i am a `, `, my name is `, `, i am nice `, `. With my ` + this.hands +
      ` hands, `, ` legs and my friends, `, ` I want `)
   }
}
   
class Man extends Human{
   constructor(name, friends) {
      super(name, "male", friends, "to Stage 1!"); 
   }
}

class Woman extends Human{
   constructor(name, friends) {
      super(name, "female", friends, 'to learn React!');
   }
}

class CatWoman extends Woman{
    constructor(name, friends) {
      super(name, friends);
      this.say = Object.getOwnPropertyDescriptors(new Cat).say.value
      this.creature = "Cat-Woman"
   }
}

let Gangster = new Cat("Gangster", "male", "Yohanna and Vanessa");
let Gregory = new Man("Gregory", "Vanessa and Bandit");
let Yohanna = new Woman("Yohanna", "Gangster and Gregory");
let Bandit = new Dog('Bandit', 'male', "Gregory and Gangster");
let Vanessa = new CatWoman("Vanessa", "Gangster and Yohanna");

const members = [Gangster, Bandit, Gregory, Yohanna, Vanessa];

members.map(member => print(member.inhabitantSpeech()));
