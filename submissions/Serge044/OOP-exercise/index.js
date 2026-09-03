import { print } from "./js/lib.js";

const manNames = ["Jack", "Mikola", "Janush", "John", "Marty"];
let manNameIndex = Math.floor(Math.random() * manNames.length);

const manPhrases = [
  "'Great Scott!'",
  "'I hate Mondays..",
  "'Hello world!'",
  "'Let's try again.'",
  "'Добрий день everybody!'",
];
let manPhrasesIndex = Math.floor(Math.random() * manPhrases.length);

const womanNames = ["Sarah", "Jane", "Rebecca", "Loice", "Loraine"];
let womanNameIndex = Math.floor(Math.random() * womanNames.length);

const womanPhrases = [
  "'I like fridays evening;).'",
  "'Oh, God!'",
  "'I would do better.'",
  "'if it works - don't touch it.'",
  "'I'll be back!'",
];
let womanPhrasesIndex = Math.floor(Math.random() * womanPhrases.length);

const maleDogNames = ["Rex", "Chuck", "Max", "Buddy", "Jerry Lee"];
let maleDogNameIndex = Math.floor(Math.random() * maleDogNames.length);

const femaleDogNames = ["Dzhema", "Shada", "Laima", "Dina", "Sher"];
let femaleDogNameIndex = Math.floor(Math.random() * femaleDogNames.length);

const dogPhrases = [
  "'Whof whof!'",
  "'Gav!'",
  "'Rrrr!'",
  "'Bow wow!'",
  "'Guau!'",
];
let dogPhraseIndex_first = Math.floor(Math.random() * dogPhrases.length);
let dogPhraseIndex_second = Math.floor(Math.random() * dogPhrases.length);

const maleCatNames = ["Bars", "Timka", "Shriodi", "Miauricio", "Simba"];
let maleCatNameIndex = Math.floor(Math.random() * maleCatNames.length);

const femaleCatNames = ["Lada", "Barsitta", "Arven", "Nika", "Murka"];
let femaleCatNameIndex = Math.floor(Math.random() * femaleCatNames.length);

const catPhrases = [
  "'Meow!'",
  "'Shhhhh.'",
  "'Mrrr.'",
  "'Miau.'",
  "'Where's my f*cking food??'",
];
let catPhraseIndex_first = Math.floor(Math.random() * catPhrases.length);
let catPhraseIndex_second = Math.floor(Math.random() * catPhrases.length);

class Inhabitant {
  constructor(species, name, gender, legs, hands, reserverd, saying) {
    this.species = "This " + species;
    this.name = " named " + name;
    this.gender = " is " + gender + ". ";
    this.legs = legs;
    this.hands = "and " + hands + " hands. ";
    this.reserverd = reserverd;
    this.saying = "Usually saying " + saying;
  }

  printInhabitant() {
    return [
      this.species +
        this.name +
        this.gender +
        this.legs +
        this.hands +
        this.reserverd +
        this.saying,
    ];
  }
}

class Human extends Inhabitant {
  constructor(name, gender, legs, hands, reserverd, saying) {
    super("human", name, gender, legs, hands, reserverd, saying);
  }
}

class Man extends Human {
  constructor(name, saying) {
    super(
      name,
      "male".fontcolor("blue"),
      "He has 2 legs ",
      "2",
      "But has no tail.. ",
      saying
    );
  }
}

class Woman extends Human {
  constructor(name, saying) {
    super(
      name,
      "female".fontcolor("pink"),
      "She has 2 legs ",
      "2",
      "But has no tail.. ",
      saying
    );
  }
}

class Animal extends Inhabitant {
  constructor(species, name, gender, reserverd) {
    super(
      species,
      name,
      gender,
      "It has no legs ",
      "no",
      "But has 4 paws, fur and tail;). ",
      reserverd
    );
  }
}

class Dog extends Animal {
  constructor(name, gender, saying) {
    super("dog", name, gender, saying);
  }
}

class Cat extends Animal {
  constructor(name, gender, saying) {
    super("cat", name, gender, saying);
  }
}

class DogMale extends Dog {
  constructor(name, saying) {
    super(name, "male".fontcolor("blue"), saying);
  }
}

class DogFemale extends Dog {
  constructor(name, saying) {
    super(name, "female".fontcolor("pink"), saying);
  }
}

class CatMale extends Cat {
  constructor(name, saying) {
    super(name, "male".fontcolor("blue"), saying);
  }
}

class CatFemale extends Cat {
  constructor(name, saying) {
    super(name, "female".fontcolor("pink"), saying);
  }
}

let man = new Man(
  `${manNames[manNameIndex]}`,
  `${manPhrases[manPhrasesIndex]}`
);

let woman = new Woman(
  `${womanNames[womanNameIndex]}`,
  `${womanPhrases[womanPhrasesIndex]}`
);

let dogMale = new DogMale(
  `${maleDogNames[maleDogNameIndex]}`,
  `${dogPhrases[dogPhraseIndex_first]}`
);

let dogFemale = new DogFemale(
  `${femaleDogNames[femaleDogNameIndex]}`,
  `${dogPhrases[dogPhraseIndex_second]}`
);

let catMale = new CatMale(
  `${maleCatNames[maleCatNameIndex]}`,
  `${catPhrases[catPhraseIndex_first]}`
);

let catFemale = new CatFemale(
  `${femaleCatNames[femaleCatNameIndex]}`,
  `${catPhrases[catPhraseIndex_second]}`
);

const myInhabitants = [man, woman, dogMale, dogFemale, catMale, catFemale];

function makeRandomArr(a, b) {
  return Math.random() - 0.5;
}

const myRandomInhabatants = myInhabitants.sort(makeRandomArr);

myRandomInhabatants.map((item) => print(item.printInhabitant()));
