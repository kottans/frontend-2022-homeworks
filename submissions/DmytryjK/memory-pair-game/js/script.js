const elementsOfCards = [
  {
    hero: 'slark',
    srcHero: 'images/images_cards/slark.jpg'
  },
  {
    hero: 'riki',
    srcHero: 'images/images_cards/riki.jpg'
  },
  {
    hero: 'pa',
    srcHero: 'images/images_cards/pa.jpg'
  },
  {
    hero: 'ember',
    srcHero: 'images/images_cards/ember.jpg'
  },
  {
    hero: 'lancer',
    srcHero: 'images/images_cards/lancer.jpg'
  },
  {
    hero: 'gyro',
    srcHero: 'images/images_cards/gyro.jpg'
  },
  {
    hero: 'necr',
    srcHero: 'images/images_cards/necr.jpg'
  },
  {
    hero: 'void',
    srcHero: 'images/images_cards/void.jpg'
  }
];

const srcBg = 'images/back/dota_back.svg',
  parrentCardBlock = document.querySelector('.main__cards'),
  winnerPopup = document.querySelector('.winMessage');
let doubleElementsOfCards = [];

createElementsOfCards();

let currentListCards = document.querySelectorAll('.main__card');
let activeCards = [],
  numbersOfCloseCards = 0;

const currentTime = document.querySelector('.timer-current span'),
  bestTime = document.querySelector('.timer-best span');
let minutes = 0,
  seconds = 0,
  bestResultsSheet = [],
  timerInterval = null;

setTimeout(showAllCards, 400);
setTimeout(hideAllCards, 2000);

if (localStorage.getItem('bestTime') !== null) {
  bestTime.innerText = localStorage.getItem('bestTime');
  bestResultsSheet.push(bestTime.innerText);
}

parrentCardBlock.addEventListener('click', e => {
  const clickedTarget = e.target.parentNode;

  if (clickedTarget.classList.contains('main__card')) {
    clickedTarget.classList.add('active-card');
    activeCards.push(clickedTarget);
  }

  if (activeCards.length >= 2) {

    if (activeCards[0].getAttribute(["data-name"]) === activeCards[1].getAttribute(["data-name"]) &&
      activeCards[0].getAttribute(["data-numbers"]) !== activeCards[1].getAttribute(["data-numbers"])) {
      setTimeout(hideTwoCards, 600, activeCards);
    } else {
      setTimeout(closeTwoCards, 800, activeCards);
    }

    if (numbersOfCloseCards === doubleElementsOfCards.length / 2 - 1) {
      const buttonToContinue = document.querySelector('.click-to-continue');

      winnerPopup.classList.add('winMessage__active');

      localStorage.setItem('time', currentTime.innerText);
      currentTime.innerText = localStorage.getItem('time');
      bestResultsSheet.push(localStorage.getItem('time'));

      if (bestResultsSheet.length > 1) {

        bestTime.innerText = bestResultsSheet.reduce((prevItem, currentItem) => {
          if (currentItem < prevItem) {
            return currentItem;
          } else {
            return prevItem;
          }
        });

      } else {
        bestTime.innerText = localStorage.getItem('time');
      }

      localStorage.setItem('bestTime', bestTime.innerText);
      clearInterval(timerInterval);

      buttonToContinue.addEventListener('click', () => {
        resetVariables();
        createElementsOfCards();
        currentListCards = document.querySelectorAll('.main__card');
        resetTimer();
        setTimeout(showAllCards, 400);
        setTimeout(hideAllCards, 2000);
      });

    }
    activeCards = [];
  }
});

function hideTwoCards(activeCards) {
  activeCards.forEach(activeCard => {
    activeCard.classList.add('hide-card');
  });

  numbersOfCloseCards++;
}

function closeTwoCards(activeCards) {
  activeCards.forEach(activeCard => {
    activeCard.classList.remove('active-card');
  });

  activeCards = [];
}

function showAllCards() {
  currentListCards.forEach(card => {
    card.classList.add('active-card');
  });
}

function hideAllCards() {
  currentListCards.forEach(card => {
    card.classList.remove('active-card');
  });

  clearInterval(timerInterval);
  timerInterval = setInterval(timer, 1000);
}

function createElementsOfCards() {
  doubleElementsOfCards = [...elementsOfCards, ...elementsOfCards];
  doubleElementsOfCards.sort(() => Math.random() - 0.5);

  for (let i = 0; i < (doubleElementsOfCards.length); i++) {

    parrentCardBlock.innerHTML += `
            <li class="main__card" data-name="${doubleElementsOfCards[i].hero}" data-numbers="${i}">
                <img class="main__card-back" src="${srcBg}" alt="background_dota">
                <img class="main__card-front" src="${doubleElementsOfCards[i].srcHero}" alt="${doubleElementsOfCards[i].hero}">
            </li>
        `;

  }
}

function resetTimer() {
  seconds = 0;
  minutes = 0;
  currentTime.innerText = `0${minutes} m : 0${seconds} s`;
}

function timer() {
  seconds++;

  if (seconds >= 60) {
    minutes++;
    seconds -= 60;
  }

  if (seconds < 10 && minutes < 10) {
    currentTime.innerText = `0${minutes} m : 0${seconds} s`;
  } else if (seconds < 10) {
    currentTime.innerText = `${minutes} m : 0${seconds} s`;
  } else if (minutes < 10) {
    currentTime.innerText = `0${minutes} m : ${seconds} s`;
  } else {
    currentTime.innerText = `${minutes} m : ${seconds} s`;
  }
}

function resetVariables() {
  winnerPopup.classList.remove('winMessage__active');
  parrentCardBlock.innerHTML = "";
  numbersOfCloseCards = 0;
}
