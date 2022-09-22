const popup = document.querySelector('#popup');
const startGame = document.querySelector('#startGame');
const controlPanel = document.querySelector('#controlPanel');
const time = document.querySelector('#timeOutput');
const score = document.querySelector("#attemptNumOutput");
const board = document.querySelector('#board');
const gameManager = new GameManager(board, score, time);

startGame.addEventListener('click', startGameHandler);
    
function startGameHandler(e) {
    e.preventDefault();
    popup.classList.toggle('active');
    controlPanel.classList.toggle('active');
    board.classList.toggle('active');
    gameManager.startGame();
}

board.addEventListener("click", function (e) {
    e.preventDefault();
    const clickedCard = e.target.closest('.flip-container');
    if (clickedCard && clickedCard.connectedCard) {
        gameManager.selectCard(clickedCard.connectedCard);
    }
});
