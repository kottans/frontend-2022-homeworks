"use strict";

import museums from "./data.js";
import toggleDarkClass from "./utils.js";

const themeSwitcher = document.getElementById("switcher");
const listMenu = document.getElementById("menu");
const dropdownBtn = document.getElementById("dropdown-button");
const contentBody = document.getElementById("content");

function renderButtons(museumsObj, menu) {
  let buttonsHTML = museumsObj
    .map(({ btnName }) => {
      return `
      <li class="nav-item">
        <button class="btn-text">${btnName}</button>
      </li>
      `;
    })
    .join("");

  menu.innerHTML = buttonsHTML;
}

function showMuseumInfo({ target }) {
  if (target.closest(".btn-text")) {
    let currentSelectedBtn = target.closest(".nav-item");
    if (!currentSelectedBtn.classList.contains("active")) {
      const [currentContentObject] = museums.filter(
        ({ btnName }) => btnName === target.textContent
      );
      renderArticle(currentContentObject, contentBody);
      document
        .querySelectorAll(".nav-item")
        .forEach((button) => button.classList.remove("active"));
      currentSelectedBtn.classList.add("active");
    }
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
