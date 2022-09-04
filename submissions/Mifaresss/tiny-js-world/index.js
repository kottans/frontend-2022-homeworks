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


let dogPrint = '';
for (let key in dog) {
   dogPrint += (key + '; ' + dog[key] + '; ')
}
let catPrint = '';
for (let key in cat) {
   catPrint += (key + '; ' + cat[key] + '; ')
}
let manPrint = '';
for (let key in man) {
   manPrint += (key + '; ' + man[key] + '; ')
}
let womenPrint = '';
for (let key in women) {
   womenPrint += (key + '; ' + women[key] + '; ')
}
print(dogPrint);
print(catPrint);
print(manPrint);
print(womenPrint);
