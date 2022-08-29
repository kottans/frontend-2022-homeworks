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
const man = new CreateInhabitant('human', 'John Doe', 'male', 2, 2, 'Hello everyone!')
const woman = new CreateInhabitant('human', 'Jane Doe', 'female', 2, 2, 'Hi all!')
const catWoman = new CreateInhabitant('cat-woman', 'Selina Kyle', 'female', 2, 2, cat.saying)
const pirate = new CreateInhabitant('human', 'John Silver', 'male', 1, 2, 'Give no quarter!')

dog.friends.push(cat.name, man.name)
cat.friends.push(dog.name, woman.name, catWoman.name)
man.friends.push(dog.name, woman.name)
woman.friends.push(cat.name, man.name)
catWoman.friends.push(cat.name)

const allInhabitant = [dog, cat, man, woman, catWoman, pirate]

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

function getStringFromObject(obj) {
	const arr = []
	for (let key in obj) {
		arr.push([key, obj[key]])
	}
	return arr.map(el => Array.isArray(el[1]) && el[1].length === 0 ? 'No friends' : Array.isArray(el[1]) ? el[1].join(', ') : el[1]).join('; ')
}

allInhabitant.forEach(el => {
	print(getStringFromObject(el))
})
