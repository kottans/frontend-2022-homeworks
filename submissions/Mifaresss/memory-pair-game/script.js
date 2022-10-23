const buttonSwitch = document.querySelector('.switcher-theme__input');
buttonSwitch.addEventListener('click', toggleThemeClass);

function toggleThemeClass({ currentTarget }) {
	const inputStatus = currentTarget.checked;
	if (inputStatus) {
		document.body.classList.add('dark-theme');
	} else {
		document.body.classList.remove('dark-theme');
	}
	localStorage.setItem('Theme', inputStatus);
}
function savesThemeSelection() {
	if (localStorage.getItem('Theme') == 'true') {
		document.body.classList.add('dark-theme');
		buttonSwitch.checked = 'true';
	}
}
savesThemeSelection();


const cards = document.querySelectorAll('.cards__item');

let hasFlippedCards = false;
let firstCard;
let secondCard;
let lockBoard = false;

function flipsAndIdentifiesCards() {
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
		hidesPairedCards();
	} else {
		flipsUnpairedCards();
	}
}

function hidesPairedCards() {
	firstCard.classList.add('hidden');
	secondCard.classList.add('hidden');
	resetBoard();
}

function flipsUnpairedCards() {
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
	card.addEventListener('click', flipsAndIdentifiesCards);
	cardsShuffling(card);
})
