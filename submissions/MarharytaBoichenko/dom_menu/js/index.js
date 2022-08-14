import { navList, container } from "./refs.js";
import quotations from "../data/quotations.json" assert { type: "json" };

const createNavigation = () => {
  const buttons = [];
  for (let i = 0; i < 10; i++) {
    const navButton = ` <li class="nav__item">
                    <button type="button" class="nav__button" data-number=${i + 1}>${
      i + 1
    }</button>
                </li>`;
    buttons.push(navButton);
  }

  navList.insertAdjacentHTML("afterbegin", buttons.join(""));
};
createNavigation();

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

const handleClick = (e) => {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  const selectedBtn = e.target.dataset.number;
  createContent(selectedBtn, quotations);
};

navList.addEventListener("click", handleClick);
