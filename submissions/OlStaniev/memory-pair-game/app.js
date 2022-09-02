const board = document.querySelector('.boardWrapper')

const cardsPaths = [
    './img/dobby.png',
    './img/dumbledore.png',
    './img/harry.png',
    './img/HarryPotter.png',
    './img/ron.png',
    './img/hermoine.png']


function createCardElem(path, ind) {
    const img = document.createElement('img')
    img.setAttribute('data-id', ind)
    img.setAttribute('src', path)
    img.classList.add('card')
    img.classList.add('flippedCard')
    return img
}
const cards = []

cardsPaths.forEach((path, ind) => {
    const card = {
        id: ind,
        elem: createCardElem(path, ind),
    }
    const cardDouble = {
        id: ind + cardsPaths.length,
        elem: createCardElem(path, ind + cardsPaths.length),
    }
    cards.push(card, cardDouble)
})

cards.sort(() => 0.5 - Math.random()).forEach(card => board.appendChild(card.elem))

function start() {
    board.addEventListener('click', flipCard)
}

let firstCard = null
let coincidenceCouter = 0

function flipCard({ target }) {
    if (!target.closest('.card')) return
    if (target === firstCard) return
    setTimeout(() => { target.classList.toggle('flippedCard') }, 100)
    target.classList.toggle('transform')
    if (!firstCard) {
        firstCard = target
    } else {
        setTimeout(() => { target.classList.toggle('flippedCard') }, 100)
        target.classList.toggle('transform')
        if (firstCard.getAttribute('src') === target.getAttribute('src')) {
            setTimeout(() => { target.classList.toggle('flippedCard') }, 100)
            target.classList.toggle('transform')
            setTimeout(() => {
                firstCard.style.visibility = 'hidden'
                target.style.visibility = 'hidden'
                firstCard = null
            }, 1100)
            coincidenceCouter++
            if (coincidenceCouter === cards.length / 2) {
                setTimeout(() => alert('You win'), 1200)
                setTimeout(() => location.href = location.href, 1300)
            }
            board.removeEventListener('click', flipCard)
        } else {
            setTimeout(() => {
                setTimeout(() => {
                    firstCard.classList.toggle('flippedCard')
                    firstCard = null
                }, 100)
                firstCard.classList.toggle('transform')
            }, 1000)
            setTimeout(() => { target.classList.toggle('flippedCard') }, 100)
            target.classList.toggle('transform')
            setTimeout(() => {
                setTimeout(() => { target.classList.toggle('flippedCard') }, 100)
                target.classList.toggle('transform')
            }, 1000)
            board.removeEventListener('click', flipCard)
        }
        setTimeout(() => board.addEventListener('click', flipCard), 1500)
    }
}
document.addEventListener('DOMContentLoaded', start);
