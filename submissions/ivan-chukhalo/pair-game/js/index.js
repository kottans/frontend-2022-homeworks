const cards = document.querySelectorAll('.card');

(function shuffleCards(){
    cards.forEach((card)=>{
        let cardOrderNumber = Math.floor(Math.random() * 12);
        card.style.order = cardOrderNumber;
    });
})();

let isThereActivatedCard = false;
let boardIsLocked = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard(){
    if (boardIsLocked) return;
    console.log(this)
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!isThereActivatedCard){
        isThereActivatedCard = true;
        firstCard = this;
        return;
        }
        secondCard = this;
        isThereActivatedCard = false;
        checkForMatch();
}

function checkForMatch (){
    if (firstCard.dataset.img === secondCard.dataset.img){
        disableCards();
        return;
    }
    resetTwoCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function resetTwoCards(){
    boardIsLocked = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard(){
    [isThereActivatedCard, boardIsLocked] = [false, false];
    [firstCard, secondCard] = [null, null];
}
