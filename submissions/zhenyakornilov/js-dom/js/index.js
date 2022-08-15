import museumsData from "./data.js";
import switchTheme from "./utils.js";

switchTheme();

function renderButtons(arr) {
  const listMenu = document.querySelector(".menu-items");
  arr.forEach(({ btnName }) => {
    listMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="nav-item">` +
      `  <button class="btn-text">${btnName}</button>` +
      `</li>`
    );
  });
}

renderButtons(museumsData);

function toggleSelectedButton(museums) {
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

  renderArticle(getContextObj());

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (!this.classList.contains("open")) {
        document.querySelector(".content-body").innerHTML = "";
        selectedButton.classList.remove("open");
        this.classList.add("open");
        selectedButton = this;

        renderArticle(getContextObj());
      }
    });
  }
}

toggleSelectedButton(museumsData);

function renderArticle(museumObj) {
  let contentTag = document.querySelector(".content-body");

  const content = `
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
  contentTag.insertAdjacentHTML("afterbegin", content);
}

function openMenu() {
  const dropDownBtn = document.querySelector(".dropdown");

  dropDownBtn.addEventListener("click", function () {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
  });
}

openMenu();
