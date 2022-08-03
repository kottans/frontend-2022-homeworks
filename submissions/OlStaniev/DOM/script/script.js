import episodes from './text-episode.js';

const menuList = document.querySelector('.nav__list');
const introText = document.querySelector('.introText')
const burgerIcon = document.querySelector('.header__burgerMenu')

document.addEventListener('click', burgerMenuOpen)

function burgerMenuOpen(event) {
    if (event.target.closest('.header__burgerMenu')) {
        menuList.classList.toggle('nav__listOpen')
        burgerIcon.classList.toggle('burgerCross')
    }
    if (!event.target.closest('.header__burgerMenu')) {
        menuList.classList.remove('nav__listOpen')
        burgerIcon.classList.remove('burgerCross')
    }
}

menuList.addEventListener('click', (event) => {
    const episodeName = event.target.closest('.nav__list_item')
    if (episodeName) {
        changeText(episodeName.dataset.id)
    }
})

function changeText(episodeId) {
    const currentEpisode = episodes.find((episodeNumber) => episodeId === episodeNumber.id)
    const storyText = `<div class="introText_wrapper">${currentEpisode.title + currentEpisode.subTitle + currentEpisode.text}</div>`
    introText.innerHTML = storyText
}

for (let i = 0; i < episodes.length; i++) {
    const navListItem = 
    `<li class="listItem">
        <button class="nav__list_item" data-id="${episodes[i].id}">
            <span class="listTitle">${episodes[i].title}</span>
            <span class="listSubTitle">${episodes[i].subTitle}</span>
        </button>
    </li>`
    menuList.insertAdjacentHTML('beforeend',navListItem)
}
