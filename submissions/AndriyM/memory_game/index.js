const CARD_CLOSE_DELAY = 800;
const MAX_PAIR_CARDS = 6;
const MAX_OPEN_CARDS_LENGTH = 2;
const pairs = [];
const openCards = [];
let cardsId = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let firstCard,
	secondCard,
	secondCardFrontOpen,
	secondCardBackOpen,
	firstCardFrontOpen,
	firstCardBackOpen;

function getRandomCards(arr) {
	return arr.sort(function () {
		return 0.5 - Math.random();
	});
}

function createCardsMarcup(cards) {
	return cards
		.map(
			(card) => `<div class="card-flip" data-card=${card}>
            <img
            src="./assets/img/front.png"
            class="card-flip-front"
            alt=""
            />
            <img
            src="./assets/img/${card}.svg"
            alt=""
            class="card-flip-back"
            />
            </div>`
		)
		.join("");
}

const rootRef = document.querySelector(".cards-deck");
const cardsRef = document.querySelectorAll(".card-flip");
rootRef.addEventListener("click", selectCardOpen);
startPlay();

function startPlay() {
	pairs.length = 0;
	const randomCards = getRandomCards(cardsId);
	rootRef.innerHTML = createCardsMarcup(randomCards);
}

function selectCardOpen(event) {
	if (
		event.target.nodeName !== "IMG" ||
		event.target.classList.contains("active")
	) {
		return;
	}
	const cardId = event.target.closest("div[data-card]");

	if (cardId) {
		openCards.push(cardId);
	}

	firstCard = openCards[0];
	firstCardFrontOpen = openCards[0].children[0];
	firstCardBackOpen = openCards[0].children[1];

	if (!!openCards.length && firstCardFrontOpen) {
		firstCardFrontOpen.classList.add("active");
		firstCardBackOpen.classList.add("active");
	}

	if (openCards.length === MAX_OPEN_CARDS_LENGTH) {
		secondCard = openCards[1];
		secondCardFrontOpen = openCards[1].children[0];
		secondCardBackOpen = openCards[1].children[1];
		secondCardFrontOpen.classList.add("active");
		secondCardBackOpen.classList.add("active");

		setTimeout(() => {
			firstCardFrontOpen.classList.remove("active");
			firstCardBackOpen.classList.remove("active");
			secondCardFrontOpen.classList.remove("active");
			secondCardBackOpen.classList.remove("active");
			openCards.length = 0;
		}, CARD_CLOSE_DELAY);
	}

	if (
		event.target !== firstCardBackOpen &&
		openCards.length === MAX_OPEN_CARDS_LENGTH &&
		firstCard.dataset.card === secondCard.dataset.card
	) {
		pairs.push(secondCard);
		secondCard.classList.add("none");
		firstCard.classList.add("none");
	}

	if (pairs.length === MAX_PAIR_CARDS) {
		setTimeout(() => {
			alert("you win !!!");
			startPlay();
		}, CARD_CLOSE_DELAY);
	}
}
