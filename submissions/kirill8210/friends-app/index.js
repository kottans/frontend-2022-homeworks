import getData from './getData.js';
import removeMenu from './mobile.js';

const app = document.querySelector('.main');

let data = [];
let response = [];

const createCard = (data2) => {
    const { name, gender, email, phone, picture, dob } = data2;

    const card = document.createElement('article');
    card.classList.add('card');

    let phones = Number(phone.replace(/\D+/g,''));
    if (phones.toString().length === 6) {
        phones = '0000' + phones
    } else if (phones.toString().length === 7) {
        phones = '000' + phones
    } else if (phones.toString().length === 8) {
        phones = '00' + phones
    } else if (phones.toString().length === 9) {
        phones = '0' + phones
    } else if (phones.toString().length === 11 || phones.toString().length === 12 || phones.toString().length === 13) {
        phones = phones.toString().replace(phones.toString(), phones.toString().slice(-10))
    }
    let result = phones.toString().replace(/^(.{3})(.{3})(.{2})(.*)$/, "($1) $2-$3-$4");

    if(gender === 'female') {
        card.classList.add('female');
    }

    card.insertAdjacentHTML('afterbegin', ` 
        <h2 class="card_name">${name.first} ${name.last}</h2>
        <div>
            <div class="card_block_img"><img class="card_img" src="${picture.large}" alt="${name.first}"></div>
            <p class="card_age">I am ${dob.age} years old</p>
            <p class="card_email">${email}</p>
            <p class="card_phone"><a href="tel:${phones}">${result}</a></p>
        </div>
        <p class="card_human" id="card_human">${gender}</p>       
    `);

    return card;
};

const sortAge = document.querySelector('.sort_by_age');
const sortListAge = document.querySelector('.sorts_list_age');
const sortIdAge = document.querySelector('#sort_by_age');
const sortName = document.querySelector('.sort_by_name');
const sortListName = document.querySelector('.sorts_list_name');
const sortIdName = document.querySelector('#sort_by_name');
const filterIdGender = document.querySelector('#filters_gender');
const inputSearch = document.querySelector('#search_friends');
const reset = document.querySelector('.reset_button');
const inputAll = document.querySelector('#all');

let genders = Array.from(document.getElementsByName("gender")).find(r => r.checked).value;

sortAge.addEventListener('click', () => {
    sortListAge.classList.toggle('sorts_list_active');
    sortListName.classList.remove('sorts_list_active');
});

sortListAge.addEventListener('click', ({target}) => {
    if (target.classList.contains('sorts_options')) {
        sortAge.textContent = target.textContent;
        sortIdAge.value = target.dataset.sort;
        sortName.textContent = 'Sort by Name';
        if (genders === 'all') {
            const newData = sortByAge();
            renderCards(newData);
        } else {
            const newData = sortByAge().filter(data => data.gender === genders);
            renderCards(newData);
        }
        setTimeout(() => {
            removeMenu();
        }, 500);
        sortListAge.classList.remove('sorts_list_active');
    }
});

sortName.addEventListener('click', () => {
    sortListName.classList.toggle('sorts_list_active');
    sortListAge.classList.remove('sorts_list_active');
});

sortListName.addEventListener('click', ({target}) => {
    if (target.classList.contains('sorts_options')) {
        sortName.textContent = target.textContent;
        sortIdName.value = target.dataset.sort;
        console.log(sortIdName.value);
        sortAge.textContent = 'Sort by Age';
        if (genders === 'all') {
            const newData = sortByName();
            renderCards(newData);
        } else {
            const newData = sortByName().filter(data => data.gender === genders);
            renderCards(newData);
        }
        setTimeout(() => {
            removeMenu();
        }, 500);
        sortListName.classList.remove('sorts_list_active');
    }
});

filterIdGender.addEventListener('click', ({target}) => {
    if (target.classList.contains('gender')) {
        genders = target.value;
        const newData = filterByGender();
        renderCards(newData);
        setTimeout(() => {
            removeMenu();
        }, 500);
    }
});

