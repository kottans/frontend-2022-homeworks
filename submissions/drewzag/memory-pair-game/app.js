const section = document.querySelector('section')

const getData = () => [
  { imgSrc: './images/ari.webp', id: 'arisona' },
  { imgSrc: './images/cle.webp', id: 'clevlend' },
  { imgSrc: './images/lv.webp', id: 'las-vegas' },
  { imgSrc: './images/mia.webp', id: 'miami' },
  { imgSrc: './images/sea.webp', id: 'seattle' },
  { imgSrc: './images/tb.webp', id: 'tampa-bay' },
]

const randomize = () => {
  const cardData = getData().concat(getData())
  cardData.sort(() => Math.random() - 0.5)
  return cardData
}

const cardGenerator = () => {
  const cardData = randomize()

  cardData.forEach((item) => {
    const card = document.createElement('div')
    const face = document.createElement('img')
    const back = document.createElement('div')
    card.classList = 'card'
    card.setAttribute('name', item.id)
    face.classList = 'face'
    back.classList = 'back'

    face.src = item.imgSrc

    section.appendChild(card)
    card.appendChild(face)
    card.appendChild(back)

    card.addEventListener('click', (e) => {
      card.classList.toggle('toggle')
      checkCards(e)
    })
  })
}

const checkCards = (e) => {
  const clickedCards = e.target
  clickedCards.classList.toggle('flipped')
  const flippedCards = document.querySelectorAll('.flipped')
  const cards = document.querySelectorAll('.card')
  const toggeledCards = document.querySelectorAll('.toggle')

  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name'))
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        card.style.pointerEvents = 'none'
      })
    else {
      console.log('wrong')
      flippedCards.forEach((card) => {
        card.classList.remove('flipped')
        setTimeout(() => card.classList.remove('toggle'), 1000)
      })
    }
  }

  if (cards.length === toggeledCards.length) {
    setTimeout(() => restart(), 1000)
  }
}

const restart = () => {
  const cardData = randomize()
  const faces = document.querySelectorAll('.face')
  const cards = document.querySelectorAll('.card')
  section.style.pointerEvents = 'none'

  cardData.forEach((card, index) => {
    cards[index].classList.remove('toggle')
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all'
      faces[index].src = card.imgSrc
      cards[index].setAttribute('name', card.id)
      section.style.pointerEvents = 'all'
    }, 1000)
  })
  setTimeout(() => alert('Well Done!'), 100)
}

cardGenerator()
