"use strict";
const teas = [
  {
    type: "Black Tea",
    description:
      "Black tea is withered, fully oxidized and dried. Black tea commonly yields a hearty, amber-colored brew. Some of the most popular types of black teas are bold breakfast teas (e.g. English Breakfast, Irish Breakfast) and Darjeelings. ",
    image: "./img/black.jpg",
  },
  {
    type: "Green Tea",
    description:
      "Green tea production endeavors to avoid the oxidation of the tea leaves, in order to retain its natural green color and fresh flavor. In Japan, the leaves are steamed, while other countries will pan-fire or dry it through other methods. This type of tea has a more delicate flavor than black tea and often brews up pale green or golden in color.",
    image: "./img/green.jpg",
  },
  {
    type: "Mate",
    description:
      "Mate tea is made from the yerba mate a South American holly tree similar to the tea plant. It’s not strictly “tea” as it’s not made from the tea plant, Camelia Sinensis, but it has similar benefits to tea since it’s similarly high in antioxidants and contains caffeine. In South America it’s drunk from a hollow gourd with loose leaves, hot water and a metal strainer straw.",
    image: "./img/mate.jpg",
  },
  {
    type: "Mint Tea",
    description:
      "Mint tea is a herbal tea made by infusing mint leaves in hot water. Mint tea made with peppermint leaves is called peppermint tea, and mint tea made with spearmint is called spearmint tea. There also exist teas that infuse peppermint and spearmint leaves.",
    image: "./img/mint.jpg",
  },
  {
    type: "Rooibos",
    description:
      "Rooibos tea is also known as red tea or red bush tea. It is made using leaves from a shrub called Aspalathus linearis, usually grown on the western coast of South Africa. Rooibos is a herbal tea and is not related to green or black tea.",
    image: "./img/rooibos.jpg",
  },
  {
    type: "Pu-erh",
    description:
      "Pu-erh (also spelled pu'er) comes exclusively from China and is famous for its distinctively earthy flavor. Pu-erh is tea that has been fermented, often stored underground for several years. Traditionally, pu-erh is compressed into round cakes and can be very expensive.",
    image: "./img/puer.jpg",
  },
];

const title = document.querySelector("h2.more__header");
const picture = document.querySelector("img.more__picture");
const description1 = document.querySelector("div.more__about");

const clicked = function (event) {
  const objectTea = teas.filter(
    (obj) => obj.type === event.srcElement.innerHTML
  )[0];
  title.innerHTML = objectTea.type;
  picture.alt = objectTea.type;
  picture.src = objectTea.image;
  description1.innerHTML = objectTea.description;
};

const listOfTeasNames = [];

for (let i = 0; i < teas.length; i += 1) {
  listOfTeasNames[i] = document.querySelectorAll("li.menu__item")[i];
  listOfTeasNames[i].onclick = clicked;
}
