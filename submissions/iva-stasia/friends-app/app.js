'use strict';

const cardsContainer = document.querySelector('.cards_container');
const searchInput = document.querySelector('input[type=search]');
const sideBar = document.querySelector('.filters');
const resetBtn = document.querySelector('input[type=reset]');
const filtersHeader = document.querySelector('.filter_header');
const loader = document.querySelector('.loader');

let initialFriends = [];
let copyFriends = [];

const getInitialFriends = async () => {
    const url = `https://randomuser.me/api/?inc=gender,name,location,email,dob,cell,picture&results=24`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        initialFriends = data.results;
        copyFriends = [...initialFriends]
        createCards(initialFriends);
        hideLoader();
    } catch (e) {
        console.log(e);
        alert(`Oops, something's wrong. Please try again!`)
    };
};

const createCards = (friendsData) => {
    const htmlInitialFriendsData = friendsData.map(friend => {
        return `
            <div class="card glass_bg">
                <img class="photo" src="${friend.picture.large}" alt="person photo">
                <h2 class="name text">${friend.name.first}</h2>
                <h2 class="name text">${friend.name.last}</h2>
                <span class="additional_info text">${friend.dob.age} y. o., ${friend.gender}</span>
                <span class="additional_info text">
                    <i class="fa-solid fa-location-dot"></i> ${friend.location.country}
                </span>
                <a class="email glass_btn" href="mailto:${friend.email}">
                    <i class="fa-solid fa-envelope"></i>
                </a>
                <a class="phone glass_btn" href="tel:${friend.cell}">
                    <i class="fa-solid fa-phone"></i>
                </a>
                <div class="follow_btn glass_btn">Follow</div>

                <div class="popup_phone"><span class="text">Phone number:<br>${friend.cell}</span></div>
                <div class="popup_email"><span class="text">Email:<br>${friend.email}</span></div>
                <div class="popup_follow"><span class="text">You are now following ${friend.name.first}!</span></div>
            </div>
        `;
    }).join('');

    cardsContainer.innerHTML = htmlInitialFriendsData;
    processCardBtns();
};

const chooseFriends = ({target}) => {
    const foundFriends = searchFriends(target.value);
    const filteredFriends = filter(target.value, foundFriends);
    const sortedFriends = sort(target.value, filteredFriends);

    createCards(sortedFriends);
};

const filter = (value, friendsData) => {
    return sideBar.filter.value == 'both_gender' 
    ? friendsData
    : friendsData.filter(friend => friend.gender == sideBar.filter.value);
};

const sort = (value, friendsData) => {
    switch (sideBar.sort.value) {
        case 'name_increase':
            friendsData.sort((a, b) => a.name.first < b.name.first ? -1 : 1);
            break;
        case 'name_decrease':
            friendsData.sort((a, b) => a.name.first > b.name.first ? -1 : 1);
            break;
        case 'age_increase':
            friendsData.sort((a, b) => a.dob.age < b.dob.age ? -1 : 1);
            break;
        case 'age_decrease':
            friendsData.sort((a, b) => a.dob.age > b.dob.age ? -1 : 1);
            break;
        default:
            friendsData;
    };

    return friendsData;
};

const searchFriends = (value) => {
    if (searchInput.value !== '') {
        const searchString = searchInput.value.toLowerCase().trim();
        return copyFriends.filter(friend => {
            return (
                friend.name.first.toLowerCase().includes(searchString)
                || friend.name.last.toLowerCase().includes(searchString)
            );
        });
    }
    else{
        return copyFriends;
    };
};

const resetAll = () => {
    searchInput.value = '';
    copyFriends = [...initialFriends]
    createCards(copyFriends);
};

const openFilters = ({target}) => {
    const hasClass = (className) => target.classList.contains(className);
    const searchBlock = document.querySelector('.search_block')

    if (hasClass('fa-sliders') || hasClass('filter_btn')) {
        sideBar.classList.toggle('open');
        filtersHeader.classList.remove('open_search');
        searchBlock.classList.remove('open_search');
    };

    if (hasClass('fa-magnifying-glass') || hasClass('search_btn')) {
        filtersHeader.classList.toggle('open_search');
        searchBlock.classList.toggle('open_search');
        searchBlock.classList.remove('glass_bg');
        sideBar.classList.remove('open');
    };
};

const processCardBtns = () => {
    cardsContainer.addEventListener('click', ({target}) =>{
        const hasClass = (className) => target.classList.contains(className);
        const cardClassList = target.closest('.card').classList;

        if (hasClass('follow_btn')) {
            cardClassList.add('open_follow');
            setTimeout(() => cardClassList.remove('open_follow'), 1500)
        };

        if (hasClass('phone') || hasClass('fa-phone')) {
            cardClassList.add('open_phone');
            setTimeout(() => cardClassList.remove('open_phone'), 1500);
        };

        if (hasClass('email') || hasClass('fa-envelope')) {
            cardClassList.add('open_email');
            setTimeout(() => cardClassList.remove('open_email'), 1500);
        };
    });
};

const hideLoader = () => {
    loader.classList.add('loader_hidden');
};

window.addEventListener('DOMContentLoaded', () => {
    sideBar.addEventListener('change', chooseFriends);
    searchInput.addEventListener('input', chooseFriends);
    resetBtn.addEventListener('click', resetAll);
    filtersHeader.addEventListener('click', openFilters);
  });

getInitialFriends();
