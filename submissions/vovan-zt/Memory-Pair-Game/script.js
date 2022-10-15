'use strict'

const cards = [
    { name: 'asuma', image: 'img/13.jpg' },
    { name: 'hinata', image: 'img/14.jpg' },
    { name: 'naruto', image: 'img/15.jpg' },
    { name: 'gaara', image: 'img/16.jpg' },
    { name: 'kakashi', image: 'img/17.jpg' },
    { name: 'yamato', image: 'img/18.jpg' },
]

const container = document.querySelector('.container')
const wrapper = document.querySelector('.wrapper')
const cardsList = document.getElementsByClassName('card')
let cardsVisible = []
let isWrapperLocked = false

cards.push(...cards)

const shuffleCards = () => {
    cards.sort(() => {
        return 0.5 - Math.random()
    })
}

const generateCards = ({ name, image }) => {
    return `
        <div class ="card">
            <div class="card__front-side" data-card='${name}'></div>
            <img class="card__back-side" src="${image}" alt="${name}">
        </div>
    `
}

const showCards = () => {
    shuffleCards(cards)
    wrapper.innerHTML = ''
    wrapper.innerHTML = cards.reduce(
        (acc, card) => (acc += generateCards(card)),
        ''
    )
    container.append(wrapper)
}

showCards(cards)

const messageVictory = () => {
    const messageBlock = document.createElement('div')
    messageBlock.classList.add('victory')
    messageBlock.innerHTML = `
        <h2 class= "victory__title">Сongratulation you won</h2>
        <div class= "victory__desc">press reset to start over</div>
        <button class= "victory__btn">Reset</button>
    `
    container.append(messageBlock)
    restartGame(messageBlock)
}

const restartGame = (messageBlock) => {
    const resetBtn = document.querySelector('.victory__btn')
    resetBtn.addEventListener('click', () => {
        showCards(cards)
        messageBlock.remove()
    })
}

const cancelCardActive = () => {
    setTimeout(() => {
        Array.from(cardsList).forEach((card) => {
            card.classList.remove('active')
        })
        isWrapperLocked = false
    }, 800)
    isWrapperLocked = true
}

const changeCard = () => {
    const activeCards = document.querySelectorAll('.active')
    if (cardsVisible[0] == cardsVisible[1]) {
        cardsVisible = []
        if (activeCards.length < 2) {
            cardsVisible = []
            cancelCardActive()
        } else {
            activeCards.forEach((item) => {
                if (item.classList.contains('active')) {
                    item.classList.add('visible')
                }
            })
        }
    } else {
        cardsVisible = []
    }
    cancelCardActive()
}

const checkCardsVisibleLength = () => {
    if (cardsVisible.length === 2) {
        changeCard()
    } else {
        setTimeout(() => (isWrapperLocked = false), 300)
    }
}

const showContent = ({ target }) => {
    if (isWrapperLocked) return
    if (
        target.closest('.card') &&
        !target.classList.contains('card__back-side')
    ) {
        target.closest('.card').classList.add('active')
        cardsVisible.push(target.dataset.card)
        isWrapperLocked = true
        checkCardsVisibleLength()
    }
    checkForWin()
}

const checkForWin = () => {
    const cardsLength = document.querySelectorAll('.visible').length
    if (cardsLength == 12) {
        setTimeout(() => messageVictory(), 1200)
    }
}

window.addEventListener('DOMContentLoaded', () => {
    wrapper.addEventListener('click', showContent)
})
