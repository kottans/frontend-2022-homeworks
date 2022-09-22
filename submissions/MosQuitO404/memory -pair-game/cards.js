class Card {
    img;
    cardTemplate;

    constructor(img) {
        this.img = img;
        this.cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
        this.flipContainer = this.cardTemplate.querySelector('.flip-container');
        this.backSide = this.flipContainer.querySelector('.back'); 
        this.backSide.innerHTML = `<img id='card-img' src="./img/${this.img}" alt="${this.img} image">`;
        this.flipContainer.connectedCard = this;
    }

    get img() {
        return this.img;
    }

    get cardTemplate() {
        return this.cardTemplate;
    }

    flip() {
        this.flipContainer.classList.toggle('flipped');
    }

    disconnectFromDOM() {
        this.flipContainer.connectedCard = null;
    }
}
