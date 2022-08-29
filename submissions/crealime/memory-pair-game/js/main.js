const URL = 'json/images.json' // Json file with images urls
const TIMER = { // Timer values
  time: 600,
  step: 50
}
const GAME_TIME = { // Time to calculate results
  start: '',
  end: '',
  diff: '',
  setStartTime() {
    this.start = new Date().getTime() / 1000
  },
  setEndTime() {
    this.end = new Date().getTime() / 1000
  },
  setDiffTime() {
    const timeDiff = this.end - this.start
    let hours = String(Math.floor(timeDiff / 60 / 60))
    if (hours.length < 2) hours = 0 + hours
    let minutes = String(Math.floor(timeDiff / 60))
    if (minutes.length < 2) minutes = 0 + minutes
    let seconds = String(Math.floor(timeDiff % 60))
    if (seconds.length < 2) seconds = 0 + seconds
    this.diff = `${hours}:${minutes}:${seconds}`
  },
  getDiffTime() {
    return this.diff
  }
}
const pair = [] // Current pair of cards
let numOfPairs = 0 // Number of cards in this game
let pairCounter = 0 // Card remaining counter
let resultMessage = '' // Result message based on past attempts
let main = document.querySelector('.main')

// Start page template
function startPageTemplate() {
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

// Card template
function cardTemplate([url, id]) {
  return `
    <div class="game__card flip id-${id}" data-id="${id}">
      <div class="game__front">
        <img src="${url}" alt="" class="game__img">
      </div>
      <div class="game__back"></div>
    </div>
  `
}

// Result page template
function resultPageTemplate(time, pairs) {
  return `
    <div class="result-page">
      <div class="result-page__message">Your result is<br>${time}<br>for ${pairs} pairs</div>
       ${resultMessage}
      <a href="#" class="result-page__link">Play again</a>
    </div>
  `
}

// Result message template
function resultMessageTemplate(isBest) {
  return !isBest
    ? `<div class="result-page__message_success">It’s your own record</div>`
    : `<div class="result-page__message_warning">Your record is ${isBest}</div>`
}

// Setting the game result data in LocaleStorage
function setTimeInLocaleStorage() {
  const bestTime = localStorage.getItem(`pairs-${numOfPairs}`) || null;
  if (!bestTime || bestTime && GAME_TIME.getDiffTime().replace(/\D/g, '') < bestTime.replace(/\D/g, '')) {
    localStorage.setItem(`pairs-${numOfPairs}`, GAME_TIME.getDiffTime())
    resultMessage = resultMessageTemplate(false)
  }
  else {
    resultMessage = resultMessageTemplate(bestTime)
  }
}

// Page transition animation
function fadeOutFadeIn(foo, num, preview) {
  const animation = main.animate([
    {opacity: 1},
    {opacity: 0}
  ], {
    duration: TIMER.time,
    easing: 'ease-out'
  })

  animation.addEventListener('finish', function() {
    foo(num, preview) // Render next page
    main.animate([
      {opacity: 0},
      {opacity: 1}
    ], {
      duration: TIMER.time,
      easing: 'ease-in'
    })
  })
}

// Card preview when game start
function previewCards() {
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

// Handling a click on the card depending on the conditions
function flipCard(e) {
  const card = e.target.closest('.game__card')

  if (card) {
    const id = card.dataset.id

    if (pair.length === 0) { // If no cards are open
      card.classList.toggle('flip')
      pair.push(card)
    }
    else if (pair.some(el => el === card)) { // If click on an open card
      pair.forEach(el => {
        el.classList.toggle('flip')
      })
      pair.splice(0, 2)
    }
    else if (pair.length === 1 && pair[0].classList.contains(`id-${id}`)) { // If the cards match
      card.classList.toggle('flip')
      pair.splice(0, 2)
      pairCounter--
      setTimeout(() => {
        document.querySelectorAll(`.id-${id}`).forEach(el => {
          el.classList.add('hidden')
        })
        if (pairCounter === 0) { // If these were the last cards
          GAME_TIME.setEndTime()
          GAME_TIME.setDiffTime()
          setTimeInLocaleStorage()
          fadeOutFadeIn(initResultPage)
        }
      }, TIMER.time)
    }
    else if (pair.length === 1 && pair[0] !== id) { // If the cards don't match
      card.classList.toggle('flip')
      pair.push(card)
    }
    else { // Click with two open cards
      pair.forEach(el => {
        el.classList.toggle('flip')
      })
      card.classList.toggle('flip')
      pair.splice(0, 2)
      pair.push(card)
    }
  }
}

// Render cards
function renderCards(data, num, preview) {
  main.innerHTML =''

  const game = document.createElement('div')

  game.classList.add('game')
  game.classList.add(`num-${num * 2}`)

  // Pre-random all cards, reduction their number to the number of pairs and create separate arrays with card number
  let cardsData = data.sort(() => 0.5 - Math.random()).slice(0, num).reduce((acc, el, i) => {
    acc.push([el, i + 1])
    return acc
  }, [])

  // Create array of pairs and randomize them
  cardsData = [...cardsData, ...cardsData].sort(() => 0.5 - Math.random())

  // Add cards to the game element
  cardsData.forEach(el => {
    const card = cardTemplate(el)
    game.insertAdjacentHTML('beforeend', card)
  })

  game.addEventListener('click', flipCard)

  main.appendChild(game)

  // Show preview if checked
  if (preview) previewCards()
}

// Show start page
function initStartPage() {
  main.innerHTML = ''

  main.insertAdjacentHTML('afterbegin', startPageTemplate())

  const startPageUl = document.querySelector('.start-page__ul')

  startPageUl.addEventListener('click', function(e) {
    e.preventDefault()

    const link = e.target.closest('.start-page__link') || null
    const isPreview = document.querySelector('.start-page__checkbox').checked

    if (link) {
      const numberOfPairs = link.dataset.pair
      fadeOutFadeIn(initGame, numberOfPairs, isPreview) // Show game page with animation
    }
  })
}

// Show game page
function initGame(num, preview) {

  // Get data from json
  async function getImagesData(url) {
    return await fetch(url).then(response => response.json())
  }

  getImagesData(URL)
    .then(data => {
      GAME_TIME.setStartTime()
      pairCounter = num
      numOfPairs = num
      renderCards(data, num, preview)
    })
    .catch(error => console.log(error))
}

// Show result page
function initResultPage() {
  main.innerHTML = ''

  main.insertAdjacentHTML('afterbegin', resultPageTemplate(GAME_TIME.getDiffTime(), numOfPairs))

  const resultPageLink = document.querySelector('.result-page__link')

  resultPageLink.addEventListener('click', function(e) {
    e.preventDefault()
    fadeOutFadeIn(initStartPage) // Show start page with animation
  })
}

// Show start page on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  main = document.querySelector('.main')
  initStartPage()
})
