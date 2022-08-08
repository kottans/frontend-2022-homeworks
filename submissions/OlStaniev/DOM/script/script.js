import episodes from './text-episode.js';

const menuList = document.querySelector('.nav__list');
const introText = document.querySelector('.introText');
const burgerBtn = document.querySelector('.header__burgerMenu');

document.addEventListener('click', (event) => {
    const episodeName = event.target.closest('.nav__list_item')
    if (episodeName) {
        const content = generateText(episodeName.dataset.id)
        addContent(content, introText)
    }
    burgerMenuOpen(event)
});

function burgerMenuOpen(event) {
    if (event.target.closest('.header__burgerMenu')) {
        menuList.classList.toggle('nav__listOpen')
        burgerBtn.classList.toggle('burgerCross')
    }
    if (!event.target.closest('.header__burgerMenu')) {
        menuList.classList.remove('nav__listOpen')
        burgerBtn.classList.remove('burgerCross')
    }
};

function generateText(episodeId) {
    const currentEpisode = episodes.find(({ id }) => episodeId === id)
    const storyText = `<div class="introText_wrapper"><h2>${currentEpisode.title}</h2>
                        <h3>${currentEpisode.subTitle}</h3>
                        <p>${currentEpisode.p1}</p>
                        <p>${currentEpisode.p2}</p>
                        <p>${currentEpisode.p3}</p></div>`
    return storyText
};

const navList = episodes.reduce((list, { id, title, subTitle }) => {
    return list +
        `<li class="listItem">
        <button class="nav__list_item" data-id="${id}">
            <span class="listTitle">${title}</span>
            <span class="listSubTitle">${subTitle}</span>
        </button>
    </li>`
}, '');

function addContent(content, target) {
    target.innerHTML = content
};
addContent(navList, menuList);
