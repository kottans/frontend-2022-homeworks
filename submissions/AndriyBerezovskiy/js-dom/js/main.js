import data from './data.js';

//---------------------- header ---------------------------------
const header = document.querySelector('.header');

const header__title = document.createElement('h1');
header__title.classList.add('header__title');
header__title.innerText = 'Celebrities';

const header__btn = document.createElement('div');
header__btn.classList.add('header__btn');

const header__btnBurger = document.createElement('div');
header__btnBurger.classList.add('header__btn--burger');

header.append(header__title, header__btn);
header__btn.append(header__btnBurger);

//---------------------- main ------------------------------------
const main = document.querySelector('.main');

const menu = document.createElement('aside');
menu.classList.add('menu');

const menu__title = document.createElement('h2');
menu__title.classList.add('menu__title');
menu__title.innerText = 'TOP 10:';

const menu__list = document.createElement('ul');
menu__list.classList.add('menu__list');

for (const dataElement of data) {
    const menu__item = document.createElement('li');
    menu__item.classList.add('menu__item');

    const menu__link = document.createElement('a');
    menu__link.classList.add('menu__link');
    menu__link.href = '#';
    menu__link.innerHTML = `${dataElement.name}`;

    menu__list.appendChild(menu__item);
    menu__item.appendChild(menu__link);
}

main.append(menu);
menu.append(menu__title, menu__list);

//---------------------- burgerMenu ------------------------------
let burgerOpen = false;

header__btn.addEventListener('click', () => {
    if (!burgerOpen) {
        header__btn.classList.add('open');
        menu.classList.add('isActive');
        burgerOpen = true;
    } else {
        header__btn.classList.remove('open');
        menu.classList.remove('isActive');
        burgerOpen = false;
    }
});

//---------------------- footer ------------------------------
const footer = document.querySelector('.footer');

const footer__text = document.createElement('p');
footer__text.classList.add('footer__text');
footer__text.innerText = '2022';

footer.appendChild(footer__text);

//---------------------- details ------------------------------
const menuLink = document.querySelectorAll('.menu__link');

const content = document.createElement('div');
content.classList.add('content');
main.appendChild(content);

const card = document.createElement('div');
card.classList.add('card__content', 'card');
content.appendChild(card);

const more = document.createElement('div');
more.classList.add('more');
card.appendChild(more);

const moreIcon = document.createElement('i');
moreIcon.classList.add('fa', 'fa-light', 'fa-turn-down');

const card__inner = document.createElement('div');
card__inner.classList.add('card__inner');
card.appendChild(card__inner);

const card__face_front = document.createElement('div');
card__face_front.classList.add('card__face', 'card__face--front');
card__inner.appendChild(card__face_front);

const card__border = document.createElement('div');
card__border.classList.add('card__border');
card__face_front.appendChild(card__border);

const card__face_back = document.createElement('div');
card__face_back.classList.add('card__face', 'card__face--back');
card__inner.appendChild(card__face_back);

const card__description = document.createElement('div');
card__description.classList.add('card__description');
content.appendChild(card__description);

const card__name = document.createElement('h2');
card__name.classList.add('card__name');
card__border.appendChild(card__name);

const card__icons = document.createElement('div');
card__icons.classList.add('card__icons');
card__border.appendChild(card__icons);

const instagram = document.createElement('i');
instagram.classList.add('fa', 'fa-brands', 'fa-instagram');
card__icons.appendChild(instagram);

const instagram__link = document.createElement('a');
instagram__link.classList.add('instagram__link');
instagram.appendChild(instagram__link);

const twitter = document.createElement('i');
twitter.classList.add('fa', 'fa-brands', 'fa-twitter');
card__icons.appendChild(twitter);

const twitter__link = document.createElement('a');
twitter__link.classList.add('twitter__link');
twitter.appendChild(twitter__link);

const card__header = document.createElement('div');
card__header.classList.add('card__header');
card__face_back.appendChild(card__header);

const card__body = document.createElement('div');
card__body.classList.add('card__body');
card__face_back.appendChild(card__body);

const card__header_title = document.createElement('h2');
card__header_title.classList.add('card__header--title');
card__header_title.innerText = 'more details:';
card__header.appendChild(card__header_title);

const fullName = document.createElement('p');
card__body.appendChild(fullName);

const birthday = document.createElement('p');
card__body.appendChild(birthday);

const birthPlace = document.createElement('p');
card__body.appendChild(birthPlace);

const profession = document.createElement('p');
card__body.appendChild(profession);

const career = document.createElement('p');
card__body.appendChild(career);

for (const menuLinkElement of menuLink) {
    menuLinkElement.addEventListener('click', (e) => {
        for (const dataElement of data) {
            if (e.target.innerText === dataElement.name && burgerOpen) {
                menu.classList.remove('isActive');
                header__btn.classList.remove('open');
                burgerOpen = false;

                more.innerText = 'click';
                more.appendChild(moreIcon);

                card__name.innerHTML = `${dataElement.name}`;
                card__inner.style.background = `url(${dataElement.image})`;
                card__inner.style.backgroundSize = `303px`;
                card__inner.style.backgroundPosition = 'center center';
                card__inner.style.backgroundRepeat = 'no-repeat';
                card__inner.style.boxShadow = `0 70px 63px -60px #000`;
                card__inner.style.opacity = '1';

                instagram__link.href = `${dataElement.instagram}`;
                twitter__link.href = `${dataElement.twitter}`;

                card__description.innerHTML = `${dataElement.name} - ${dataElement.description}`;

                fullName.innerHTML = `<strong>FULL NAME:</strong> ${dataElement.fullName}`;
                birthday.innerHTML = `<strong>BIRSDAY:</strong> ${dataElement.birthday}`;
                birthPlace.innerHTML = `<strong>BIRTH PLASE:</strong> ${dataElement.birthPlace}`;
                profession.innerHTML = `<strong>PROFESSION:</strong> ${dataElement.profession}`;
                career.innerHTML = `<strong>CAREER:</strong> ${dataElement.career}`;
            }
        }
    })
}

card__inner.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'I' && e.target.className !== 'card__icons') {
        card__inner.classList.toggle('is-flipped');
    }
})
