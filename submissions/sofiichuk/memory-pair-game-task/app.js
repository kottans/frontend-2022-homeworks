let firstCard, secondCard;
let clickedAtLeastOnce = false;
let boardLocked = false;

const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * cards.length);

    card.addEventListener('click', showHiddenPic);
});

function showHiddenPic() {
    if (boardLocked) return;
    if (this === firstCard) return;

    this.classList.add('selectedCard');

    if (!clickedAtLeastOnce) {
        firstCard = this;
        clickedAtLeastOnce = true;
    } else {
        secondCard = this;
        clickedAtLeastOnce = false;

        checkForMatch();
    }
}

function checkForMatch() {
    firstCard.firstChild.src === secondCard.firstChild.src
        ? disableCards()
        : hidePics();
}

function disableCards() {
    boardLocked = true;

    setTimeout(() => {
        firstCard.removeEventListener('click', showHiddenPic);
        secondCard.removeEventListener('click', showHiddenPic);
        boardLocked = false;
    }, 1000)
}

function hidePics() {
    boardLocked = true;

    setTimeout(() => {
        firstCard.classList.remove('selectedCard');
    }, 500);

    setTimeout(() => {
        secondCard.classList.remove('selectedCard');
        boardLocked = false;
    }, 1500);
}
