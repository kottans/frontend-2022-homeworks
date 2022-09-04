const characters = [
    {
        "id": 1,
        "name": "Rick Sanchez",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
        "id": 2,
        "name": "Morty Smith",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
    {
        "id": 3,
        "name": "Summer Smith",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    },
    {
        "id": 4,
        "name": "Beth Smith",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    },
    {
        "id": 5,
        "name": "Jerry Smith",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
    },
    {
        "id": 6,
        "name": "Abadango Cluster Princess",
        "type": "",
        "location": "Abadango",

        "image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    },
    {
        "id": 7,
        "name": "Abradolf Lincler",
        "type": "Genetic experiment",
        "location": "Testicle Monster Dimension",

        "image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
    },
    {
        "id": 8,
        "name": "Adjudicator Rick",
        "type": "",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/8.jpeg",
    },
    {
        "id": 9,
        "name": "Agency Director",
        "type": "",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/9.jpeg",
    },
    {
        "id": 10,
        "name": "Alan Rails",
        "type": "Superhuman (Ghost trains summoner)",
        "location": "Worldender's lair",
        "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    },
    {
        "id": 11,
        "name": "Albert Einstein",
        "type": "",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/11.jpeg",
    },
    {
        "id": 12,
        "name": "Alexander",
        "location": "Anatomy Park",

        "image": "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
    },
    {
        "id": 13,
        "name": "Alien Googah",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
    },
    {
        "id": 14,
        "name": "Alien Morty",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
    },
    {
        "id": 15,
        "name": "Alien Rick",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
    },
    {
        "id": 16,
        "name": "Amish Cyborg",
        "location": "Earth (Replacement Dimension)",
        "image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
    },
    {
        "id": 17,
        "name": "Annie",
        "location": "Anatomy Park",
        "image": "https://rickandmortyapi.com/api/character/avatar/17.jpeg",
    },
    {
        "id": 18,
        "name": "Antenna Morty",
        "location": "Citadel of Ricks",
        "image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
    },
    {
        "id": 19,
        "name": "Antenna Rick",
        "location": "unknown",
        "image": "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
    },
];

//On page loaded
const loadSideMenu = () => {
    const sideMenuList = document.querySelector('.side-menu__list');

    const sideMenuListItems = characters.map((character) => {
        const sideMenuItem = document.createElement('li');
        sideMenuItem.className = 'side-menu__item';
        sideMenuItem.innerHTML = `<a id="${ character.id }">${ character.name }</a>`;

        return sideMenuItem;
    });

    sideMenuList.append(...sideMenuListItems);

    sideMenuList.addEventListener('click', menuLinkOnClick);
};

const characterList = Array.from(document.querySelectorAll('.character'));
const menuList = document.querySelector('.side-menu__list');
const sideMenuItems = Array.from(document.querySelectorAll('.side-menu__item'));

const hideActiveLink = () => sideMenuItems.forEach(link => link.classList.remove('active'));

const toggleMenuItem = (selectItem) => {
    characterList.forEach(item => {
        if(item.dataset.id === selectItem.id) {
            item.classList.remove('character_hide');
        } else {
            item.classList.add('character_hide');
        }
    });
}

function menuLinkOnClick({ target }) {
    const { id } = target;

    if (id) {
        hideActiveLink();
        target.parentElement.classList.add('active');
        toggleMenuItem(target);
    }
}

menuList.addEventListener('click', menuLinkOnClick);

const loadMainContent = () => {
    const characterBlocks = characters.map((character) => {
        const characterBlock = document.createElement('div');
        characterBlock.className = 'character character_hide';

        characterBlock.innerHTML =
            `<div class="character__image">
                <img src="${ character.image }" alt="">
             </div>
             <h2 class="character__name">${ character.name }</h2>
             <span class="character__location">${ character.location }</span>`;

        return characterBlock;
    });

    document.querySelector('main').append(...characterBlocks);

    document.querySelector('.character').classList.remove('character_hide');
};

window.addEventListener('DOMContentLoaded', () => {
    loadSideMenu();
    loadMainContent();
});
