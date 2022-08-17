let content = document.querySelector('.content');
const backImg = 'https://i.pinimg.com/originals/13/25/05/132505ba3238e79c00034c905b2ca045.jpg';
let previousClicked = undefined;
let currentClicked = undefined;
let flipped = 0;
let isBoardLocked = false;

let cardsList = [
    {
        img: 'https://static3.depositphotos.com/1005348/211/i/450/depositphotos_2114992-stock-photo-aqua-digit-1.jpg',
        id: 1
    },
    {
        img: 'https://a4files.ru/content/uploads/2017/07/cifra-2.jpg',
        id: 2
    },
    {
        img: 'https://img.freepik.com/premium-vector/the-number-3-the-numbers-are-rosy-in-the-form-of-a-popular-childrens-game-pop-it-bright-letters-on-a-white-background-bright-numbers-on-a-white-background_422344-743.jpg',
        id: 3
    },
    {
        img: 'https://i.pinimg.com/originals/0d/e3/c3/0de3c3c562fdcf1d86c4dbd2beb647ff.jpg',
        id: 4,
    },
    {
        img: 'https://klike.net/uploads/posts/2020-06/1593148473_1.jpg',
        id: 5,
    },
    {
        img: 'https://klike.net/uploads/posts/2020-06/1593149252_3.jpg',
        id: 6,
    },
    {
        img: 'https://klike.net/uploads/posts/2020-06/1593149764_2.jpg',
        id: 7,
    },
    {
        img: 'https://static3.depositphotos.com/1000695/119/i/450/depositphotos_1190337-stock-photo-figure-eight.jpg',
        id: 8,
    },
];

let shuffledCardList = shuffleArr([...cardsList, ...cardsList]);
function renderAllItem() {
    let accumulator = '';
    shuffledCardList.forEach(el => accumulator += renderItem(el));

    content.innerHTML = accumulator;
}
renderAllItem();


let cardItems = document.querySelectorAll('.cardItem');
cardItems.forEach(el => el.addEventListener('click', clickItem));

function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function renderItem(item) {
    return `
        <div class='cardItem' data-card_id='${item.id}'>
            <img class='cardItem__front' src='${backImg}'/>
            <img class='cardItem__back' src='${item.img}'/>
        </div>
    `;
}

function clickItem(event) {
    if (isBoardLocked || event.target === previousClicked || !event.target.classList.contains('cardItem__front')) return;

    let parentElement = event.target.closest('.cardItem');
    parentElement.classList.add('flip');

    if (!previousClicked) {
        previousClicked = parentElement;
    } else {
        currentClicked = parentElement;
        sameItems(previousClicked, currentClicked);
        previousClicked = undefined;
    }
}

function sameItems(previosEvent, currentEvent) {
    isBoardLocked = true;
    if (previosEvent.dataset.card_id === currentEvent.dataset.card_id) {
        previosEvent.classList.add('hide');
        currentEvent.classList.add('hide');
        resetBoardItem();
        flipped += 2;

        if (flipped === shuffledCardList.length) {
            alert('YOU WIN!');
            window.location.reload();
        } 
    } else {
        setTimeout(() => {
            previosEvent.classList.remove('flip');
            currentEvent.classList.remove('flip');
            resetBoardItem();
        }, 1000);
    }
}

function resetBoardItem() {
    previousClicked = undefined;
    currentClicked = undefined;
    isBoardLocked = false;
}
