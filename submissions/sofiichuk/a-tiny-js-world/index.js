const man = {
    species: 'human',
    name: 'oneArmedBandit',
    gender: 'male',
    legs: 2,
    hands: 1,
    saying: '\"Arrrgh!\"',
    friends: 0
};

const woman = {
    species: 'human',
    name: 'twoArmedWoman',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: '\"How dare you?!\"',
    friends: 0
};

const dog = {
    species: 'dog',
    name: 'bobik',
    gender: 'male',
    legs: 5,
    hands: 0,
    saying: '\"I can speak too.What\'s the problem?\"',
    friends: 'sheMurzik'
};

const cat = {
    species: 'cat',
    name: 'sheMurzik',
    gender: 'female',
    legs: 4,
    hands: 0,
    saying: '\"I\'m just a normal cat.I meant:\"Meow\"',
    friends: 'bobik'
};

const catWoman = {
    species: 'chimera',
    name: 'undefined',
    gender: 'undefined',
    legs: 'undefined',
    hands: 'undefined',
    friends: 'undefined'
};

Object.setPrototypeOf(catWoman, cat);

const creatures = [man, woman, dog, cat, catWoman];
const creatureProps = ['species', 'name', 'gender', 'legs', 'hands', 'saying', 'friends'];

creatures.map((creature) => {
    print(creatureProps.map((prop) => creature[prop]).join(";"));
});
