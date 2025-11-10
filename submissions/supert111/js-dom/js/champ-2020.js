import allTeams from "./allTeams.js";

const listWinnersTeams = document.querySelector('.winners__teams');
const contentTeamRef = document.querySelector('.content__block');

const liMarkup = allTeams.map(el =>`<li class="team__item"><a class="team__link" href=${el.href}>${el.champ}</a></li>`).join("");
listWinnersTeams.innerHTML = liMarkup;

const findTeam = function (event) {
    event.preventDefault();
    const { pathname } = event.target;
    
    if (pathname) {
        listWinnersTeams.removeEventListener('click', findTeam);
        contentTeamRef.innerHTML = contetntMarkup(pathname);
        listWinnersTeams.addEventListener('click', findTeam);
    }
    
    // history.pushState(null, null, pathname);
};

listWinnersTeams.addEventListener('click', findTeam);

const contetntMarkup = (team) => allTeams.map(el => {
    if (el.href === team) {
        return `<h1 class='title__h1'>${el.alt}</h1>
        <p class='final__result'>${el.result}</p>
        <img class='images__style' src='images/${el.img}' alt='${el.alt}'></img>
        <p class='description__game'>${el.description}</p>`;
    }
}).join("");

contentTeamRef.innerHTML = contetntMarkup('/');
