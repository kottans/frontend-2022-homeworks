import { initAppOptions } from './modules/appOptions.js';
import { handlerClickOnUserProfile } from './modules/popups.js';
import {
    handlerOptionsPopup,
    handlerFilterPopup,
    handlerTotopButton,
    scrollToTop
} from './modules/handlers.js';

import {
    users,
    filterForm,
    resetButton,
    sideBarOptionsButton,
    bottomMenuOptionsButton,
    bottomMenuFilterButton,
    toTopButton
} from './modules/constants.js';

import {
    handlerFilter,
    resetFilter,
    handlerScroll,
    renderFirstScreen,
} from './modules/render.js';

(async () => {
    renderFirstScreen();

    window.addEventListener('scroll', handlerScroll);
    filterForm.addEventListener('input', handlerFilter);
    resetButton.addEventListener('click', resetFilter);
    users.addEventListener('click', handlerClickOnUserProfile);
    sideBarOptionsButton.addEventListener('click', handlerOptionsPopup);
    bottomMenuOptionsButton.addEventListener('click', handlerOptionsPopup);
    bottomMenuFilterButton.addEventListener('click', handlerFilterPopup);
    toTopButton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handlerTotopButton);

    initAppOptions();
})();
