const backMedia = './media/back.png';

const getMyCardMediaByTitle = (title) => `./media/${title}.png`;

let previousCard = null;

class MyCard {
    constructor(title) {
        this.title = title;
        this.media = getMyCardMediaByTitle(title);

        const cardEl = document.createElement('div');
        cardEl.className = 'memorygame-card';

        this.cardEl = cardEl;
    }

    appendCard(parentEl) {
        this.cardEl.innerHTML = this.getCardHTML();
        this.cardEl.onclick = () => this.cardOnClick();

        parentEl.append(this.cardEl);
    }

    isCardFound() {
        return this.cardEl.classList.contains('cardFound');
    }

    getCardHTML() {
        const cardMedia = this.media;

        return `
            <img class="front" src="${cardMedia}" alt="${this.title}" />
            <img class="back" src="${backMedia}" alt="back side" />
        `
    }

    cardOnClick() {
        if (this.isCardFound()) {
            return;
        }

        const currentCard = this;
        currentCard.cardFlip();

        if (previousCard) {
            const isMatch = currentCard.title === previousCard.title;

            if (isMatch) {
                currentCard.cardFound();
                previousCard.cardFound();
            } else {
                const firstCard = previousCard;
                const secondCard = currentCard;

                setTimeout(() => {
                    firstCard.cardUnflip();
                    secondCard.cardUnflip();
                }, 500);
            }

            previousCard = null;
        } else {
            previousCard = currentCard;
        }
    }

    cardFlip() {
        this.cardEl.classList.add('flip');
    }

    cardUnflip() {
        this.cardEl.classList.remove('flip');
    }

    cardFound() {
        this.cardEl.classList.add('cardFound');
    }
}

const cardTitles = [
    'banana',
    'guitar',
    'lipstick',
    'headphone',
    'pineapple',
    'pizza'
];

const doubleArrayItems = (arr) => [...arr, ...arr];
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

const generateMyCardsFromTitels = (titles) => titles.map((title) => new MyCard(title));

const section = document.querySelector('.memorygame-area');
const appendCards = (cards) => {
    const fragment = new DocumentFragment();
    cards.forEach((card) => card.appendCard(fragment));
    section.append(fragment);
}

appendCards(
    generateMyCardsFromTitels(
        shuffleArray(
            doubleArrayItems(
                cardTitles
            )
        )
    )
);
