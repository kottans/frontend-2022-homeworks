import { deleteInitialPage } from "./initialPage.js";
const navList = document.querySelector(".nav-list");
const hamburgerMenu = document.querySelector(".hamburger-menu");

export function openHamburgerMenu() {
    hamburgerMenu.addEventListener("click", (event) => {
        hamburgerMenu.classList.toggle("opened");
        navList.classList.toggle("opened");
    }); 
}

export function closeHamburgerMenu(){
    navList.addEventListener("click", event => {
        if(event.target.tagName == "LI"){
            deleteInitialPage();
            hamburgerMenu.classList.remove("opened");
            navList.classList.remove("opened");
        }        
    });
}