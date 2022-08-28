"use strict";

const images = [
  {
    id: "cat",
    src: "img/Cats/1.jpg",
    alt: "The man strokes the cat.",
  },
  {
    id: "cat",
    src: "img/Cats/2.jpg",
    alt: "Ginger cat is stretching.",
  },
  {
    id: "cat",
    src: "img/Cats/3.jpg",
    alt: "The cat is sitting on the table.",
  },
  {
    id: "cat",
    src: "img/Cats/4.jpg",
    alt: "Ginger cat looks up.",
  },
  {
    id: "cat",
    src: "img/Cats/5.jpg",
    alt: "Four cats on the kitchen surface.",
  },
  {
    id: "cat",
    src: "img/Cats/6.jpg",
    alt: "The cat sleeps in the bed.",
  },
  {
    id: "cat",
    src: "img/Cats/7.jpg",
    alt: "The face of a red fluffy cat.",
  },
  {
    id: "cat",
    src: "img/Cats/8.jpg",
    alt: "Two cats are lying.",
  },
  {
    id: "cat",
    src: "img/Cats/9.jpg",
    alt: "Three kittens.",
  },
  {
    id: "dog",
    src: "img/Dogs/1.jpg",
    alt: "A white puppy runs across the grass.",
  },
  {
    id: "dog",
    src: "img/Dogs/2.jpg",
    alt: "Nine dogs against a pink wall.",
  },
  {
    id: "dog",
    src: "img/Dogs/3.jpg",
    alt: "Dog with one drooping ear.",
  },
  {
    id: "dog",
    src: "img/Dogs/4.jpg",
    alt: "Two dogs run along the path.",
  },
  {
    id: "dog",
    src: "img/Dogs/5.jpg",
    alt: "A woman holds a dog in her arms.",
  },
  {
    id: "dog",
    src: "img/Dogs/6.jpg",
    alt: "Two white and brown dogs.",
  },
  {
    id: "dog",
    src: "img/Dogs/7.jpg",
    alt: "Two dogs white and black.",
  },
  {
    id: "dog",
    src: "img/Dogs/8.jpg",
    alt: "Two dogs run along the path.",
  },
  {
    id: "dog",
    src: "img/Dogs/9.jpg",
    alt: "Red dog.",
  },
  {
    id: "horses",
    src: "img/Horses/1.jpg",
    alt: "The white horse is running.",
  },
  {
    id: "horses",
    src: "img/Horses/2.jpg",
    alt: "The horse's head lies on the back of another.",
  },
  {
    id: "horses",
    src: "img/Horses/3.jpg",
    alt: "Two horses in the meadow.",
  },
  {
    id: "horses",
    src: "img/Horses/4.jpg",
    alt: "Brown horse.",
  },
  {
    id: "horses",
    src: "img/Horses/5.jpg",
    alt: "Three horses.",
  },
  {
    id: "horses",
    src: "img/Horses/6.jpg",
    alt: "White horse in the field.",
  },
  {
    id: "horses",
    src: "img/Horses/7.jpg",
    alt: "Two horses white and brown are grazing.",
  },
  {
    id: "horses",
    src: "img/Horses/8.jpg",
    alt: "Four brown horses are running.",
  },
  {
    id: "horses",
    src: "img/Horses/9.jpg",
    alt: "Brown horse.",
  },
];

document.querySelector("main").innerHTML = `
        <div class="img">
          <div class="img__column">
            <img
              src="${images[0].src}" alt="${images[0].alt}"
            />
            <img
              src="${images[10].src}" alt="${images[10].alt}"
            />
            <img
              src="${images[22].src}" alt="${images[22].alt}"
            />
          </div>
          <div class="img__column">
            <img
            src="${images[21].src}" alt="${images[21].alt}"
            />
            <img
              src="${images[14].src}" alt="${images[14].alt}"
            />
            <img
              src="${images[3].src}" alt="${images[3].alt}"
            />
          </div>
          <div class="img__column">
            <img
              src="${images[6].src}" alt="${images[6].alt}"
            />
            <img
              src="${images[16].src}" alt="${images[16].alt}"
            />
            <img
            src="${images[8].src}" alt="${images[8].alt}"
            />
          </div>
        </div>`;

const imgClass = document.querySelectorAll("img");
imgClass.forEach((element) => element.classList.add("img__js"));

const popupIcon = document.querySelector("#popup");
popupIcon.addEventListener("click", showPopup);

const cat = document.querySelector("#cat");
const dog = document.querySelector("#dog");
const horse = document.querySelector("#horses");

cat.addEventListener("click", changeImagesByClick);
dog.addEventListener("click", changeImagesByClick);
horse.addEventListener("click", changeImagesByClick);

function changeImagesByClick() {
  const imgHtml = document.querySelectorAll(".img__js");
  const result = images.filter((key) => key.id === this.id);
  for (let i = 0; i < imgHtml.length; i++) {
    imgHtml[i].setAttribute("src", result[i].src);
    imgHtml[i].setAttribute("alt", result[i].alt);
  }
}

function showPopup() {
  const menu = document.querySelector("#navigation");
  if (menu.style.display === "flex" && window.innerWidth <= 700) {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}
