import quotations from "../data/quotations.json" assert { type: "json" };

const navList = document.querySelector(".nav__list");
const container = document.querySelector(".container");

const buttons = quotations.map(
  ({ id }) =>
    ` <li class="nav__item">
               <button type="button" class="nav__button" data-number=${id}>${id}</button>
             </li>`
);

navList.insertAdjacentHTML("afterbegin", buttons.join(""));

const createContent = (btnId, data) => {
  const itemToShow = data.find(({ id }) => Number(btnId) === Number(id));
  const markup = `  <div class="quotation">
  <p class="quotation__text">
              	${itemToShow.quotation}
                <p class="quotation__author">${itemToShow.author}
                </p>
            </p></div>`;
  container.innerHTML = markup;
};

const handleClick = ({ target }) => {
  if (target.nodeName !== "BUTTON") {
    return;
  }
  const selectedBtn = target.dataset.number;
  createContent(selectedBtn, quotations);
};

navList.addEventListener("click", handleClick);
