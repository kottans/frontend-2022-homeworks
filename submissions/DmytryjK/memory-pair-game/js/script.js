const elementsOfCards = [
    { hero : 'slark',
      srcHero: 'images/images_cards/slark.jpg'
    },
    { hero : 'riki',
      srcHero: 'images/images_cards/riki.jpg'
    },
    { hero : 'pa',
      srcHero: 'images/images_cards/pa.jpg'
    },
    { hero : 'ember',
      srcHero: 'images/images_cards/ember.jpg'
    },
    { hero : 'lancer',
      srcHero: 'images/images_cards/lancer.jpg'
    },
    { hero : 'gyro',
      srcHero: 'images/images_cards/gyro.jpg'
    },
    { hero : 'necr',
      srcHero: 'images/images_cards/necr.jpg'
    },
    { hero : 'void',
      srcHero: 'images/images_cards/void.jpg'
    }
];

const srcBg = 'images/back/dota_back.svg';
let parrentCardBlock = document.querySelector('.main__cards');
let winnerPopup = document.querySelector('.winMessage');
let doubleElementsOfCards = [];

createElementsOfCards();

let listCards = document.querySelectorAll('.main__card'),
    activeCards = [],
    numbersOfCloseCards = 0;

let currentTime = document.querySelector('.timer-current span'),
    bestTime = document.querySelector('.timer-best span'),
    minutes = 0, 
    seconds = 0,
    bestResultsSheet = [];
let timerInterval;

setTimeout(showAllCards, 400);
setTimeout(hideAllCards, 2000);

if (localStorage.getItem('bestTime') !== null) {
  bestTime.innerText = localStorage.getItem('bestTime');
  bestResultsSheet.push(bestTime.innerText);
}

parrentCardBlock.addEventListener('click', e => {
    const parrentTarget = e.target.parentNode;
    
    if (parrentTarget.classList.contains('main__card')) {
        parrentTarget.classList.add('active-card');
        parrentTarget.style.cssText += 'pointer-events: none';
        activeCards.push(parrentTarget);
    }

    if (activeCards.length >= 2) {
        listCards.forEach(e => {
            e.style.cssText += 'pointer-events: none';
        });

        if(activeCards[0].getAttribute(["data-name"]) === activeCards[1].getAttribute(["data-name"]) && activeCards[0].getAttribute(["data-numbers"]) !== activeCards[1].getAttribute(["data-numbers"])) {
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
              winnerPopup.classList.remove('winMessage__active');

              parrentCardBlock.innerHTML = "";
              createElementsOfCards();

              listCards = document.querySelectorAll('.main__card');
              parrentCardBlock = document.querySelector('.main__cards');
              winnerPopup = document.querySelector('.winMessage');
              numbersOfCloseCards = 0;

              resetTimer();

              setTimeout(showAllCards, 400);
              setTimeout(hideAllCards, 2000);
            });
        }
        activeCards = [];
    }
});

function hideTwoCards(cards) {
    cards.forEach(e => {
        e.style.opacity = "0";
        e.style.visibility = "hidden";
    });
    listCards.forEach(e => {
      if (!e.style.visibility) {
        e.style.cssText += 'pointer-events: auto';
      }
    });

    numbersOfCloseCards ++; 
}

function closeTwoCards(cards) {
    cards.forEach(e => {
        e.classList.remove('active-card');
    });
    listCards.forEach(e => {
      e.style.cssText += 'pointer-events: auto';
    });

    activeCards = [];
}

function showAllCards() {
  listCards.forEach(item => {
    item.classList.add('active-card');
    item.style.opacity = "1";
    item.style.cssText = 'pointer-events: none';
  });
}

function hideAllCards() {
  listCards.forEach(item => {
    item.classList.remove('active-card');
    item.style.cssText += 'pointer-events: auto';
  });
  clearInterval(timerInterval);
  timerInterval = setInterval(timer, 1000);
}

function createElementsOfCards() {
    doubleElementsOfCards = [...elementsOfCards, ...elementsOfCards];
    doubleElementsOfCards.sort(() => Math.random() - 0.5);
    for (let i = 0; i < (doubleElementsOfCards.length); i ++) {
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
  seconds ++;

  if (seconds >= 60) {
    minutes ++;
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
