const navigation = document.querySelector('.nav');
const burgerButton = document.querySelector('.burger');
const mainContent = document.querySelector('.first-content');
const menuItems = document.querySelectorAll('.nav-item');
const navList = document.querySelector('.nav-list');

const monsters = {
    'Howard Phillips Lovecraft': {
        img: './img/hpl1.jpg',
        text: 'Any talk of horror history somehow inevitably turns to Howard Phillips Lovecraft, the failed writer who, after his death, suddenly found greatness that he could not even imagine in his lifetime.Only then did readers (and other writers) suddenly realize what a fundamental invention the pale guy from Providence had introduced into culture. He was not the first to guess that the worst thing is the misunderstood and inaccessible to understanding, devoid of our logic. But it was in his hands that this rule received its clearest confirmation.',
        class: 'content-img',
        width: '810px',
        height: '1145px'
    },
    'Azathoth': {
        img: './img/azathoth.png',
        imgSet: './img/azathoth.png 1025w, ./img/azathoth1024.png 1024w, ./img/azathoth540.png 540w',
        text: 'Azathoth is the supreme among the Other Gods, the "formless sultan of demons" who swirls in the very center of infinity. This is the blind and insane ruler of all things, forever surrounded by the maddening howl of flutes and the roar of drums.',
        class: 'azathoth',
        width: '1102px',
        height: '725px'
    },
    'Yog-Sothoth': {
        img: './img/yog-sothoth.png',
        imgSet: './img/yog-sothoth.png 1025w, ./img/yog-sothoth1024.png 1024w, ./img/yog-sothoth540.png 540w',
        text: 'Yog-Sothoth the All-Containing, for example, is a hodgepodge of thousands of star-like spheres (or eyes?), hanging outside the universe and commanding time.',
        class: 'yog-sothoth',
        width: '705px',
        height: '851px'
    }, 
    'Shub-Niggurath': {
        img: './img/shub-niggurath.png',
        imgSet: './img/shub-niggurath.png 1025w, ./img/shub-niggurath1024.png 1024w, ./img/shub-niggurath540.png 540w',
        text: 'Shub-Niggurath, which can be attributed with some success to the female gender, is considered a symbol of perverted fertility, therefore this slimy flying mass with limbs sticking out in all directions, including goat limbs, rarely appears without its brood.',
        class: 'shub-niggurath',
        width: '1574px',
        height: '1737px'
    },
    'Nyarlathotep': {
        img: './img/nyarlathotep.png',
        imgSet: './img/nyarlathotep.png 1025w, ./img/nyarlathotep1024.png 1024w, ./img/nyarlathotep540.png 540w',
        text: 'Nyarlathotep is one of the few beings who is not in cosmic exile or a sleep like death. Moreover, this is perhaps the only deity capable of understanding people, communicating with them in their language and taking on a human form. His true appearance is perfectly described by Nyarlathotep\'s middle name - Creeping Chaos. That is, it is not described in any way.',
        class: 'nyarlathotep',
        width: '923px',
        height: '1404px'
    },
    'Cthulhu': {
        img: './img/Cthulhu.png',
        imgSet: './img/Cthulhu.png 1025w, ./img/Cthulhu1024.png 1024w, ./img/Cthulhu540.png 540w',
        text: 'Cthulhu is a giant with the head of an octopus. From his underwater R\'Lyeh, he involuntarily emits radiation, muffled by the titanic water column. As R\'lyeh rises from the bottom, this influence intensifies, and waves of tantrums, suicides, and blood orgies spread across the Earth. When Cthulhu finally throws off the shackles of sleep, like death, humanity will probably complete its journey and perish.',
        class: 'cthulhu',
        width: '2219px',
        height: '1387px'
    }
};

function navigationHandler(e) {
    if (!e.target.classList.contains('nav-list')) {
        navigation.classList.remove('nav-shown');
        createContent(e.target.textContent);
    }
}

function burgerHandler() {
    navigation.classList.add('nav-shown');
}

function createNavigation() {
    for (item in monsters) {
        let navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        navItem.textContent = item;
        navList.append(navItem);
    }
}

function createContent(monster) {
    mainContent.innerHTML = '';
    const img = document.createElement('img');
    img.classList.add(monsters[monster].class);
    img.setAttribute('src', monsters[monster].img);
    if (monsters[monster].imgSet) {
        img.setAttribute('srcset', monsters[monster].imgSet);
    } 
    img.setAttribute('width', monsters[monster].width);
    img.setAttribute('height', monsters[monster].height);
    mainContent.append(img);
    const title = document.createElement('h1');
    title.classList.add('content-title');
    title.textContent = monster;
    mainContent.append(title);
    const text = document.createElement('p');
    text.classList.add('content-text');
    text.textContent = monsters[monster].text;
    mainContent.append(text);
}

function main() {
    createNavigation();
    createContent('Howard Phillips Lovecraft');
    navigation.addEventListener('click', navigationHandler);
    burgerButton.addEventListener('click', burgerHandler);
}

main();




