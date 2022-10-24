import { showFilteredPersons } from "./modules/FilterLogic.js";
import { getData } from "./modules/Serve.js";
import { updatePersonsData, closePreLoader } from "./modules/Service.js";
import {
  changeDisplayMode,
  contentAreaHandler,
  detailedInfoBtnsHandler,
  filterBtnsHandler,
  friendsList,
} from "./modules/Handlers.js";
import { createPageList, renderPersonsList } from "./modules/Render.js";

let persons = [];

const contentArea = document.querySelector(".app__content");
const errorWindow = document.querySelector(".error");
const filterMenu = document.querySelector("#filter__menu");
const detailedPersonInfo = document.querySelector(".detailed__person__info");
const btnsArea = document.querySelector(".btns__area");
const myFriendsBtn = document.querySelector(".my__friends__btn");
const pageList = document.querySelector(".page__list");

filterMenu.addEventListener("input", () =>
  renderPersonsList(
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

filterMenu.addEventListener("click", () =>
  filterBtnsHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

contentArea.addEventListener("click", () =>
  contentAreaHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

detailedPersonInfo.addEventListener("click", () =>
  detailedInfoBtnsHandler(
    event,
    myFriendsBtn.dataset.friendsBtn !== "open" ? persons : friendsList
  )
);

btnsArea.addEventListener("click", () => changeDisplayMode(event, persons));

errorWindow.addEventListener("click", errorHandler);

async function init() {
  const url =
    "https://randomuser.me/api/?results=100&inc=gender,name,nat,dob,location,email,phone,picture&nat=us,ua,ch,gb";
  const { results } = await getData(url);
  persons = results;
  closePreLoader();
  updatePersonsData(persons);
  pageList.innerHTML = createPageList(persons).join("");
  showFilteredPersons(persons);
}

function errorHandler({ target }) {
  let btn = target.closest("button");
  if (!btn) return;
  if (btn.value === "cancel") {
    errorWindow.close();
  } else {
    errorWindow.close();
    init();
  }
}

init();
