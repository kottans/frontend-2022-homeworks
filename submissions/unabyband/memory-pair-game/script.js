const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

shuffleCards();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch () {
    let isMatch = firstCard.id === secondCard.id;
    isMatch ? disableCards() : unflipCards();
}

function disableCards () {
    setTimeout(() => {
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');   
    },500);
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard); 
    matchedPairs += 1;
    checkMatchedPairs();
}

function unflipCards () {
    lockBoard = true;
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
    }, 1000); 
}

function shuffleCards () {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

function printMatchedPairs () {
    document.querySelector('.wins-counter').innerHTML = `You have ${matchedPairs} matched pairs.`;
}

function checkMatchedPairs () {
    if (matchedPairs === 8) {
        setTimeout(() => {
        alert('YOU WON, CONGRATULATIONS!');
        window.location.reload();
        return;    
        },750);
      
    } else {
        setTimeout(() => {
        printMatchedPairs(); 
        },750);
    }
}
cards.forEach(card => card.addEventListener('click', flipCard));

