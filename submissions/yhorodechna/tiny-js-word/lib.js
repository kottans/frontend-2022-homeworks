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

function getRandomFriendsOfInhabitants() {
  const maxNumberOfFriends = Math.floor(Math.random() * (INHABITANTS.length - 1));
  let friends = [];
  for (let i = 0; i < maxNumberOfFriends; i++) {
    let friend = INHABITANTS[Math.floor(Math.random() * INHABITANTS.length)]
    if (!friends.find(f => f.name === friend.name)) {
      friends.push(friend);
    }
  }
  return friends;
}

class Inhabitant {
  constructor({ species, name, gender, legs, saying }) {
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.legs = legs;
    this.saying = saying;
    this.friends = [];
  };

  getPropertyNames() {
    return ['species', 'name', 'gender', 'saying', 'legs']
  }

  addFriends(friends) {
    this.friends = [...this.friends, ...friends];
  };

  render() {
    return `${this.getPropertyNames().map(name => this[name]).join(', ')}, ${this.renderFriends()}`;
  };

  renderFriends() {
    if (this.friends.length > 0) {
      return this.friends.map(friend => friend.name)
    } else {
      return `I have no friends :(`
    };
  };
};
class Human extends Inhabitant {
  constructor({ name, gender, saying }) {
    super({ species: 'human', name, gender, legs: 2, saying })
    this.hands = 2;
  };
  getPropertyNames() {
    return [...super.getPropertyNames(), 'hands'];
  }
};
class Animal extends Inhabitant {
  constructor({ name, gender, species, saying }) {
    super({ species, name, gender, saying })
    this.legs = 4;
  };
};
class Dog extends Animal {
  constructor({ name, gender }) {
    super({ species: 'dog', name, gender, saying: 'Woof!' })
  };
};
class Cat extends Animal {
  constructor({ name, gender }) {
    super({ species: 'cat', name, gender, saying: 'Meow!' })
  };
};
class CatWoman extends Human {
  constructor({ name, gender, saying = 'Meow!' }) {
    super({ species: 'catWoman', name, gender, legs: 2, saying })
  };
};

const dog = new Dog({
  name: 'Myha',
  gender: 'male',

});
const cat = new Cat({
  name: 'Terra',
  gender: 'female',

});
const woman = new Human({
  name: 'Anna',
  gender: 'female',
  saying: 'Have a nice day!',
});
const man = new Human({
  name: 'Mickle',
  gender: 'male',
  saying: 'You look so good!',
});
const catWoman = new CatWoman({
  name: 'Mira',
  gender: 'female',
});

const INHABITANTS = [dog, cat, woman, man, catWoman];

INHABITANTS.forEach((inhabitant) => {
  inhabitant.addFriends(getRandomFriendsOfInhabitants());
  print(inhabitant.render())
}
);
