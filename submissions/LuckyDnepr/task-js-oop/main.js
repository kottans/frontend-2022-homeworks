"use strict";

import { Engine } from "./engine.js";

const doc = window.document,
  enemyAvatar = "images/enemy-bug.png",
  playerAvatars = [
    "images/chibi-1.png",
    "images/chibi-2.png",
    "images/chibi-3.png",
    "images/chibi-4.png",
    "images/chibi-5.png",
    "images/chibi-6.png",
    "images/chibi-7.png",
    "images/chibi-8.png",
  ];

let difficulty = 2;

(function main() {
  renderWelcomeInterface();
  addWelcomeEventsLiteners();
  addSwipeEventListener();
  addKeyUpEventListener();
})();

function renderWelcomeInterface() {
  const mainDiv = doc.createElement("div");
  mainDiv.classList.add("main");
  mainDiv.innerHTML = `
      <div class="player-change">
        <h1 class="title">Classic Frogger Game</h1>
        <div class="avatar-diff">
          <div class="difficulty">
              <label id="diff-label" for="difficulty">Difficulty</label>
              <input id="diff-input" type="range" min="1" max="4" step="1" value="${difficulty}">
          </div>
              <img class="avatar" src="images/chibi-1.png" alt="game-avatar" data-avatar="0">
        </div>
            <div class="prev-next-buttons">
              <button class="btn" id="btn-prev">Previous</button>
              <button class="btn" id="btn-next">Next</button>
            </div>
            <button class="btn" id="btn-start">Play game STANDART</button>
        </div>
      </div>
      `;

  doc.body.appendChild(mainDiv);
}

function addWelcomeEventsLiteners() {
  doc
    .querySelector("#btn-next")
    .addEventListener("click", (e) => nextAvatar(e));

  doc
    .querySelector("#btn-prev")
    .addEventListener("click", (e) => prevAvatar(e));

  doc
    .querySelector("#diff-input")
    .addEventListener("input", (e) => changeDifficulty(e));

  doc
    .querySelector("#btn-start")
    .addEventListener("click", (e) => startGame(e));
}

function addKeyUpEventListener() {
  doc.addEventListener("keyup", function (e) {
    //keyboard handler for move player
    const allowedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (allowedKeys.includes(e.code)) {
      player.handleInput(e.code);
    }
  });
}

function addSwipeEventListener() {
  doc.addEventListener("touchstart", handleTouchStart, false); //swipes handler for move player
  doc.addEventListener("touchmove", handleTouchMove, false); //swipes handler for move player

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX; //finger down
    yDown = firstTouch.clientY; //finger down
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX; //finger up
    var yUp = evt.touches[0].clientY; //finger up

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
        player.handleInput("ArrowLeft");
      } else {
        /* right swipe */
        player.handleInput("ArrowRight");
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        player.handleInput("ArrowUp");
      } else {
        /* down swipe */
        player.handleInput("ArrowDown");
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}

function nextAvatar(e) {
  e.preventDefault();
  const avatarPicture = doc.querySelector(".avatar"),
    n = avatarPicture.dataset.avatar;
  if (n == playerAvatars.length - 1) {
    avatarPicture.src = playerAvatars[0];
    avatarPicture.dataset.avatar = 0;
  } else {
    avatarPicture.src = playerAvatars[+n + 1];
    avatarPicture.dataset.avatar = +n + 1;
  }
}

function prevAvatar(e) {
  e.preventDefault();
  const avatarPicture = doc.querySelector(".avatar"),
    n = avatarPicture.dataset.avatar;
  if (n == 0) {
    avatarPicture.src = playerAvatars[playerAvatars.length - 1];
    avatarPicture.dataset.avatar = playerAvatars.length - 1;
  } else {
    avatarPicture.src = playerAvatars[+n - 1];
    avatarPicture.dataset.avatar = +n - 1;
  }
}

function changeDifficulty(e) {
  switch (e.target.value) {
    case "1":
      difficulty = 1;
      doc.querySelector("#btn-start").innerHTML = "Play game EASY";
      break;
    case "2":
      difficulty = 2;
      doc.querySelector("#btn-start").innerHTML = "Play game NORMAL";
      break;
    case "3":
      difficulty = 3;
      doc.querySelector("#btn-start").innerHTML = "Play game HARD";
      break;
    case "4":
      difficulty = 4;
      doc.querySelector("#btn-start").innerHTML = "Play game HARDEST";
      break;
    default:
      break;
  }
}

function startGame(e) {
  e.preventDefault();
  allEnemies.length = difficulty * 3; //change quantity of enemies
  player.setAvatar(playerAvatars[+doc.querySelector(".avatar").dataset.avatar]); //assign player avatar
  allEnemies.forEach((enemy) => enemy.setAvatar(enemyAvatar)); //assign enemies avatar
  doc.querySelector(".player-change").remove(); //remove welcome interface
  renderGamePlayDOM(window); //render game field and etc.
  Engine(window); //run game engine
  player.unfreezing(); //unfreezing player
}

function renderGamePlayDOM() {
  const mainDiv = doc.createElement("div");
  mainDiv.classList.add("main");
  mainDiv.innerHTML = `
          <div class="container" id="game-container">
          <button id="goFullScreen">GO to Full Screen Mode</button>
            <div class="points">
              <p class="points-show">Wins: <span id="win-points">${winPoints}</span></p>
              <p class="points-show">Fails: <span id="fail-points">${failPoints}</span></p>
            </div>
            <img class="win" src="images/win-banner.png" alt="You win!">
            <img class="lose" src="images/lose-banner.png" alt="You lose!">
            <canvas class="game-field" width="505" height="606">
          </div>
          `;
  doc.querySelector(".main").replaceWith(mainDiv);
  goFullScreenButtonListener();
}

function goFullScreenButtonListener() {
  doc.querySelector("#goFullScreen").addEventListener("click", (e) => {
    e.preventDefault();
    if (!doc.fullscreenElement) {
      e.target.innerText = "EXIT from Full Screen Mode";
      e.target.style.marginTop = "0.5em";
      doc.querySelector(".main").requestFullscreen();
      e.target.style.fontSize = "12px";
      doc.querySelector(".points").style.fontSize = "18px";
      doc.querySelector("#win-points").style.fontSize = "18px";
      doc.querySelector("#fail-points").style.fontSize = "18px";
    } else {
      e.target.innerText = "GO to Full Screen Mode";
      doc.exitFullscreen();
      e.target.style.fontSize = "";
      e.target.style.marginTop = "";
      doc.querySelector(".points").style.fontSize = "";
      doc.querySelector("#win-points").style.fontSize = "";
      doc.querySelector("#fail-points").style.fontSize = "";
    }
  });
}
