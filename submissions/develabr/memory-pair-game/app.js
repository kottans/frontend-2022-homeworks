const cardsArray = [
  {
    name: 'angular',
    img: './img/angular.png',
  },
  {
    name: 'css',
    img: './img/css.png',
  },
  {
    name: 'html',
    img: './img/html.png',
  },
  {
    name: 'javasript',
    img: './img/javascript.png',
  },
  {
    name: 'react',
    img: './img/react.png',
  },
  {
    name: 'sass',
    img: './img/sass.png',
  },
];

const cardsMix = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

const gameField = document.getElementById('container');
const grid = document.createElement('section');
grid.setAttribute('class', 'wrapper');
gameField.appendChild(grid);

cardsMix.forEach((item) => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;
  back.style.backgroundColor = '#e2e2e2';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach((card) => {
    card.classList.add('match');
  });
};

const winAlert = () => {
  alert('Graduation!!! You win.');
  window.location.reload();
};

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 700;
let matched = 0;

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach((card) => {
    card.classList.remove('selected');
  });
};
const wrapper = document.querySelector('.wrapper');
wrapper.addEventListener('click', (event) => {
  const clicked = event.target;

  if (
    clicked.nodeName === 'section' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        matched += 2;
        if (cardsMix.length == matched) {
          setTimeout(winAlert, 1500);
        }
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});

window.addEventListener('load', windowLoad);
function windowLoad() {
  const htmlBlock = document.documentElement;
  const saveUserTheme = localStorage.getItem('user-theme');
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      !saveUserTheme ? changeTheme() : null;
    });

  const themeButton = document.querySelector('.theme');
  if (themeButton) {
    themeButton.addEventListener('click', function (e) {
      changeTheme(true);
    });
  }

  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
    } else {
      htmlBlock.classList.add(userTheme);
    }
  }
  setThemeClass();

  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
    let newTheme;
    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'light';
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
  }
}
