let content = document.querySelector('.content');
const backImg = 'https://i.pinimg.com/originals/13/25/05/132505ba3238e79c00034c905b2ca045.jpg';

// creating obj/ class
class Card {
    constructor(img, name, id, style) {
        this.img = img;
        this.name = name;
        this.id = id;
        this.backgroundImg = backImg;
        this.style = style;
    }
}

let card1 = new Card('https://static3.depositphotos.com/1005348/211/i/450/depositphotos_2114992-stock-photo-aqua-digit-1.jpg', 'one', 1, 'cardItem');
let card2 = new Card('https://a4files.ru/content/uploads/2017/07/cifra-2.jpg', 'two', 2, 'cardItem');
let card3 = new Card('https://img.freepik.com/premium-vector/the-number-3-the-numbers-are-rosy-in-the-form-of-a-popular-childrens-game-pop-it-bright-letters-on-a-white-background-bright-numbers-on-a-white-background_422344-743.jpg', 'three', 3, 'cardItem');
let card4 = new Card('https://i.pinimg.com/originals/0d/e3/c3/0de3c3c562fdcf1d86c4dbd2beb647ff.jpg', 'four', 4, 'cardItem');
let card5 = new Card('https://klike.net/uploads/posts/2020-06/1593148473_1.jpg', 'five', 5, 'cardItem');
let card6 = new Card('https://klike.net/uploads/posts/2020-06/1593149252_3.jpg', 'six', 6, 'cardItem');
let card7 = new Card('https://klike.net/uploads/posts/2020-06/1593149764_2.jpg', 'seven', 7, 'cardItem');
let card8 = new Card('https://static3.depositphotos.com/1000695/119/i/450/depositphotos_1190337-stock-photo-figure-eight.jpg', 'eight', 8, 'cardItem');

//arr of obj/ classes
let arrOfCards = [card1, card2, card3, card4, card5, card6, card7, card8];
let shuffledArr = shuffleArr([...arrOfCards, ...arrOfCards]);

// shuffled array add, all elements from arr rendered and added to page
shuffledArr.forEach((el) => {
    content.innerHTML += renderItem(el);
});

// get all cardItems from page and give them addEventListeners;
let cardItems = document.querySelectorAll('.cardItem');
cardItems.forEach(el => el.addEventListener('click', clickedItem));

// shuffling array;
function shuffleArr(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// rendering one item
function renderItem(item) {
    return `
        <div class='${item.style}' data-attribute='${item.id}'>
            <img class='${item.style}__front' src='${item.backgroundImg}'/>
            <img class='${item.style}__back' src='${item.img}'/>
        </div>
    `;
}

let previousClicked = undefined;
let currentClicked = undefined;
let flipped = 0;
let lockBoard = false;

// Clicked item change img
function clickedItem(event) {
    if (this === previousClicked) return;
    if (lockBoard) return;
    if (!event.target.classList.contains('cardItem__front')) return; 

    event.target.parentElement.classList.add('flip');

    if (previousClicked === undefined) {
        previousClicked = event.target.parentElement;
    } else {
        currentClicked = event.target.parentElement;
        sameEvents(previousClicked, currentClicked);
        previousClicked = undefined;
    }
}

// checking if that items same, if same hiding, else removing flip class
function sameEvents(previosEvent, currentEvent) {
    lockBoard = true;
    if (previosEvent.dataset.attribute === currentEvent.dataset.attribute) {
        previosEvent.classList.add('hide');
        currentEvent.classList.add('hide');
        resetBoardItem();
        flipped += 2;

        if (flipped === shuffledArr.length) {
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

// Reseting items
function resetBoardItem() {
    previousClicked = undefined;
    currentClicked = undefined;
    lockBoard = false;
}
