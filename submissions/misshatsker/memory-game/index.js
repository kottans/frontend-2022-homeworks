const backMedia = '/media/back.png';

let previousCard = null;

class MyCard {
    constructor(media) {
        this.media = media;

        const cardEl = document.createElement('div');
        cardEl.className = 'memorygame-card';

        this.cardEl = cardEl;
    }

    appendCard() {
        const cardMedia = this.media;

        const front = document.createElement('img');
        front.className = 'front';

        const back = document.createElement('img');
        back.className = 'back';

        front.src = cardMedia;
        back.src = backMedia;

        this.cardEl.append(front);
        this.cardEl.append(back);
        section.append(this.cardEl);

        this.cardEl.onclick = () => this.cardOnClick();
    }

    cardOnClick() {
        const currentCard = this;
        currentCard.cardFlip();

        if (previousCard) {
            const isMatch = currentCard.media == previousCard.media;

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

const section = document.querySelector('.memorygame-area');

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
const getMyCardsFromTitles = (titles) =>
    titles.map((title) => new MyCard(`/media/${title}.png`));

const appendCards = (cards) => cards.forEach((card) => card.appendCard());

appendCards(
    getMyCardsFromTitles(
        shuffleArray(
            doubleArrayItems(
                cardTitles
            )
        )
    )
);
