"use strict"

import contentObj from "./content.js";

const contentTitle = document.querySelector('.content__title');
const contentText = document.querySelector('.content__text');
const contentPicture = document.querySelector('.content__picture');

const sideNav = document.querySelector('.sidenav');
const sideNavElements = sideNav.querySelectorAll('.sidenav__item');
const burgerButton = document.querySelector('.burger__button');

sideNavElements.forEach(el => {
   el.addEventListener('click', function (event) {
      event.preventDefault();
      burgerButton.click();
      const contentId = this.id;
      const newContent = contentObj.filter(el => el.id == contentId);
      newContent.forEach(el => {
         contentTitle.innerHTML = el.styleTitle;
         contentText.innerHTML = el.styleDescription;
         contentPicture.src = el.stylePicture;
      });
   })
})

