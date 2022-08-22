import { characters } from "./charachters.js";

const characterSection = document.querySelector(".character");

function getCharacterData(event){
    const characterData = {};
    const navItem = event.target;
    const characterId = navItem.getAttribute("id");
    if(parseInt(characterId) === characters[characterId].id){
        characterData.image = characters[characterId].image;
        characterData.name = characters[characterId].name;
        characterData.description = characters[characterId].description;
    }
    return characterData;
}

function createCharacter(characterData){
    const newCharacter = document.createDocumentFragment();
    const characterContainer = document.createElement("div");
    characterContainer.innerHTML = `
        <img src="${characterData.image}" alt="${characterData.name} Image" class="character-img">
        <h2 class="character-name">${characterData.name}</h2>
        <p class="character-description">${characterData.description}</p>
    `;
    newCharacter.appendChild(characterContainer);
    return newCharacter;
}

export function insertCharacter(event){
    characterSection.innerHTML = "";
    const newCharacter = createCharacter(getCharacterData(event));
    characterSection.append(newCharacter);
};
