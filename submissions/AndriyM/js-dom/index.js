import cards from "./data.js"

const rootElement = document.querySelector(".content")
const sideBarContainer = document.querySelector(".sidebar__list")
const links = document.querySelectorAll(".sidebar__link")

function createCardsMarcup(cards) {
    return cards
        .map(
            ({ id, url, title }) =>
                `<div class="card__item" id="${id}">
                    <img src="${url}" class="card__img" alt=""/>
                    <p class="card__title">${title}</p>
                </div>`
        )
        .join("")
}

const cardsMarcup = createCardsMarcup(cards)
rootElement.innerHTML = cardsMarcup
const cardRefs = document.querySelectorAll(".card__item")

sideBarContainer.addEventListener("click", onsideBarElementClick)

function onsideBarElementClick({ target }) {
    links.forEach((link) => link.classList.remove("active"))
    target.classList.add("active")
    let currentActivetLink = target.dataset.id

    cardRefs.forEach((card) => {
        if (card.classList.contains("visible")) {
            card.classList.remove("visible")
        }
        if (card.id === currentActivetLink) {
            card.classList.add("visible")
        }
    })
}
