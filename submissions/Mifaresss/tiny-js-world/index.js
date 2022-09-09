function Population(name, species, gender, legs, hands, saying) {
   this.name = name;
   this.species = species;
   this.gender = gender;
   this.legs = legs;
   this.hands = hands;
   this.saying = saying;
}

const dog = new Population('Baxter', 'dog', 'male', 4, 0, 'Woof-woof!');
const cat = new Population('Lunya', 'cat', 'female', 4, 0, 'Meeeow!');
const man = new Population('Alex', 'human', 'male', 2, 2, 'Hello!');
const women = new Population('Alice', 'human', 'female', 2, 2, 'Hi!');

const inhabitants = [dog, cat, man, women];
const inhabitantsProperties = ['name', 'species', 'gender', 'legs', 'hands', 'saying'];

inhabitants.forEach(inhabitant => {
   print(inhabitantsProperties.map(property => inhabitant[property]).join('; '))
})
