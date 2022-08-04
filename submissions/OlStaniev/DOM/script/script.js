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
        const content = generateText(episodeName.dataset.id)
        addContent(content,introText)
    }
})

function generateText(episodeId) {
    const currentEpisode = episodes.find((episodeNumber) => episodeId === episodeNumber.id)
    const storyText = `<div class="introText_wrapper"><h2>${currentEpisode.title}</h2><h3>${currentEpisode.subTitle}</h3>${currentEpisode.text}</div>`
    return storyText
}

const navList = episodes.reduce((list, episode) =>{
    return list +
    `<li class="listItem">
        <button class="nav__list_item" data-id="${episode.id}">
            <span class="listTitle">${episode.title}</span>
            <span class="listSubTitle">${episode.subTitle}</span>
        </button>
    </li>`
}, '')

function addContent(content, target){
    target.innerHTML = content
}
addContent(navList,menuList)
