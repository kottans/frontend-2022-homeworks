import { renderCards } from "./renderCards.js";

export function restartModalWindowHandler(){
    renderRestartModalWindow();
    closeRestartModalWindow();
}

function renderRestartModalWindow(){
    const main = document.querySelector('.main');
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');
    modalContainer.classList.add('modal-container');
    modalContainer.innerHTML = `
    <div class="modal-window">
        <h2 class="restart-title">Congratulations!</h2>
        <p class="restart-description">You did a great job! Now it's a great time to train your memory with cats again.
        Click the button below to restart the game.<p>
        <button class="restart-btn" id="restart_game_btn">Restart Game</button>
    </div>
    `;
    main.appendChild(modalContainer);
}

function closeRestartModalWindow(){
    const restartGameBtn = document.getElementById('restart_game_btn');   
    const modalContainer = document.getElementById('modal-container');
    restartGameBtn.addEventListener('click', () => {
        modalContainer.remove();
        renderCards();
    });
}
