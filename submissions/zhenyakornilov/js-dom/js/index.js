"use strict";

import museums from "./data.js";
import toggleDarkClass from "./utils.js";

const themeSwitcher = document.getElementById("switcher");
const listMenu = document.getElementById("menu");
const dropdownBtn = document.getElementById("dropdown-button");
const contentBody = document.getElementById("content");

function renderButtons(museumsObj, menu) {
  let buttonsListHTML = museumsObj
    .map(({ id, btnName }) => {
      return `
      <li class="nav-item">
        <button class="btn-text" id="${id}">${btnName}</button>
      </li>
      `;
    })
    .join("");

  menu.innerHTML = buttonsListHTML;
}

function showMuseumInfo({ target }) {
  const currentSelectedBtn = target.closest(".nav-item");
  if (
    target.closest(".btn-text") &&
    !currentSelectedBtn.classList.contains("active")
  ) {
    const [currentContentObject] = museums.filter(
      ({ id }) => id === parseInt(target.id)
    );
    renderArticle(currentContentObject, contentBody);
    document
      .querySelectorAll(".nav-item")
      .forEach((button) => button.classList.remove("active"));
    currentSelectedBtn.classList.add("active");
  }
}

function renderArticle(
  { name, description, imageSrc, imageAlt, url },
  content
) {
  const contentHTML = `
  <h2 class="museum-title">${name}</h2>
  <div class="desc-wrapper">
    <img class="museum-image" src="${imageSrc}" alt="${imageAlt}">
    <p class="museum-desc">${description}</p>
  </div>
  <div class="additional-wrapper">
    <span class="museum-link">
      Visit 
      <a class='inner-link' href="${url}" target="_blank">museum page</a>
      for more information...
    </span>
  </div>
  `;

  content.innerHTML = contentHTML;
}

function openDropdownMenu() {
  const sidebar = listMenu.closest(".sidebar");
  sidebar.classList.toggle("active");
}

function main() {
  renderButtons(museums, listMenu);
  renderArticle(museums[0], contentBody);

  themeSwitcher.addEventListener("change", toggleDarkClass);
  dropdownBtn.addEventListener("click", openDropdownMenu);
  listMenu.addEventListener("click", showMuseumInfo);
}

document.addEventListener("DOMContentLoaded", main);
