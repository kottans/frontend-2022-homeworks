const USER_NAME_EL = document.querySelector('#username');
const NATIONALITY_EL = document.querySelector('#nav__checkbox');
const GENDER_EL = document.querySelector('#nav__radio-gender');
const SORT_EL = document.querySelector('#nav__radio-sort');
const FORM_RESET = document.querySelector('#nav__form-reset');
const HEADER_BUTTON_EL = document.querySelector('#header__btn');
const NAV_EL = document.querySelector('#nav');
const FORM_OK = document.querySelector('#nav__form-ok');

let SETTINGS = {}
let ON_SETTINGS_CHANGE = () => { };

const ESort = {
    unsorted: 'unsorted',
    ageAZ: 'ageAZ',
    ageZA: 'ageZA',
    nameAZ: 'nameAZ',
    nameZA: 'nameZA',
}
const EGenderFilter = {
    all: 'all',
    male: 'male',
    female: 'female',
}
const ENationality = {
    UA: 'UA',
    US: 'US',
    DK: 'DK',
    FR: 'FR',
    GB: 'GB'
}

function onNavInputClick({ target }) {
    SETTINGS.userName = target.value;
    ON_SETTINGS_CHANGE({ settings: SETTINGS })
}
function onNavCheckboxNationalityClick({ target }) {
    if (target.checked) {
        SETTINGS.nationalityList.push(target.name);
    }
    else {
        SETTINGS.nationalityList = SETTINGS.nationalityList.filter(nationalityName => nationalityName !== target.name);
    };
    ON_SETTINGS_CHANGE({ settings: SETTINGS })
};
function onNavRadioGenderClick({ target }) {
    SETTINGS.gender = target.value;
    ON_SETTINGS_CHANGE({ settings: SETTINGS })
}
function onNavSortClick({ target }) {
    SETTINGS.sort = target.value;
    ON_SETTINGS_CHANGE({ settings: SETTINGS })
}
function onFormResetClick({ target }) {
    SETTINGS = { ...DEFAULT_SETTINGS }
    initSettings({ settings: SETTINGS, onSettingsChange: ON_SETTINGS_CHANGE })
    NAV_EL.classList.remove('visible');
    HEADER_BUTTON_EL.classList.remove('open')
}

function initSettings({ settings, onSettingsChange }) {
    SETTINGS = { ...settings };
    ON_SETTINGS_CHANGE = onSettingsChange;
    const userNameEl = document.querySelector('#username');
    userNameEl.value = settings.userName;

    const nationalityEl = document.querySelector('#nav__checkbox');
    const nationalityList = nationalityEl.querySelectorAll('input');
    nationalityList.forEach(checkbox => {
        checkbox.checked = settings.nationalityList.includes(checkbox.name);
    })

    const genderEl = document.querySelector('#nav__radio-gender');
    const genderList = genderEl.querySelectorAll('input');
    genderList.forEach(radio => {
        radio.checked = settings.gender === radio.value;
    })
    const sortEl = document.querySelector('#nav__radio-sort');
    const sortList = sortEl.querySelectorAll('input');
    sortList.forEach(radio => {
        radio.checked = settings.sort === radio.value;
    })
    ON_SETTINGS_CHANGE({ settings: SETTINGS })
}

function onHeaderButtonClick({ target }) {
    const headerLink = target.closest('#header__btn');
    headerLink.classList.toggle('open');
    if (headerLink.classList.contains('open')) {
        NAV_EL.classList.add('visible');
    } else {
        NAV_EL.classList.remove('visible');
    }
}
function onFormOkClick({target}){
    NAV_EL.classList.remove('visible');
    HEADER_BUTTON_EL.classList.remove('open')
}

USER_NAME_EL.addEventListener('input', onNavInputClick);
NATIONALITY_EL.addEventListener("change", onNavCheckboxNationalityClick);
GENDER_EL.addEventListener("change", onNavRadioGenderClick);
SORT_EL.addEventListener('input', onNavSortClick);
FORM_RESET.addEventListener('click', onFormResetClick);
FORM_OK.addEventListener('click', onFormOkClick);
HEADER_BUTTON_EL.addEventListener('click', onHeaderButtonClick);
