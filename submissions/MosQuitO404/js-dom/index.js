import { teamsData } from "./data.js";

const hamb = document.querySelector('#hamb');
const popup = document.querySelector('#popup');
const menu = document.querySelector('#menu');
const popupMenu = document.querySelector('#menu').cloneNode(1);
const placeholder = document.querySelector('#main-container');
const body = document.body;

// Hamburger menu

hamb.addEventListener('click', hambHandler);
    
function hambHandler(e) {
    e.preventDefault();
    popup.classList.toggle('open');
    hamb.classList.toggle('active');
    body.classList.toggle('noscroll')
    renderPopup();
}

function renderPopup() {
    popup.append(popupMenu);
}

// Teams HTML creation

class TeamHTML {
    constructor(team) {
        this.html = `<div class="pilots-container">
                        <div class="pilot-wrapper">
                            <span class="pilot-name"><h3>${team.firstPilotName}</h3></span>
                            <img class="flag-img" src="${team.firstPilotFlagImage}" alt="${team.firstPilotCountry} flag">
                            <span class="pilot-img-wrapper"><img class="pilot-img" src="${team.firstPilotImage}" alt="first pilot ${team.firstPilotName}"></span>
                        </div>
                        <div class="pilot-wrapper">
                            <span class="pilot-name"><h3>${team.secondPilotName}</h3></span>
                            <img class="flag-img" src="${team.secondPilotFlagImage}" alt="${team.secondPilotCountry}">
                            <span class="pilot-img-wrapper"><img class="pilot-img" src="${team.secondPilotImage}" alt="second pilot ${team.secondPilotName}"></span>
                        </div>
                    </div>
                    <div class="team-info-container">${team.teamInfo}</div>`;
    }

    get htmlRender() {
        placeholder.innerHTML = this.html;
    }
}

//Menus's eventListeners

menu.addEventListener('click', generateTeamHandler);
popupMenu.addEventListener('click', generateTeamHandler);

function generateTeamHandler(e) {
    e.preventDefault();
    const parent = e.target.closest('.menu-team');
    if (parent) {
        const actionTeam = teamsData.find(team => {
            if (team.teamTitle == parent.dataset.action) {
                return team;
            }
        });
        
        new TeamHTML(actionTeam).htmlRender;
    }
    if (popup.classList.contains('open')) {
        setTimeout(hambClose, 500);
    }
}

function hambClose() { 
    popup.classList.toggle('open');
    hamb.classList.toggle('active');
    body.classList.toggle('noscroll')
}
