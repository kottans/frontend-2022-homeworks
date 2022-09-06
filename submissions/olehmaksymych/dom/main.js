let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
};

document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};

document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};

let sectionItem = document.querySelector(".section_item");
let navbar_item = document.querySelector(".navbar_item");
let home = document.querySelector("#home");
let england = document.querySelector("#england");
let germany = document.querySelector("#germany");
let italy = document.querySelector("#italy");
let spain = document.querySelector("#spain");
let france = document.querySelector("#france");

let home_page = document.querySelector("#home_page");
let manchester = document.querySelector("#manchester");
let bavaria = document.querySelector("#bavaria");
let juve = document.querySelector("#juve");
let real = document.querySelector("#real");
let psg = document.querySelector("#psg");

document.querySelector("#open_logo").onclick = () => {
  home_page.style.display = "block";
  navbar.classList.toggle("active");
  manchester.style.display = "none";
  juve.style.display = "none";
  real.style.display = "none";
  psg.style.display = "none";
  bavaria.style.display = "none";
};

home.onclick = () => {
  home_page.style.display = "block";
  navbar.classList.toggle("active");
  manchester.style.display = "none";
  juve.style.display = "none";
  real.style.display = "none";
  psg.style.display = "none";
  bavaria.style.display = "none";
};

england.onclick = () => {
  manchester.style.display = "block";
  navbar.classList.toggle("active");
  home_page.style.display = "none";
  juve.style.display = "none";
  real.style.display = "none";
  psg.style.display = "none";
  bavaria.style.display = "none";
};

spain.onclick = () => {
  real.style.display = "block";
  navbar.classList.toggle("active");
  home_page.style.display = "none";
  juve.style.display = "none";
  manchester.style.display = "none";
  psg.style.display = "none";
  bavaria.style.display = "none";
};

germany.onclick = () => {
  bavaria.style.display = "block";
  navbar.classList.toggle("active");
  home_page.style.display = "none";
  juve.style.display = "none";
  real.style.display = "none";
  psg.style.display = "none";
  manchester.style.display = "none";
};

italy.onclick = () => {
  juve.style.display = "block";
  navbar.classList.toggle("active");
  home_page.style.display = "none";
  manchester.style.display = "none";
  real.style.display = "none";
  psg.style.display = "none";
  bavaria.style.display = "none";
};

france.onclick = () => {
  psg.style.display = "block";
  navbar.classList.toggle("active");
  home_page.style.display = "none";
  juve.style.display = "none";
  real.style.display = "none";
  manchester.style.display = "none";
  bavaria.style.display = "none";
};
