function Population(name, species, gender, saying) {
   this.name = name;
   this.species = species;
   this.gender = gender;
   this.saying = saying;
}

const dog = new Population('Baxter', 'dog', 'male', 'Woof-woof!');
const cat = new Population('Lunya', 'cat', 'female', 'Meeeow!');
const man = new Population('Alex', 'human', 'male', 'Hello!');
const women = new Population('Alice', 'human', 'female', 'Hi!');

const inhabitants = [dog, cat, man, women];
const inhabitantsProperties = ['name', 'species', 'gender', 'saying'];

inhabitants.forEach(inhabitant => {
   print(inhabitantsProperties.map(property => inhabitant[property]).join('; '))
})
