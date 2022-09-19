document.addEventListener("DOMContentLoaded", () => {

    let dateGame = {
        menuGame: [
            ["Рівень  8", 4, 2],
            ["Рівень 12", 4, 3],
            ["Рівень 16", 4, 4],
            ["Рівень 20", 5, 4],
            ["Рівень 24", 6, 4],
            ["Рівень 30", 6, 5],
        ],
        switchCompareCard: false,
        gridLevel: {
            columns: 0,
            rows: 0,
            get countGrid() {
                return this.columns * this.rows;
            },
        },
        timeUpdate: {
            updateDOM: 400,
            openTwoCard: 150,
            compareTwoCard: 1700,
            levelVictory: 3000,
        },
        cardBack: {
            pathImage: "img/00.jpg",
        },
        cardFace: {
        },
    }

    function visibleHeader() {
        let currentDiv = document.createElement("div");
        currentDiv.innerHTML = "<p>Memory Game - за мотивами «Лісової пісні» Лесі Українки</p>";
        document.querySelector(".header__div").append(currentDiv);
    }

    function visibleMenu() {
        dateGame.menuGame.map(countColumnRow => {
            let currentDiv = document.createElement("div");
            currentDiv.className = "nav__div-menu";
            currentDiv.innerHTML = `${countColumnRow[0]}`;
            currentDiv.dataset.columnsCard = countColumnRow[1];
            currentDiv.dataset.rowsCard = countColumnRow[2];
            document.querySelector(".nav__div").append(currentDiv);
        }
        )
    }

    const initLevelCSS = () => {
        let root = document.documentElement;
        root.style.setProperty('--columns-card', dateGame.gridLevel.columns);
        root.style.setProperty('--rows-card', dateGame.gridLevel.rows);
    }

    function initLevelScreen() {
        let randomArray = new Set();
        [...Array(200)].map(() => randomArray.add(`img/${Math.floor(1 + Math.random() * 28)}.jpg`));
        let baseCardImage = [...Array(Math.floor(dateGame.gridLevel.countGrid / 2))].map((_, i) => [...randomArray.values()][i]);
        baseCardImage = [...baseCardImage, ...baseCardImage].sort(() => Math.random() - 0.5);
        for (key in dateGame.cardFace) { delete dateGame.cardFace[key] };
        baseCardImage.map((pathImage, idImage) => {
            const currentCard = dateGame.cardFace[`card-${idImage + 1}`] = new Object;
            currentCard['id'] = `card-${idImage + 1}`;
            currentCard['statusClass'] = "card-back";
            currentCard['pathImage'] = pathImage;
        })
    };

    function updateDOM() {
        let parentDiv = document.createElement("div");
        parentDiv.className = "main__div";
        document.querySelector(".main__div").replaceWith(parentDiv);
        let fieldPlay = [];
        for (let card of Object.values(dateGame.cardFace)) {
            fieldPlay.push(`<div class="div__card"><img id=${card.id} class=${card.statusClass}`);
            card.statusClass == "card-back" ? fieldPlay.push(` src=${dateGame.cardBack.pathImage}`) :
                card.statusClass == "card-face" ? fieldPlay.push(` src=${card.pathImage}`) :
                    card.statusClass == "card-checked" ? fieldPlay.push(` src=${card.pathImage}`) :
                        card.statusClass == "card-off-checked" ? fieldPlay.push(` src=${dateGame.cardBack.pathImage}`) : false;
            fieldPlay.push(` alt = "" ></div >`);
        }
        parentDiv.innerHTML = fieldPlay.join('');
    }

    function openTwoCard() {
        if (!dateGame.switchCompareCard) {
            let countCardFace = 0;
            Object.values(dateGame.cardFace).map(card =>
                card.statusClass == 'card-face' ? countCardFace += 1 : false
            )
            if (countCardFace == 2) {
                dateGame.switchCompareCard = true;
                Object.values(dateGame.cardFace).map(card => {
                    card.statusClass == 'card-back' ? card.statusClass = 'card-off-checked' : false
                }
                )
            }
        }
    }

    function compareTwoCard() {
        if (dateGame.switchCompareCard) {
            let cardFace = [];
            Object.values(dateGame.cardFace).map(card =>
                card.statusClass == "card-face" ? cardFace.push(card) : false
            )
            if (cardFace[0].pathImage == cardFace[1].pathImage) {
                cardFace[0].statusClass = "card-checked";
                cardFace[1].statusClass = "card-checked";
            } else {
                cardFace[0].statusClass = "card-back";
                cardFace[1].statusClass = "card-back";
            };
            Object.values(dateGame.cardFace).map(card => {
                card.statusClass == 'card-off-checked' ? card.statusClass = 'card-back' : false
            })
            dateGame.switchCompareCard = false;
        };
    }

    function levelVictory() {
        if (!dateGame.switchCompareCard) {
            if (Object.values(dateGame.cardFace).every(card => card.statusClass == "card-checked")) {
                Object.values(dateGame.cardFace).map(card => card.statusClass = 'card-face')
            };
        };
    };

    function visibleFooter() {
        let currentDiv = document.createElement("div");
        currentDiv.innerHTML = '<p>2022 • Memory Game by <a class="git" href="https://github.com/VikTorNik" target="_blank">VikTorNik</a>  • Автор ляльок, лялькової постановки та фотограф <a class="git" href="https://www.facebook.com/people/Olena-Nekora/100050930892384/" target="_blank">Olena Nekora</a></p>';
        document.querySelector(".footer__div").append(currentDiv);
    }

    visibleHeader()
    visibleMenu();
    visibleFooter();

    [...document.querySelectorAll(".nav__div-menu")].map(elem => {
        elem.addEventListener("click", event => {
            dateGame.gridLevel.columns = event.target.dataset.columnsCard;
            dateGame.gridLevel.rows = event.target.dataset.rowsCard;
            initLevelCSS();
            initLevelScreen();
        });
    });

    document.addEventListener('click', event => {
        if (event.target.closest('.card-back')) {
            dateGame.cardFace[event.target.id].statusClass = 'card-face';
            updateDOM();
        }
    }, false);

    document.querySelector(".nav__div-menu").click();

    setInterval(updateDOM, dateGame.timeUpdate.updateDOM);
    setInterval(openTwoCard, dateGame.timeUpdate.openTwoCard);
    setInterval(compareTwoCard, dateGame.timeUpdate.compareTwoCard);
    setInterval(levelVictory, dateGame.timeUpdate.levelVictory);
});

