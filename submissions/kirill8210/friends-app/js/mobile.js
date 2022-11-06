const iconMenu = document.querySelector('.icon-menu');
const menu = document.querySelector('.function_menu');
const iconClose = document.querySelector('.icon-close');

const addMenu = () =>{
    menu.classList.add('active_menu')
};

const removeMenu = () =>{
    menu.classList.remove('active_menu')
};

iconMenu.addEventListener('click', addMenu);
iconClose.addEventListener('click', removeMenu);

export default removeMenu;
