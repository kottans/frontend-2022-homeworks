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

const inhabitants = [dog, cat, woman, man];

const inhabitantKeys = ['species', 'name', 'gender', 'greeting', 'legs', 'hands'];

const inhabitantValuesToString = (inhabitant) =>
    inhabitantKeys
        .map((inhabitantKey) => inhabitant[inhabitantKey])
        .join('; ') + ';';

inhabitants.forEach((inhabitant) => print(inhabitantValuesToString(inhabitant)));
