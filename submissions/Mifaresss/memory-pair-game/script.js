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
			cardsWidthClassHidden.push(card);
		}
	})
	if (cardsWidthClassHidden.length === 16) {
		cards.forEach(card => {
			card.classList.add('none');
		})
		setTimeout(() => {
			const question = confirm('Вы выиграли! Желате начать заново?');
			if (question) {
				location.reload();
			} else {
				const instructions = document.createElement('li');
				instructions.classList.add('instructions');
				instructions.textContent = 'Чтобы начать игру заново, перезагрузите страницу';
				const container = document.querySelector('.cards');
				container.append(instructions);
			}
		}, 200)
	}
}


cards.forEach(card => {
	card.addEventListener('click', flipCards);
	// cards shuffling
	card.style.order = Math.floor(Math.random() * 16);
})
