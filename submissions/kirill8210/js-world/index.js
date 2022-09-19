/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/kirill8210/a-tiny-JS-world
   Web app: https://kirill8210.github.io/a-tiny-JS-world/
   */

// ======== OBJECTS DEFINITIONS ========

const dog = {
    species: 'dog',
    name: 'Toby',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'woof-woof!'
};

const cat = {
    species: 'cat',
    name: 'Tom',
    gender: 'male',
    legs: 4,
    hands: 0,
    saying: 'may-may!'
};

const woman = {
    species: 'human',
    name: 'Inna',
    gender: 'female',
    legs: 2,
    hands: 2,
    saying: 'Hello world!'
};

const man = {
    species: 'human',
    name: 'Kyryl',
    gender: 'male',
    legs: 2,
    hands: 2,
    saying: 'Hello world!'
};

// ======== OUTPUT ========

const inhabitants = [
    dog,
    cat,
    woman,
    man
];

const props = [
    'species',
    'name',
    'gender',
    'legs',
    'hands',
    'saying'
];

inhabitants.forEach(elem => {
    print(
        props.filter(prop => elem[prop] !== 0).map(prop => elem[prop]).join("; ")
    );
});

