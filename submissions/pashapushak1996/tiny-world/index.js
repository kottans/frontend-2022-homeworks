const dog = {
    species: 'dog',
    name: 'Tom',
    gender: 'male',
    greeting: 'Howl!',
    legs: 4,
    hands: 0
};
const cat = {
    species: 'cat',
    name: 'Kitty',
    gender: 'female',
    greeting: 'Meow!',
    legs: 4,
    hands: 0
};

const woman = {
    species: 'human',
    name: 'Katty',
    gender: 'female',
    greeting: 'Meow!',
    legs: 2,
    hands: 2
};

const man = {
    species: 'human',
    name: 'Bred',
    gender: 'male',
    greeting: 'Hello!',
    legs: 2,
    hands: 2
};

const arrayOfCharacters = [dog, cat, woman, man];

const viewObject = (obj) => {
    const objValues = Object.values(obj);

    return objValues.join('; ');
};

arrayOfCharacters.forEach(obj => {
    print(viewObject(obj));
});
