// создадим массив с картами
const listCards = [
    {
        name: 1,
        front: 'assets/front/1.jpg'
    },
    {
        name: 2,
        front: 'assets/front/2.jpg'
    },
    {
        name: 3,
        front: 'assets/front/3.jpg'
    },
    {
        name: 4,
        front: 'assets/front/4.jpg'
    },
    {
        name: 5,
        front: 'assets/front/5.jpg'
    },
    {
        name: 6,
        front: 'assets/front/6.jpg'
    },
    {
        name: 7,
        front: 'assets/front/7.jpg'
    },
    {
        name: 8,
        front: 'assets/front/8.jpg'
    },
];
//console.log(cards);

// создадим копию массива
const copylistCards = listCards.slice();
//console.log(copyCards);

const cards = listCards.concat(copylistCards); //объединим два одинаковых массива карт
//console.log(cards); //проверим
let countCards = cards.length; // длина массива - количество карт в нем

// функция сортировки меняет порядок элементов массива случайным образом
const shuffle = () => cards.sort(() => Math.random() - 0.5);
//console.log(shuffle());

// найдем кнопку по классу, повесим на нее кликер
const reset = document.querySelector(".reset");

// при клике на кнопку запустим функцию перезагрузки карт в дом
reset.addEventListener('click', function () {
    //console.log(shuffle());
    reloadBoard();
});

// создадим функцию заполняющую доску картами
// найдем в доме доску по классу
const board = document.querySelector('.board'); // доска для карт

const createCards = function() {
    let arrCards = ''; //создадим пустой массив дом-елементов
    cards.forEach(({name, front}) => {
        // пробежимся по нашему объединенному массиву из двух одинаковых массивов
        // на входе имя и фото для фронтального вида карточки
        // имя будем использовать для дата 
        arrCards = arrCards + `
        <div data-name="${name}" class="card closed">
        <div class="back">
        <img src="assets/img/js_back.png" alt="back">
        </div>
        <div class="front">
        <img src="${front}" alt="front">
        </div></div>`
    })
    // с помощью инера перезапишем доску
    board.innerHTML = arrCards;
};

// // функция загрузки карт, предварительно перемешиваем их
// до function fillField() {
const loadCards = function() {
    shuffle(); // перемешиваем массив с картам
    createCards(); // заполняем дом массивом карт
    countCards = cards.length;
}

// // функция перезагрузки карт в дом, предварительно перемешиваем их
const reloadBoard = function() {
    board.innerHTML = ''; // очищаем дом
    loadCards(); // загружаем карты
}

// функция переворота карты
// чтобы перевернуть карту при клике на нее, нужно добавить класс flip на карточку (div)
let firstClick = null;
function flipCard({target}) {
    // на входе ждем елемент на котором произошло событие клик (назовем его target)
    // по умолчанию на всех картах есть класс closed, и при первом клике мы будем его удалять
    const cardClicked = target.closest('.card.closed');
    // 
    if (!cardClicked) {
        // если в карте нет класса closed то выходим, инчего не делаем
        return;
    }
    // если каласс closed есть, то удаляем его и добавляем класс flip
    cardClicked.classList.remove('closed');
    cardClicked.classList.add('flip');

    // кликнутая карта становится первой , называем ее firstClick, по умолчанию значение null

    // сделаем проверку, 
    if (!firstClick) {
        // если клик по карте первый, то выполняем переворот
        firstClick = cardClicked;
    } else {
        // если не первый, запускаем функцию проверки на инентичность и блокируем доску,
        // добавляем ей класс blocked
        checkIdentity(cardClicked);
        board.classList.add('blocked');
    }
}

const checkTimeout = 1000;
// функция проверки на инентичность
function checkIdentity(secondClick) {
    // для проверки будем использовать дата атрибуты (по названию)
    // создадим константу равенства где сравниваем дата атрибуты первой и второй карты
    const isEqual = secondClick.dataset.name === firstClick.dataset.name;
    setTimeout(() => {
        board.classList.remove('blocked');
    }, checkTimeout)
  
    if (!isEqual) {
        // если равенство не верно то вызываем функцию, которая возвращает текущей карте исходное положение
        // и передаем ей карту
        setTimeout(() => {
            getStartingPosition(firstClick);
            getStartingPosition(secondClick);
            firstClick = null;
        }, checkTimeout);
    } else {
        // если же равенство равно, то оставляем карты перевернутыми, добавляем им клас оупенид
        secondClick.classList.add('opened');
        firstClick.classList.add('opened');
        firstClick = null;
        // в этом случае отнимаем у счетчика 2
        countCards -= 2;
        getWin(); //запускаем поздравление, запустится тогда когда счетчик будет равен 0
    }
}

// функция возвращающая текущей карте исходное положение
function getStartingPosition ( card ) {
    // на входе ожидает текущую карту
    card.classList.remove('flip'); // удаляем класс флип
    card.classList.add('closed'); // добавляем класс клосед
}

const winTimeout = 7000;
// функция вывода на экран поздравления
function getWin() {
    const winnerContent = `
    <div class="win">
    <p>Congratulations on a win! 
    Maybe one more try? 
    Click on the rest to continue!</p>
    </div>`
    if (countCards === 0) {
        board.innerHTML = ''; // очищаем борд
        board.innerHTML = winnerContent; // загружаем поздравления
        // спустя 7 секунд принудительно перегружаем доску
        setTimeout (() => {
            reloadBoard();
        }, winTimeout)
    }
}

loadCards();
board.addEventListener('click', flipCard);
