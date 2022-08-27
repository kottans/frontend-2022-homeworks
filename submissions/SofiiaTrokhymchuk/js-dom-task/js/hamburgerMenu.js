const navList = document.querySelector(".nav-list");
const hamburgerMenu = document.querySelector(".hamburger-menu");

const toggleOpenedClass = () => {
    hamburgerMenu.classList.toggle("opened");
    navList.classList.toggle("opened");
}

export function appendOpenHambMenuHandler() {
    hamburgerMenu.addEventListener("click", toggleOpenedClass); 
}

export function appendCloseHambMenuHandler(){
    navList.addEventListener("click", toggleOpenedClass);
}
