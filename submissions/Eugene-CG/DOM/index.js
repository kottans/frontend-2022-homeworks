// const container = document.querySelector("div.delegate-events-container");
// const popup = document.querySelector(".popup");
// const texts = [
//   {
//     inText: "HahahaOne",
//     html: `<h2>First Information</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore commodi unde  eos natus corporis nobis est voluptates excepturi ipsam repellat sit libero  perspiciatis quia praesentium, harum ab aliquam exercitationem minus?</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit  incidunt tenetur numquam debitis doloribus iusto voluptatem, ab fugit corporis  quisquam saepe vel omnis perferendis ex inventore odio totam? Dolorem?</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet excepturi  dolorum temporibus sequi beatae, facilis repellendus, tempore alias  consequuntur perferendis iste quisquam ea quae possimus delectus dicta ut  architecto similique.</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iste  sint eos nam vitae aperiam voluptate repellat modi optio, soluta quos deleniti  placeat necessitatibus tempora, aliquid inventore corporis delectus maiores.</p>`,
//   },
//   {
//     inText: "HahahaTwo",
//     html: `<h2>Second Information</h2><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde deleniti  placeat vel libero quae totam assumenda sed quaerat. Minus dolorum fugit  repudiandae totam tempora quos, unde reiciendis nemo neque id!</p><p>  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum ipsam nam  cupiditate deserunt ea officiis unde voluptates qui totam repellendus  voluptatem ex ullam exercitationem esse, voluptatum itaque culpa eius aperiam!</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium alias  quisquam, hic voluptatum explicabo perspiciatis natus eius, iste quas quae at  quos recusandae et, molestias corrupti illo blanditiis delectus deserunt?</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit repudiandae  tenetur doloremque porro quasi error fuga quos non necessitatibus eaque  tempora nemo similique laboriosam, excepturi sed laudantium, architecto nihil  facilis?</p>`,
//   },
//   {
//     inText: "HahahaThree",
//     html: `<h2>Third Information</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem  inventore omnis perspiciatis alias voluptatibus sequi quam atque sit, animi, id itaque hic accusantium doloremque ab deserunt. Ipsum ipsa architecto est?</p><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi veniam nobis  mollitia cupiditate dolores quisquam vitae eaque corrupti in vel, ipsam neque  iusto natus eos eum hic illo excepturi enim.</p><p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis laboriosam,  laborum aspernatur, quas, similique rerum labore nihil voluptatum praesentium  odit nostrum modi. Facilis a quidem, nulla laborum aut facere fuga.</p><p>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolore rerum  repellat dicta dolores nihil voluptatem voluptas maxime sunt exercitationem  cupiditate, deleniti, voluptate tenetur? Blanditiis rem ea rerum? Quae, sit!</p>`,
//   },
//   {
//     inText: "fouHahahaFourr",
//     html: `<h2>Four Information</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptas beatae  eius at, laudantium, veritatis eos totam hic molestiae saepe ad quos deserunt  itaque. Corporis aperiam consequuntur fuga eius earum?</p><p>  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, accusantium  delectus. Reiciendis libero ea vero nulla dolores voluptate sed pariatur  laboriosam molestiae, nostrum at fugiat ducimus vitae doloremque quaerat ab?</p><p>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque voluptates vel  nihil nostrum ullam beatae consequuntur nulla exercitationem reiciendis?  Deserunt neque nam cum totam quam debitis tenetur delectus fuga quidem.</p><p>  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut vero, tempora  quia deserunt ullam ea voluptatem ad ipsam quas quos voluptatibus  exercitationem magnam est pariatur soluta tempore placeat repudiandae omnis?</p>`,
//   },
// ];
// const delegateEvents = ({ target }) => {
//   const popupButton = target.closest(".popup-btn-input");
//   const menuList = target.closest(".menu__list");
//   const popupList = target.closest(".popup__list");
//   const popup = target.closest(".popup");

//   if (popupButton) showPopup();
//   if (menuList || popupList) handleList(target);
// };

// const showPopup = () => (popup.style.display = "block");
// const closePopup = (target) => {
//   if (target.closest(".popup__list-item")) popup.style.display = "none";
// };

// const handleList = (target) => {
//   if (
//     target.closest(".menu__list-item") ||
//     target.closest(".popup__list-item")
//   ) {
//     const className = target.className;
//     const findTextByClassName = texts.find((text) =>
//       className.includes(text.class)
//     ).html;

