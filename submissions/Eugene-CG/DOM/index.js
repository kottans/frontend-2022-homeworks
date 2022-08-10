const texts = [
  {
    identifier: "HahahaOne",
    text: `Lorem One one One one One one One one One One one One one One one One one One One one One one One
    one One one One One one One one One one One one Oneoneipsum dolor 
    sit amet consectetur adipisicing elit. 
    Ad, qui
    laboriosam? Est, et ex? Fugit, 
    quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
  {
    identifier: "HahahaTwo",
    text: `Two Two Two Two Two Two Two Two Two Two Two
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, 
    quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
  {
    identifier: "HahahaThree",
    text: `Lorem Three Three Three Three Three Three Three Three Three Three Thr ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid
     cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
  {
    identifier: "HahahaFour",
    text: `Lorem Four Four Four Four Four Four Four Four Four Four Four Four Fo
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
  {
    identifier: "HahahaFive",
    text: `Lorem Five Five Five Five Five Five Five Five Five Five Five Five Fi
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
  {
    identifier: "Something",
    text: `Lorem Something Something ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`,
  },
];
const wrapper = document.querySelector(".wrapper");
const mainContent = document.querySelector(".main__content");
const menuList = document.querySelector(".menu__list");

const fillMenuList = (event) => {
  texts.reduceRight((accumulatorObj, currObj) => {
    const li = document.createElement("LI");
    menuList.appendChild(li);

    const a = document.createElement("A");
    a.setAttribute("href", "#");
    a.classList.add("menu__link");
    a.innerText = currObj.identifier;
    li.appendChild(a);
  }, "Hello Alexandr :D");
};

const delegateEvents = (event) => {
  const { target } = event;
  if (target.closest(".menu__list")) handleList(target);
  if (target.closest(".logo")) backToDefaultContent();
  if (target.closest(".menu__popup-icon")) switchMenuPopup(target);
};

const handleList = (target) => {
  console.log(target);
  if (target.closest("LI") || target.closest("A")) {
    clearMainContent();
    createMainContent(target);
    switchMenuPopup(target);
  }
};
const backToDefaultContent = () => (mainContent.innerHTML = defaultContent);
const switchMenuPopup = (target) => menuList.classList.toggle("hide");

const defaultContent = mainContent.innerHTML;
const clearMainContent = () => (mainContent.innerHTML = "");

const createMainContent = (target) => {
  createTitleH(target);
  createParagraph(target, 5);
};
const createTitleH = (target) => {
  const h = document.createElement("H1");
  h.innerText = target.innerText;
  mainContent.prepend(h);
};
const createParagraph = (target, howMuchTimes) => {
  if (!howMuchTimes) return;

  const { innerText } = target;
  const paragraph = document.createElement("P");
  const textArr = texts
    .find((obj) => {
      return obj.identifier === innerText;
    })
    .text.split("");
  typeEffect(paragraph, textArr);

  setTimeout(() => {
    mainContent.appendChild(paragraph);
    return createParagraph(target, howMuchTimes - 1);
  }, 45);
};
const typeEffect = (paragraph, textArray) => {
  let i = 0;
  function recursive() {
    if (i >= textArray.length) return;
    paragraph.innerHTML += textArray[i];
    i++;
    setTimeout(recursive, 15);
  }
  recursive();
};
const generateStartContent = () => {
  const something = menuList.firstChild;
  handleList(something);
};
window.addEventListener("load", (event) => {
  fillMenuList(event);
  generateStartContent(event);
});
wrapper.addEventListener("click", delegateEvents);
