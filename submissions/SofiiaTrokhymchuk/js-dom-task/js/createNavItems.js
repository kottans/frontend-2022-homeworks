import { characters } from "./charachters.js";

export function createNavItems() {
    const navList = document.querySelector(".nav-list");
    characters.map(character => {
            let navItem = document.createElement("li");
            navItem.setAttribute("class", "nav-item");
            navItem.setAttribute("id", character.id);
            navItem.innerHTML = character.name;
            navList.appendChild(navItem);
        }
    );
}
