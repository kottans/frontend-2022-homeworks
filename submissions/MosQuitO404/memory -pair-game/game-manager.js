class GameManager {
    deck = new Deck();
    firstCard = null;
    secondCard = null;
    #attemptNumber = 0;

    constructor(board, score, time) {
        if (typeof board === "string") {
            this.boardElement = document.querySelector(board);
        }
        else {
            this.boardElement = board;
        }

        if (typeof score === "string") {
            this.scoreElement = document.querySelector(score);
        }
        else {
            this.scoreElement = score;
        }
        if (typeof time === "string") {
            this.timeElement = document.querySelector(time);
        }
        else {
            this.timeElement = time;
        }
        this.gameInfo = document.querySelector('#gameInfo');
    }

    startGame() {
        this.attemptNumber = 0;
        this.deck = new Deck();
        this.boardElement.innerHTML = '';
        this.shuffleAndDeal();
        this.timeCounter();
    }

    shuffleAndDeal() {
        this.deck.shuffle();
        this.deck.cards.forEach(card => {
            this.boardElement.append(card.cardTemplate);
        });
    }

    timeCounter() {
        this.timeElement.started = new Date;
        this.timeElement.update = ms => this.timeElement.innerHTML = new Date(ms).toISOString().split(/T|\./)[1];
        setInterval(() => this.timeElement.update(new Date - this.timeElement.started), 500);
    }

    selectCard(card) {
        if(card == this.firstCard || card == this.secondCard) return;
        card.flip();
        if (this.firstCard && this.secondCard) {
            this.firstCard.flip();
            this.secondCard.flip();

            this.firstCard = this.secondCard = null;
        }

        if (this.firstCard == null) {
            this.firstCard = card;
        }
        else if (this.secondCard == null) {
            this.attemptNumber++;
            this.secondCard = card;

            if (this.firstCard.img === card.img) {
                this.deck.removeCard(this.firstCard);
                this.deck.removeCard(this.secondCard);

                this.firstCard = this.secondCard = null; 
            }
        }
        if (this.deck.cards.length == 0) {
            setTimeout(this.gameOver, 1000);
        }
    }

    gameOver() {
        popup.classList.toggle('active');
        controlPanel.classList.toggle('active');
        board.classList.toggle('active');
    }

    get attemptNumber() {
        return this.#attemptNumber;
    }

    set attemptNumber(value) {
        this.#attemptNumber = value;
        this.scoreElement.innerHTML = value;
        this.gameInfo.innerHTML = `Well done! You did it in ${value} attempts.<br>Your time ${this.timeElement.innerHTML}`;
    }
}
