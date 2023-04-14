import { popup, createChatPopup, showOptionsPopup } from './popups.js';
import syncURL from './historyAPI.js';
import { orderBy } from './filters.js';
import {
    users,
    filterForm,
    popupOverlay,
    bottomMenuFilterButton,
    bottomMenuFilter,
    bottomMenuOptionsButton,
    toTopButton,
} from './constants.js';

import {
    hasUsersToLoad,
    isSorted,
    usersData,
    sortedUsersData,
    renderPage,
    switchFlagsAndData
} from './render.js';

window.isFilterActive = false;
let isPopupActive = false;
let searchValue = filterForm.search.value;
let genderValue = filterForm.gender.value;
let orderValue = filterForm.sorters.value;

function handlerScroll() {
    if (!hasUsersToLoad) { return; }

    const position = window.scrollY + window.innerHeight >= (document.documentElement.scrollHeight / 1.25);

    if (position && !isSorted) {
        window.currentPage++;
        renderPage(usersData);
    }

    if (position && isSorted) {
        window.currentPage++;
        renderPage(sortedUsersData);
    }
}

function handlerFilter() {
    window.isFilterActive = true;
    searchValue = filterForm.search.value;
    genderValue = filterForm.gender.value;
    orderValue = filterForm.sorters.value;

    switchFlagsAndData(searchValue, genderValue);

    if (orderValue) { orderBy(orderValue); }

    if (sortedUsersData.length === 0) {
        const endWarning = `
            <div class="end-warning search-end-warning">
                No users with this username were found.
                <span class="end-warning__span">Try entering the username again.</span>
            </div>`;

        users.innerHTML = '';
        users.innerHTML = endWarning;

        return;
    }

    users.innerHTML = '';
    window.currentPage = 1;

    renderPage(sortedUsersData);

    syncURL({
        search: searchValue,
        gender: genderValue,
        orderBy: orderValue,
        page: String(window.currentPage)
    });
}

function deactivatePopup() {
    if (!isPopupActive) { return; }

    isPopupActive = false;
    bottomMenuOptionsButton.classList.remove('bottom-menu-button--active');
    popup.classList.add('hide');
    popupOverlay.classList.remove('active');
    popup.classList.remove('active');
    document.body.classList.remove('_scroll-lock');
    document.removeEventListener('keydown', handlerKeydownEscapeButton);
    document.removeEventListener('click', handlerClickNotOverChatPopup);
    document.removeEventListener('click', handlerClickNotOverOptionsPopup);
}

function handlerClickNotOverChatPopup(event) {
    if (!popup) { return; }

    const userCard = event.target.closest('.user-card');
    const click = event.composedPath().includes(popup) || event.composedPath().includes(userCard);

    if (!click) { deactivatePopup(); }
}

function handlerClickNotOverOptionsPopup(event) {
    if (!popup) { return; }

    const optionsButton = event.target.closest('.options-button');
    const click = event.composedPath().includes(popup) || event.composedPath().includes(optionsButton);

    if (!click) { deactivatePopup(); }
}

function handlerKeydownEscapeButton(event) {
    if (!popup) { return; }

    if (event.keyCode == 27) { deactivatePopup(); }
}

function handlerMessagesInput() {
    const messagesInput = document.querySelector('#messagesInput');

    if (!messagesInput.value.length) { return; }

    const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric' };
    const now = date.toLocaleTimeString('uk-UA', options);
    const messagesArea = document.querySelector('.chat__messages-area');
    const message = messagesInput.value;
    const messageWrapper = `
        <div class="message">
            <span class="message__time">${now}</span>
            <span class="message__text">${message}</span>
        </div>`;

    messagesArea.innerHTML += messageWrapper;
    messagesInput.value = '';
}

function handlerClickOnUserProfile(event) {
    isPopupActive = true;
    let userCard = event.target.closest('div.user-card');

    if (!userCard) return;
    if (!users.contains(userCard)) return;

    let avatar = userCard.querySelector('.user-card__avatar');
    let name = userCard.querySelector('.user-card__name');
    let age = userCard.querySelector('.user-card__info-age');
    let gender = userCard.querySelector('.user-card__info-gender');
    let city = userCard.querySelector('.user-card__location-city');
    let country = userCard.querySelector('.user-card__location-country');
    let status = userCard.querySelector('.user-card__status');

    createChatPopup(avatar, name, age, gender, city, country, status);
}

function handlerOptionsPopup() {
    isPopupActive = true;
    showOptionsPopup();
}

function handlerFilterPopup() {
    deactivatePopup();

    bottomMenuFilter.classList.toggle('sidebar-hide');
    popupOverlay.classList.toggle('active');
    document.body.classList.toggle('_scroll-lock');
    bottomMenuFilterButton.classList.toggle('bottom-menu-button--active');
    document.addEventListener('click', handlerClickNotOverMenuBottomFilter);
}

function handlerClickNotOverMenuBottomFilter(event) {
    if (!bottomMenuFilter) { return; }

    const filterButton = event.target.closest('.filter-button');
    const click = event.composedPath().includes(bottomMenuFilter) || event.composedPath().includes(filterButton);

    if (!click) {
        deactivatePopup();
        bottomMenuFilter.classList.add('sidebar-hide');
        popupOverlay.classList.remove('active');
        document.body.classList.remove('_scroll-lock');
        bottomMenuFilterButton.classList.remove('bottom-menu-button--active');
        document.removeEventListener('click', handlerClickNotOverMenuBottomFilter);
    }
}

function handlerTotopButton() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        toTopButton.classList.add('to-top-button--active');
        toTopButton.removeAttribute('disabled');
    } else {
        toTopButton.setAttribute('disabled', '');
        toTopButton.classList.remove('to-top-button--active');
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export {
    handlerClickOnUserProfile,
    handlerMessagesInput,
    handlerClickNotOverChatPopup,
    handlerClickNotOverOptionsPopup,
    handlerKeydownEscapeButton,
    handlerClickNotOverMenuBottomFilter,
    handlerScroll,
    handlerFilter,
    handlerOptionsPopup,
    searchValue,
    genderValue,
    orderValue,
    deactivatePopup,
    handlerFilterPopup,
    handlerTotopButton,
    scrollToTop
};
