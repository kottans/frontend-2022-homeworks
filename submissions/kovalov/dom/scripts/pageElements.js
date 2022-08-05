const sideMenu = document.querySelector('[data-side-menu]');
const sideMenuOpenButton = document.querySelector(
  '[data-side-menu-button="open"]'
);
const sideMenuCloseButton = document.querySelector(
  '[data-side-menu-button="close"]'
);
const sideMenuContent = document.querySelector(
  '[data-side-menu-content]'
);
const mainContent = document.querySelector('[data-main-content]');
const modal = document.querySelector('[data-modal]');
const modalImage = document.querySelector('[data-modal-image]');

export {
  sideMenu,
  sideMenuOpenButton,
  sideMenuCloseButton,
  sideMenuContent,
  mainContent,
  modal,
  modalImage,
};
