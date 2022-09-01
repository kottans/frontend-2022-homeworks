const KEYS_VALUE_SEPARATOR = ": ";
const PROPS_SEPARATOR = "; ";

class Creature {
    constructor({ name, gender, friends = [], species, saying }) {
        this.name = name;
        this.species = species;
        this.gender = gender;
        this.friends = friends;
        this.saying = saying;
    }

    createArrayOfProps() {
        return ["name", "species", "gender", "saying", "friends"]
            .map((key) => {
                if (key != "friends")
                    return key + KEYS_VALUE_SEPARATOR + this[key];
                return this.friends.length
                    ? "friends: " +
                          this.friends.map((friend) => friend.name).join(", ")
                    : "";
            })
            .filter((_) => _);
    }

    addFriends(...newFriends) {
        if (newFriends.length > 0)
            this.friends = [...this.friends, ...newFriends];
    }
}

class Animal extends Creature {
    constructor({ name, gender, friends, paws, species, saying }) {
        super({ name, gender, friends, species, saying });
        this.paws = paws;
    }

    createArrayOfProps() {
        return [
            ...super.createArrayOfProps(),
            "paws" + KEYS_VALUE_SEPARATOR + this["paws"],
        ];
    }
}

class Human extends Creature {
    constructor({ name, gender, friends, legs, hands, saying }) {
        super({ name, gender, friends, species: "human", saying });
        this.legs = legs;
        this.hands = hands;
    }

    createArrayOfProps() {
        return [
            ...super.createArrayOfProps(),
            ...["legs", "hands"].map(
                (key) => key + KEYS_VALUE_SEPARATOR + this[key]
            ),
        ];
    }
}

class Dog extends Animal {
    constructor({
        name,
        gender,
        friends,
        paws,
        tail = "ordinary tail",
        saying,
    }) {
        super({ name, gender, friends, paws, tail, species: "dog", saying });
        this.tail = tail;
    }

    createArrayOfProps() {
        return [
            ...super.createArrayOfProps(),
            "tail" + KEYS_VALUE_SEPARATOR + this.tail,
        ];
    }
}

class Cat extends Animal {
    constructor({
        name,
        gender,
        friends,
        paws,
        tail = "ordinary tail",
        saying = "meow!",
    }) {
        super({ name, gender, friends, paws, tail, species: "cat", saying });
        this.saying = saying;
        this.tail = tail;
    }

    createArrayOfProps() {
        return [
            ...super.createArrayOfProps(),
            "tail" + KEYS_VALUE_SEPARATOR + this.tail,
        ];
    }
}

class CatWoman extends Human {
    constructor({
        name,
        gender,
        friends,
        legs,
        hands,
        tail = "ordinary Cat-woman tail",
        saying = "meow!",
    }) {
        super({
            name,
            gender,
            friends,
            legs,
            hands,
            species: "cat-woman",
        });
        this.tail = tail;
        this.saying = saying;
    }

    createArrayOfProps() {
        return [
            ...super.createArrayOfProps(),
            "tail" + KEYS_VALUE_SEPARATOR + this.tail,
        ];
    }
}

const Halle = new CatWoman({
    name: "Halle",
    gender: "female",
    legs: 2,
    hands: 2,
    tail: "long, not fluffy tail",
    saying: Cat.saying,
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
    print(inhabitant.createArrayOfProps().join(PROPS_SEPARATOR))
);
