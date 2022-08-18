import { characters } from "./charachters.js";

export function createNavItems() {
    const navList = document.querySelector(".nav-list");
    const navlistItems = [];
    characters.map(character => {
        navlistItems.push(
            `<li class="nav-item" id="${character.id}">
                ${character.name}
            </li>`
        )
    });
    navList.innerHTML = navlistItems.join("");
}