const sortByAge = () => {
    if (inputSearch.value.length !== 0) {
        const fByG = filterByGender()
        const sByF = fByG.filter(data => data.name.first.toLowerCase().includes(inputSearch.value.toLowerCase()));
        switch (sortIdAge.value) {
            case 'up':
                return sByF.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
                break;
            case 'down':
                return sByF.sort((a, b) => b.dob.age > a.dob.age ? 1 : -1);
                break;
            default:
                return sByF.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
        }
    } else {
        switch (sortIdAge.value) {
            case 'up':
                return data.sort((a, b) => a.dob.age > b.dob.age ? 1 : -1);
                break;
            case 'down':
                return data.sort((a, b) => b.dob.age > a.dob.age ? 1 : -1);
                break;
            default:
                return data;
        }
    }
};

const sortByName = () => {
    if (inputSearch.value.length !== 0) {
        const fByG = filterByGender();
        const sByF = fByG.filter(data => data.name.first.toLowerCase().includes(inputSearch.value.toLowerCase()));
        switch (sortIdName.value) {
            case 'fromA':
                return sByF.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
                break;
            case 'fromZ':
                return sByF.sort((a, b) => b.name.first > a.name.first ? 1 : -1);
                break;
            default:
                return sByF.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
        }
    } else {
        switch (sortIdName.value) {
            case 'fromA':
                return data.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
                break;
            case 'fromZ':
                return data.sort((a, b) => b.name.first > a.name.first ? 1 : -1);
                break;
            default:
                return data
        }
    }

};

const filterByGender = () => {
    if (inputSearch.value.length > 0) {
        const sByF = data.filter(data => data.name.first.toLowerCase().includes(inputSearch.value.toLowerCase()));
        switch (genders) {
            case 'male':
                return sByF.filter(data => data.gender === 'male');
                break;
            case 'female':
                return sByF.filter(data => data.gender === 'female');
                break;
            default:
                return sByF
        }
    } else {
        switch (genders) {
            case 'male':
                return data.filter(data => data.gender === 'male');
                break;
            case 'female':
                return data.filter(data => data.gender === 'female');
                break;
            default:
                return data
        }
    }
};

const countFriends = document.querySelector('.count_friends');
countFriends.textContent = '0';

const searchName = () => {
    inputSearch.addEventListener('input', e => {
        e.preventDefault();
        if (inputSearch.value.length !== 0) {
            const sortAge = sortByAge();
            const fByG = filterByGender(sortAge);
            const searchOfName = fByG.filter(data => data.name.first.toLowerCase().includes(inputSearch.value.toLowerCase()));
            const countAll = searchOfName.map(e => e.name).length;
            countFriends.textContent = `${countAll}`;
            renderCards(searchOfName);
            if(inputSearch.value.length > 0) {
                setTimeout(() => {
                    removeMenu();
                }, 1000);
            }
        } else {
            countFriends.textContent = '0';
            if (genders === 'all') {
                const sortAge = sortByAge();
                const sortName = sortByName(sortAge);
                renderCards(sortName);
            } else {
                const sortAge = sortByAge();
                const sortName = sortByName(sortAge).filter(data => data.gender === genders);
                renderCards(sortName);
            }
        }

    });
};

const resetAll = () => {
    data = [...response.results];
    sortAge.textContent = 'Sort by Age';
    sortIdAge.value = 'date';
    sortName.textContent = 'Sort by Name';
    sortIdName.value = 'date';
    genders = 'all';
    filterByGender();
    inputAll.checked = true;
    inputSearch.value = '';
    renderCards(data)
};

reset.addEventListener('click', e => {
    e.preventDefault();
    resetAll();
});

const renderCards = (data) => {
    app.textContent = '';
    const cards = data.map(createCard);
    app.append(...cards);
};

const init = async () => {
    response = await getData();
    data = [...response.results];

    const searchFriends = searchName(data);
    const sortAge = sortByAge(searchFriends);
    const sortName = sortByName(sortAge);
    const filterGender = filterByGender(sortName);

    renderCards(filterGender);
};

removeMenu();
init();

