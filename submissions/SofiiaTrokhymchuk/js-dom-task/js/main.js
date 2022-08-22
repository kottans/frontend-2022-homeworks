import {appendOpenHambMenuHandler, appendCloseHambMenuHandler} from "./hamburgerMenu.js"; 
import {createNavItems} from "./createNavItems.js";
import {createCharacter} from "./createCharacter.js";
import {createInitalPage} from "./initialPage.js";

function main(){
    createNavItems();
    createInitalPage();
    appendOpenHambMenuHandler();
    appendCloseHambMenuHandler();
    document.querySelector(".nav-list").addEventListener("click", (event) =>{
        createCharacter(event);
    })
}

document.addEventListener("DOMContentLoaded", main);
