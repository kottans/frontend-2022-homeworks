import clubs from './json.js';
import removeMenu from './mobile.js';

const appClub = document.getElementById('main');
const appUl = document.getElementById('menu');

const createCardClub = (clubs) =>{
    const {
        name,
        img,
        description
    } = clubs;

    const clubCards = document.createElement('div');
    clubCards.className = 'club';

    clubCards.insertAdjacentHTML('afterbegin', `
        <h2 class="club_title">${name}</h2>
        <div class="club_about">
            <div class="club_description">
                ${description}
            </div>
            <div class="club_img"><img src="${img}" alt="${name}"></div>
        </div>
    `);

    return clubCards;
};

const createUl = (clubs) =>{
    const { name } = clubs;
    const clubUl = document.createElement('li');

    clubUl.insertAdjacentHTML('afterbegin', `
        <a href="#" class="menu_el">${name}</a>
    `);

    return clubUl;
};

const listClub = document.querySelector('.menu');

listClub.addEventListener('click', (e) =>{
    const target = e.target;
    if (target.classList.contains('menu_el')){
        const clubName = target.textContent;
        removeMenu();
        appClub.textContent = '';
        const clubCards = clubs.filter(club => club.name === clubName).map(createCardClub);
        appClub.append(...clubCards);
    }
});

const renderItems = (clubs) =>{
    appClub.textContent = '';
    const clubCards = clubs.filter(club => club.name === "Milan").map(createCardClub);
    appClub.append(...clubCards);

    const clubLi = clubs.map(createUl);
    appUl.append(...clubLi);
};

renderItems(clubs);
