import getUsersData from './getData.js';
import syncURL from './historyAPI.js';
import { users } from './constants.js';
import { limitOfUsers, usersPerPage } from './appOptions.js';
import { searchByName, filterByGender, uncheckFilter } from './filters.js';

import {
    handlerScroll,
    handlerFilter,
    searchValue,
    genderValue,
    orderValue
} from './handlers.js';

window.currentPage = 1;

let usersData = [];
let sortedUsersData = [];
let tempContainer = '';
let hasUsersToLoad;
let isSorted = false;
let shouldLoad = true;

function generateUsersNetworkStatus() {
    const result = Math.floor(Math.random() * 2);
    if (result) {
        return 'online';
    } else {
        return 'offline';
    }
}

function composeUserCard(user) {
    const userStatus = generateUsersNetworkStatus();
    const userCard = `
        <div class="user-card">
            <span class="user-card__status user-card__status--${userStatus}">${userStatus}</span>
            <img class="user-card__avatar" src="${user.picture.large}"> 
            <span class="user-card__name">${user.name.first} ${user.name.last}</span>
            <div class="user-card__info">
                <span class="user-card__info-gender">${user.gender},</span>
                <span class="user-card__info-age">${user.dob.age} y.o</span>
            </div>
            <div class="user-card__location">
                <span class="user-card__location-city">${user.location.city},</span>
                <span class="user-card__location-country">${user.location.country}</span>
            </div>
        </div>`;

    return userCard;
}

function appendUserToTempContainer(user) {
    if (!user) { return; }

    const userCard = composeUserCard(user);

    tempContainer += userCard;
}

function renderUsers(data) {
    data.forEach((user) => appendUserToTempContainer(user));
    users.innerHTML += tempContainer;
    tempContainer = '';
}

function checkFilterState() {
    if (window.isFilterActive) {
        syncURL({
            search: searchValue,
            gender: genderValue,
            orderBy: orderValue,
            page: String(window.currentPage)
        });
    } else {
        syncURL({
            page: String(window.currentPage)
        });
    }
}



function renderPage(data) {
    if (!shouldLoad) { return; }

    let page = window.currentPage;
    page--;
    let startRange = usersPerPage * page;
    let endRange = startRange + usersPerPage;
    let paginatedData = data.slice(startRange, endRange);

    renderUsers(paginatedData);

    hasUsersToLoad = window.currentPage <= limitOfUsers / usersPerPage;

    if (!hasUsersToLoad) {
        shouldLoad = false;

        const endWarning = `
            <div class="end-warning">
                You have viewed all users. 
                <span class="end-warning__span"> You can increase the users limit in the settings.</span>
            </div>
        `;

        users.innerHTML += endWarning;
    }

    checkFilterState();
}

function switchFlagsAndData(searchValue, genderValue) {
    isSorted = true;
    shouldLoad = true;

    sortedUsersData = searchByName(searchValue);
    sortedUsersData = filterByGender(genderValue);
}

function resetFilter() {
    window.isFilterActive = false;
    isSorted = false;
    shouldLoad = true;
    users.innerHTML = '';
    window.currentPage = 1;
    uncheckFilter();
    renderPage(usersData);
    window.history.pushState(null, null, window.location.pathname);
}

async function renderFirstScreen() {
    usersData = await getUsersData();
    sortedUsersData = [...usersData];
    resetFilter(usersData);
}

export {
    isSorted,
    hasUsersToLoad,
    renderPage,
    handlerFilter,
    resetFilter,
    handlerScroll,
    renderFirstScreen,
    usersData,
    sortedUsersData,
    switchFlagsAndData,
    generateUsersNetworkStatus
};
