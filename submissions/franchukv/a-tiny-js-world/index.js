/* 
   Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: https://github.com/franchukv/a-tiny-JS-world
   Web app: https://franchukv.github.io/a-tiny-JS-world/
*/

// ======== OBJECTS DEFINITIONS ========

// Define your objects here

const man = {
   species: 'human',
   gender: 'male',
   name: 'Drogo',
   status: 'Khal',
   hands: 2,
   feets: 2,
   saying: 'Sheikh Ma Shieraki Anni.',
}

const woman = {
   species: 'human',
   gender: 'female',
   name: 'Daenerys',
   status: 'Daenerys of House Targaryen, First with Her Name, Breaker of Chains and Mother of Dragons',
   hands: 2,
   feets: 2,
   saying: 'Drakaris!',
   friends: `Fell in love with ${man.name}.`,
}

const dog = {
   species: 'dog',
   gender: 'male',
   name: 'Sharik',
   status: "Yard's terrier",
   hands: 0,
   feets: 4,
   saying: 'woof-woof!',
   friends: `Only ${man.name} is friends.`,
}

const cat = {
   species: 'cat',
   gender: 'female',
   name: 'Bastet',
   status: "Pharaoh's cat",
   hands: 0,
   feets: 4,
   saying: 'Meow, bow to me!',
   friends: 'No friends, only servants!'
}

const catwoman = {
   species: 'human',
   gender: 'female',
   name: 'Selina Kyle',
   status: "Superhero",
   hands: 2,
   feets: 2,
   saying: cat.saying,
   friends: `In astral connection with ${cat.name}.`,
}

// ======== OUTPUT ========

const inhabitants = [man, woman, dog, cat, catwoman];

const objToString = (obj) => {
   const propNames = Object.getOwnPropertyNames(obj);
   let propValuesArr = [];

   for (let i = 0; i < propNames.length; i++) {
      propValuesArr.push(obj[propNames[i]]);
   }

   return propValuesArr.join('; ');
}

function greetings(arr, func) {
   for (let i = 0; i < arr.length; i++) {
      print(func(arr[i]))
   }
}

greetings(inhabitants, objToString)
