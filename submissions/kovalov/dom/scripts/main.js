import { data as planets } from './data.js';
import { createElement } from './createElement.js';
import {
  sideMenu,
  sideMenuOpenButton,
  sideMenuCloseButton,
  sideMenuContent,
  mainContent,
  modal,
  modalImage,
} from './pageElements.js';

function toggleSideMenu() {
  sideMenu.dataset.sideMenu === 'opened'
    ? (sideMenu.dataset.sideMenu = 'closed')
    : (sideMenu.dataset.sideMenu = 'opened');
  sideMenu.classList.toggle('side-menu--hidden');
}

function getSelectedDataItem(id, data) {
  return data.find((item) => item.id === Number(id));
}

function addSelectedDataItem(id, data) {
  const selectedPlanetData = getSelectedDataItem(id, data);
  const contentElement = createElement(selectedPlanetData);
  mainContent.innerHTML = '';
  mainContent.appendChild(contentElement);
}

function toggleModal(id, data) {
  const selectedImage = getSelectedDataItem(id, data);
  const { src: imageSrc } = selectedImage;
  const imagePath = `./assets/images/${imageSrc}`;
  modalImage.src = imagePath;
  modal.classList.remove('modal--hidden');
  modal.dataset.modal = 'opened';
}

sideMenuOpenButton.addEventListener('click', toggleSideMenu);

sideMenuCloseButton.addEventListener('click', toggleSideMenu);

sideMenuContent.addEventListener('click', (event) => {
  if (!event.target.dataset.sideMenuId) return;

  const { sideMenuId: id } = event.target.dataset;
  addSelectedDataItem(id, planets);
  toggleSideMenu();
});

mainContent.addEventListener('click', (event) => {
  const { imageId: id } = event.target.dataset;
  toggleModal(id, planets);
});

modal.addEventListener('click', (event) => {
  if (!event.target.dataset.modal === 'opened') return;

  modal.classList.add('modal--hidden');
  modal.dataset.modal = 'closed';
});
