import museumsData from "./data.js";
import switchTheme from "./utils.js";

switchTheme();

const listMenu = document.querySelector(".menu-items");
const contentBody = document.querySelector(".content-body");

function renderButtons(arr, menu) {
  let buttonsHTML = ``;

  arr.forEach(({ btnName }) => {
    buttonsHTML +=
      `<li class="nav-item">` +
      `  <button class="btn-text">${btnName}</button>` +
      `</li>`;
  });

  menu.innerHTML = buttonsHTML;
}

renderButtons(museumsData, listMenu);

function toggleSelectedButton(museums, content) {
  let selectedButton = document.getElementsByClassName("nav-item")[1];
  selectedButton.classList.add("open");

  const buttons = document.getElementsByClassName("nav-item");

  function getContextObj() {
    const selectedBtnText = document.querySelector(".open .btn-text");
    let obj = museums.filter(
      ({ btnName }) => btnName === selectedBtnText.textContent
    )[0];

    return obj;
  }

  renderArticle(getContextObj(), content);

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (!this.classList.contains("open")) {
        content.innerHTML = "";
        selectedButton.classList.remove("open");
        this.classList.add("open");
        selectedButton = this;

        renderArticle(getContextObj(), content);
      }
    });
  }
}

toggleSelectedButton(museumsData, contentBody);

function renderArticle(museumObj, content) {
  const contentHTML = `
  <h2 class="museum-title">${museumObj.name}</h2>
  <div class="desc-wrapper">
    <img class="museum-image" src="${museumObj.imageSrc}" alt="photo of museum">
    <p class="museum-desc">${museumObj.description}</p>
  </div>
  <div class="additional-wrapper">
    <p class="museum-link">
      <span>Visit </span>
      <a class='inner-link' href="${museumObj.museumUrl}" target="_blank">museum page</a>
      <span> for more information...</span>
    </p>
  </div>
  `;

  content.innerHTML = contentHTML;
}

function openMenu(menu) {
  const dropDownBtn = document.querySelector(".dropdown");

  dropDownBtn.addEventListener("click", function () {
    const sidebar = menu.closest(".sidebar");
    sidebar.classList.toggle("active");
  });
}

openMenu(listMenu);
