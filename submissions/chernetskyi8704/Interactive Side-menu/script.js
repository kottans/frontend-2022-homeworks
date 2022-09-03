"use strict";

const mainContent = document.querySelector(".main__content");
const menuItem = document.querySelectorAll(".menu__link");
const menuList = document.querySelector(".menu__list");
const iconBurger = document.querySelector(".menu__icon-burger");
const menuBody = document.querySelector(".main__menu");

const contentData = [
  {
    name: "Fusilli",
    image: "img/Fusilli.jpg",
    alt: "",
    description:
      "Fusilli are a variety of pasta that are formed into corkscrew or helical shapes. The word fusilli presumably comes from fuso ('spindle'), as traditionally it is 'spun' by pressing androlling a small rod over the thin strips of pasta to wind them around it in a corkscrew shape.",
  },
  {
    name: "Casarecce",
    image: "img/Casarecce.jpg",
    alt: "",
    description:
      "Originating in Sicily, casarecce is a traditional short pasta, loosely rolled lengthways and slightly twisted. Their twisted shape makes them perfect for holding sauces, whether it’s simple pesto or chunky sauces made from eggplant, ricotta and basil.",
  },
  {
    name: "Malloreddus",
    image: "img/Malloreddus.jpg",
    alt: "",
    description:
      "Malloreddus, also called gnocchetti sardi or ‘little Sardinian gnocchi’ is a typical pasta from Sardinia. Many Italians call it Sardinian gnocchi because of the shape. It really looks like tiny potato gnocchi. But it is actually a pasta made of durum wheat semolina flour, water and salt. However, the same technique to make it is the same as gnocchi.",
  },
  {
    name: "Macaroni",
    image: "img/Macaroni.jpg",
    alt: "",
    description:
      "One of the earliest forms of pasta, macaroni is made from durum wheat and is shaped in short tubes with holes down the middle. Although artisanal brands may be made by hand using traditional methods, commercial varieties are produced using state-of-the-art pasta machines. Other varieties of macaroni include elbow macaroni (short and curved) and macaronicini (small shapes).",
  },
  {
    name: "Riccioli",
    image: "img/Riccioli.jpg",
    alt: "",
    description:
      "A variety of fresh egg pasta that is often associated with pasta makers in the Piemont region of Italy. Very similar in shape to fusilloni, rotini spiral, and rotelle pasta, the Riccioli Pasta is formed into many layers of ridges, spaced closely together that spiral upward. Because of its unique shape, it is good pasta for holding a variety of different pasta sauces.",
  },
];

iconBurger.addEventListener("click", (e) => {
  document.body.classList.toggle("_lock");
  iconBurger.classList.toggle("_active");
  menuBody.classList.toggle("_active");
});

const getSelectData = (target) => {
  const { name, image, alt, description } = contentData[target.id];

  const template = `<h2 class="content__name" >${name}</h2>
      <div class="content__section">
        <div class="section__img-container">
          <img
            class="section__img"
            src="${image}"
            alt="${alt}"
          />
          <span class="section__description">
          ${description}
        </span>
        </div>
      </div>`;

  return template;
};

const cleanContent = (area) => (area.innerHTML = "");

const renderData = function (area, target) {
  return area.insertAdjacentHTML("beforeend", getSelectData(target));
};

const toggleActiveMenuItem = (listOfMenuItems, target) => {
  listOfMenuItems.forEach((item) => {
    item.classList.remove("_activeBtn");
  });
  target.classList.add("_activeBtn");
};

menuList.addEventListener("click", (event) => {
  const target = event.target;

  if (iconBurger.classList.contains("_active")) {
    document.body.classList.remove("_lock");
    iconBurger.classList.remove("_active");
    menuBody.classList.remove("_active");
  }

  toggleActiveMenuItem(menuItem, target);
  cleanContent(mainContent);
  renderData(mainContent, target);
});
