let menu = document.querySelector('.burger-menu');
let button = document.querySelector('.burger-menu__button');
let links = document.querySelectorAll('.burger-menu__link');
let overlay = document.querySelector('.burger-menu__overlay')

button.addEventListener('click', func1);
overlay.addEventListener('click', func1);
for (let link of links) {
    link.addEventListener('click', func1);
}

function func1() {
    menu.classList.toggle('burger-menu_active');

    if (menu.classList.contains('burger-menu_active')) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "visible";
    }
}
