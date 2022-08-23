/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/crealime/a-tiny-JS-world
   Web app: https://crealime.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

class Inhabitant {
	constructor(species, name, gender, legs, hands, saying) {
		this.species = species
		this.name = name
		this.gender = gender
		this.legs = legs
		this.hands = hands
		this.saying = saying
		this.friends = []
	}
}

class Dog extends Inhabitant {
	constructor(name, gender) {
		super('dog', name, gender, 4, 0, 'Woof-woof!')
	}
}

class Cat extends Inhabitant {
	constructor(name, gender) {
		super('cat', name, gender, 4, 0, 'Meow-meow!')
	}
}

class Human extends Inhabitant {
	constructor(name, gender) {
		super('human', name, gender, 2, 2, 'Hello everyone!')
	}
}

class Pirate extends Inhabitant {
	constructor(name, gender, legs, hands) {
		super('human', name, gender, legs, hands, 'Give no quarter!')
	}
}

const dog = new Dog('Marley', 'male')
const cat = new Cat('Sophie', 'female')
const man = new Human('John Doe', 'male')
const pirate = new Pirate('John Silver', 'male', 1, 2)
const woman = new Human('Jane Doe', 'female')

// const woman2 = woman
// woman2.name = 'Sonia Smith'

class CatWoman {
	constructor(name) {
		this.species = 'cat-woman'
		this.name = name
		this.gender = 'female'
		this.legs = 2
		this.hands = 2
		this.friends = []
	}
	get saying() {
		return cat.saying
	}
}

const catWoman = new CatWoman('Selina Kyle')

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

function greetings(obj) {
	return `${obj.saying} My name is ${obj.name} and I am a ${obj.species}! My gender is ${obj.gender}. I have ${obj.hands} ${obj.hands === 1 ? 'hand' : 'hands'} and ${obj.legs} ${obj.legs === 1 ? 'leg' : 'legs'}. I ${obj.friends.length < 1 ? 'don\'t have friends': obj.friends.length === 1 ? 'have ' + obj.friends.length + ' friend: ' + obj.friends[0] : 'have ' + obj.friends.length + ' friends: ' + obj.friends.join(', ')}.`
}

allInhabitant.forEach(el => {
	print(greetings(el))
})
