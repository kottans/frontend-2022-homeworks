"use strict";
const teas = [
  {
    id: 1,
    type: "Black Tea",
    description:
      "Black tea is withered, fully oxidized and dried. Black tea commonly yields a hearty, amber-colored brew. Some of the most popular types of black teas are bold breakfast teas (e.g. English Breakfast, Irish Breakfast) and Darjeelings. ",
    image: "./img/black.jpg",
  },
  {
    id: 2,
    type: "Green Tea",
    description:
      "Green tea production endeavors to avoid the oxidation of the tea leaves, in order to retain its natural green color and fresh flavor. In Japan, the leaves are steamed, while other countries will pan-fire or dry it through other methods. This type of tea has a more delicate flavor than black tea and often brews up pale green or golden in color.",
    image: "./img/green.jpg",
  },
  {
    id: 3,
    type: "Mate",
    description:
      "Mate tea is made from the yerba mate a South American holly tree similar to the tea plant. It’s not strictly “tea” as it’s not made from the tea plant, Camelia Sinensis, but it has similar benefits to tea since it’s similarly high in antioxidants and contains caffeine. In South America it’s drunk from a hollow gourd with loose leaves, hot water and a metal strainer straw.",
    image: "./img/mate.jpg",
  },
  {
    id: 4,
    type: "Mint Tea",
    description:
      "Mint tea is a herbal tea made by infusing mint leaves in hot water. Mint tea made with peppermint leaves is called peppermint tea, and mint tea made with spearmint is called spearmint tea. There also exist teas that infuse peppermint and spearmint leaves.",
    image: "./img/mint.jpg",
  },
  {
    id: 5,
    type: "Rooibos",
    description:
      "Rooibos tea is also known as red tea or red bush tea. It is made using leaves from a shrub called Aspalathus linearis, usually grown on the western coast of South Africa. Rooibos is a herbal tea and is not related to green or black tea.",
    image: "./img/rooibos.jpg",
  },
  {
    id: 6,
    type: "Pu-erh",
    description:
      "Pu-erh (also spelled pu'er) comes exclusively from China and is famous for its distinctively earthy flavor. Pu-erh is tea that has been fermented, often stored underground for several years. Traditionally, pu-erh is compressed into round cakes and can be very expensive.",
    image: "./img/puer.jpg",
  },
];

const createContent = function (objectTea) {
  const wholeArticle = document.querySelector(".more");

  const picture = document.createElement("img");
  picture.classList.add("more__picture");
  picture.setAttribute("alt", `${objectTea.type}`);
  picture.setAttribute("src", `${objectTea.image}`);

  const title = document.createElement("h2");
  title.classList.add("more__header");
  title.innerHTML = `${objectTea.type}`;

  const descr = document.createElement("div");
  descr.classList.add("more__about");
  descr.innerHTML = `${objectTea.description}`;

  wholeArticle.innerHTML = "";
  wholeArticle.append(picture);
  wholeArticle.append(title);
  wholeArticle.append(descr);
};

const getRandomNumber = () => Math.floor(Math.random() * teas.length);
const initValue = getRandomNumber();
createContent(teas[initValue]);

const listOfTeasNames = document.querySelector(".menu__items");

const changeTea = function (event) {
  const objectTea = teas.find(
    (obj) => obj.id === Number(event.target.dataset.id)
  );
  createContent(objectTea);
};

listOfTeasNames.addEventListener("click", changeTea);
