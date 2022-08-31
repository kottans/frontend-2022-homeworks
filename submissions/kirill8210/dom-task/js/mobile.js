const iconMenu = document.querySelector('.icon-menu');
const menu = document.querySelector('.nav');
const iconClose = document.querySelector('.icon-close');

const addMenu = () =>{
    menu.style.left = '0%';
};

const removeMenu = () =>{
    menu.style.left = '-100%';
};

iconMenu.addEventListener('click', addMenu);
iconClose.addEventListener('click', removeMenu);

export default removeMenu;