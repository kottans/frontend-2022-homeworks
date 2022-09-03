"use strict";
import { ponyInformation } from "./ponyInformation.js";
const createHtmlElement = (htmlElementName, attributes, className) => {
  const htmlElement = document.createElement(htmlElementName);
  htmlElement.classList.add(className);
  for (const attributeName in attributes) {
    htmlElement.setAttribute(attributeName, attributes[attributeName]);
  }
  return htmlElement;
};

const createMenu = (menuItems) => {
  const menu = createHtmlElement("ul", { id: "menu" }, "menu");
  menuItems.forEach((menuItem, menuItemIndex) => {
    menu.appendChild(createMenuItem(menuItem, menuItemIndex));
  });
  return menu;
};

const createMenuItem = (menuItem, menuItemId) => {
  const menuItemElement = createHtmlElement(
    "li",
    {
      id: `menu-item-${menuItemId}`,
      "data-id": menuItemId,
    },
    "menu-item"
  );
  menuItemElement.innerHTML = `<a href="#" class="menu-link">${menuItem["name"]}</a>`;
  return menuItemElement;
};

const createMainContent = (mainContent) => {
  const container = createHtmlElement(
    "main",
    {
      id: "content-container",
    },
    "content-container"
  );

  const header = createHtmlElement(
    "h2",
    {
      id: "content-header",
    },
    "content-header"
  );

  header.innerHTML = mainContent.name;
  const text = createHtmlElement("div", { id: "main-text" }, "main-text");
  text.innerHTML = mainContent.description;
  const imgContainer = createHtmlElement("div", {}, "img-container");
  const img = createHtmlElement(
    "img",
    {
      src: mainContent["image"],
      id: "main-image",
      alt: mainContent["name"],
    },
    "main-image"
  );
  imgContainer.append(img);
  container.append(header, imgContainer, text);

  return container;
};

const setEventListeners = (ponyInformation) => {
  const menu = document.querySelector(".menu ");

  menu.addEventListener("click", ({ target }) => {
    const { id } = target.closest(".menu-item").dataset;
    const newContent = createMainContent(ponyInformation[id]);
    document.querySelector("main").replaceWith(newContent);
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(`#menu-item-${id}`).classList.add("active");
  });
};

const start = (ponyInformation) => {
  const container = document.querySelector("#container");
  container.appendChild(createMenu(ponyInformation));
  container.appendChild(createMainContent(ponyInformation[0]));
  setEventListeners(ponyInformation);
};
start(ponyInformation);
