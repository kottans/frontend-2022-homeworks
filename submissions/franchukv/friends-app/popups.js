import {
    popupChatContainer,
    popupOverlay,
    bottomMenuFilter,
    bottomMenuFilterButton,
    bottomMenuOptionsButton
} from './constants.js';

import {
    handlerClickOnUserProfile,
    handlerMessagesInput,
    handlerClickNotOverChatPopup,
    handlerKeydownEscapeButton,
    handlerClickNotOverOptionsPopup,
    deactivatePopup,
    handlerClickNotOverMenuBottomFilter
} from './handlers.js';

let popup;

function createChatPopup(avatar, name, age, gender, city, country, status) {
    const popupHTML = `
    <div class="popup popup-chat">
        <button class="popup-closer popup-closer-chat"></button>
        <div class="user-info">
            <img class="user-info__avatar" src="${avatar.src}">
            <div class="user-info__text">
            <div class="user-info__text__name__container">
                <span class="user-info__text__name">${name.innerText}</span>
                <span class="user-info__text__status user-info__text__status--${status.innerText}">${status.innerText}</span>
            </div>
            <div class="user-info__text__subtext">
                <span class="user-info__text__subtext__gender">${gender.innerText}</span>
                <span class="user-info__text__subtext__age">${age.innerText}</span>
            </div>
            <div class="user-info__text__location">
                <span class="user-info__text__location__city">${city.innerText}</span>
                <span class="user-info__text__location__country">${country.innerText}</span>
            </div>
            </div>
        </div>
        <div class="chat">
            <div class="chat__messages-area"></div>
        </div>
        <form id="chatForm" onsubmit="return false">
            <input id="messagesInput" type="text" placeholder="Send a message" autocomplete="off">
            <button type="submit" id="messagesSendButton"></button>
        </form>
    </div>`;

    popupChatContainer.innerHTML = popupHTML;
    popup = document.querySelector('.popup-chat');

    const chatForm = document.querySelector('#chatForm');
    const popupCloserButton = document.querySelector('.popup-closer-chat');

    document.body.classList.add('_scroll-lock');
    popupOverlay.classList.add('active');

    popupCloserButton.addEventListener('click', deactivatePopup);
    chatForm.addEventListener('submit', handlerMessagesInput);
    document.addEventListener('keydown', handlerKeydownEscapeButton);
    document.addEventListener('click', handlerClickNotOverChatPopup);
}

function showOptionsPopup() {
    const popupCloserButton = document.querySelector('.popup-closer-options');

    popup = document.querySelector('.popup-options');

    bottomMenuOptionsButton.classList.add('bottom-menu-button--active');
    popup.classList.add('active');
    popupOverlay.classList.add('active');
    document.body.classList.add('_scroll-lock');
    bottomMenuFilter.classList.add('sidebar-hide');

    bottomMenuFilterButton.classList.remove('bottom-menu-button--active');
    document.removeEventListener('click', handlerClickNotOverMenuBottomFilter);

    if (popup.classList.contains('hide')) {
        popup.classList.remove('hide');
    }

    popupCloserButton.addEventListener('click', deactivatePopup);
    document.addEventListener('keydown', handlerKeydownEscapeButton);
    document.addEventListener('click', handlerClickNotOverOptionsPopup);
}

export {
    handlerClickOnUserProfile,
    popup,
    createChatPopup,
    showOptionsPopup
};
