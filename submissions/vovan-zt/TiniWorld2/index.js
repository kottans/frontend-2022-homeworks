class WorldInhabitant {
	constructor(species, name, gender, saying) {
		this.species = species;
		this.name = name;
		this.gender = gender;
		this.saying = saying;
	}

	getMeaning() {
		return [
			this.species.toUpperCase(),
			this.name,
			this.gender,
			this.saying,
		].join("; ");
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
		return [
			super.getMeaning(),
			`I have ${this.legs} legs`,
			`and ${this.hands} hands ;`,
			Array.isArray(this.friends) ? this.friends.join(", ") : "no friends",
		].join(" ");
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
		return [
			super.getMeaning(),
			`<strong> animal has ${this.paws} paws <strong>`,
		];
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

const cat = new Cat("Luna", "female");

const catWoman = new CatWoman("Selina");

const man = new Man("Jon", "I want to sleep!", [woman.name, catWoman.name]);

const dog = new Dog("Rasti", "male");

[man, woman, catWoman, cat, dog].forEach((inhabitant) =>
	print(inhabitant.getMeaning())
);
