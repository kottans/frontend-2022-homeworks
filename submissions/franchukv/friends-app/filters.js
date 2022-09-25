import { sortedUsersData, usersData } from '../modules/render.js';

function searchByName(searchQuery) {
    return [...usersData].filter((user) =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
}

function filterByGender(gender) {
    if (gender === 'all' || !gender) { return sortedUsersData; }

    return sortedUsersData.filter((user) => user.gender === gender);
}

function compareByAge(firstUser, secondUser) {
    return firstUser.dob.age - secondUser.dob.age;
}

function compareByName(firstUser, secondUser) {
    return `${firstUser.name.first} ${firstUser.name.last}` > `${secondUser.name.first} ${secondUser.name.last}` ? 1 : -1;
}

function orderBy(order) {
    if (order === 'ageASC') { sortedUsersData.sort(compareByAge); }

    if (order === 'ageDESC') { sortedUsersData.sort((a, b) => compareByAge(b, a)); }

    if (order === 'nameASC') { sortedUsersData.sort(compareByName); }

    if (order === 'nameDESC') { sortedUsersData.sort((a, b) => compareByName(b, a)); }
}

function uncheckFilter() {
    document.getElementsByName('search')[0].value = '';

    document.getElementsByName('gender')[0].checked = false;
    document.getElementsByName('gender')[1].checked = false;
    document.getElementsByName('gender')[2].checked = true;

    for (let i = 0; i < document.getElementsByName('sorters').length; i++) {
        document.getElementsByName('sorters')[i].checked = false;
    }
}

export {
    orderBy,
    searchByName,
    filterByGender,
    uncheckFilter
};
