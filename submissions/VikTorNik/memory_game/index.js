document.addEventListener("DOMContentLoaded", () => {

    const DATE_GAME = {
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
        timeUpdate: { // update ms
            showCurrentLevel: 400,
            checkOpenTwoCards: 100,
            compareTwoCard: 1700,
            checkAllGuessedCards: 3000,
        },
        cardBack: {
            pathImage: "img/00.jpg",
        },
        cardFace: {
        },
    }

    //* Формую структуру DOM-дерева для хідера
    showHeader = () => {
        const currentDiv = document.createElement("div");
        currentDiv.innerHTML = "<p>Memory Game - за мотивами «Лісової пісні» Лесі Українки</p>";
        document.querySelector(".header__div").append(currentDiv);
    }

    //* Формую структуру DOM-дерева для меню
    showMenu = () => {
        DATE_GAME.menuGame.map(countColumnRow => {
            const currentDiv = document.createElement("li");
            currentDiv.className = "menu__item";
            currentDiv.innerHTML = `<a class="menu__title" href="#">${countColumnRow[0]}</a>`;
            // власна змінна для передачі кількості рядків/колонок
            currentDiv.dataset.columnsCard = countColumnRow[1];
            currentDiv.dataset.rowsCard = countColumnRow[2];
            document.querySelector(".menu").append(currentDiv);
        })
    }

    //* Формуємо сітку у CSS під зображення    
    setGridParametersCSS = () => {
        const root = document.documentElement;
        root.style.setProperty('--columns-card', DATE_GAME.gridLevel.columns);
        root.style.setProperty('--rows-card', DATE_GAME.gridLevel.rows);
    }

    //* Формуємо об'ект згідно рівня
    createObjectCardImage = () => {
        // формуємо випадкові зображення з загальної бази
        const randomArray = new Set();
        [...Array(200)].map(() => randomArray.add(`img/${Math.floor(1 + Math.random() * 28)}.jpg`));
        let baseCardImage = [...Array(Math.floor(DATE_GAME.gridLevel.countGrid / 2))].map((_, i) => [...randomArray.values()][i]);
        // дублюєм масив і сортуємо рандомно
        baseCardImage = [...baseCardImage, ...baseCardImage].sort(() => Math.random() - 0.5);
        // видаляємо попередні ключі у cardFace        
        for (key in DATE_GAME.cardFace) { delete DATE_GAME.cardFace[key] };
        // заповнююємо дані по карткам рівня
        baseCardImage.map((pathImage, idImage) => {
            const currentCard = DATE_GAME.cardFace[`card-${idImage + 1}`] = new Object;
            currentCard['id'] = `card-${idImage + 1}`;
            currentCard['statusClass'] = "card-back";
            currentCard['pathImage'] = pathImage;
        })
    };

    //* Формування DOM
    showCurrentLevel = () => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "main__div";
        document.querySelector(".main__div").replaceWith(parentDiv);
        const fieldPlay = [];
        // отримуєм масив ключів від карток
        for (let card of Object.values(DATE_GAME.cardFace)) {
            fieldPlay.push(`<div class="div__card"><img id=${card.id} class=${card.statusClass}`);
            card.statusClass == "card-back" ? fieldPlay.push(` src=${DATE_GAME.cardBack.pathImage}`) :
                card.statusClass == "card-face" ? fieldPlay.push(` src=${card.pathImage}`) :
                    card.statusClass == "card-checked" ? fieldPlay.push(` src=${card.pathImage}`) :
                        card.statusClass == "card-off-checked" ? fieldPlay.push(` src=${DATE_GAME.cardBack.pathImage}`) : false;
            fieldPlay.push(` alt = "" ></div >`);
        }
        parentDiv.innerHTML = fieldPlay.join('');
    }

    //* Перевірка чи відкрито дві карти
    checkOpenTwoCards = () => {
        if (!DATE_GAME.switchCompareCard) {
            let countCardFace = 0;
            Object.values(DATE_GAME.cardFace).map(card =>
                card.statusClass == 'card-face' ? countCardFace += 1 : false
            )
            if (countCardFace == 2) {
                DATE_GAME.switchCompareCard = true;
                Object.values(DATE_GAME.cardFace).map(card => {
                    card.statusClass == 'card-back' ? card.statusClass = 'card-off-checked' : false
                }
                )
            }
        }
    }

    //* Порівняння двох карт і оновлення об'єкту
    compareTwoCard = () => {
        if (DATE_GAME.switchCompareCard) {
            // знаходимо дві карти card-face
            const cardFace = [];
            Object.values(DATE_GAME.cardFace).map(card =>
                card.statusClass == "card-face" ? cardFace.push(card) : false
            )
            // якщо вони однакові
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
    }

    //* Якщо всі карти вгадані

    checkAllGuessedCards = () => {
        if (!DATE_GAME.switchCompareCard) {
            if (Object.values(DATE_GAME.cardFace).every(card => card.statusClass == "card-checked")) {
                Object.values(DATE_GAME.cardFace).map(card => card.statusClass = 'card-face')
            };
        };
    };

    //* Формую структуру DOM-дерева для футера
    showFooter = () => {
        const currentDiv = document.createElement("div");
        currentDiv.innerHTML = '<p>2022 • Memory Game by <a class="git" href="https://github.com/VikTorNik" target="_blank">VikTorNik</a>  • Автор ляльок, лялькової постановки та фотограф <a class="git" href="https://www.facebook.com/people/Olena-Nekora/100050930892384/" target="_blank">Olena Nekora</a></p>';
        document.querySelector(".footer__div").append(currentDiv);
    }

    //* Формуємо сторінку
    showHeader();
    showMenu();
    showFooter();

    //* Натискання на відповідний пункт меню 
    [...document.querySelectorAll(".menu__item")].map(menuItem => {
        menuItem.addEventListener("click", ({ currentTarget }) => {
            // передаємо дані для формування сітки                        
            DATE_GAME.gridLevel.columns = currentTarget.dataset.columnsCard;
            DATE_GAME.gridLevel.rows = currentTarget.dataset.rowsCard;
            setGridParametersCSS();
            // формування об'єкту рівня
            createObjectCardImage();
        });
    });

    //* При натисканні - міняємо клас карти
    document.addEventListener('click', ({ target }) => {
        if (target.closest('.card-back')) {
            DATE_GAME.cardFace[target.id].statusClass = 'card-face';
            showCurrentLevel();
        }
    }, false);

    //* Імітація першого натискання меню
    document.querySelector(".menu__item").click();

    //* Тайм-менеджмент    
    setInterval(showCurrentLevel, DATE_GAME.timeUpdate.showCurrentLevel);
    setInterval(checkOpenTwoCards, DATE_GAME.timeUpdate.checkOpenTwoCards);
    setInterval(compareTwoCard, DATE_GAME.timeUpdate.compareTwoCard);
    setInterval(checkAllGuessedCards, DATE_GAME.timeUpdate.checkAllGuessedCards);
});
