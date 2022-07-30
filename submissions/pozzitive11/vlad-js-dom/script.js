const photos = [
  {
    img: "img/pillars-of-creation.jpg",
    name: "Стовпи Творіння",
    creator: "Фото: Daily Mail",
    id: "pillars",
    description:
      "'Стовпи Творіння' — скупчення міжзоряного газу та пилу в туманності Орел, приблизно за 7000 світлових років від Землі,вперше зафіксовані на фотографії космічним телескопом Габбл.",
  },
  {
    img: "img/mystical-mountain.jpg",
    name: "Містична гора",
    id: "mountain",
    creator: "Фото: NASA",
    description:
      "'Містична гора' — це ділянка в туманності Кіля. Вона виглядає як химерний пейзаж з 'Володаря кілець' Толкіна.Це лише невелика частина дивовижних зображень, які зміг зробити космічний телескоп Габбл за 31 рік своєї роботи. Фокус ще повернеться до цієї теми надалі.",
  },
  {
    img: "img/crab-nebula.jpg",
    name: "Крабоподібна туманність",
    id: "crab-nebula",
    creator: "Фото: NASA",
    description:
      "Крабоподібна туманність — це залишок наднової в Чумацькому Шляху, гарний колір і яскравість якої відобразив Габбл.",
  },
  {
    img: "img/kiel-nebula.jpg",
    name: "Туманність Кіля",
    id: "kiel-nebula",
    creator: "Фото: NASA",
    description:
      "Це центральна частина туманності Кіля, завширшки 50 світлових років, де народжуються і помирають зірки.",
  },
  {
    img: "img/sombrero-galaxy.jpg",
    name: "Галактика Сомбреро",
    id: "sombrero",
    creator: "Фото: Daily Mail",
    description:
      "Одна з найбільш фотогенічних галактик у Всесвіті — галактика Сомбреро. Візитною карткою галактики є яскраво-біле ядро, оточене товстими пиловими смугами, що утворюють спіральну структуру галактики. Сомбреро розташована на краю скупчення галактик у сузір'ї Діва.",
  },
];

// Create btns

const createBtn = (name, img, id) => {
  return `<li class ="nav__item">
            <button class="nav__btn" id="${id}" style="background-image: url(${img});">${name}</button>
          </li>`;
};

const btns = photos.map(({ name, img, id }) => createBtn(name, img, id));
const navList = document.querySelector(".nav__list");
console.log(navList);
navList.innerHTML = btns.join("");

// Crete content

const img = document.querySelector(".photo__img");
const nameImg = document.querySelector(".photo__name");
const creator = document.querySelector(".photo__creator");
const description = document.querySelector(".photo__descr");
const btn = document.querySelector(".nav__btn");

const fillContent = (item) => {
  img.innerHTML = `<img class="photo-img" src="${item.img}" alt="${item.name}" />`;
  nameImg.textContent = item.name;
  creator.textContent = item.creator;
  description.textContent = item.description;
};
fillContent(photos[0]);

navList.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("nav__btn")) {
    const photoId = event.target.id;
    const photoItem = photos.find((item) => item.id === photoId);
    fillContent(photoItem);
    nav.classList.toggle("nav--visible");
    burger.classList.toggle("burger--active");
  }
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

burger.addEventListener("click", (e) => {
  nav.classList.toggle("nav--visible");
  burger.classList.toggle("burger--active");
});
