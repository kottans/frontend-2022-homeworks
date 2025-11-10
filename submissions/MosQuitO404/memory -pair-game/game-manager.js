class GameManager {
    
    #attemptNumber = 0;

    constructor(board) {
        if (typeof board === "string") {
            this.boardElement = document.querySelector(board);
        }
        else {
            this.boardElement = board;
        }

        this.deck = new Deck();
        this.firstCard = null;
        this.secondCard = null;
        this.scoreElement = document.querySelector("#attemptNumOutput");
        this.timeElement = document.querySelector('#timeOutput');
        this.gameInfo = document.querySelector('#gameInfo');
    }

    startGame() {
        this.attemptNumber = 0;
        this.timeElement.innerHTML = '00:00:00';
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
            this.gameInfo.innerHTML = `Well done! You did it in ${this.#attemptNumber} attempts.<br>Your time ${this.timeElement.innerHTML}`;
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

    set attemptNumber(attempts) {
        this.#attemptNumber = attempts;
        this.scoreElement.innerHTML = attempts;
    }
}
