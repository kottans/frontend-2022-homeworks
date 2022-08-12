import episodes from './text-episode.js';

const bodyWrap = document.querySelector('body');
const menuList = document.querySelector('.nav__list');
const introText = document.querySelector('.introText');
const burgerBtn = document.querySelector('.header__burgerMenu');

const style = {
    activeMenu: 'nav__listOpen',
    changeBurgerIcon: 'burgerCross',
    burgerBtn: '.header__burgerMenu',
};

function burgerMenuOpen(event) {
    if (event.target.closest(style.burgerBtn)) {
        menuList.classList.toggle(style.activeMenu);
        burgerBtn.classList.toggle(style.changeBurgerIcon);
    } else {
        menuList.classList.remove(style.activeMenu);
        burgerBtn.classList.remove(style.changeBurgerIcon);
    }
}

function generateText(episodeId) {
    const { title, subTitle, text } = episodes.find(({ id }) => episodeId === id);
    const storyText = `<div class="introText_wrapper">
                        <h2>${title}</h2>
                        <h3>${subTitle}</h3>
                        ${text.reduce((a, b) => `<p>${a}</p><p>${b}</p>`)}
                        </div>`;
    return storyText;
};

const navList = episodes.reduce((list, { id, title, subTitle }) => {
    return list +
        `<li class="listItem">
        <button class="nav__list_item" data-id="${id}">
            <span class="listTitle">${title}</span>
            <span class="listSubTitle">${subTitle}</span>
        </button>
    </li>`}, '');

function addContent(content, target) {
    target.innerHTML = content;
};

function start() {
    bodyWrap.addEventListener('click', (event) => {
        const episodeName = event.target.closest('.nav__list_item');
        if (episodeName) {
            const content = generateText(episodeName.dataset.id);
            addContent(content, introText);
        };
        burgerMenuOpen(event);
    })
    addContent(navList, menuList);
}

document.addEventListener('DOMContentLoaded', start);
