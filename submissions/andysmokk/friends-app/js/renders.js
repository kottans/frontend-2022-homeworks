import { getTemplateFriend } from "./templates.js";
import { boxFriends } from "./refs.js";

const renderFriends = (friends) => {
  boxFriends.innerHTML = friends
    .map((friend) => getTemplateFriend(friend))
    .join("");
};

export { renderFriends };
