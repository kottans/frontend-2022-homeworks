"use strict";

import { dataList, defaultContentItem } from "./data.js";

// helpers funk

let minToHm = (min) => {
    const MIN = Number(min.split(" ")[0]);
    let h = Math.floor(MIN / 60);
    let m = Math.abs(MIN % 60);

    return h < 0 ? `${m}m` : `${h}h ${m}m`
}

// find elements

const elemLogo = document.querySelector(".js-elem-logo");
const elemMenu = document.querySelector(".js-elem-menu");
const elemContent = document.querySelector(".js-elem-content");

// create markup

const createMenuMarkup = (data) => {
    const menuListItems = data.map(item => {
        return (
            `
                <li class="menu__item" >
                    <button class="menu__btn" type="button" data-item-id="${item["id"]}">${item["Title"]}</button>
                </li>
            `
        )
    });

    return (
        `
            <ul class="menu__list">
                ${menuListItems}
            </ul>
        `
    )
}

const createСontentMarkup = ( item = defaultContentItem) => {

    const detailsList = item["details"]
        ? Object.keys(item["details"]).map(key => {
            const value = key === "Runtime" ? minToHm(item["details"][key]) : item["details"][key] ;
            return (
                `
                    <li class="content__info-item">
                        <span class="content__info-text"><strong>${key}: </strong>${value}</span>
                    </li>
                `
                )
            })
        : "";

    return (
        `
            <header class="content__top">
                <h1 class="content__title">${item["Title"]}</h1>
            </header>
            <div class="content__img-wrap">
                <figure class="content__img-inner">
                    <img class="content__img" src="./img/${item["Poster"]}" alt="Poster ${item["Title"]}">
                </figure>
            </div>
            <div class="content__info-wrap">
                <ul class="content__info-list">

                    <li class="content__info-item">
                        <span class="content__info-text content__info-text--plot">${item["Plot"]}</span>
                    </li>

                    ${detailsList}

                </ul>
            </div>
        `
    )
}

const menuListData = [];

// add initial markup

elemMenu.innerHTML += createMenuMarkup(dataList);
elemContent.innerHTML += createСontentMarkup();

// control

const deleteActiveClass = () => elemMenu.querySelectorAll(".is-active").forEach(item => item.classList.remove("is-active"));
const addActiveClass = (event) => event.target.classList.add("is-active");

const getItemId = (event) => event.target.getAttribute("data-item-id");
const getContentItem = (event) => dataList.filter(item => item["id"] === getItemId(event))[0];

const updateContent = (item) => {
    elemContent.innerHTML = null;
    elemContent.innerHTML += createСontentMarkup(item);
}

elemMenu.addEventListener("click", (event) => {
    const isPrevent = event.target.classList.contains("is-active") || event.target.classList.contains("menu__list");

    isPrevent ? event.preventDefault() : (updateContent(getContentItem(event)), deleteActiveClass(), addActiveClass(event));
});

elemLogo.addEventListener("click", (event) => {
    const isPrevent = elemMenu.querySelectorAll(".is-active");

    isPrevent ? (updateContent(defaultContentItem), deleteActiveClass()) : event.preventDefault();
});
