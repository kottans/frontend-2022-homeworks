import { usersList } from "./UsersList.js";
import { renderAllUsers } from "./renderUsers.js";
import { inputHandler } from "./inputHandler.js";
import { hamburgerMenuClickHandler } from "./burgerMenuHandler.js"

function main(){
    renderAllUsers(usersList);
    inputHandler();
    hamburgerMenuClickHandler();
}

main();
