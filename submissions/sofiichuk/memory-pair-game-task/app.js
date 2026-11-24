let firstCard, secondCard;
let thereWasFirstClick = false;
let boardIsLocked = false;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length);

    card.addEventListener('click', showHiddenPic);
});

function showHiddenPic() {
    if (boardIsLocked) return;
    if (this === firstCard) return;

    this.classList.add('selectedCard');

    if (!thereWasFirstClick) {
        firstCard = this;
        thereWasFirstClick = true;
    } else {
        secondCard = this;
        thereWasFirstClick = false;

        checkForMatch();
    }
}

function checkForMatch() {
    firstCard.firstChild.src === secondCard.firstChild.src
        ? disableCards()
        : hidePics();
}

function disableCards() {
    boardIsLocked = true;

    setTimeout(() => {
        firstCard.removeEventListener('click', showHiddenPic);
        secondCard.removeEventListener('click', showHiddenPic);
        boardIsLocked = false;
    }, 1000)
}

function hidePics() {
    boardIsLocked = true;

    setTimeout(() => {
        firstCard.classList.remove('selectedCard');
    }, 500);

    setTimeout(() => {
        secondCard.classList.remove('selectedCard');
        boardIsLocked = false;
    }, 1500);
}
