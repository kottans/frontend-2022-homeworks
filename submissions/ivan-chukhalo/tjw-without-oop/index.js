function getInfo(incomeCreature) {
  let consolidatedInfo = [];
  Object.getOwnPropertyNames(incomeCreature).forEach((elArr) => {
    consolidatedInfo.push(incomeCreature[elArr]);
  });
  return consolidatedInfo.join("; ");
}

const janLevinson = {
  name: "Jan Levinson",
  sex: "Female",
  friends: "no friends",
  species: "Human",
  saying: '"You are not he first one!"',
  lags: 2,
  hands: 2,
};

const michaelScott = {
  name: "Michael Scott",
  sex: "Male",
  friends: "Jan Levinson is a friend",
  species: "Human",
  saying: '"Thats what she said!"',
  lags: 2,
  hands: 2,
};

const theirDog = {
  name: "Pesyk",
  sex: "Male",
  friends: "Jan Levinson is a friend",
  species: "Dog",
  saying: "Woof",
  lags: 4,
  hands: 0,
};

const theirCat = {
  name: "Kytsia",
  sex: "Female",
  friends: "Michael Scott is a friend",
  species: "Cat",
  saying: "Whats up, buddy? I mean meow.",
  lags: 4,
  hands: 0,
};

const listOfCreatures = [janLevinson, michaelScott, theirDog, theirCat];
listOfCreatures.forEach((el) => {
  print(getInfo(el));
});
