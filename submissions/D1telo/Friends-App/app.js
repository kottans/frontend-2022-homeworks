let friendAppInit = () => {
    const uiElements = {
        userContentWrap: '.main-content__wrap',
        inputSearch: '.user-search',
        filterBlock: '.main-filter',
        BackButton: '.main-content__back',
        allGenderRadio: '.all-filter',
        resetFilterButton: '.main-filter__reset',
        header: '.header',
        sidebarMain: '.main-sidebar',
        closeFilterButton: '.main-filter__close',
        openFilterIcon: '.filter-open-icon',
        loaderWrap: '.loader-container'
    };

    for (let key in uiElements) {
        uiElements[key] = document.querySelector(uiElements[key]);
    }

    const radioFilter = document.querySelectorAll('.radio-filter');
    const urlAPI = "https://randomuser.me/api/?nat=de&results=12&page=";
    let pageCounter = 1;
    let usersArray = [];

    let filterState = {
        search: null,
        gender: null,
        sortName: null,
        sortAge: null
    };

    const debounce = (func, wait, immediate) => {
        let timeout;
        return function () {
            let context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    };

    let renderUsersList = (data) => {
        let usersContent = "";
        uiElements.userContentWrap.innerHTML = "";

        for (let i = 0, len = data.length; i < len; i++) {
            let userItem = data[i];
            usersContent += `
          <div class='main-content__item ${(userItem.gender === "male" ? "content-item-thumb-male" : "content-item-thumb-female")}'>
              <figure class='content-item-thumb'><img src='${userItem.picture.large}' alt='user-thumb'></figure>
              <h3 class='content-item-name'> ${userItem.name.first + " " + userItem.name.last}</h3>
              <div class='content-item'>Age: ${userItem.dob.age}</div>
              <div class='content-item'><span class='user-icon'>Phone:</span><a href='tel:${userItem.phone}'>${userItem.phone}</a></div>
              <div class='content-item'><span class='user-icon'></span><a href='mailto:${userItem.email}'>${userItem.email}</a></div>
              <div class='content-item'><span class='user-icon'></span>${userItem.location.city}</div>
          </div>`;
        }

        uiElements.userContentWrap.insertAdjacentHTML('afterbegin', usersContent);
        uiElements.loaderWrap.classList.remove('active');

    };

    const createUsersList = (data) => {
        usersArray = usersArray.concat(data.results);
        return usersArray;
    };

    const getUsers = (page) => {
        uiElements.loaderWrap.classList.add('active');
        let dataURL = urlAPI + page;
        return fetch(dataURL).then(response => response.json()).catch((error) => console.error(error));
    };

    const loadUsers = (page = 1) => {
        getUsers(page).then(createUsersList).then(renderUsersList).catch((error) => console.error(error));
    };

    loadUsers();

    const getFilteredUsersList = (usersArray, filterState) => {

        let copyUsersArray = usersArray.slice();

        if (filterState.gender) {
            copyUsersArray = copyUsersArray.filter((userItem) => userItem.gender === filterState.gender);
        }
        else if (filterState.search) {
            copyUsersArray = searchFilter(copyUsersArray, filterState.search);
        }
        else if (filterState.sortName === "desc") {
            copyUsersArray = copyUsersArray.sort((a, b) => sortedArrayDESC(a.name.first, b.name.first));
        }
        else if (filterState.sortName === "asc") {
            copyUsersArray = copyUsersArray.sort((a, b) => sortedArrayASC(a.name.first, b.name.first));
        }
        else if (filterState.sortAge === "desc") {
            copyUsersArray = copyUsersArray.sort((a, b) => sortedArrayDESC(a.dob.age, b.dob.age));
        }
        else if ((filterState.sortAge === "asc")) {
            copyUsersArray = copyUsersArray.sort((a, b) => sortedArrayASC(a.dob.age, b.dob.age));
        }

        return copyUsersArray;

    };

    const searchHandler = ({ target }) => {

        filterState.search = target.value;
        renderUsersList(getFilteredUsersList(usersArray, filterState));

    };

    const searchFilter = (necessaryArray, searchPhrase) => {

        let processedSearchPhrase = searchPhrase.toLowerCase();
        necessaryArray = necessaryArray.filter((userItem) => {

            return userItem.name.first.includes(processedSearchPhrase) || userItem.name.last.includes(processedSearchPhrase) || userItem.email.includes(processedSearchPhrase)

        });

        return necessaryArray;

    };

    uiElements.inputSearch.addEventListener('input', debounce(searchHandler, 2000));


    let sortedArrayASC = (a, b) => {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0;
    };

    let sortedArrayDESC = (a, b) => {
        if (a > b) return -1;
        else if (a < b) return 1;
        return 0;
    };

    const radioHandler = (event) => {

        if (event.target.classList.contains('age-asc-filter')) {
            filterState.sortAge = "asc";
            filterState.sortName = null;
        }
        else if (event.target.classList.contains('age-desc-filter')) {
            filterState.sortAge = "desc";
            filterState.sortName = null;
        }
        else if (event.target.classList.contains('name-asc-filter')) {
            filterState.sortName = "asc";
            filterState.sortAge = null;
        }
        else if (event.target.classList.contains('name-desc-filter')) {
            filterState.sortName = "desc";
            filterState.sortAge = null;
        }
        else if (event.target.classList.contains('all-filter')) {
            filterState.gender = "";
        }
        else if (event.target.classList.contains('men-filter')) {
            filterState.gender = "male";
        }
        else if (event.target.classList.contains('women-filter')) {
            filterState.gender = "female";
        }

        renderUsersList(getFilteredUsersList(usersArray, filterState));

    };

    let resetFilter = () => {

        uiElements.inputSearch.value = "";

        radioFilter.forEach(radioFilterItem => {
            radioFilterItem.checked = false;
        });

        uiElements.allGenderRadio.checked = true

        for (key in filterState) {
            filterState[key] = null;
        }

        renderUsersList(getFilteredUsersList(usersArray, filterState));

    };

    const BackUsers = () => {
        pageCounter++;
        resetFilter();
        loadUsers(pageCounter);
    };

    uiElements.filterBlock.addEventListener('change', radioHandler);
    uiElements.BackButton.addEventListener('click', BackUsers);
    uiElements.resetFilterButton.addEventListener('click', resetFilter);

    window.addEventListener('scroll', debounce(scrollHandler, 50));

    uiElements.closeFilterButton.addEventListener('click', () => {
        uiElements.sidebarMain.classList.add('main-sidebar-closed');
        uiElements.openFilterIcon.classList.add('filter-open-icon-visible');
    });

    uiElements.openFilterIcon.addEventListener('click', () => {
        uiElements.sidebarMain.classList.remove('main-sidebar-closed');
        uiElements.openFilterIcon.classList.remove('filter-open-icon-visible');
    });

};

document.addEventListener('DOMContentLoaded', mainHandler = () => {

    friendAppInit();
    document.removeEventListener('DOMContentLoaded', mainHandler);

});
