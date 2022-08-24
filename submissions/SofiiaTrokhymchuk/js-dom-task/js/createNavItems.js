import { characters } from "./charachters.js";

export function createNavItems() {
    const navList = document.querySelector(".nav-list");
    const navItems = characters.reduce((acc, character) => {
        return (
            acc + `<li class="nav-item" id="${character.id}">
                    ${character.name}
                    </li>`
        );
    }, '');
    navList.innerHTML = navItems;
}
