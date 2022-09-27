class Inhabitant{
   constructor(species, name, gender, saying, legs){
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.legs = legs;
      this.friends = [];
   }

   getProperties(){
      return ['species', 'name', 'gender', 'saying', 'legs', 'friends'];
   }

   addFriends(friendsList){
      this.friends = this.friends.concat(friendsList);
   }

   friendsToString(){
      return this.friends.length === 0 ? '0' : this.friends.map(friend => friend.name).join(', ');
   }

   toString(){
      return this.getProperties().map(property => {
         return `<strong>${property}</strong>: ${property === 'friends' ? this.friendsToString() : this[property]}`;
      }).join('; ');
   }
}

class Animal extends Inhabitant{
   constructor(species, name, gender, saying){
      super(species, name, gender, saying, 4);
   }
}

class Human extends Inhabitant{
   constructor(name, gender, saying){
      super('human', name, gender, saying, 2);
      this.hands = 2;
   }

   getProperties(){
      return super.getProperties().concat('hands');
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

class CatWoman extends Woman{
   constructor(name){
      super(name, new Cat().saying)
      this.species = 'cat-woman';
   }
}

const dog = new Dog('Bima', 'female');
const cat = new Cat('Jessy', 'female');
const man = new Man('Ash Lynx', 'Stay with me... I won\'t ask "forever." Just for now, Eiji.');
const woman = new Woman('Temari', 'Amazing. This slacker-clown outsmarted me!');
const catWoman = new CatWoman('Hello Kitty');

dog.addFriends([cat, man]);
woman.addFriends([dog, catWoman]);
woman.addFriends([cat]);

[dog, cat, man, woman, catWoman].forEach(inhabitant => print(inhabitant.toString()));
