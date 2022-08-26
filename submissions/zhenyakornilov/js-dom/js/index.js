"use strict";

import museums from "./data.js";
import switchTheme from "./utils.js";

function main() {
  const dropdownBtn = document.getElementById("dropdown");
  const listMenu = document.getElementById("menu");
  const contentBody = document.getElementById("content");
  renderButtons(museums, listMenu);
  renderArticle(museums[0], contentBody);
  showMuseumInfoByClick(museums, contentBody, listMenu);
  openMenu(listMenu, dropdownBtn);
  switchTheme();
}

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

function showMuseumInfoByClick(museums, content, menu) {
  menu.addEventListener("click", function ({ target }) {
    if (target.tagName.toLowerCase() === "button") {
      const currentContentObject = museums.filter(
        ({ btnName }) => btnName === target.textContent
      );
      renderArticle(currentContentObject[0], content);
    }
  });
}

function renderArticle({ name, description, imageSrc, url }, content) {
  const contentHTML = `
  <h2 class="museum-title">${name}</h2>
  <div class="desc-wrapper">
    <img class="museum-image" src="${imageSrc}" alt="photo of museum">
    <p class="museum-desc">${description}</p>
  </div>
  <div class="additional-wrapper">
    <p class="museum-link">
      <span>Visit </span>
      <a class='inner-link' href="${url}" target="_blank">museum page</a>
      <span> for more information...</span>
    </p>
  </div>
  `;

  content.innerHTML = contentHTML;
}

function openMenu(menu, dropdownButton) {
  dropdownButton.addEventListener("click", function () {
    const sidebar = menu.closest(".sidebar");
    sidebar.classList.toggle("active");
  });
}

document.addEventListener("DOMContentLoaded", main);
