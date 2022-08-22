"use strict";

import { renderContent } from "./aside-menu-action.js";

const dataBaseUrl = "./data-films.json";

var dataBase;

const asideMenu = document.querySelector("#aside_menu"),
  mainContainer = document.querySelector("#content");

main ();

async function main () {
    dataBase = await readJSON(dataBaseUrl);
    renderAsideMenu (dataBase, asideMenu);
    addAsideMenuListener (asideMenu);
}

function renderAsideMenu(source, container) {
  const asideMenuList = document.createElement("ul");
  asideMenuList.classList.add("aside_menu_list");
  source.forEach((film) => {
    asideMenuList.appendChild(makeAsideMenuItem(film.ID, film.title));
  });
  container.appendChild(asideMenuList);
}

function makeAsideMenuItem(filmID, filmTitle) {
  const asideMenuItem = document.createElement("a"),
        menuItemWrapper = document.createElement("li");
  asideMenuItem.classList.add("aside_menu_list_item");
  asideMenuItem.setAttribute("data-filmid", filmID);
  asideMenuItem.href = `#${filmTitle}`;
  asideMenuItem.innerHTML = filmTitle;
  menuItemWrapper.appendChild(asideMenuItem);
  return menuItemWrapper;
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
      const film = dataBase.find((film) => film.ID === +target.dataset.filmid);
      renderContent(film, mainContainer);
    }
  });
  document.querySelector(".aside_menu_list_item").click();
}

function showSorryMessage(container) {
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

async function readJSON(source) {
  try {
      const response = await fetch(source);
      const json = await response.json();
      return json;
  } catch (error) {
      showSorryMessage(mainContainer);
  }
}
