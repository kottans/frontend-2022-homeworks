"use strict";

const animalList = [
  {
    species: "cat",
    src: "img/Cats/1.jpg",
    alt: "The man strokes the cat.",
  },
  {
    species: "cat",
    src: "img/Cats/2.jpg",
    alt: "Ginger cat is stretching.",
  },
  {
    species: "cat",
    src: "img/Cats/3.jpg",
    alt: "The cat is sitting on the table.",
  },
  {
    species: "cat",
    src: "img/Cats/4.jpg",
    alt: "Ginger cat looks up.",
  },
  {
    species: "cat",
    src: "img/Cats/5.jpg",
    alt: "Four cats on the kitchen surface.",
  },
  {
    species: "cat",
    src: "img/Cats/6.jpg",
    alt: "The cat sleeps in the bed.",
  },
  {
    species: "cat",
    src: "img/Cats/7.jpg",
    alt: "The face of a red fluffy cat.",
  },
  {
    species: "cat",
    src: "img/Cats/8.jpg",
    alt: "Two cats are lying.",
  },
  {
    species: "cat",
    src: "img/Cats/9.jpg",
    alt: "Three kittens.",
  },
  {
    species: "dog",
    src: "img/Dogs/1.jpg",
    alt: "A white puppy runs across the grass.",
  },
  {
    species: "dog",
    src: "img/Dogs/2.jpg",
    alt: "Nine dogs against a pink wall.",
  },
  {
    species: "dog",
    src: "img/Dogs/3.jpg",
    alt: "Dog with one drooping ear.",
  },
  {
    species: "dog",
    src: "img/Dogs/4.jpg",
    alt: "Two dogs run along the path.",
  },
  {
    species: "dog",
    src: "img/Dogs/5.jpg",
    alt: "A woman holds a dog in her arms.",
  },
  {
    species: "dog",
    src: "img/Dogs/6.jpg",
    alt: "Two white and brown dogs.",
  },
  {
    species: "dog",
    src: "img/Dogs/7.jpg",
    alt: "Two dogs white and black.",
  },
  {
    species: "dog",
    src: "img/Dogs/8.jpg",
    alt: "Two dogs run along the path.",
  },
  {
    species: "dog",
    src: "img/Dogs/9.jpg",
    alt: "Red dog.",
  },
  {
    species: "horses",
    src: "img/Horses/1.jpg",
    alt: "The white horse is running.",
  },
  {
    species: "horses",
    src: "img/Horses/2.jpg",
    alt: "The horse's head lies on the back of another.",
  },
  {
    species: "horses",
    src: "img/Horses/3.jpg",
    alt: "Two horses in the meadow.",
  },
  {
    species: "horses",
    src: "img/Horses/4.jpg",
    alt: "Brown horse.",
  },
  {
    species: "horses",
    src: "img/Horses/5.jpg",
    alt: "Three horses.",
  },
  {
    species: "horses",
    src: "img/Horses/6.jpg",
    alt: "White horse in the field.",
  },
  {
    species: "horses",
    src: "img/Horses/7.jpg",
    alt: "Two horses white and brown are grazing.",
  },
  {
    species: "horses",
    src: "img/Horses/8.jpg",
    alt: "Four brown horses are running.",
  },
  {
    species: "horses",
    src: "img/Horses/9.jpg",
    alt: "Brown horse.",
  },
];

const codeTemplate = `
        <div class="img">
          <div class="img__column">
            <img
              src="${animalList[0].src}" alt="${animalList[0].alt}"
            />
            <img
              src="${animalList[10].src}" alt="${animalList[10].alt}"
            />
            <img
              src="${animalList[22].src}" alt="${animalList[22].alt}"
            />
          </div>
          <div class="img__column">
            <img
            src="${animalList[21].src}" alt="${animalList[21].alt}"
            />
            <img
              src="${animalList[14].src}" alt="${animalList[14].alt}"
            />
            <img
              src="${animalList[3].src}" alt="${animalList[3].alt}"
            />
          </div>
          <div class="img__column">
            <img
              src="${animalList[6].src}" alt="${animalList[6].alt}"
            />
            <img
              src="${animalList[16].src}" alt="${animalList[16].alt}"
            />
            <img
            src="${animalList[8].src}" alt="${animalList[8].alt}"
            />
          </div>
        </div>`;

render(codeTemplate, document.querySelector("main"));

const imgHtml = document.querySelectorAll("img");
imgHtml.forEach((element) => element.classList.add("img__js"));

const popupIcon = document.querySelector("#popup");
popupIcon.addEventListener("click", showPopup);

const menuList = document.querySelector(".navigation");
menuList.addEventListener("click", changeImagesByClick);

function render(codeTemplate, placeholder) {
  placeholder.innerHTML = codeTemplate;
}

function changeImagesByClick(event) {
  const imgFiltreById = animalList.filter(
    (kindOfAnimal) => kindOfAnimal.species === event.target.id
  );

  for (let i = 0; i < imgHtml.length; i++) {
    imgHtml[i].setAttribute("src", imgFiltreById[i].src);
    imgHtml[i].setAttribute("alt", imgFiltreById[i].alt);
  }
}

function showPopup() {
  menuList.classList.toggle("navigation__none");
}
