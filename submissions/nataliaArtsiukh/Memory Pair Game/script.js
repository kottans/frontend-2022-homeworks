const board = {
    cardURLs: ['./img/bart.jpg', './img/homer.png', './img/lisa.png', './img/maggy.jpg', './img/marge.jpg', './img/patty.png', './img/selma.png', './img/abe.jpg', './img/bart.jpg', './img/homer.png', './img/lisa.png', './img/maggy.jpg', './img/marge.jpg', './img/patty.png', './img/selma.png', './img/abe.jpg'],
    cardDeck: [],
    boardDiv: document.querySelector('.main'),
    openedCard: null,
    clickCounter: 0,
    shuffleCards: function() {
        for (let i = this.cardURLs.length - 1; i > 0; i--) {
            let j = Math.floor (Math.random() * (i + 1));
            [this.cardURLs[i], this.cardURLs[j]] = [this.cardURLs[j], this.cardURLs[i]];
        }
    },
    layOutCards: function() {
        this.cardURLs.forEach(cardURL => {
            let card = document.createElement('div');
            this.cardDeck.push(card);
            this.boardDiv.append(card);
            card.classList.add('flipper');
            let cardShirt = document.createElement('div');
            card.append(cardShirt);
            cardShirt.classList.add('front');
            let cardShirtImg = document.createElement('img');
            cardShirt.append(cardShirtImg);
            cardShirtImg.classList.add('front-img');
            cardShirtImg.setAttribute('src', './img/front.jpg');
            cardShirtImg.setAttribute('draggable', 'false');
            let cardFace = document.createElement('div');
            card.append(cardFace);
            cardFace.classList.add('back');
            let cardFaceImg = document.createElement('img');
            cardFace.append(cardFaceImg);
            cardFaceImg.classList.add('back-img');
            cardFaceImg.setAttribute('src', cardURL);
            cardFaceImg.setAttribute('draggable', 'false');
        });
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
    let finish = document.createElement('div');
    board.boardDiv.append(finish);
    finish.classList.add('finish');
    let finishTitle = document.createElement('h2');
    finish.append(finishTitle);
    finishTitle.classList.add('finish-title');
    finishTitle.textContent = 'You win!'
    let finishText = document.createElement('p');
    finish.append(finishText);
    finishText.classList.add('finish-text');
    finishText.textContent = `Your score is ${board.clickCounter} clicks.`;
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
                let disappearedCards = document.querySelectorAll('div[style]');
                if (disappearedCards.length == board.cardURLs.length) {
                    setTimeout(createMessage, 1000);
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
    board.shuffleCards();
    board.layOutCards();
    board.boardDiv.onclick = clickHandler;
}

main();
