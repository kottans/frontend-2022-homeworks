'use strict'

const cards = [
    { name: 'naruto', image: 'img/7.png' },
    { name: 'uchiha', image: 'img/8.png' },
    { name: 'sai', image: 'img/9.png' },
    { name: 'kakashi', image: 'img/10.png' },
    { name: 'minato', image: 'img/11.png' },
    { name: 'zetsu', image: 'img/12.png' },
]

cards.push(...cards)

const sortingCards = (cards) => {
    cards.sort(() => {
        return 0.5 - Math.random()
    })
}

const container = document.querySelector('.container')

const generateCards = ({ name, image }) => {
    return `
            <div class ="hide-swap">
                <div class="c1" data-card='${name}'></div>
                <img class="c2" src="${image}" alt="${name}">
            </div>
        `
}

const showCards = (dataBase) => {
    sortingCards(cards)
    const cardsDiv = document.createElement('div')
    cardsDiv.classList.add('wrapper')
    cardsDiv.innerHTML = dataBase.reduce(
        (acc, card) => (acc += generateCards(card)),
        ''
    )
    container.append(cardsDiv)
}
showCards(cards)

const cardsList = document.querySelectorAll('.hide-swap')
const wrapper = document.querySelector('.wrapper')

let cardsVisible = []

const cancelCardActive = () => {
    cardsList.forEach((card) => {
        card.classList.remove('active')
    })
}

const removeClassVisible = () => {
    cardsList.forEach((card) => {
        card.classList.remove('visible')
    })
}

const messageVictory = () => {
    const messageBlock = document.createElement('div')
    messageBlock.classList.add('victory')
    messageBlock.innerHTML = `
            <h2 class= "victory__title">Сongratulations you won</h2>
            <div class= "victory__descr">press reset to start over</div>
            <button class= "victory__btn">Reset</button>

    `
    container.append(messageBlock)
}

const resetGame = () => {
    const resetBtn = document.querySelector('.victory__btn')
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault()
        location.reload()
    })
}

const resetCards = () => {
    const cardsLength = document.querySelectorAll('.visible').length
    if (cardsLength == 12) {
        setTimeout(() => cancelCardActive(), 300)
        setTimeout(() => removeClassVisible(), 400)
        setTimeout(() => messageVictory(), 1500)
        setTimeout(() => resetGame(), 1700)
    }
}

const changeCard = () => {
    console.log(cardsVisible)
    if (cardsVisible.length == 2 && cardsVisible[0] == cardsVisible[1]) {
        cardsVisible = []
        cardsList.forEach((item) => {
            if (item.classList.contains('active')) {
                item.classList.add('visible')
            }
        })
    } else if (
        cardsVisible.length == 2 &&
        cardsVisible[0] !== cardsVisible[1]
    ) {
        cardsVisible = []
        setTimeout(() => cancelCardActive(), 600)
    }
}

const showContent = ({ target }) => {
    if (!target.parentElement.classList.contains('container')) {
        target.parentElement.classList.toggle('active')
        cardsVisible.push(target.dataset.card)
        changeCard()
        resetCards()
    }
}

window.addEventListener('DOMContentLoaded', () => {
    wrapper.addEventListener('click', showContent)
})
