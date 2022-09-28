(function() {
    const GAME_OPTIONS = {
        page_title: 'Memory – Pair Game',
        number_of_cards : 12,
        cards : [
            {
                title: 'type1',
                src: './assets/img/type1.jpg'
            },
            {
                title: 'type2',
                src: './assets/img/type2.jpg'
            },
            {
                title: 'type3',
                src: './assets/img/type3.jpg'
            },
            {
                title: 'type4',
                src: './assets/img/type4.jpg'
            },
            {
                title: 'type5',
                src: './assets/img/type5.jpg'
            },
            {
                title: 'type6',
                src: './assets/img/type6.jpg'
            }
        ]
    }

    let flippedCards = [];
    let matchCount = 0;
    let score = 0;
    let scoreElem = document.getElementsByTagName('h3');
    const cards = [...GAME_OPTIONS.cards, ...GAME_OPTIONS.cards];
    let board = document.createElement('div');
    board.classList.add('game-list');

    // make grid
    const generateBoard = (e) => {
        board.innerHTML = '';
        generateBoardItems();
        matchCount = 0;
        score++;
        scoreElem[0].innerHTML = 'Youre score - ' + score;
    }

    const generateBoardItems = () => {
        cards.sort(function() { 
            return 0.5 - Math.random();
        });

        for (let i = 0; i < GAME_OPTIONS.number_of_cards; i++) {
            let item = document.createElement('div');
            item.classList.add('game-list__item');
            item.dataset.type = cards[i].title;
            item.innerHTML = `
                <div class="game-list__card game-list__${cards[i].title}">
                    <div class="game-list__card--front"></div>
                    <div class="game-list__card--back" style="background: url('${cards[i].src}') no-repeat center center; background-size: 90%;"></div>
                </div>
            `;
            board.appendChild(item);
        };
    }

    generateBoardItems();

    const flipCard = (e) => {
        e.target.closest('.game-list__item').classList.add('game-list__item--show');
        flippedCards.push(e.target.closest('.game-list__item'));
    }

    const checkCards = (firstCard, secondCard) => {
        if (firstCard.dataset.type !== secondCard.dataset.type) {
            setTimeout(function(){
                firstCard.classList.remove('game-list__item--show');
                secondCard.classList.remove('game-list__item--show');
            }, 600);
        } else {
            matchCount++;
        }

        flippedCards = [];

        if (matchCount == GAME_OPTIONS.number_of_cards / 2) {
            setTimeout(function(){
                alert('You won the game');
                generateBoard();
            }, 600);
        }
    }
    
    board.addEventListener('click', (e) => {
        const value = e.preventDefault();

        if(!e.target.closest('.game-list__item').classList.contains('game-list__item--show')) {
            flipCard(e);
        }

        if (flippedCards.length == 2) {
            checkCards(flippedCards[0], flippedCards[1]);
        }
    });

    //add game to the page
    document.getElementById('app').append(board);

})();