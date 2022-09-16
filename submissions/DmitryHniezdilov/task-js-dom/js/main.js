"use strict";

import { dataList, defaultContentItem } from "./data.js";

const elemLogo = document.querySelector(".js-elem-logo");
const elemMenu = document.querySelector(".js-elem-menu");
const elemContent = document.querySelector(".js-elem-content");

const createMenuMarkup = (data) => {
  const menuMarkup = document.createElement("ul");
  menuMarkup.classList.add("menu__list");

  data.forEach((item) => {
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu__item");
    menuItem.innerHTML = `<button class="menu__btn" type="button" data-item-id="${item["id"]}">${item["Title"]}</button>`;
    menuMarkup.appendChild(menuItem);
  });

  return menuMarkup;
};

const changeMinToHm = (minutes) => {
  const MIN = Number(minutes.split(" ")[0]);
  let hour = Math.floor(MIN / 60);
  let min = Math.abs(MIN % 60);

  return hour < 0 ? `${min}m` : `${hour}h ${min}m`;
};

const createСontentMarkup = (item = defaultContentItem) => {
  const details = item["details"];

  const createDetailsList = () => {
    let detailsItems = Object.keys(details).reduce((acc, key) => {
      const value =
        key === "Runtime" ? changeMinToHm(details[key]) : details[key];

      return (acc += `
        <div class="content__info-item">
          <dt class="content__info-text content__info-text--title">${key}: </dt>
          <dd class="content__info-text">${value}</dd>
        </div>
      `);
    }, "");

    return '<dl class="content__info-list">' + detailsItems + "</dl>";
  };

  const contentMarkup = `
    <header class="content__top">
      <h1 class="content__title">${item["Title"]}</h1>
    </header>
    <div class="content__img-wrap">
      <figure class="content__img-inner">
        <img class="content__img" src="./img/${item["Poster"]}" 
          alt="Poster ${item["Title"]}">
      </figure>
    </div>
    <div class="content__info-wrap">
      <p class="content__info-text content__info-text--plot">${item["Plot"]}</p>
      ${details ? createDetailsList() : ""}
    </div>
  `;

  return contentMarkup;
};

const createInitialMarkup = () => {
  elemMenu.appendChild(createMenuMarkup(dataList));
  elemContent.innerHTML = createСontentMarkup();
};

createInitialMarkup();

const deleteActiveClass = () =>
  elemMenu.querySelector(".is-active")?.classList.remove("is-active");

const addActiveClass = ({ target }) => target.classList.add("is-active");

const getItemId = ({ target }) => target.getAttribute("data-item-id");

const getContentItem = (event) =>
  dataList.find((item) => item["id"] === getItemId(event));

const updateContent = (item) => {
  elemContent.innerHTML = null;
  elemContent.innerHTML += createСontentMarkup(item);
};

elemMenu.addEventListener("click", (event) => {
  const isPrevent =
    event.target.classList.contains("is-active") ||
    event.target.classList.contains("menu__list");

  isPrevent
    ? event.preventDefault()
    : (updateContent(getContentItem(event)),
      deleteActiveClass(),
      addActiveClass(event));
});

elemLogo.addEventListener("click", (event) => {
  const isPrevent = elemMenu.querySelectorAll(".is-active");

  isPrevent
    ? (event.preventDefault(),
      updateContent(defaultContentItem),
      deleteActiveClass())
    : event.preventDefault();
});
