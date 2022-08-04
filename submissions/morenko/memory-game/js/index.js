const listCards = [
    {
        id: 1,
        front: 'assets/front/1.jpg'
    },
    {
        id: 2,
        front: 'assets/front/2.jpg'
    },
    {
        id: 3,
        front: 'assets/front/3.jpg'
    },
    {
        id: 4,
        front: 'assets/front/4.jpg'
    },
    {
        id: 5,
        front: 'assets/front/5.jpg'
    },
    {
        id: 6,
        front: 'assets/front/6.jpg'
    },
    {
        id: 7,
        front: 'assets/front/7.jpg'
    },
    {
        id: 8,
        front: 'assets/front/8.jpg'
    },
];
const copylistCards = listCards.slice();
const cards = listCards.concat(copylistCards); 
const shuffleСards = () => cards.sort(() => Math.random() - 0.5);

const reset = document.querySelector(".reset");
reset.addEventListener('click', function () {
    reloadBoard();
});

const board = document.querySelector('.board');
const createCards = function() {
    let arrCards = '';
    cards.forEach(({id, front}) => {
        arrCards = arrCards + `
        <div data-id="${id}" class="card closed">
            <div class="back">
                <img src="assets/img/js_back.png" alt="back">
            </div>
            <div class="front">
                <img src="${front}" alt="front">
            </div>
        </div>`
    })
    board.innerHTML = arrCards;
};

let countCards = cards.length;
const loadCards = function() {
    shuffleСards();
    createCards();
    countCards = cards.length;
}

const reloadBoard = function() {
    board.innerHTML = '';
    loadCards();
}

let firstClick = null;
function flipCard({target}) {
    const cardClicked = target.closest('.card.closed');
    if (!cardClicked) {
        return;
    }
    cardClicked.classList.remove('closed');
    cardClicked.classList.add('opened'); 
    if (!firstClick) {
        firstClick = cardClicked;
    } else {
        checkIdentity(cardClicked);
        board.classList.add('blocked');
    }
}

const checkTimeout = 1000;
function checkIdentity(secondClick) {
    const isEqual = secondClick.dataset.name === firstClick.dataset.name;
    setTimeout(() => {
        board.classList.remove('blocked');
    }, checkTimeout)
  
    if (!isEqual) {
        setTimeout(() => {
            closeCard(firstClick);
            closeCard(secondClick);
            firstClick = null;
        }, checkTimeout);
    } else {
        secondClick.classList.add('opened');
        firstClick.classList.add('opened');
        firstClick = null;
        countCards -= 2;
        alertWinningMessage();
    }
}

function closeCard ( card ) {
    card.classList.remove('flip');
    card.classList.add('closed');
}

const winTimeout = 7000;
function alertWinningMessage() {
    const winnerContent = `
    <div class="win">
        <p>
            Congratulations on a win! 
            Maybe one more try? 
            Click on the rest to continue!
        </p>
    </div>`
    if (countCards === 0) {
        board.innerHTML = '';
        board.innerHTML = winnerContent;
        setTimeout (() => {
            reloadBoard();
        }, winTimeout)
    }
}

loadCards();
board.addEventListener('click', flipCard);
