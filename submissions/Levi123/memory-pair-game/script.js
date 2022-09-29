const flipContainer = document.querySelector('.flip-container');
const content = document.querySelector('.main-content__playing-field');
const textContent = document.querySelector('.main-content');
const timer = document.querySelector('.seconds');
const flipCounter = document.querySelector('.flips');

const STATE = {
    totalFlips : 0,
    totalTime : 0,
    flipElementIdArray : [],
    cardOne : null,
    cardTwo : null,
    statusGame : false,
    loop: null,
    combinationCounter: 6,
    isInteractive: true,
    timeToAnimation : 1000,
}

const generateGame = () => {
    const allElementsForGame = [
        {
            id:1,
            images: 'img/bear.png'
        },
    
        {
            id:2,
            images: 'img/elephant.png'
        },
    
        {
            id:3,
            images: 'img/giraffe.png'
        },
    
        {
            id:4,
            images: 'img/grizzly.png'
        },
    
        {
            id:5,
            images: 'img/hippo.png'
        },
    
        {
            id:6,
            images: 'img/koala.png'
        },
    ]

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
    }

    const generateElementForBoard = shuffleArray([...allElementsForGame, ...allElementsForGame]);

    generateElementForBoard.forEach((elementForRender) => {
        content.innerHTML += `
        <div class="main-content__element flipper">
            <div class="front">
                <img src="img/card.png" alt="" class="flip-card-img" data-id=${elementForRender.id}>
            </div>
            <div class="back">
                <img src=${elementForRender.images} alt="" class="flip-card-back-img">
            </div>
        </div>
    `
    })
}       

generateGame();

const startGame = () => {
    STATE.statusGame = true;
    STATE.loop = setInterval(() => {
        STATE.totalTime++
        timer.innerText = ` ${STATE.totalTime} sec`
    }, STATE.timeToAnimation)
}

const flipCard = (target) => {
    STATE.totalFlips++;
    target.classList.add('rotate_card');
    flipCounter.innerText = ` ${STATE.totalFlips}`;
}

const checkCard = (target, parentElement) => {
    if (STATE.flipElementIdArray.length < 2){
        STATE.isInteractive = false;
        STATE.flipElementIdArray.push(target.dataset.id);
        console.log(STATE.flipElementIdArray)
    }
    STATE.isInteractive = true;

    if (!STATE.cardOne){
        return STATE.cardOne = parentElement;
    }
    STATE.cardTwo = parentElement;

    if (STATE.flipElementIdArray.length === 2 && STATE.flipElementIdArray[0] === STATE.flipElementIdArray[1]){
        STATE.flipElementIdArray.length = 0;
        --STATE.combinationCounter;
        STATE.isInteractive = false;
        setTimeout(() => {
            STATE.cardOne.innerHTML='';
            STATE.cardTwo.innerHTML='';
            STATE.cardOne = null;
            STATE.isInteractive = true;
        }, STATE.timeToAnimation)
    }

    if ((STATE.flipElementIdArray.length === 2 && STATE.flipElementIdArray[0] !== STATE.flipElementIdArray[1])){
        STATE.flipElementIdArray.length = 0;
        STATE.isInteractive = false;
        setTimeout(() => {
            STATE.cardOne.classList.remove('rotate_card');
            STATE.cardTwo.classList.remove('rotate_card');
            STATE.cardOne = null;
            STATE.isInteractive = true;
        }, STATE.timeToAnimation)
    }

    if (STATE.combinationCounter === 0){
        clearInterval(STATE.loop);
    }
}
 
flipContainer.addEventListener('click', function (event) {
    const eventTarget = event.target;
    const eventParent = eventTarget.parentElement;
    if (event.target.closest('.front') && STATE.isInteractive){
        flipCard(eventParent.parentElement);
        checkCard(eventTarget, eventParent.parentElement);
        if (STATE.totalFlips === 1){
            startGame();
        }
    }
})

