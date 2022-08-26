import { data } from "./data.js";

const navBtn = document.querySelector("#navBtn");
const nav = document.querySelector("#nav");
const navList = document.querySelector("#navList");
const navCloseBtn = document.querySelector("#navCloseBtn");
const mainHeader = document.querySelector("#mainHeader");
const mainContent = document.querySelector("#mainContent");
let activeLink = null;

window.addEventListener("load", onWindow_Load_Handler);
navBtn.addEventListener("click", onNavBtn_Click_Handler);


function openNav() {
  nav.classList.add("nav--visible");
}


function closeNav() {
  nav.classList.remove("nav--visible");
}


function renderNav() {
  data.forEach(({ id, name, url }) => {
    const navItem = document.createElement("li");
    navItem.classList.add("nav__item");

    const navLink = document.createElement("a");
    navLink.classList.add("nav__link");
    navLink.href = "";
    navLink.dataset.url = url;
    navLink.dataset.navLink = true;
    navLink.dataset.navId = id;
    navLink.textContent = name;

    navItem.append(navLink);
    navList.append(navItem);
  });

  nav.addEventListener("click", forNavLinks_onNavList_Click_Handler);
  navCloseBtn.addEventListener("click", onNavCloseBtn_Click_Handler);
}


function renderMain(planetId=null) {
  mainContent.innerHTML = "";
  
  if (planetId === null) {
    mainHeader.textContent = "Planets of Solar System";

    const planetsList = document.createElement("ul");
    planetsList.classList.add("planetsList");

    data.forEach(({name, imgUrl}) => {
      const item = document.createElement("li");
      item.classList.add("planetsList__item");

      const img = document.createElement("img");
      img.classList.add("planetsList__img");
      img.src = `./img/${imgUrl}`;
      img.width = "150";
      img.height = "150";
      img.alt = name;

      item.append(img);
      planetsList.append(item);
    })

    mainContent.append(planetsList);
  } 
  
  else {
    const {name, imgUrl, desc} = data.find(({id}) => id === Number(planetId));
    
    mainHeader.textContent = name;

    const planet = document.createElement("img");
    planet.classList.add("main__planet");
    planet.src=`./img/${imgUrl}`;
    planet.width = "800";
    planet.height = "400";
    planet.alt = name;
    mainContent.append(planet);

    desc.forEach((par) => {
      const paragraph = document.createElement("p");
      paragraph.classList.add("main__desc");
      paragraph.textContent = par;
      mainContent.append(paragraph);
    })
  }
}


function onWindow_Load_Handler() {
  renderNav();
  renderMain();
}


function onNavBtn_Click_Handler() {
  openNav();
}


function onNavCloseBtn_Click_Handler() {
  closeNav();
}


function forNavLinks_onNavList_Click_Handler(evt) {
  if (!evt.target.dataset.navLink) return;
  evt.preventDefault();

  renderMain(evt.target.dataset.navId);
  closeNav();

  activeLink && activeLink.classList.remove("nav__link--active");
  activeLink = evt.target;
  activeLink.classList.add("nav__link--active");
}
