const board = {
    cardURLs: ['./img/bart.jpg', './img/homer.png', './img/lisa.png', './img/maggy.jpg', './img/marge.jpg', './img/patty.png', './img/selma.png', './img/abe.jpg', './img/bart.jpg', './img/homer.png', './img/lisa.png', './img/maggy.jpg', './img/marge.jpg', './img/patty.png', './img/selma.png', './img/abe.jpg'],
    cardDeck: [],
    boardDiv: document.querySelector('.main'),
    openedCard: null,
    clickCounter: 0,
    disappearedCardsCount: 0,
    shuffleCards: function() {
        for (let i = this.cardURLs.length - 1; i > 0; i--) {
            let j = Math.floor (Math.random() * (i + 1));
            [this.cardURLs[i], this.cardURLs[j]] = [this.cardURLs[j], this.cardURLs[i]];
        }
    },
    layOutCards: function() {
        this.cardURLs.forEach(cardURL => {
            this.boardDiv.insertAdjacentHTML('beforeend', `
                <div class="flipper">
                    <div class="front">
                        <img class="front-img" src="./img/front.jpg" draggable="false">
                    </div>
                    <div class="back">
                        <img class="back-img" src="${cardURL}" draggable="false">
                    </div>
                </div>
            `);
            let card = document.querySelector('.flipper:last-child');
            this.cardDeck.push(card);
        });
        this.disappearedCardsCount = 0;
        this.clickCounter = 0;
    }
}

const showShirt = function(card) {
    card.classList.remove('flipped');
}

const showFace = function(card) {
    card.classList.add('flipped');
}

const isEqual = function(firstCard, secondCard) {
    let firstImg = firstCard.querySelector('.back-img');
    let secondImg = secondCard.querySelector('.back-img');
    if (firstImg.src == secondImg.src) {
        return true;
    } else {
        return false;
    }
}

const makeDisappear = function(card) {
    card.style.visibility = 'hidden';
}

const createMessage = function() {
    board.boardDiv.insertAdjacentHTML('beforeend', `
        <div class="finish hidden">
            <h2 class="finish-title">You win!</h2>
            <p class="finish-text"></p>
            <div class="finish-button">Play again</div>
        </div>
    `);
}

const showMessage = function(score) {
    let finishText = document.querySelector('.finish-text');
    finishText.textContent = `Your score is ${score} clicks.`;
    let finish = document.querySelector('.finish');
    finish.classList.remove('hidden');
}

const clickHandler = function(e) {
    let currentCard = e.target.closest('.flipper');
    if (currentCard) {
        board.clickCounter++;
        if (!board.openedCard) {
            board.cardDeck.forEach(card => showShirt(card));
            board.openedCard = currentCard;
            showFace(board.openedCard);
        } else if (currentCard != board.openedCard) {
            showFace(currentCard);
            if (isEqual(board.openedCard, currentCard)) {
                makeDisappear(board.openedCard);
                makeDisappear(currentCard);
                board.disappearedCardsCount += 2;
                if (board.disappearedCardsCount == board.cardURLs.length) {
                    setTimeout(showMessage, 1000, board.clickCounter);
                }
            } else {
                setTimeout(showShirt, 1000, board.openedCard);
                setTimeout(showShirt, 1000, currentCard);
            }
            board.openedCard = null;
        }
    }
    
}

const main = function() {
    board.boardDiv.innerHTML = '';
    createMessage();
    let finish = document.querySelector('.finish');
    finish.classList.add('hidden');
    const finishButton = document.querySelector('.finish-button');
    finishButton.onclick = main;
    board.shuffleCards();
    board.layOutCards();
    board.boardDiv.onclick = clickHandler;
}

main();
