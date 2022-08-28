class Inhabitant{
   constructor(species, name, gender, saying){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.properties = ['species', 'name', 'gender', 'saying'];
   }

   addFriends(friendsList){
      this.friends = friendsList;
      this.properties.push('friends');
   }

   toString(){
      return this.properties.map(property => {
         return (Array.isArray(this[property])) ?
            (`<strong>${property}</strong>: ${this[property].join(", ")}`) :
            (`<strong>${property}</strong>: ${this[property]}`)
      }).join(", ");
   }
}

class Animal extends Inhabitant{
   constructor(species, name, gender, saying){
      super(species, name, gender, saying);
      this.legs = 4;
      this.properties.push('legs');
   }
}

class Human extends Inhabitant{
   constructor(name, gender, saying){
      super('human', name, gender, saying);
      this.legs = 2;
      this.hands = 2;
      this.properties.push('legs', 'hands');
   }
}

class Dog extends Animal{
   constructor(name, gender){
      super('dog', name, gender, 'Bark! ▼・ᴥ・▼');
   }
}

class Cat extends Animal{
   constructor(name, gender){
      super('cat', name, gender, 'Meow! (=^･ω･^=)');
   }
}

class Woman extends Human{
   constructor(name, saying){
      super(name, 'female', saying);
   }
}

class Man extends Human{
   constructor(name, saying){
      super(name, 'male', saying);
   }
}

class CatWoman extends Cat{
   constructor(name){
      super(name, 'female');
      this.species = 'cat-woman';
      this.legs = 2;
      this.hands = 2;
   }
}

const dog = new Dog('Bima', 'female');
const cat = new Cat('Jessy', 'female');
const man = new Man('Ash Lynx', 'Stay with me... I won\'t ask "forever." Just for now, Eiji.');
const woman = new Woman('Temari', 'Amazing. This slacker-clown outsmarted me!');
const catWoman = new CatWoman('Hello Kitty')

dog.addFriends([cat.name, 'Yasya']);
woman.addFriends(['Shikamaru']);

[dog, cat, man, woman, catWoman].forEach(inhabitant => print(inhabitant.toString()));
