const url = 'https://randomuser.me/api/?results=12';
const content = document.querySelector('.articleBlock');
const form = document.forms;
let friends = [];
let friendsCopy = [];

const data = (url) => fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then(res => res.results)
    .then(res => {
        friends = [...res];
        friendsCopy = [...friends];
        renderAllItemsToPage(friends);
    });

function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
}

document.querySelector('.asideBlock').addEventListener('click', sortBy);
function sortBy({target}) {
    const id = target.id;

    switch(id) {
        case 'ageMore':
            friendsCopy = friendsCopy.sort((a, b) => a.dob.age - b.dob.age);
            break;
        case 'ageLess':
            friendsCopy = friendsCopy.sort((a, b) => b.dob.age - a.dob.age);
            break;
        case 'lastAToZ':
            friendsCopy = friendsCopy.sort((a, b) => a.name.last !== b.name.last ? a.name.last < b.name.last ? -1 : 1 : 0);
            break;
        case 'lastZToA':
            friendsCopy = friendsCopy.sort((a, b) => a.name.last !== b.name.last ? a.name.last > b.name.last ? -1 : 1 : 0);
            break;
        case 'male':
            form[0].reset();
            friendsCopy = friends.filter(item => item.gender === 'male');
            break;
        case 'female':
            form[0].reset();
            friendsCopy = friends.filter(item => item.gender === 'female');
            break;
        case 'all':
        case 'reset':
            form[0].reset();
            form[1].reset();    
            friendsCopy = [...friends];
            break;
    }

    renderAllItemsToPage(friendsCopy);
}

function creatingProfileCard({picture, name, email, dob, phone, location, gender}) {
    return `
        <div class='content__item'>
            <img class='content__item-img' src='${picture.medium}'>
            <div class='content__item-name'>${name.title} ${name.first} ${name.last}</div>
            <p class='content__item-p content__item-email'>
                <a class='content__item-a' href="mailto:  ${email}"   target="_blank"> ${email}</a>
            </p>
            <p class='content__item-p'>Age: ${dob.age}</p>
            <a class='content__item-a' href='${phone}'>${phone}</a>
            <p class='content__item-p content__item-country'>${location.country}, ${location.city}</p>
            <div class='content__item-gender'>${gender}</div>
        </div>
    `;
}

function renderAllItemsToPage(arr) {
    content.innerHTML = '';

    let acc = '';
    arr.forEach(item => {
        acc += creatingProfileCard(item);
    });

    content.innerHTML = acc;
}

data(url);