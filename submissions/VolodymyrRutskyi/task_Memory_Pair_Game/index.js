const imagesArchived = {
    'front' : [
       './img/1801287.svg' 
    ],
    'back' : [
        ['./img/black.png', 'black'],
        ['./img/child.png', 'child'],
        ['./img/happy.png', 'happy'],
        ['./img/intelegent.png', 'intelegent'],
        ['./img/reach.png', 'reach'],
        ['./img/sad.png', 'sad'],
        ['./img/smart.png', 'smart'],
        ['./img/style.png', 'style']  
    ]
};

const mainContainer = document.querySelector('.main');
const clonedImagesArchive = [...imagesArchived.back, ...imagesArchived.back];
const cardGrid = document.querySelector('.board-grid');
const score = document.querySelector('.score-count');
let winCount = 0;
let scoreCount = 0;

function createBoard (arr){
    arr.sort(function() { return 0.5 - Math.random()});
    arr.map((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-name', `${item[1]}`)
        card.innerHTML = `
            <div class="front">
                <img src="${imagesArchived.front}" alt="cute-cat">
            </div>
            <div class="back">
                <img src="${item[0]}" alt="${item[1]}">
            </div>
        `;
        cardGrid.appendChild(card)
    });
}

createBoard(clonedImagesArchive);
openingCard();

function openingCard (){
    let cards = document.querySelectorAll('.card');
    cards.forEach((card) =>{
        card.addEventListener('click', ()=>{
            scoreCount += 1;
            score.innerHTML = scoreCount;
            card.classList.add('hover');
            let openedCard = document.querySelectorAll('.hover')
            if (openedCard.length == 2){
                openedCard.forEach((item)=>{
                    setTimeout(() => {
                        item.classList.remove('hover');
                    }, 1000);
                });
                cardGrid.style.pointerEvents ='none';
                match(openedCard[0], openedCard[1]);
                setTimeout(() => {
                    cardGrid.style.pointerEvents ='all';
                }, 1500);
            };  
        });
    });
}

function match (firstCard, secondCard){
    if (firstCard.dataset.name === secondCard.dataset.name){
        firstCard.classList.add('hide');
        secondCard.classList.add('hide');
        winCount += 1;
    }
    if (winCount === 8){
        cardGrid.innerHTML = `
            <h2 class='congrats'> You win!</h2>
            <p>Your score: ${scoreCount}</p>
            <button class='restart'>Restart</button>
            `;
        cardGrid.classList.add('restart-view');
        const restart = document.querySelector('.restart');                     
        restart.addEventListener('click', restartGame);
    }
}

function restartGame (){
    winCount = 0;
    scoreCount = 0;
    score.innerHTML = scoreCount;
    cardGrid.classList.remove('restart-view');
    cardGrid.innerHTML = '';
    createBoard(clonedImagesArchive);
    openingCard();
}











