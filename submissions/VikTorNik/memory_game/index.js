document.addEventListener("DOMContentLoaded", () => {

    const DATE_GAME = {
        menuGame: [
            ["Level 1", 4, 2],
            ["Level 2", 4, 3],
            ["Level 3", 4, 4],
            ["Level 4", 5, 4],
            ["Level 5", 6, 4],
            ["Level 6", 6, 5],
            ["Level 7", 6, 6],
        ],
        switchCompareCard: false,
        gridLevel: {
            columns: 0,
            rows: 0,
            get countGrid() {
                return this.columns * this.rows;
            },
        },
        cardBack: {
            pathImage: "img/00.jpg",
        },
        cardFace: {
        },
    };

    showHeader = () => {
        const currentDiv = document.createElement("div");
        currentDiv.innerHTML = "<p>Memory Game - за мотивами «Лісової пісні» Лесі Українки</p>";
        document.querySelector(".header__div").append(currentDiv);
    };

    showMenu = () => {
        DATE_GAME.menuGame.map(countColumnRow => {
            const currentDiv = document.createElement("li");
            currentDiv.className = "menu__item";
            currentDiv.innerHTML = `<a class="menu__title" href="#">${countColumnRow[0]}</a>`;
            currentDiv.dataset.columnsCard = countColumnRow[1];
            currentDiv.dataset.rowsCard = countColumnRow[2];
            document.querySelector(".menu").append(currentDiv);
        });
    };

    setGridParametersCSS = () => {
        const root = document.documentElement;
        root.style.setProperty('--columns-card', DATE_GAME.gridLevel.columns);
        root.style.setProperty('--rows-card', DATE_GAME.gridLevel.rows);
    };

    createObjectCardImage = () => {
        const randomArray = new Set();
        [...Array(200)].map(() => randomArray.add(`img/${Math.floor(1 + Math.random() * 28)}.jpg`));
        let baseCardImage = [...Array(Math.floor(DATE_GAME.gridLevel.countGrid / 2))].map((_, i) => [...randomArray.values()][i]);
        baseCardImage = [...baseCardImage, ...baseCardImage].sort(() => Math.random() - 0.5);
        for (key in DATE_GAME.cardFace) { delete DATE_GAME.cardFace[key] };
        baseCardImage.map((pathImage, idImage) => {
            const currentCard = DATE_GAME.cardFace[`card-${idImage + 1}`] = new Object;
            currentCard['id'] = `card-${idImage + 1}`;
            currentCard['statusClass'] = "card-back";
            currentCard['pathImage'] = pathImage;
        });
    };

    showCurrentLevel = () => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "main__div";
        document.querySelector(".main__div").replaceWith(parentDiv);
        const fieldPlay = [];
        for (let card of Object.values(DATE_GAME.cardFace)) {
            fieldPlay.push(`<div class="div__card"><img id=${card.id} class=${card.statusClass}`);
            card.statusClass == "card-back" ? fieldPlay.push(` src=${DATE_GAME.cardBack.pathImage}`) :
                card.statusClass == "card-face" ? fieldPlay.push(` src=${card.pathImage}`) :
                    card.statusClass == "card-checked" ? fieldPlay.push(` src=${card.pathImage}`) :
                        card.statusClass == "card-off-checked" ? fieldPlay.push(` src=${DATE_GAME.cardBack.pathImage}`) : false;
            fieldPlay.push(` alt = "" ></div >`);
        };
        parentDiv.innerHTML = fieldPlay.join('');
    };

    checkOpenTwoCards = () => {
        let countCardFace = 0;
        Object.values(DATE_GAME.cardFace).map(card =>
            card.statusClass == 'card-face' ? countCardFace += 1 : false
        )
        if (countCardFace == 2) {
            DATE_GAME.switchCompareCard = true;
            Object.values(DATE_GAME.cardFace).map(card => {
                card.statusClass == 'card-back' ? card.statusClass = 'card-off-checked' : false
            });
        };
    };

    compareTwoCard = () => {
        const cardFace = [];
        Object.values(DATE_GAME.cardFace).map(card =>
            card.statusClass == "card-face" ? cardFace.push(card) : false
        )
        if (cardFace[0].pathImage == cardFace[1].pathImage) {
            cardFace[0].statusClass = "card-checked";
            cardFace[1].statusClass = "card-checked";
        } else {
            cardFace[0].statusClass = "card-back";
            cardFace[1].statusClass = "card-back";
        };
        Object.values(DATE_GAME.cardFace).map(card => {
            card.statusClass == 'card-off-checked' ? card.statusClass = 'card-back' : false
        })
        DATE_GAME.switchCompareCard = false;
    };

    checkAllGuessedCards = () => {
        if (Object.values(DATE_GAME.cardFace).every(card => card.statusClass == "card-checked")) {
            Object.values(DATE_GAME.cardFace).map(card => card.statusClass = 'card-face')
        };
    };

    showFooter = () => {
        const currentDiv = document.createElement("div");
        currentDiv.innerHTML = '<p>2022 • Memory Game by <a class="git" href="https://github.com/VikTorNik" target="_blank">VikTorNik</a>  • Автор ляльок, лялькової постановки та фотограф <a class="git" href="https://www.facebook.com/people/Olena-Nekora/100050930892384/" target="_blank">Olena Nekora</a></p>';
        document.querySelector(".footer__div").append(currentDiv);
    }

    showHeader();
    showMenu();
    showFooter();

    [...document.querySelectorAll(".menu__item")].map(menuItem => {
        menuItem.addEventListener("click", ({ currentTarget }) => {
            DATE_GAME.gridLevel.columns = currentTarget.dataset.columnsCard;
            DATE_GAME.gridLevel.rows = currentTarget.dataset.rowsCard;
            setGridParametersCSS();
            createObjectCardImage();
            showCurrentLevel();
        });
    });

    document.addEventListener('click', ({ target }) => {
        if (target.closest('.card-back')) {
            DATE_GAME.cardFace[target.id].statusClass = 'card-face';
            showCurrentLevel();
        }
    }, false);

    document.addEventListener('click', ({ target }) => {
        if (target.closest('.card-back')) {
            setTimeout(() => {
                DATE_GAME.cardFace[target.id].statusClass = 'card-face';
                showCurrentLevel();
            }, 200);
        }
        if (!DATE_GAME.switchCompareCard) {
            checkOpenTwoCards();
        }
        if (DATE_GAME.switchCompareCard) {
            setTimeout(() => {
                compareTwoCard();
                showCurrentLevel();
            }, 1000);
        };
        if (!DATE_GAME.switchCompareCard) { checkAllGuessedCards() };
    }, false);

    document.querySelector(".menu__item").click();

});
