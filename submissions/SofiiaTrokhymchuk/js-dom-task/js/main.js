import {openHamburgerMenu, closeHamburgerMenu} from "./hamburgerMenu.js"; 
import {createNavItems} from "./createNavItems.js";
import {createCharacter} from "./createCharacter.js";
import {createInitalPage} from "./initialPage.js";

function main(){
    createNavItems();
    createInitalPage();
    openHamburgerMenu();
    closeHamburgerMenu();
    document.querySelector(".nav-list").addEventListener("click", (event) =>{
        createCharacter(event);
    })
}

document.addEventListener("DOMContentLoaded", main);