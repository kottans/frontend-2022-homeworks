const cards = document.querySelectorAll('.cards__item');

let hasFlippedCards = false;
let firstCard;
let secondCard;
let lockBoard = false;

function flipCards() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCards) {
		hasFlippedCards = true;
		firstCard = this;
		return;
	}

	hasFlippedCards = false;
	secondCard = this;

	checkMatch();
	resetGame();
}

function checkMatch() {
	if (firstCard.dataset.number == secondCard.dataset.number) {
		cardsMatch();
	} else {
		cardsDoNotMatch();
	}
}

function cardsMatch() {
	firstCard.classList.add('hidden');
	secondCard.classList.add('hidden');
	resetBoard();
}

function cardsDoNotMatch() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip')
		secondCard.classList.remove('flip')
		resetBoard();
	}, 1100)
}

function resetBoard() {
	[firstCard, secondCard] = [null, null];
	[hasFlippedCards, lockBoard] = [false, false];
}

function resetGame() {
	const cardsWidthClassHidden = [];
	cards.forEach(card => {
		if (card.classList.contains('hidden')) {
			cardsWidthClassHidden.push(1);
		}
	})
	if (cardsWidthClassHidden.length === 16) {
		setTimeout(() => {
			alert('Поздравляю, Вы прошли игру!');
			location.reload();
		}, 1000)
	}
}

function cardsShuffling(card) {
	card.style.order = Math.floor(Math.random() * 16);
}

cards.forEach(card => {
	card.addEventListener('click', flipCards);
	cardsShuffling(card);
})
