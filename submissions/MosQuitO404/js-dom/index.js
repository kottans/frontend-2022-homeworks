import { teamsData, teamsProperties } from "./data.js";

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

// Teams creation

class Team {
    constructor(teamTitle, firstPilotName, secondPilotName, firstPilotFlagImage, secondPilotFlagImage, firstPilotImage, secondPilotImage, teamInfo) {
        this.teamTitle = teamTitle;
        this.firstPilotName = firstPilotName;
        this.secondPilotName = secondPilotName;
        this.firstPilotFlagImage = firstPilotFlagImage;
        this.secondPilotFlagImage = secondPilotFlagImage;
        this.firstPilotImage = firstPilotImage;
        this.secondPilotImage = secondPilotImage;
        this.teamInfo = teamInfo;
        this.html = `<div class="pilots-container">
                        <div class="pilot-wrapper">
                            <span class="pilot-name"><h3>${this.firstPilotName}</h3></span>
                            <img class="flag-img" src="${this.firstPilotFlagImage}" alt="">
                            <span class="pilot-img-wrapper"><img class="pilot-img" src="${this.firstPilotImage}" alt=""></span>
                        </div>
                        <div class="pilot-wrapper">
                            <span class="pilot-name"><h3>${this.secondPilotName}</h3></span>
                            <img class="flag-img" src="${this.secondPilotFlagImage}" alt="">
                            <span class="pilot-img-wrapper"><img class="pilot-img" src="${this.secondPilotImage}" alt=""></span>
                        </div>
                    </div>
                    <div class="team-info-container">${this.teamInfo}</div>`;
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
        const actionTeam = teamsData.filter(team => team['teamTitle'] === parent.dataset.action);
        new Team(...generatePropertiesValue(...actionTeam, teamsProperties)).htmlRender;
    }
    if (popup.classList.contains('open')) {
        setTimeout(hambClose, 500);
    }
}

function generatePropertiesValue(team, teamsProperties) { 
    return teamsProperties.map(property => team[property]);
}

function hambClose() { 
    popup.classList.toggle('open');
    hamb.classList.toggle('active');
    body.classList.toggle('noscroll')
}
