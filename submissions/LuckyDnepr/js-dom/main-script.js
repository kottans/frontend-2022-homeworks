"use strict";

import { readJSON } from "./readJSON.js";

import { loadContentByID } from "./aside-menu-action.js";

const dataBaseUrl = "./data-films.json";

const asideMenu = document.querySelector("#aside_menu"),
  mainContainer = document.querySelector("#content");

makeAsideMenu(dataBaseUrl, asideMenu)
  .then((asideMenu) => addAsideMenuListener(asideMenu))
  .catch((error) => showSorryMessage(mainContainer, error));

async function makeAsideMenu(source, container) {
  const data = await readJSON(source);
  const asideMenuList = document.createElement("ul");
  asideMenuList.classList.add("aside_menu_list");
  data.forEach((film) => {
    asideMenuList.appendChild(makeAsideMenuItem(film.ID, film.title));
  });
  container.appendChild(asideMenuList);
  return asideMenu;
}

function makeAsideMenuItem(filmID, filmTitle) {
  const asideMenuItem = document.createElement("li");
  asideMenuItem.classList.add("aside_menu_list_item");
  asideMenuItem.setAttribute("data-filmid", filmID);
  asideMenuItem.innerHTML = filmTitle;
  
  return asideMenuItem;
}

function addAsideMenuListener(asideMenu) {
  asideMenu.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains("aside_menu_list_item")) {
      asideMenu
        .querySelectorAll(".aside_menu_list_item")
        .forEach((button) => button.classList.remove("active"));
      target.classList.add("active");
      loadContentByID(target.dataset.filmid, mainContainer).catch((error) =>
        showSorryMessage(mainContainer, error)
      );
    }
  });
  document.querySelector(".aside_menu_list_item").click();
}

function showSorryMessage(container, error) {
  const message = document.createElement("p");
  message.classList.add("sorry_message");
  message.innerHTML = `We are very sorry.
    Maybe the content didn't load due to a server failure,
    or a slow connection,
    or a glitch in the matrix,
    or an alien invasion.
    Try reloading the page or coming back later.`;
  container.appendChild(message);
}
