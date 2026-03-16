//arr of characters

const characters = [
  {
    id: 1,
    check: 1,
    img: "./img/dio.webp",
  },
  {
    id: 2,
    check: 1,
    img: "./img/the_world.jpg",
  },
  {
    id: 3,
    check: 2,
    img: "./img/giorno.webp",
  },
  {
    id: 4,
    check: 2,
    img: "./img/gold_exp.webp",
  },
  {
    id: 5,
    check: 3,
    img: "./img/josuke.png",
  },
  {
    id: 6,
    check: 3,
    img: "./img/crazy_diamond.jpg",
  },
  {
    id: 7,
    check: 4,
    img: "./img/jotaro.webp",
  },
  {
    id: 8,
    check: 4,
    img: "./img/star_platinum.webp",
  },
  {
    id: 9,
    check: 5,
    img: "./img/kira.webp",
  },
  {
    id: 10,
    check: 5,
    img: "./img/killer_queen.webp",
  },
  {
    id: 11,
    check: 6,
    img: "./img/jolyne.webp",
  },
  {
    id: 12,
    check: 6,
    img: "./img/stone_free.webp",
  },
];

//creacting field for a game

const mainField = document.querySelector(".main-field");

var ourCharacters = characters.sort(function () {
  return 0.5 - Math.random();
});

var checkElements = [];

function createMainField(data) {
  const cards = data
    .map(
      (character) => `<div class="flip-container">
          <div id="${character.id}" class="flipper">
              <div data-id="${character.id}" class="front">
                  <img data-id="${character.id}" class="character-img" src="./img/logo.png">
              </div>
              <div class="back">
                  <img class="character-img" src="${character.img}">
              </div>
          </div>
      </div>`
    )
    .join("");
  mainField.innerHTML = cards;
}

createMainField(ourCharacters);

function reset(data) {
  ourCharacters = characters.sort(function () {
    return 0.5 - Math.random();
  });
  checkElements = [];
  createMainField(ourCharacters);
}

//flip func

function flip(id) {
  const card = document.getElementById(id);
  card.style.transform = "rotateY(180deg)";
}

//check

function checkCard(arr) {
  const card1Id = document.getElementById(arr[0]);
  const card1check = arr[1];
  const card2Id = document.getElementById(arr[2]);
  const card2check = arr[3];
  if (card1check == card2check) {
    checkElements = [];
  } else {
    checkElements = [];
    setTimeout(() => {
      card1Id.style.transform = "rotateY(0deg)";
      card1Id.parentElement.style.cursor = "pointer";
      card2Id.style.transform = "rotateY(0deg)";
      card2Id.parentElement.style.cursor = "pointer";
    }, 700);
  }
  setTimeout(() => {
    flipSwitch();
  }, 1000);
}

// flip switch

var flipArg = 1;

function flipSwitch() {
  if (flipArg) {
    flipArg = 0;
  } else {
    flipArg = 1;
  }
}

//event listener

const onClick = ({ target }) => {
  if (!target.dataset.id || !flipArg) {
    return;
  }
  const selectedCharacter = target.dataset.id;
  const { id, check } = characters.find(
    (character) => character.id == selectedCharacter
  );
  if (checkElements.length < 4) {
    document.getElementById(id).parentElement.style.cursor = "auto";
    flip(id);
    checkElements.push(id, check);
  }
  if (checkElements.length == 4) {
    checkCard(checkElements);
    flipSwitch();
  }
};

mainField.addEventListener("click", onClick);

//   help menu

const body = document.querySelector("body");

const helpContainer = document.querySelector(".help-menu");

function showHelp() {
  helpContainer.style.display = "flex";
  body.style.overflow = "clip";
}

function closeHelp() {
  helpContainer.style.display = "none";
  body.style.overflow = "auto";
}

