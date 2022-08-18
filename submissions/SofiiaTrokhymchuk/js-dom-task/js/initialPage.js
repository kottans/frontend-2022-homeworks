const initialSection = document.querySelector(".character");
const initialName = document.createElement("h2")
initialName.setAttribute("class", "character-name");
const initialDescription = document.createElement("p");
initialDescription.setAttribute("class", "character-description");

export function createInitalPage(){
    initialName.innerHTML = "Death Note Website Usage Guide"
    initialDescription.innerHTML = "This is a brief overview on the main characters of <strong>Death Note</strong>." + 
    " Please, click on each character's name on the menu to find out more information about each character." +
    "<br><br>And don't forget about main <strong>Death Note Rules</strong>:";
    const deatnNoteRules = document.createElement("ul");
    deatnNoteRules.setAttribute("class", "death-note-rules");
    deatnNoteRules.insertAdjacentHTML("afterbegin",   
    "<li>The human whose name is written in this note <em>shall die</em>.</li>" +
    "<li>This note will not take effect unless <em>the writer has the person's face in their mind</em> when writing his/her name. Therefore, people sharing the same name will not be affected.</li>" +
    "<li>If the cause of death is written <em>within the next 40 seconds</em> of writing the person's name, it will happen.</li>" +
    "<li>If the cause of death is not specified, the person will simply die of a <em>heart attack</em>.</li>" +
    "<li>After writing the cause of death, <em>details of the death</em> should be written in the next <em>6 minutes and 40 seconds</em>.</li>");
    initialSection.appendChild(initialName);
    initialSection.appendChild(initialDescription);
    initialDescription.appendChild(deatnNoteRules);
}

export function deleteInitialPage(){
    initialName.remove();
    initialDescription.remove();
}