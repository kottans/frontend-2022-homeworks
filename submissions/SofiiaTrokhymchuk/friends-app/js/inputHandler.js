import { renderAllUsers } from "./renderUsers.js";
import { usersList} from "./UsersList.js";

function searchByName(users, enteredName){
    return users.filter(user => user.getFullName().toLowerCase().includes(enteredName.toLowerCase()));
}

function filterByGender(users, selectedGender){
    if(selectedGender !== 'allGenders'){
        return users.filter(user => user.getGender() === selectedGender);
    }else{
        return users;
    }
}

function sortUsers(users, sortingParameter){
    const sortingMethods = {
        unsortedUsers: () => {
            return users;
        },
        nameAscending: () => {
            return users.sort((currUser, nextUser) => currUser.getFullName().localeCompare(nextUser.getFullName()));
        },
        nameDescending: () => {
            return users.sort((currUser, nextUser) => nextUser.getFullName().localeCompare(currUser.getFullName()));
        },
        ageAscending: () => {
            return users.sort((currUser, nextUser) => currUser.getAge() - nextUser.getAge());
        },
        ageDescending: () => {
            return users.sort((currUser, nextUser) => nextUser.getAge() - currUser.getAge());
        }
    }
    return sortingMethods[sortingParameter]();
}

export function inputHandler(){
    const inputForm = document.getElementById('inputForm');
    inputForm.addEventListener('input', () => {
        let users = usersList;
        let selectedGender = inputForm.genderFilter.value;
        let selectedSorting = inputForm.sortingMethod.value;
        users = searchByName(users, inputForm.enteredName.value);
        clearInput(usersList, selectedGender, selectedSorting);
        users = filterByGender(users, inputForm.genderFilter.value);
        users = sortUsers(users, inputForm.sortingMethod.value);
        renderAllUsers(users);
    })
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
    })
}

function clearInput(users, selectedGender, selectedSorting){
    const closeIcon = document.getElementById('closeIcon');
    if(inputForm.enteredName.value !== ''){
        closeIcon.classList.add('active');
        closeIcon.addEventListener('click', () => {
            inputForm.enteredName.value = "";
            closeIcon.classList.remove('active');
            users = filterByGender(users, selectedGender);
            users = sortUsers(users, selectedSorting);
            renderAllUsers(users);
        })
    }
}