//     document.querySelector(".main__content").innerHTML = findTextByClassName;
//   }
//   closePopup(target);
// };

// container.addEventListener("click", delegateEvents);
// function startGame() {
//   // Invoke shuffle function and store in variable
//   const shuffledDeck = shuffle(deckCards);
//   // Iterate over deck of cards array
//   for (let i = 0; i < shuffledDeck.length; i++) {
//     // Create the <li> tags
//     const liTag = document.createElement("LI");
//     // Give <li> class of card
//     liTag.classList.add("card");
//     // Create the <img> tags
//     const addImage = document.createElement("IMG");
//     // Append <img> to <li>
//     liTag.appendChild(addImage);
//     // Set the img src path with the shuffled deck
//     addImage.setAttribute(
//       "src",
//       "https://github.com/FoxyStoat/memory-game/blob/master/assets/img/" +
//         shuffledDeck[i] +
//         "?raw=true"
//     );
//     // Add an alt tag to the image
//     addImage.setAttribute("alt", "image of vault boy from fallout");
//     // Update the new <li> to the deck <ul>
//     deck.appendChild(liTag);
//   }
// }
65;
const texts = new Map();
texts
  .set(
    "HahahaOne",
    `Lorem One one One one One one One one One One one One one One one One one One One one One one One
    one One one One One one One one One one One one Oneoneipsum dolor 
    sit amet consectetur adipisicing elit. 
    Ad, qui
    laboriosam? Est, et ex? Fugit, 
    quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`
  )
  .set(
    "HahahaTwo",
    `Lorem Two Two Two 
    Two Two Two Two Two Two Two Two Two Two Two
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, 
    quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`
  )
  .set(
    "HahahaThree",
    `Lorem Three Three Three Three Three Three Three Three Three Three Thr ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid
     cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`
  )
  .set(
    "HahahaFour",
    `Lorem Four Four Four Four Four Four Four Four Four Four Four Four Fo
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`
  )
  .set(
    "HahahaFive",
    `Lorem Five Five Five Five Five Five Five Five Five Five Five Five Fi
    ipsum dolor sit amet consectetur adipisicing elit. Ad, qui
    laboriosam? Est, et ex? Fugit, quidem aliquid cumque porro rerum
    maiores voluptate cupiditate deserunt tenetur distinctio mollitia
    inventore quo! Nostrum.`
  );
const wrapper = document.querySelector(".wrapper");
const mainContent = document.querySelector(".main__content");
const menuList = document.querySelector(".menu__list");
const defaultContent = mainContent.innerHTML;

const delegateEvents = (event) => {
  const { target } = event;
  if (target.closest(".menu__list")) handleList(target);
  if (target.closest(".logo")) backToDefaultContent();
  if (target.closest(".menu__popup-icon")) switchMenuPopup(target);
};
const switchMenuPopup = (target) => {
  menuList.classList.toggle("hide");
};
const handleList = (target) => {
  if (target.closest("LI") || target.closest("A")) {
    clearMainContent();
    createMainContent(target);
    switchMenuPopup(target);
  }
};
const createMainContent = (target) => {
  createTitleH(target);
  createParagraph(target, 5);
};
const backToDefaultContent = () => (mainContent.innerHTML = defaultContent);
const clearMainContent = () => (mainContent.innerHTML = "");
const createTitleH = (target) => {
  const h = document.createElement("H1");
  h.innerText = target.innerText;
  mainContent.prepend(h);
};
const createParagraph = (target, howMuchTimes) => {
  if (!howMuchTimes) return;
  if (!texts.has(target.innerText)) {
    throw new TypeError("Cannot read property of undefined");
  }
  const paragraph = document.createElement("P");
  typeEffect(paragraph, texts.get(target.innerText).split(""));
  setTimeout(() => {
    mainContent.appendChild(paragraph);
    return createParagraph(target, howMuchTimes - 1);
  }, 110);
};
const typeEffect = async (paragraph, textArray) => {
  let i = 0;
  function recursive() {
    if (i >= textArray.length) return;
    paragraph.innerHTML += textArray[i];
    i++;
    setTimeout(recursive, 20);
  }
  await recursive();
};
wrapper.addEventListener("click", delegateEvents);
