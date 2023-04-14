import { users } from './constants.js';
import { limitOfUsers } from './appOptions.js';
import loadingPlaceholder from './placeholder.js';

async function getUsersData() {
    loadingPlaceholder();
    document.querySelector('.sidebar').classList.add('_filter-lock');

    try {
        const response = await fetch(`https://randomuser.me/api/?results=${limitOfUsers}&seed=1&nat=ua`);

        if (!response.ok) { throw new Error(response.status); }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.warn(error);
        const endWarning = `
            <div class="end-warning error-end-warning">
                Ooops, something went wrong!
            <div>`;

        users.innerHTML = endWarning;
    } finally {
        document.querySelector('.sidebar').classList.remove('_filter-lock');
    }
}

export default getUsersData;
