const URL = 'json/images.json'
const TIMER = {
  time: 600,
  step: 50
}
const pair = []
let numOfPairs = 0
let pairCounter = 0
let resultMessage = ''
let main = document.querySelector('.main')

class Time {
  constructor() {
    this.start = ''
    this.end =  ''
    this.diff =  ''
  }
  setStartTime() {
    this.start = new Date().getTime() / 1000
  }
  setEndTime() {
    this.end = new Date().getTime() / 1000
  }
  setDiffTime() {
    const timeDiff = this.end - this.start
    let hours = String(Math.floor(timeDiff / 60 / 60))
    if (hours.length < 2) hours = 0 + hours
    let minutes = String(Math.floor(timeDiff / 60))
    if (minutes.length < 2) minutes = 0 + minutes
    let seconds = String(Math.floor(timeDiff % 60))
    if (seconds.length < 2) seconds = 0 + seconds
    this.diff = `${hours}:${minutes}:${seconds}`
  }
  getDiffTime() {
    return this.diff
  }
}

const gameTime = new Time()

function getStartPageTemplate() {
  return `
    <div class="start-page">
      <div class="start-page__title">Select number of&nbsp;pairs</div>
      <div class="start-page__box">
        <nav class="start-page__nav">
          <ul class="start-page__ul">
            <li class="start-page__li"><a href="#" data-pair="6" class="start-page__link">6</a></li>
            <li class="start-page__li"><a href="#" data-pair="8" class="start-page__link">8</a></li>
            <li class="start-page__li"><a href="#" data-pair="10" class="start-page__link">10</a></li>
            <li class="start-page__li"><a href="#" data-pair="12" class="start-page__link">12</a></li>
            <li class="start-page__li"><a href="#" data-pair="15" class="start-page__link">15</a></li>
            <li class="start-page__li"><a href="#" data-pair="18" class="start-page__link">18</a></li>
            <li class="start-page__li"><a href="#" data-pair="21" class="start-page__link">21</a></li>
            <li class="start-page__li"><a href="#" data-pair="28" class="start-page__link">28</a></li>
          </ul>
        </nav>
      </div>
      <label class="start-page__label">
        <input type="checkbox" class="start-page__checkbox">
        <span class="start-page__preview">Preview</span>
      </label>
    </div>
  `
}

function getCardTemplate([url, id]) {
  return `
    <div class="game__card flip id-${id}" data-id="${id}">
      <div class="game__front">
        <img src="${url}" alt="" class="game__img">
      </div>
      <div class="game__back"></div>
    </div>
  `
}

function getResultPageTemplate(time, pairs) {
  return `
    <div class="result-page">
      <div class="result-page__message">Your result is<br>${time}<br>for ${pairs} pairs</div>
       ${resultMessage}
      <a href="#" class="result-page__link">Play again</a>
    </div>
  `
}

function getResultMessageTemplate(isBest) {
  return !isBest
    ? `<div class="result-page__message_success">It’s your own record</div>`
    : `<div class="result-page__message_warning">Your record is ${isBest}</div>`
}

function setTimeInLocaleStorage() {
  const bestTime = localStorage.getItem(`pairs-${numOfPairs}`) || null;
  if (!bestTime || bestTime && gameTime.getDiffTime().replace(/\D/g, '') < bestTime.replace(/\D/g, '')) {
    localStorage.setItem(`pairs-${numOfPairs}`, gameTime.getDiffTime())
    resultMessage = getResultMessageTemplate(false)
  }
  else {
    resultMessage = getResultMessageTemplate(bestTime)
  }
}

function fadeOutFadeIn(foo, num, preview) {
  const animation = main.animate([
    {opacity: 1},
    {opacity: 0}
  ], {
    duration: TIMER.time,
    easing: 'ease-out'
  })

  animation.addEventListener('finish', function() {
    foo(num, preview)
    main.animate([
      {opacity: 0},
      {opacity: 1}
    ], {
      duration: TIMER.time,
      easing: 'ease-in'
    })
  })
}

function showPreviewCards() {
  const cards = document.querySelectorAll('.game__card')

  setTimeout(() => {
    cards.forEach((card, i) => setTimeout(() => {
      card.classList.toggle('flip')
      card.classList.toggle('pointer')
    }, i * TIMER.step))
    cards.forEach((card, i) => setTimeout(() => {
      card.classList.toggle('flip')
      card.classList.toggle('pointer')
    }, TIMER.time * numOfPairs + i * TIMER.step))
  }, TIMER.time)
}

function flipCard(e) {
  const card = e.target.closest('.game__card')

  if (card) {
    const id = card.dataset.id

    if (pair.length === 0) {
      card.classList.toggle('flip')
      pair.push(card)
    }
    else if (pair.some(cardInPair => cardInPair === card)) {
      pair.forEach(cardInPair => {
        cardInPair.classList.toggle('flip')
      })
      pair.splice(0, 2)
    }
    else if (pair.length === 1 && pair[0].classList.contains(`id-${id}`)) {
      card.classList.toggle('flip')
      pair.splice(0, 2)
      pairCounter--
      setTimeout(() => {
        document.querySelectorAll(`.id-${id}`).forEach(cardDOMElement => {
          cardDOMElement.classList.add('hidden')
        })
        if (pairCounter === 0) {
          gameTime.setEndTime()
          gameTime.setDiffTime()
          setTimeInLocaleStorage()
          fadeOutFadeIn(initResultPage)
        }
      }, TIMER.time)
    }
    else if (pair.length === 1 && pair[0] !== id) {
      card.classList.toggle('flip')
      pair.push(card)
    }
    else {
      pair.forEach(cardDOMElement => {
        cardDOMElement.classList.toggle('flip')
      })
      card.classList.toggle('flip')
      pair.splice(0, 2)
      pair.push(card)
    }
  }
}

function renderCards(data, num, preview) {
  main.innerHTML =''

  const game = document.createElement('div')

  game.classList.add('game')
  game.classList.add(`num-${num * 2}`)

  let cardsData = data.sort(() => 0.5 - Math.random()).slice(0, num).map((card, i) => [card, i + 1])

  cardsData = [...cardsData, ...cardsData].sort(() => 0.5 - Math.random())

  game.innerHTML = cardsData.reduce((acc, card) => {
    acc += getCardTemplate(card)
    return acc
  }, '')

  game.addEventListener('click', flipCard)

  main.appendChild(game)

  if (preview) showPreviewCards()
}

function initStartPage() {
  main.innerHTML = getStartPageTemplate()

  const startPageUl = document.querySelector('.start-page__ul')

  startPageUl.addEventListener('click', function(e) {
    e.preventDefault()

    const link = e.target.closest('.start-page__link') || null
    const isPreview = document.querySelector('.start-page__checkbox').checked

    if (link) {
      const numberOfPairs = link.dataset.pair
      fadeOutFadeIn(initGame, numberOfPairs, isPreview)
    }
  })
}

function initGame(num, preview) {
  fetch(URL).then(response => response.json())
    .then(data => {
      gameTime.setStartTime()
      pairCounter = num
      numOfPairs = num
      renderCards(data, num, preview)
    })
    .catch(error => console.log(error))
}

function initResultPage() {
  main.innerHTML = getResultPageTemplate(gameTime.getDiffTime(), numOfPairs)

  const resultPageLink = document.querySelector('.result-page__link')

  resultPageLink.addEventListener('click', function(e) {
    e.preventDefault()
    fadeOutFadeIn(initStartPage)
  })
}

document.addEventListener("DOMContentLoaded", function() {
  main = document.querySelector('.main')
  initStartPage()
})
