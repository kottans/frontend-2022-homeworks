import { teamsData, teamsProperties } from "./data.js";

// Hamburger menu

const hamb = document.querySelector('#hamb');
const popup = document.querySelector('#popup');
const popupMenu = document.querySelector('#menu').cloneNode(1);
const body = document.body;

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

// Create teams

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
        // this.html = `<div class="pilots-container">
        //             <div class="pilot-wrapper">
        //                 <span id="first-pilot-name" class="pilot-name"><h3>${this.firstPilotName}</h3></span>
        //                 <span id="first-pilot-flag"><img class="flag-img" src="${this.firstPilotFlagImage}" alt=""></span>
        //                 <img id="first-pilot" class="pilot-img" src="${this.firstPilotImage}" alt="">
        //             </div>
        //             <div class="pilot-wrapper">
        //                 <span id="second-pilot-name" class="pilot-name"><h3>${this.secondPilotName}</h3></span>
        //                 <span id="second-pilot-flag"><img class="flag-img" src="${this.secondPilotFlagImage}" alt=""></span>
        //                 <img id="second-pilot" class="pilot-img" src="${this.secondPilotImage}" alt="">
        //             </div>
        //             <div class="team-info-container">${this.teamInfo}</div>
        //         </div>`
    }

    get checkTeamExemplar() {
        console.log(this);
    }
//     get htmlRender() {
//         const placeholder = document.querySelector('#main-container');
//         const menu = document.querySelector('#menu');
        
//         menu.addEventListener('click', (e) => {
//             e.preventDefault();
//             const parent = e.target.closest('.menu-team');
//             if (parent.dataset.action === this.teamTitle) {
//                 placeholder.innerHTML = '';
//                 return placeholder.innerHTML = this.html;
//             }
//         });
//         popupMenu.addEventListener('click', (e) => {
//             e.preventDefault();
//             const parent = e.target.closest('.menu-team');
//             if (parent.dataset.action === this.teamTitle) {
//                 placeholder.innerHTML = '';
//                 return placeholder.innerHTML = this.html;
//             }
//             function hambClose() { 
//                 popup.classList.toggle('open');
//                 hamb.classList.toggle('active');
//                 body.classList.toggle('noscroll')
//             }
//             setTimeout(hambClose, 500);
//         }); 
//     }
}

function generatePropertiesValue(team, teamsProperties) { 
    return teamsProperties.map(property => team[property]);
}

//EventListeners

const menu = document.querySelector('#menu');
menu.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = e.target.closest('.menu-team');
    if (parent) {
        const actionTeam = teamsData.filter(team => team['teamTitle'] === parent.dataset.action);
        new Team(...generatePropertiesValue(...actionTeam, teamsProperties)).checkTeamExemplar;
    }
});
        
        // popupMenu.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     const parent = e.target.closest('.menu-team');
        //     if (parent.dataset.action === this.teamTitle) {
        //         placeholder.innerHTML = '';
        //         return placeholder.innerHTML = this.html;
        //     }
        //     function hambClose() { 
        //         popup.classList.toggle('open');
        //         hamb.classList.toggle('active');
        //         body.classList.toggle('noscroll')
        //     }
        //     setTimeout(hambClose, 500);
        // });
