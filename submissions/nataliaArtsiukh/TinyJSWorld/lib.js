const man = {
  hands: 2,
  legs: 2,
  name: 'Bob',
  gender: 'male',
  saying: 'I\'m vegan',
  friends: 'no one'
};
const woman = {
  hands: 2,
  legs: 2,
  name: 'Mary',
  gender: 'female',
  saying: 'Hi everyone',
  friends: 'Tom, Rex, Halle'
};
const cat = {
  hands: 0,
  legs: 4,
  name: 'Tom',
  gender: 'male',
  saying: 'Mrrrr',
  friends: 'Mary, Halle'
};
const dog = {
  hands: 0,
  legs: 4,
  name: 'Rex',
  gender: 'male',
  saying: 'Woof',
  friends: 'Mary'
};
const catwoman = {
  __proto__:cat,
  hands: 2,
  legs: 2,
  name: 'Halle',
  gender: 'female',
  friends: 'Mary, Tom, Batman'
};

const habitants = [man, woman, cat, dog, catwoman];

habitants.forEach(element => {print(element.saying + '! My name is ' + element.name + '. I\'m ' + element.gender + '. I have ' + element.hands + ' hands and ' + element.legs + ' legs. I\'m friends with ' + element.friends + '.'); return;});

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

