const dog = {
    species: 'dog',
    name: 'Tom',
    gender: 'male',
    greeting: 'Howl!',
    legs: 4,
    hands: 0,
};

const cat = {
    species: 'cat',
    name: 'Kitty',
    gender: 'female',
    greeting: 'Meow!',
    legs: 4,
    hands: 0,
};

const woman = {
    species: 'human',
    name: 'Jessy',
    gender: 'female',
    greeting: 'Hello!',
    legs: 2,
    hands: 2,
};

const man = {
    species: 'human',
    name: 'Ted',
    gender: 'male',
    greeting: 'Hello my dear!',
    legs: 2,
    hands: 2,
};

const arrayOfInhabitants = [dog, cat, woman, man];

const arrayOfKeys = ['species', 'name', 'gender', 'greeting', 'legs', 'hands'];

const pullValuesOfObj = (obj) => {
    const array = [];

    arrayOfKeys.forEach((key) => array.push(obj[key]));

    return array;
};

arrayOfInhabitants.forEach((inhabitant,) => {
    const arrayOfValues = pullValuesOfObj(inhabitant);

    const stringToPrint = arrayOfValues.join('; ') + ' ;';

    print(stringToPrint);
});
