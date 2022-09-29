class WorldInhabitant {
	constructor(species, name, gender, saying) {
		this.species = species;
		this.name = name;
		this.gender = gender;
		this.saying = saying;
	}

	getMeaning() {
		return ["species", "name", "gender", "saying"]
			.map((property) => {
				if (property === "species") {
					return this[property].toUpperCase();
				}
				return this[property];
			})
			.join("; ");
	}
}
class Human extends WorldInhabitant {
	constructor(name, gender, saying, friends) {
		super("human", name, gender, saying);
		this.legs = 2;
		this.hands = 2;
		this.friends = friends;
	}

	getMeaning() {
		return `${super.getMeaning()};I have ${this.legs} legs and ${
			this.hands
		} hands; ${this.friends ? this.friends.name : "no friends"}`;
	}
}
class Man extends Human {
	constructor(name, saying, friends) {
		super(name, "man", saying, friends);
	}
}
class Woman extends Human {
	constructor(name, saying, friends) {
		super(name, "woman", saying, friends);
	}
}
class CatWoman extends Woman {
	constructor(name) {
		super(name);
		this.species = "CatWoman";
		this.saying = cat.saying;
	}
}
class Animal extends WorldInhabitant {
	constructor(species, name, gender, saying) {
		super(species, name, gender, saying);
		this.paws = 4;
	}

	getMeaning() {
		return `${super.getMeaning()}; animal has ${this.paws} paws`;
	}
}
class Dog extends Animal {
	constructor(name, gender) {
		super("dog", name, gender, "woof!");
	}
}
class Cat extends Animal {
	constructor(name, gender) {
		super("cat", name, gender, "meow!");
	}
}

const woman = new Woman("Lena", "Hello!");

const man = new Man("Jon", "I want to sleep!", woman);

const cat = new Cat("Luna", "female");

const dog = new Dog("Rasti", "male");

const catWoman = new CatWoman("Selina");

[man, woman, catWoman, cat, dog].forEach((inhabitant) =>
	print(inhabitant.getMeaning())
);
