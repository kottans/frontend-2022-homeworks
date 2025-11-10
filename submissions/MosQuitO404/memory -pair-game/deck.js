class Deck {
    cardsImages = ['ace_clubs.png', 'ace_diamonds.png', 'jack_hearts.png', 'jack_spades.png', 'king_clubs.png', 'king_hearts.png',
    'queen_diamonds.png', 'queen_spades.png', 'jack_clubs.png', 'queen_hearts.png'];

    constructor() {
        this.cards = [];
        this.cardsImages.forEach(img => {
            this.cards.push(new Card(img));
            this.cards.push(new Card(img));
        });
    }

    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    removeCard(card) {
        const index = this.cards.findIndex(item => item.img == card.img);
        if (index != -1) {
            this.cards.splice(index, 1);
            card.disconnectFromDOM();
        }
    }
}
