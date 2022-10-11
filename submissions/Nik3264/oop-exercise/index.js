/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _https://github.com/Nik3264/OOP-exercise_
   Web app: _https://nik3264.github.io/OOP-exercise/_
   */

// ======== OBJECTS DEFINITIONS ========
// Define your objects here

class Animal {
  constructor(species, name, gender, legs, saying) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.properties = ["species", "name", "gender", "legs", "saying"];
  }

  getProperties() {
    return this.properties.map((property) => {
      return `${property}: <strong>${this[property]}</strong>`;
    });
  }
}

class Dog extends Animal {
  constructor({ name, gender }) {
    super("dog", name, gender, 4, "gav-gav!");
  }
}
class Cat extends Animal {
  constructor({ name, gender }) {
    super("cat", name, gender, 4, "mio-mio!");
  }
}

class Catwoman extends Cat {
  constructor({ name }) {
    super({ name, gender: "female" });
    this.species = "catwoman";
    this.legs = 2;
    this.hands = 2;
  }

  getProperties() {
    return [...super.getProperties(), `hands: <strong>${this.hands}</strong>`];
  }
}

class Human extends Animal {
  constructor(name, gender, saying) {
    super("human", name, gender, 2, saying);
    this.hands = 2;
  }
  getProperties() {
    return [...super.getProperties(), `hands: <strong>${this.hands}</strong>`];
  }
}

class Man extends Human {
  constructor({ name, saying }) {
    super(name, "male", saying);
  }
}

class Woman extends Human {
  constructor({ name, saying }) {
    super(name, "female", saying);
  }
}

const inhabitantsList = [
  {
    numder: 2,
    classDefinition: Cat,
    props: [
      {
        name: "Murka",
        gender: "female",
      },
      {
        name: "Marsik",
        gender: "male",
      },
    ],
  },
  {
    numder: 2,
    classDefinition: Dog,
    props: [
      {
        name: "Alfa",
        gender: "female",
      },
      {
        name: "Dik",
        gender: "male",
      },
    ],
  },
  {
    numder: 3,
    classDefinition: Woman,
    props: [
      {
        name: "Lisa",
        saying: "I like sun",
      },
      {
        name: "Olga",
        saying: "I like to speak about...",
      },
      {
        name: "Nina",
        saying: "I like shoping",
      },
    ],
  },
  {
    numder: 3,
    classDefinition: Man,
    props: [
      {
        name: "Nik",
        saying: "I like cars",
      },
      {
        name: "Peter",
        saying: "I like to trevel",
      },
      {
        name: "Stive",
        saying: "I like sport",
      },
    ],
  },
  {
    numder: 1,
    classDefinition: Catwoman,
    props: [
      {
        name: "Judy",
      },
    ],
  },
];

const inhabitants = inhabitantsList
  .map((inhabitant) => {    
    let arrayOfObj = [];
    for (let i = 0; i < inhabitant.numder; i++) {
      let obj=new inhabitant.classDefinition(inhabitant.props[i]);
      arrayOfObj.push(obj);
    }
    return arrayOfObj;
  })
  .flat();
  
print(
  inhabitants.map((instance) => instance.getProperties().join("; ")).join("\n")
);
