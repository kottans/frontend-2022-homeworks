const SELECTORS = {
    flipContainer : document.querySelector('.flip-container'),
    content : document.querySelector('.main-content__playing-field'),
    textContent: document.querySelector('.main-content'),
    timer : document.querySelector('.seconds'),
    flipCounter: document.querySelector('.flips'),
}

const STATE = {
    totalFlips : 0,
    totalTime : 0,
    flipElementIdArray : [],
    cardOne : undefined,
    cardTwo : undefined,
    statusGame : false,
    loop: null,
    combinationCounter: 6,
    isInteractive: true,
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


    function shuffle(arrayToShuffle) {
        for(var j, x, i = arrayToShuffle.length; i; j = parseInt(Math.random() * i), x = arrayToShuffle[--i], arrayToShuffle[i] = arrayToShuffle[j], arrayToShuffle[j] = x);
        return arrayToShuffle;
    };

    const generateElementForBoard = shuffle([...allElementsForGame, ...allElementsForGame]);
    console.log(generateElementForBoard);

    for (let i of generateElementForBoard){
        let list = `
            <div class="main-content__element flipper">
                <div class="front">
                    <img src="img/card.png" alt="" class="flip-card-img" data-id=${i.id}>
                </div>
                <div class="back">
                    <img src=${i.images} alt="" class="flip-card-back-img">
                </div>
            </div>
        `
    SELECTORS.content.innerHTML += list;
    }
}       

generateGame();

const startGame = () => {
    STATE.statusGame = true;
    STATE.loop = setInterval(() => {
        STATE.totalTime++
        SELECTORS.timer.innerText = ` ${STATE.totalTime} sec`
    }, 1000)
}

const flipCard = (target) => {
    STATE.totalFlips++;
    target.classList.add('rotate_card');
    SELECTORS.flipCounter.innerText = ` ${STATE.totalFlips}`;
}

const checkCard = (target, parentElement) => {
    if (STATE.flipElementIdArray.length < 2){
        STATE.flipElementIdArray.push(target.dataset.id);
    }

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
            STATE.cardOne = undefined;
            STATE.isInteractive = true;
        }, 1000)
    }

    if ((STATE.flipElementIdArray.length === 2 && STATE.flipElementIdArray[0] !== STATE.flipElementIdArray[1])){
        STATE.flipElementIdArray.length = 0;
        STATE.isInteractive = false;
        setTimeout(() => {
            STATE.cardOne.classList.remove('rotate_card');
            STATE.cardTwo.classList.remove('rotate_card');
            STATE.cardOne = undefined;
            STATE.isInteractive = true;
        }, 1000)
    }

    if (STATE.combinationCounter === 0){
        clearInterval(STATE.loop);
    }
}
 
SELECTORS.flipContainer.addEventListener('click', function (event) {
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
