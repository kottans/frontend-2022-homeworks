import { characters } from "./charachters.js";

const characterSection = document.querySelector(".character");
const characterImg = document.createElement("img");
characterImg.setAttribute("class", "character-img");
const characterName = document.createElement("h2")
characterName.setAttribute("class", "character-name");
const characterDescription = document.createElement("p")
characterDescription.setAttribute("class", "character-description");


export function createCharacter(event){
    characterSection.appendChild(characterImg);
    characterSection.appendChild(characterName);
    characterSection.appendChild(characterDescription);
    const navItem = event.target;
    const characterId = navItem.getAttribute("id");
    if(parseInt(characterId) === characters[characterId].id){
        characterImg.setAttribute("src", characters[characterId].image);
        characterImg.setAttribute("alt", `${characters[characterId].name} Image`)
        characterName.innerHTML = characters[characterId].name;
        characterDescription.innerHTML = characters[characterId].description;
    }; 
}

