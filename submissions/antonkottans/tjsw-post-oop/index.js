class Creature {
    constructor({ name, gender, friends = [], species, saying }) {
        this.name = name;
        this.species = species;
        this.gender = gender;
        this.friends = friends;
        if(saying) this.saying = saying;
    }

    returnFullInfo() {
        let result = ["name", "species", "gender", "saying"].map(
            (key) => key + ": " + this[key]
        );
        if (this.friends.length > 0)
            return result.concat(
                "friends: " +
                    this.friends.map((friend) => friend.name).join(", ")
            );
        return result;
    }

    addFriends(...friends) {
        if (friends && friends.length > 0)
            for (const friend of friends) {
                this.friends = Array.from(friends);
            }
    }
}

class Animal extends Creature {
    constructor({ name, gender, friends, paws, tail, species, saying }) {
        super({ name, gender, friends, species, saying });
        this.paws = paws;
        if (tail) this.tail = tail;
    }

    returnFullInfo() {
        return [
            ...super.returnFullInfo(),
            ...["paws", "tail"].map((key) => key + ": " + this[key]),
        ];
    }
}

class Human extends Creature {
    constructor({ name, gender, friends, legs, hands, saying }) {
        super({ name, gender, friends, species: "human", saying });
        this.legs = legs;
        this.hands = hands;
    }

    returnFullInfo() {
        return [
            ...super.returnFullInfo(),
            ...["legs", "hands", "species", "saying"].map(
                (key) => key + ": " + this[key]
            ),
        ];
    }
}

class Dog extends Animal {
    constructor({ name, gender, friends, paws, tail, saying }) {
        super({ name, gender, friends, paws, tail, species: "dog", saying });
    }

    returnFullInfo() {
        return [...super.returnFullInfo(), ["saying" + ": " + this.saying]];
    }
}

class CatSaying {
    constructor(initSaying) {
        this._saying = initSaying;
    }

    get saying() {
        return this._saying;
    }

    set saying(newSaying) {
        this._saying = newSaying;
    }
}

const catSaying = new CatSaying("meow");

class Cat extends Animal {
    constructor({ name, gender, friends, paws, tail }) {
        super({ name, gender, friends, paws, tail, species: "cat" });
    }

    get saying() {
        return catSaying.saying;
    }

    set saying(newSaying) {
        catSaying.saying = newSaying;
    }
}

class CatWoman extends Human {
    constructor({ name, gender, friends, legs, hands, tail }) {
        super({ name, gender, friends, legs, hands, species: "cat-woman" });
        if (tail) this.tail = tail;
    }

    get saying() {
        return catSaying.saying;
    }

    set saying(newSaying) {
        catSaying.saying = newSaying;
    }

    returnFullInfo() {
        return super.returnFullInfo().splice(5, 0, "tail: " + this.tail);
    }
}

const Halle = new CatWoman({
    name: "Halle",
    gender: "female",
    legs: 2,
    hands: 2,
    tail: "long, not fluffy tail",
});

const Felix = new Cat({
    name: "Felix",
    gender: "male",
    paws: 4,
    tail: "long, fluffy tail",
});

const Rex = new Dog({
    name: "Rex",
    gender: "male",
    paws: 4,
    tail: "small tail",
    saying: "woof-woof!",
});

const Tom = new Human({
    name: "Tom",
    gender: "male",
    legs: 2,
    hands: 2,
    saying: "Hello Jenny!",
});

const Jenny = new Human({
    name: "Jenny",
    gender: "female",
    legs: 2,
    hands: 2,
    saying: "Hello Tom!",
});

Halle.addFriends(Felix);
Felix.addFriends(Tom, Jenny);
Tom.addFriends(Jenny, Felix);
Jenny.addFriends(Tom, Felix);

const inhabitants = [Rex, Felix, Jenny, Tom, Halle];

inhabitants.forEach((inhabitant) =>
    print(inhabitant.returnFullInfo().join(" "))
);

const sortedFriends = AllUsers.filter(() => gender_condition).filter(
    () => name_condition
);

