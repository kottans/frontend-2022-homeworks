
class Card {
    constructor(imgId) {
        this.imgId = imgId;
    }

    renderCard() {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<img src="img/${this.imgId}.png" alt="${this.imgId}" class="back__side">
            <img src="img/paw.png" alt="Front side of cards" class="front__side">`;
            field.append(card);
        };
    };
