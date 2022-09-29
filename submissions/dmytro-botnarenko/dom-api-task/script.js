"use strict";

const rootElement = document.documentElement;
const body = document.body;
const modeSwitcher = document.querySelector(".switcher");
const modeSwitcherImage = document.querySelector(".switcher__image");
const menus = [
  document.querySelector(".main__navigation__menu__list"), 
  document.querySelector(".main__info__strip"),
];
const modeIcons = ["img/moon-icon.svg", "img/sun-icon.svg"];
const burger = document.querySelectorAll(".main__navigation__menu__burger");
const mainName = document.querySelector(".main__info__name");
const mainImage = document.querySelector(".main__info__figure__image");
const mainImageCaptionLink = document.querySelector(".main__info__figure__caption__link");
const mainText = document.querySelector(".main__info__text");
const mainTable = document.querySelectorAll("td");
const mainStripLinks = document.querySelectorAll(".main__info__strip__link");

let selectedLink;
let modeCounter = 0;


function changeModeImg() {
  modeCounter = (modeCounter + 1) % modeIcons.length;
  modeSwitcherImage.src = modeIcons[modeCounter];
}

function changeBurgerMode() {
  for (let element of burger) {
    element.classList.toggle("dark-burger-mode");
  }
}

const darkMode = document
  .querySelector(".switcher")
  .addEventListener("click", function darkMode() {
    rootElement.classList.toggle("dark-mode");
    body.classList.toggle("dark-mode");
    modeSwitcher.classList.toggle("dark-mode");
    mainStripLinks.forEach((node) => {
        node.classList.toggle("dark-strip-mode");
      }
    );
    changeModeImg();
    changeBurgerMode();
  });

menus.forEach(
  (element) => 
    (element.onclick = (event) => {
      const target = event.target.closest("a");
      if (!target) return;
      highlight(target);
      let characterId = event.target.getAttribute("id").slice(1);
      switchData(characterId);
    })
);

function highlight(a) {
  if (selectedLink) {
    selectedLink.classList.remove("highlight");
  }
  selectedLink = a;
  selectedLink.classList.add("highlight");
}

function switchData(characterId) {
  const chosen = characters.filter((character) => character.id === characterId)[0];
  mainName.innerHTML = chosen.name;
  mainImage.setAttribute("src", chosen.img);
  mainImage.setAttribute("alt", chosen.alt);
  mainImageCaptionLink.setAttribute("href", chosen.source);
  mainText.innerHTML = chosen.text;
  for (const entry of mainTable.values()) {
    let tableCell = entry.id;
    entry.innerHTML = chosen[tableCell];
  }
}

