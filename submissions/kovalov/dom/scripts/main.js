import { getSelectedDataItem } from './data.js';
import { createElement } from './element.js';

const menuButton = document.querySelector('[data-menu-button]');
const menuMobileContent = document.querySelector(
  '[data-mobile-menu-content]'
);
const menuDesktopContent = document.querySelector(
  '[data-desktop-menu-content]'
);
const mainContent = document.querySelector('[data-main-content]');

menuButton.addEventListener('click', () => {
  menuMobileContent.classList.toggle('opened');
});

menuMobileContent.addEventListener('click', appendContent);

menuDesktopContent.addEventListener('click', appendContent);

function appendContent(event) {
  if (event.target.dataset.id) {
    const { id } = event.target.dataset;
    const data = getSelectedDataItem(id);
    const element = createElement(data);

    mainContent.innerHTML = '';
    mainContent.appendChild(element);
  }
}
