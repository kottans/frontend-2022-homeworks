import { User } from "./User.js";

const USERS_URL = 'https://randomuser.me/api/?results=50';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

async function getUsers(url){
    try{
        const response = await handleErrors(await fetch(url));
        const fetchedData = await response.json();
        const users = await fetchedData.results;
        return users;
    }catch(error){
        alert('Something went wrong...\n' + error);
    }
}

function createUserObject(user){
    return new User(user.name.first, 
        user.name.last, 
        user.gender, 
        user.dob.age,
        user.location.country,
        user.phone,
        user.picture.large);
}

function createAllUsersObjects(users){
    return users.map(user => createUserObject(user));
}

export let usersList = createAllUsersObjects(await getUsers(USERS_URL));