const characters = [
  {
    id: "jerry",
    name: "Jerry",
    fullname: "Jerry Mouse",
    species: "Mouse",
    img: "img/jerry_mouse.webp",
    gender: "Male",
    appearance: "Puss Gets the Boot",
    likes: "Cheese, escaping Tom",
    dislikes: "Getting injured, being retaliated",
    source: "https://en.wikipedia.org/wiki/Jerry_Mouse",
    alt: "Jerry Mouse",
    text: "Jeremy Adam \"Jerry\" Mouse is a fictional character and is one of two protagonists in Metro-Goldwyn Mayer's series of Tom and Jerry theatrical cartoon short films. Created by William Hanna and Joseph Barbera, he is a brown house mouse, who first appeared as an unnamed mouse in the 1940 MGM animated short Puss Gets the Boot. Hanna gave the mouse's original name as Jinx, while Barbera claimed the mouse went unnamed in his first appearance.",
  },
  {
    id: "tom",
    name: "Tom",
    fullname: "Thomas Jasper \"Tom\" Cat Sr.",
    species: "Cat",
    img: "img/tom_cat.webp",
    gender: "Male",
    appearance: "Puss Gets the Boot",
    likes: "Milk, Fish, Catching Mice",
    dislikes: "Getting injured, being retaliated",
    source: "https://tomandjerry.fandom.com/wiki/Tom_Cat",
    alt: "Tom Cat",
    text: "Thomas “Tom” Cat (originally known as Jasper Cat in Puss Gets the Boot) is one of the two protagonists in Tom and Jerry, created by William Hanna and Joseph Barbera. He is a bluish-gray anthropomorphic domestic short-haired cat who first appeared in the 1940 animated short Puss Gets the Boot. Tom was originally known as Jasper during his debut in that short, however, beginning from his next appearance in The Midnight Snack and onwards his current name was used. In the fighting game MultiVersus, however, Tom's full name is said to be Thomas Jasper \"Tom\" Cat, Sr.",
  },
  {
    id: "spike",
    name: "Spike",
    fullname: "Spike Bulldog",
    species: "Dog",
    img: "img/spike_bulldog.webp",
    gender: "Male",
    appearance: "Dog Trouble",
    likes: "Tyke, Jerry, Peace and Quiet, Sleeping, Meat",
    dislikes: "Cats, Being disturbed, Noise",
    source: "https://hero.fandom.com/wiki/Spike_Bulldog",
    alt: "Spike Bulldog",
    text: "In his very first appearance, Dog Trouble, Spike is the main antagonist, chasing and attacking both Tom and Jerry on sight, even trying to eat Jerry, which forced the two to work together to defeat him. In all subsequent shorts, Spike becomes typecast as the stereotypical dumb brute who is always duped into becoming a shield for Jerry from Tom. It is only in two episodes where Jerry gets Spike out of a jam and the dog willingly protects him from Tom in well-earned gratitude. On most occasions, Jerry causes trouble for Tom by luring him near Spike and harming him to get him angry, and in some cartoons when its perfectly obvious that Tom is not responsible, Spike still blames Tom and hurts him instead of Jerry.",
  },
  {
    id: "tyke",
    name: "Tyke",
    fullname: "Tyke Bulldog",
    species: "Dog",
    img: "img/tyke_bulldog.webp",
    gender: "Male",
    appearance: "Love That Pup",
    likes: "Spike, Jerry, Barking, Chasing cats",
    dislikes: "Cats",
    source: "https://tomandjerry.fandom.com/wiki/Tyke_Bulldog",
    alt: "Tyke Bulldog",
    text: "Tyke Bulldog is a gray bulldog puppy and is the son of Spike Bulldog, appearing in Tom and Jerry cartoon series and is mostly seen with his father Spike, he made his debut in the 1949 short Love That Pup. Like his father Spike, Tyke also hates Tom just like his father ever since Tom hung him on a flag post. Ever since he was born, all the episodes Tyke was in included himself or his and Spike's lunch being tormented by Tom.",
  },
  {
    id: "nibbles",
    name: "Nibbles",
    fullname: "Nibbles Mouse",
    species: "Mouse",
    img: "img/nibbles_mouse.webp",
    gender: "Male",
    appearance: "The Milky Waif",
    likes: "Food",
    dislikes: "Cats, Being Hungry",
    source: "https://tomandjerry.fandom.com/wiki/Nibbles_Mouse",
    alt: "Nibbles Mouse",
    text: "Nibbles \"Tuffy\" Mouse (also known as Tuffy Mouse) is the tritagonist from the Tom and Jerry franchise. He is the little grey, diaper-wearing orphan mouse whose cartoon debut came in the 1946 short The Milky Waif. Nibbles was later featured in the 1949 award-winning short The Little Orphan. Nibbles is wearing a diaper is due to the fact that he is a young mouse.",
  },
  {
    id: "mammy",
    name: "Mammy Two Shoes",
    fullname: "Mammy Two Shoes aka \"Dinah\"",
    species: "Human",
    img: "img/mammy_two_shoes.webp",
    gender: "Female",
    appearance: "Puss Gets the Boot",
    likes: "Order in the House",
    dislikes: "Noise, Mice, Mess in the House",
    source: "https://tomandjerry.fandom.com/wiki/Mammy_Two_Shoes",
    alt: "Mammy Two Shoes",
    text: "Mammy Two Shoes (also known as Mammy, Mammy Two-Shoes, or Dinah in the 1940s Tom and Jerry comics) is a recurring disappeared in 19 of MGM\'s Tom and Jerry cartoons. She is a heavy-set, middle-aged African-American woman who often has to deal with the mayhem generated by the lead characters, but whether she is the owner of the home or merely the house-keeper is never really made clear. She is based on the \"Mammy\" archetype that was prevalent throughout the U.S. in the 19th and early 20th century, during which Tom & Jerry gained popularity.",
  },
  {
    id: "uncle",
    name: "Uncle Pecos",
    fullname: "Uncle Pecos Mouse",
    species: "Mouse",
    img: "img/uncle_pecos.webp",
    gender: "Male",
    appearance: "Pecos Pest",
    likes: "Songs, Play Guitar",
    dislikes: "To be interrupted when singing",
    source: "https://vsbattles.fandom.com/wiki/Uncle_Pecos",
    alt: "Uncle Pecos",
    text: "Uncle Pecos is Jerry's cow-boyish uncle who appeared in the Tom and Jerry short \"Pecos Pest\", who wanted to stay with Jerry to visit. He is known to be always singing with a guitar, with a black cowboy hat that covers his eyes. He tries to get one of Tom's whiskers every time one of his guitar strings snap, because he plucks one whisker off of his face to replace it, and, at one point, took one of Tom's claws to use as a guitar pick. He is voiced by Shug Fisher in Tom and Jerry and Scott McNeil in Tom and Jerry Tales. He also appears in The Tom and Jerry Show (2014) voiced by Stephen Stanton.",
  },
  {
    id: "toodles",
    name: "Toodles Galore",
    fullname: "Toodles Galore",
    species: "Cat",
    img: "img/toodles_galore.webp",
    gender: "Female",
    appearance: "The Alley Cat",
    likes: "Valuables, Vacation",
    dislikes: "Dirt, Indifferent persons",
    source: "https://tomandjerry.fandom.com/wiki/Toodles_Galore",
    alt: "Toodles Galore",
    text: "Toodles Galore (also known as Toots in Tom and Jerry in New York) is a character in the Tom and Jerry series. She has white fur, wears a neck ribbon, and is considered attractive by other characters. Prior to her debut in the Tom and Jerry short Springtime for Thomas (1946), a white female cat resembling a prototype version of Toodles previously appeared (alongside a black alley cat resembling a prototype version of Butch Cat) in the one-shot MGM cartoon The Alley Cat (1941) directed by Hugh Harman. A character model sheet for the short refers to her as \"The Lady Cat\".",
  },
];
