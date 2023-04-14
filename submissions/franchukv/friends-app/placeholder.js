import { limitOfUsers, usersPerPage } from './appOptions.js';
import { users } from './constants.js';

function loadingPlaceholder() {
    let placeholderCounter = limitOfUsers < usersPerPage ? limitOfUsers : usersPerPage;
    let placeholderContainer = ``;
    const placeholder = `
        <div class="ph-container">
            <div class="ph-picture"></div>
            <div class="ph-row">
                <div class="ph-col ph-col-first"></div>
                <div class="ph-col ph-col-central"></div>
                <div class="ph-col ph-col-last"></div>
            </div>
        </div>`;

    for (let i = 0; i < placeholderCounter; i++) {
        placeholderContainer += placeholder;
    }

    users.innerHTML = placeholderContainer;
}

export default loadingPlaceholder;
