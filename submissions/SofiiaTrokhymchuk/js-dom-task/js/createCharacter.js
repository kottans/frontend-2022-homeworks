import { characters } from "./charachters.js";

const characterSection = document.querySelector(".character");

function getCharacterData(event){
    const navItem = event.target;
    const characterId = navItem.getAttribute("id");
    const invalidCharacter = {
        image: "",
        name: "",
        description: "",
      };
      const { image, name, description } = characters[characterId]
        ? characters[characterId]
        : invalidCharacter;
      return [
        {
          image,
          name,
          description,
        },
        !!(image && name && description),
      ];
}

function createCharacter(characterData){
    const { image, name, description } = characterData;
    const newCharacter = document.createDocumentFragment();
    const characterContainer = document.createElement("div");
    characterContainer.innerHTML = `
        <img src="${image}" alt="${name} Image" class="character-img">
        <h2 class="character-name">${name}</h2>
        <p class="character-description">${description}</p>
    `;
    newCharacter.appendChild(characterContainer);
    return newCharacter;
}

export function insertCharacter(event){
    const [updatedContent, isValidContent] = getCharacterData(event);
    if (isValidContent) {
      const newCharacter = createCharacter(updatedContent);
      characterSection.innerHTML = "";
      characterSection.append(newCharacter);
    }
};
