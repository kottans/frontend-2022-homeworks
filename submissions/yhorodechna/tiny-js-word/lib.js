
function print(message, tag = 'pre') {
  var element = document.createElement(tag);
  element.innerHTML = message;
  console.log('PRINT:', message);
  document.getElementById('main').appendChild(element);
}

function makeGitHubLink(currentUrl, filePath) {
  var prefix = currentUrl.split('//')[0];
  var domainComponents = currentUrl.split('//')[1].split('/')[0].split('.');
  var basePath = currentUrl.split('//')[1].split('/')[1];
  basePath = '/' + basePath + (basePath.length ? '/' : '');
  var targetDomain = (domainComponents.length > 1)
    ? 'github.com/' + domainComponents[0]
    : domainComponents[0];
  return prefix + '//' + targetDomain + basePath + (domainComponents.length > 1 ? 'blob/gh-pages/' : '') + filePath;
}

(function (elementId) {
  var element = document.getElementById(elementId);
  element.href = makeGitHubLink(location.href, 'index.js');
})('source-code');




function addFriends() {
  let numberOfFriends = Math.floor(Math.random() * 4);
  let friends = [];
  let friend;
  while (numberOfFriends != 0) {
    friend = INHABITANTS[Math.floor(Math.random() * INHABITANTS.length)]
    if (friends.some(element => element === friend) == false) {
      friends.push(friend)
    };
    numberOfFriends--;
  };
  if (friends.length > 0) {
    console.log(friends)
    return friends.map(friend => `my friend is ${friend.species}, ${friend.gender == 'male' ? 'his' : 'her'} name is ${friend.name}`)
  } else {
    return `I have no friends :(`
  };
};

class Inhabitant {
  constructor({ species, name, gender, legs, hands, saying, addFriendsFn }) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.hands = hands;
    this.saying = saying;
    this.addFriendsFn = addFriendsFn;
    this.friends = [];
  };
  render() {
    console.log(this.addFriendsFn())
    this.friends = this.addFriendsFn()

    return `I am a ${this.species}, my name is ${this.name}, I am a ${this.gender}, I have ${this.legs} legs and ${this.hands === 0 ? 'no': this.hands} hands, I want to say '${this.saying}', ${this.friends}`
  };
};
class Human extends Inhabitant {
  constructor({ name, gender, saying, addFriendsFn }) {
    super({ species: 'human', name, gender, legs: 2, hands: 2, saying, addFriendsFn })
  };
};
class Dog extends Inhabitant {
  constructor({ name, gender, addFriendsFn }) {
    super({ species: 'dog', name, gender, legs: 4, hands: 0, saying: 'Woof!', addFriendsFn })
  };
};
class Cat extends Inhabitant {
  constructor({ species = 'cat', name, gender, legs = 4, hands = 0, addFriendsFn }) {
    super({ species, name, gender, legs, hands, saying: 'Meow!', addFriendsFn })
  };
};
class CatWoman extends Cat {
  constructor({ name, gender, addFriendsFn }) {
    super({ species: 'catWoman', name, gender, legs: 2, hands: 2, addFriendsFn })
  };
};

const dog = new Dog({
  name: 'Myha',
  gender: 'male',
  addFriendsFn: addFriends
});
const cat = new Cat({
  name: 'Terra',
  gender: 'female',
  addFriendsFn: addFriends
});
const woman = new Human({
  name: 'Anna',
  gender: 'female',
  saying: 'Have a nice day!',
  addFriendsFn: addFriends
});
const man = new Human({
  name: 'Mickle',
  gender: 'male',
  saying: 'You look so good!',
  addFriendsFn: addFriends
});
const catWoman = new CatWoman({
  name: 'Mira',
  gender: 'female',
  addFriendsFn: addFriends
});

const INHABITANTS = [dog, cat, woman, man, catWoman];

INHABITANTS.forEach((inhabitant) => {
  print(inhabitant.render())
}
);



