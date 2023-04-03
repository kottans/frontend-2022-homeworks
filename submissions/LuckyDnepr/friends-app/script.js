import { filterAndSortUsers } from "./js/filterAndSortUsers.js";
import { renderUsersCards } from "./js/renderUsersCards.js";
import { urlPropsActions } from "./js/urlPropsActions.js";

const settingsURL = "./json/settings.json";

let settings, usersData, filteredAndSortedUsers;

const foundUsersNode = document.querySelector(".found_users"),
    filtersFormNode = document.querySelector(".filter_form"),
    textForSearchNode = document.querySelector(".text_search_input"),
    cssRoot = document.querySelector(":root");

(async () => {
    settings = await getData(settingsURL);
    pageStateOnLoad(settings);
    toggleLoaderAnimation();
    usersData = await getUsers(createRequestUrl(settings));
    renderFilteredAndSortedUsers();
    toggleLoaderAnimation();
    addShowMoreUsersButtonEventListener();
})();

function pageStateOnLoad(settings) {
    urlPropsActions.set("shownPages", "0");
    colorThemeStateOnLoadPage(settings);
    filtersFormStateOnLoadPage();
}

function toggleLoaderAnimation() {
    document.querySelector(".lds-ripple").classList.toggle("hide");
}

async function getUsers(url) {
    return (await getData(url)).results;
}

function createRequestUrl(settings) {
    const fieldsToFetch = settings.fetchOptions.userFields,
        numberOfTotalUsers = settings.fetchOptions.numberOfTotalUsers,
        nations = settings.fetchOptions.nations.join(",");
    return (
        `${settings.fetchOptions.baseURL}?inc=` +
        Object.keys(fieldsToFetch)
            .filter((key) => fieldsToFetch[key])
            .join(",") +
        `&results=${+numberOfTotalUsers}&nat=${nations}`
    );
}

async function getData(requestUrl) {
    try {
        const response = await fetch(requestUrl);
        const json = await response.json();
        return json;
    } catch (e) {
        renderErrorMessage();
    }
}

function renderFilteredAndSortedUsers() {
    foundUsersNode.innerHTML = "";
    urlPropsActions.set("shownPages", "0");
    const filtersFormData = new FormData(filtersFormNode);
    const filterAndSortSettings = {
        filtersFormData: filtersFormData,
        filtersFields: settings.filtersFields,
        sortTypeDecrypter: settings.sortTypeDecrypter,
        fieldsForSearchText: settings.fieldsForSearchText,
        textForSearch: textForSearchNode.value,
    };
    filteredAndSortedUsers = filterAndSortUsers(
        usersData,
        filterAndSortSettings
    );
    renderNextPageOfUsers(settings.usersPerPage);
    addShowMoreUsersButtonEventListener();
}

function renderNextPageOfUsers() {
    const shownPagesOfUsersCount = +urlPropsActions.get("shownPages"),
        usersPerPage = settings.usersPerPage;
    if (shownPagesOfUsersCount * usersPerPage < filteredAndSortedUsers.length) {
        renderUsersCards(filteredAndSortedUsers, foundUsersNode, usersPerPage);
        urlPropsActions.set("shownPages", +shownPagesOfUsersCount + 1);
    }
}

function colorThemeStateOnLoadPage(settings) {
    let colorTheme = urlPropsActions.get("colorTheme");
    if (colorTheme === null) {
        colorTheme = "light";
        urlPropsActions.set("colorTheme", colorTheme);
    }
    changeColorTheme(colorTheme, settings);
}

function filtersFormStateOnLoadPage() {
    const filtersFields = settings.filtersFields;
    filtersFields.forEach((field) => {
        let filter = urlPropsActions.get(field);
        if (filter !== null && filter !== "none") {
            filter = filter.split(",");
            filter.forEach((filterValue) => {
                Array.from(
                    document.querySelectorAll("input[type=checkbox]")
                ).find((input) => input.value == filterValue).checked = true;
            });
        }
    });
    const sortBy = urlPropsActions.get("sorting");
    if (sortBy) {
        document.querySelector("#" + sortBy).checked = true;
    }
}

function renderErrorMessage() {
    if (foundUsersNode) {
        foundUsersNode.innerHTML = `
        <div></div>
        <p class="error_massage">Ooops...</br>Something wrong with internet connection or server is busy.</br>Try later, please.</p>
        <div></div>`;
        toggleLoaderAnimation();
    } else {
    }
}

textForSearchNode.addEventListener("input", (e) => {
    renderFilteredAndSortedUsers();
});

filtersFormNode.addEventListener("click", (e) => {
    if (e.target.classList.contains("formSubmit")) {
        updatePropsInURL();
        renderFilteredAndSortedUsers();
    }
});

document
    .querySelector("#filters_menu_input")
    .addEventListener("change", (e) => {
        document.querySelector(".main_aside").classList.toggle("hide");
        document.querySelector(".main").classList.toggle("main_filter_hidden");
        document
            .querySelector(".main_content")
            .classList.toggle("main_filter_hidden");
    });

document.querySelector(".disable_sort_btn").addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentNode
        .querySelectorAll("input")
        .forEach((input) => (input.checked = false));
});

foundUsersNode.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") === "user_actions_preview") {
        e.target.classList.toggle("active");
        showMoreUserInfo(e);
    }

    function showMoreUserInfo(e) {
        e.path
            .find((node) => node.classList.contains("user_card"))
            .querySelector(".more_user_info")
            .classList.toggle("hide");
    }
});

document
    .querySelector("#theme_change_input_label")
    .addEventListener("click", (e) => {
        const currentColorTheme = urlPropsActions.get("colorTheme");
        let newColorTheme;
        if (currentColorTheme === "light") {
            urlPropsActions.set("colorTheme", "dark");
            newColorTheme = "dark";
            e.target.innerText = "Dark theme";
        } else {
            urlPropsActions.set("colorTheme", "light");
            newColorTheme = "light";
            e.target.innerText = "Light theme";
        }
        changeColorTheme(newColorTheme, settings);
    });

function changeColorTheme(newColorTheme, settings) {
    for (const cssVar in settings.themes[newColorTheme]) {
        cssRoot.style.setProperty(
            `--${cssVar}`,
            `${settings.themes[newColorTheme][cssVar]}`
        );
    }
}

function addShowMoreUsersButtonEventListener() {
    const showMoreBtn = document.querySelector("#show_more");
    if (showMoreBtn !== null) {
        showMoreBtn.addEventListener("click", renderNextPageOfUsers);
    }
}

function updatePropsInURL() {
    const filtersFormData = new FormData(filtersFormNode);
    const searchProps = [...settings.filtersFields, "sorting"];
    searchProps.forEach((field) => {
        const filterValues = filtersFormData.getAll(field);
        if (filterValues.length != 0) {
            urlPropsActions.set(field, filterValues.join(","));
        } else {
            urlPropsActions.del(field);
        }
    });
}
