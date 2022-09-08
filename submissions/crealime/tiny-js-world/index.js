/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/crealime/a-tiny-JS-world
   Web app: https://crealime.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

function CreateInhabitant(species, name, gender, legs, hands, saying) {
	this.species = species
	this.name = name
	this.gender = gender
	this.legs = legs
	this.hands = hands
	this.saying = saying
	this.friends = []
}

const dog = new CreateInhabitant('dog', 'Marley', 'male', 4, 0, 'Woof-woof!')
const cat = new CreateInhabitant('cat', 'Sophie', 'female', 4, 0, 'Meow-meow!')
const man = new CreateInhabitant('human', 'Brian', 'male', 2, 2, 'Hello everyone!')
const woman = new CreateInhabitant('human', 'Jane', 'female', 2, 2, 'Hi all!')
const catWoman = new CreateInhabitant('cat-woman', 'Selina', 'female', 2, 2, cat.saying)
const pirate = new CreateInhabitant('human', 'John', 'male', 1, 2, 'Give no quarter!')

dog.friends.push(cat.name, man.name)
cat.friends.push(dog.name, woman.name, catWoman.name)
man.friends.push(dog.name, woman.name)
woman.friends.push(cat.name, man.name)
catWoman.friends.push(cat.name)

const inhabitantKeys = ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends']
const allInhabitants = [dog, cat, man, woman, catWoman, pirate]

// ======== OUTPUT ========
/* Use print(message) for output.
   Default tag for message is <pre>. Use print(message,'div') to change containing element tag.

   Message can contain HTML markup. You may also tweak index.html and/or styles.css.
   However, please, REFRAIN from improving visuals at least until your code is reviewed
   so code reviewers might focus on a single file that is index.js.
   */

/* Print examples:
   print('ABC');
   print('<strong>ABC</strong>');
   print('<strong>ABC</strong>', 'div');

   print('human; John; male; 2; 2; Hello world!; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny');
   print('human; <strong>John</strong>; male; 2; 2; <em>Hello world!</em>; Rex, Tom, Jenny', 'div');
   */

function getStringFromObject(inhabitant) {
	return inhabitantKeys.map((key) => {
		if (Array.isArray(inhabitant[key]) && !inhabitant[key][0]) return 'No friends'
		else if (Array.isArray(inhabitant[key])) return inhabitant[key].join(', ')
		else return inhabitant[key]
	}).join('; ')
}

allInhabitants.forEach(inhabitant => {
	print(getStringFromObject(inhabitant))
})
