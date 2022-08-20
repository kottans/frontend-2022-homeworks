const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list_hidden');
const contentBox = document.querySelector('.main__content');


const greetings = {
    imgUrl: 'img/Lorgar.jpg',
    text: '&emsp;Hello, my little heretic! <br><br> &ensp;I\'m here to introduce you to the fascinating world of chaos, pure chaos, where everyone can whoever ot whatever he wants. God Emperor failed us, he lied to us, but I WILL TELL YOU THE TRUTH! Sit down and make yourself comfortable. <br><br> &ensp;Where should I begin my story?'
};

const content = [
    {name: 'Tzeentch',
     imgUrl: 'img/Tzeentch.jpg',
     altName: 'Lord of Change',
     warCry: '"Do not ask which creature screams in the night. Do not question who waits for you in the shadow. It is my cry that wakes you in the night, and my body that crouches in the shadow. I am Tzeentch and you are the puppet that dances to my tune..."',
     descr: '&emsp;Tzeentch, also known as the "Changer of Ways," the "Lord of Change," "Lord of Sorcery," and the "Architect of Fate," among many other names and titles, is the Chaos God of change, evolution, mutation, intrigue, ambition, knowledge, sorcery, destiny, lies and trickery. <br><br>&emsp;Tzeentch is especially empowered by the desire for change and ambition for advancement among mortals. Tzeentch\'s true power is sorcery, and as all sorcery flows from the font of the Immaterium, so too is Tzeentch the master of that twisted, chaotic medium of psychic energy.',
     mainLegion: 'Main legion: Thousand sons'
    },
    {name: 'Nurgle',
     imgUrl: 'img/Nurgle.jpg',
     altName: 'Plague Lord',
     warCry: '"Buboes, phlegm, blood and guts! Boils, bogeys, rot and pus! Blisters, fevers, weeping sores! From your wounds the fester pours."',
     descr: '&emsp;Nurgle, also known as the "Plague Lord," "Grandfather Nurgle," or the "Plague God," among many other honourifics, is the Chaos God of disease, decay, despair, destruction, death and rebirth. In particular, the emotion of despair in mortals empowers the Plague God more than any other. <br><br>&emsp;Nurgle is the Chaos God most directly involved with the plight of mortals, particularly Humans who suffer so acutely from a fear of death, perhaps the oldest fear of that species, or any other. While Nurgle is the god of death and decay, it is also the god of rebirth. Decay is simply one part of the cycle of life, without which no new life could grow.',
     mainLegion: 'Main legion: Death Guard'
    },
    {name: 'Khorne',
     imgUrl: 'img/Khorne.jpg',
     altName: 'Lord of Skulls',
     warCry: '"Blood for the Blood God! Skulls for the Skull Throne!"',
     descr: '&emsp;Khorne, also called the "Blood God," the "Lord of Skulls," and "Kharneth" among many other titles, is the Chaos God of war, hatred, rage, wrath, blood, martial honour, strength and murder. Its portfolio of interest covers the most basic and brutal of sentient emotions and actions, such as hate, anger, rage, the desire for destruction and the joy of killing one\'s enemies.<br><br>&emsp; Every act of killing or murder in the material universe feeds and empowers Khorne; the more senseless and destructive, the better. However, though Khorne is the god of bloody slaughter, it is also the god of martial pride and honour, of those who set themselves against the most dangerous foes and earn victory against the odds.',
     mainLegion: 'Main legion: Khorne berzerkers'
    },
    {name: 'Slaanesh',
     imgUrl: 'img/Slaanesh.jpg',
     altName: 'Lord of Excess',
     warCry: '"Embrace your hunger, your lust, your desire. The universe is ours for the taking!"',
     descr: '&emsp;Slaanesh, also known as the "Dark Prince," the "Prince of Pleasure," the "Lord of Excess," the "Perfect Prince," and "Prince of Chaos" in the Imperium of Man and "She Who Thirsts" among the Aeldari, is the Chaos God of pleasure, hedonism, excess and decadence. Lust, pride and self-indulgence are the hallmarks of all who follow it. <br><br>&emsp; Slaanesh is the Lord of Pleasure, the Dark God dedicated to the pursuit of earthly gratification and the overthrow of all decent behaviour, as well as hedonism and pleasure for its own sake. It is the god of obsession, the Master of Excess in All Things, from gluttony to lust to megalomania. Its sacred number is six and the colours associated with Slaanesh are riotous purples, pinks and black. The daemonic armies of Slaanesh are known as the Legions of Excess.',
     mainLegion: 'Main legion: Emperors children'
    }
];


function makeFirstPage() {

    const container = document.createElement('div');
    container.classList.add('first__page');

    const firstImg = document.createElement('img');
    firstImg.setAttribute('srcset', greetings.imgUrl);
    firstImg.classList.add('content__image');

    const text = document.createElement('p');
    text.classList.add('description');
    text.innerHTML = greetings.text;

    container.append(firstImg);
    container.append(text);
    contentBox.innerHTML = '';
    contentBox.append(container);
}

makeFirstPage();


function makeMenu(content) {
    for (let i = 0; i < content.length; i++) {
        const item = document.createElement('li');
        const menuLink = document.createElement('a');
        item.classList.add('menu__item');
        menuLink.setAttribute('id', `${i}`)
        menuLink.setAttribute('href', '#');
        menuLink.classList.add('menu__link');
        menuLink.textContent = content[i].name;
        item.append(menuLink)
        menuList.append(item)
    }
}

makeMenu(content);


burger.addEventListener('click', menuHandler )
const menuClasses = menuList.classList;  

function menuHandler(e) {

    function openMenu() {
        menuClasses.remove('menu__list_hidden');
    }

    function closeMenu() {
        menuClasses.add('menu__list_hidden');
    }

    function closeMenuByTap(e) {
        if (!e.target.classList.contains('menu__item')) {
            menuClasses.add('menu__list_hidden');
        } 
    }
    
    if (menuClasses.contains('menu__list_hidden')) {
        openMenu();
        contentBox.addEventListener('click', closeMenuByTap )
    } else {
        closeMenu();
        contentBox.removeEventListener('click', closeMenuByTap)
    }
}


const menuItems = document.querySelectorAll('.menu__item');

for (let i = 0; i < content.length; i++) {
    menuItems[i].addEventListener('click', makeContent)
}

function makeContent(e) {
    try{
    menuHandler();
    contentBox.innerHTML = '';
    const id = e.target.id;

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content__container');

    const image = document.createElement('img');
    image.classList.add('content__image');
    image.setAttribute('srcset', content[id].imgUrl);

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('content__text__wrapper');
    
    const name = document.createElement('h2');
    name.classList.add('content__title');
    name.innerHTML = content[id].name;

    const subTitle = document.createElement('h3');
    subTitle.classList.add('content__subtitle');
    subTitle.innerHTML = content[id].altName;

    const warcry = document.createElement('h4');
    warcry.classList.add('content__warcry');
    warcry.innerHTML = content[id].warCry;

    const description = document.createElement('p');
    description.classList.add('content__description');
    description.innerHTML = content[id].descr;

    const mainLegion = document.createElement('h5');
    mainLegion.classList.add('content__main__legion');
    mainLegion.innerHTML = content[id].mainLegion;

    textWrapper.append(name, subTitle, warcry, description, mainLegion)
    contentContainer.append(image, textWrapper);
    contentBox.append(contentContainer);
    } catch (err) {
        console.log(err)
    } 
}


