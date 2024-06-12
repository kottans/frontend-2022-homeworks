import { frontCards, backCard } from "./cards.js";

export function renderCards(){
    const cardsSection = document.querySelector('.cards-section');
    const pairedCardImages = shuffleCards(frontCards.concat(frontCards)).reduce((acc, frontCard, cardIndex) => {
        return (acc + 
            `<div class="card-container" data-cat_color="${frontCard.catColor}" id="card-${cardIndex}">
                <img class="back-card" src="${backCard.src}" alt="${backCard.alt}">
                <img class="front-card" src="${frontCard.src}" alt="${frontCard.alt}">
            </div>`
        );
    }, "");
    cardsSection.innerHTML = pairedCardImages;
};

function shuffleCards(cards){
    return cards.sort(function() { return 0.5 - Math.random() });
}
