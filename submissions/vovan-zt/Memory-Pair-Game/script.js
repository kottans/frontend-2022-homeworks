'use strict'

const cards = [
    { name: 'asuma', image: 'img/13.jpg' },
    { name: 'hinata', image: 'img/14.jpg' },
    { name: 'naruto', image: 'img/15.jpg' },
    { name: 'gaara', image: 'img/16.jpg' },
    { name: 'kakashi', image: 'img/17.jpg' },
    { name: 'yamato', image: 'img/18.jpg' },
]

cards.push(...cards)

const sortingCards = (dataBase) => {
    dataBase.sort(() => {
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

const messageBlock = document.createElement('div')
messageBlock.classList.add('victory')

const messageVictory = () => {
    messageBlock.innerHTML = `
            <h2 class= "victory__title">Сongratulations you won</h2>
            <div class= "victory__descr">press reset to start over</div>
            <button class= "victory__btn">Reset</button>

    `
    container.append(messageBlock)
    resetGame()
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
        setTimeout(() => messageVictory(), 800)
    }
}

const changeCard = () => {
    let count = 0
    if (cardsVisible[0] == cardsVisible[1]) {
        cardsVisible = []
        cardsList.forEach((item) => {
            if (item.classList.contains('active')) {
                count++
            }
        })
        if (count < 2) {
            cardsVisible = []
            cancelCardActive()
        } else {
            cardsList.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.add('visible')
                }
            })
        }
    } else {
        cardsVisible = []
    }
    setTimeout(() => cancelCardActive(), 600)
    resetCards()
}

const showContent = ({ target }) => {
    if (
        !target.parentElement.classList.contains('container') &&
        !target.classList.contains('hide-swap')
    ) {
        target.parentElement.classList.toggle('active')
        if (target.parentElement.classList.contains('active')) {
            cardsVisible.push(target.dataset.card)
        } else {
            cardsVisible.pop()
        }
    }
    if (cardsVisible.length == 2) {
        changeCard()
    }
}

window.addEventListener('DOMContentLoaded', () => {
    wrapper.addEventListener('click', showContent)
})
