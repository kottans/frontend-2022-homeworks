import { deleteInitialPage } from "./initialPage.js";
const navList = document.querySelector(".nav-list");
const hamburgerMenu = document.querySelector(".hamburger-menu");

export function appendOpenHambMenuHandler() {
    hamburgerMenu.addEventListener("click", (event) => {
        hamburgerMenu.classList.toggle("opened");
        navList.classList.toggle("opened");
    }); 
}

export function appendCloseHambMenuHandler(){
    navList.addEventListener("click", (event) => {
        if(event.target.tagName === "LI"){
            deleteInitialPage();
            hamburgerMenu.classList.remove("opened");
            navList.classList.remove("opened");
        }        
    });
}
