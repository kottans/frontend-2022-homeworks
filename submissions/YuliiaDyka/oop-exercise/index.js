class LivingBeing {
   constructor(species, name, gender, saying, legs) {
      this.species = species;
      this.name = name;
      this.gender = gender;
      this.saying = saying;
      this.legs = legs;
   };

   showProperties() {
      return [
         this.species, 
         this.name, 
         this.gender, 
         this.saying, 
         this.legs,
      ].join('; ');
   }
};

class Human extends LivingBeing {
   constructor(name, gender, saying, legs) {
      super("Human", name, gender, saying, legs);
      this.hands = 2;
   };

   showProperties() {
      return [
         super.showProperties(),
         this.hands,
      ].join('; ');
   }

};

class Animal extends LivingBeing {
   constructor(species, name, gender, saying, legs) {
      super(species, name, gender, saying, legs);
   };
};

class Cat extends Animal {
   constructor(name, gender, legs) {
      super("Kitty", name, gender, "Meooow!", legs);
   };
};

class Dog extends Animal {
   constructor(name, gender, legs) {
      super("Puppy", name, gender, "Woof!", legs);
   };
};

class CatWoman extends Cat {
   constructor(name) {
      super(name, "Female");
      this.species = "Cat-woman";
      this.legs = 2;
      this.hands = 2;
   };

   showProperties() {
      return [
         super.showProperties(),
         this.hands,
      ].join('; ');
   }
};

const 
man = new Human('Joe', 'male', 'How you doing?', 2),
woman = new Human('Monica', 'female', 'I know!', 2),
cat = new Cat('Taras', 'male', 4),
dog = new Dog('Chappy', 'male', 4),
catWoman = new CatWoman('Halle Berry'),
livingBeings = [man, woman, cat, dog, catWoman];

livingBeings.forEach(item => {
   print(item.showProperties());
});
