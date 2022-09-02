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

// Teams information

const teamsInfoObj = {
    
    alfaRomeoInfo: '<h3>In profile</h3><p>The name Alfa Romeo boasts Formula 1 connections dating back to the championship`s inception in 1950. Fast forward to the 21st century and Italian flare combines with Swiss sensibilities in a new era for the team formerly known as Sauber.</p><p>Having enjoyed considerable success in world sportscars, where he helped nurture the emerging talents of future F1 stars Michael Schumacher and Heinz-Harald Frentzen, Peter Sauber guided his eponymous squad into F1 in 1993.</p><p>The team has since established itself as a mainstay of the grid, becoming race winners under BMW`s brief ownership, and developing a well-earned reputation not only for producing competitive cars, but also for developing young drivers.</p>',

    alphaTauriInfo: '<h3>In profile</h3><p>Established in 2006 as a squad in which young drivers from Red Bull`s prodigious talent pool could cut their F1 teeth, AlphaTauri - originally named Toro Rosso - were formed from the ashes of the plucky Minardi team. Sebastian Vettel gave validity to the approach almost immediately, delivering a fairy-tale win in 2008, before going on to enjoy world championship success with parent team Red Bull Racing. Today the ethos of nurturing talent still holds true, though the Italian squad are no longer simply a "B team" but a constructor in their own right...</p>',

    alpineInfo: '<h3>In profile</h3><p>Alpine may be a relatively new name to Formula 1, but Renault`s famous sportscar arm has plenty of motorsport heritage. The 2021 rebrand of the team marked the next step in Renault`s F1 revival, begun in 2016 with the takeover of the then-Lotus squad. Already race winners in their new guise, regular podiums and a tilt at the title must be their next target…</p>',

    astonMartinInfo: '<h3>In profile</h3><p>Aston Martin`s original Formula 1 foray - over half a century ago - lasted just five races. This time, though, it`s serious. This F1 squad are no strangers to success, having won in their original guise of Jordan and most recently as Racing Point in 2020. Renowned for their ability to punch above their weight, and now with a four-time champion leading their driver line-up, Aston Martin are very much a team to watch…</p>',

    ferrariInfo: '<h3>In profile</h3><p>For many, Ferrari and Formula 1 racing have become inseparable. The only team to have competed in every season since the world championship began, the Prancing Horse has grown from the humble dream of founder Enzo Ferrari to become one of the most iconic and recognised brands in the world. Success came quickly through the likes of Alberto Ascari and John Surtees, and continued - in amongst leaner times - with Niki Lauda in the 1970s and then Michael Schumacher in the 2000s, when Ferrari claimed a then unprecedented five consecutive title doubles, securing their status as the most successful and decorated team in F1 history...</p>',

    haasInfo: '<h3>In profile</h3><p>The youngest team on the grid, Haas made their highly impressive debut in 2016, and in the process became the first all-American-led F1 squad in three decades. Founded by industrialist Gene Haas, they are based in the United States on the same Kannapolis, North Carolina facility as his championship-winning NASCAR Sprint Cup Series team, Stewart-Haas Racing. The Ferrari-powered team, led by the charismatic Guenther Steiner, also have a UK factory in Banbury…</p>',

    mcLarenInfo: '<h3>In profile</h3><p>Since entering the sport in 1966 under the guidance and restless endeavour of eponymous founder Bruce, McLaren`s success has been nothing short of breathtaking. Five glittering decades have yielded countless victories, pole positions and podiums, not to mention eight constructors` championships. What`s more, some of the sport`s greatest drivers made their names with the team, including Emerson Fittipaldi, Ayrton Senna, Mika Hakkinen and Lewis Hamilton...</p>',

    mercedesInfo: '<h3>In profile</h3><p>Mercedes` modern F1 revival started with the creation of a works squad for 2010 - the platform for a meteoric rise up the Grand Prix order. The team generated huge excitement from the off with the sensational return of Michael Schumacher, but headlines soon followed on track: three podiums in their debut season, all via Nico Rosberg - who then claimed a breakthrough pole/victory double at China in 2012. The following season he was paired with Lewis Hamilton, the duo going on to stage some epic title battles as the Silver Arrows swept all before them to become one of the most dominant forces of the modern F1 era. And with Hamilton now partnered by steely Finn Valtteri Bottas, Mercedes remain very much the team to beat…</p>',

    redBullInfo: '<h3>In profile</h3><p>Red Bull were no strangers to F1 - as sponsors - prior to formally entering as a works team in 2004. Nonetheless, the scale of their success over the following decade was staggering. After a first podium in 2006, the team hit their stride in 2009, claiming six victories and second in the constructors` standings. Over the next four seasons they were a tour de force, claiming consecutive title doubles between 2010 and 2013, with Sebastian Vettel emerging as the sport`s youngest quadruple champion. Now their hopes of recapturing that glory lie with an equally exciting talent - one named Max Verstappen…</p>',

    williamsInfo: '<h3>In profile</h3><p>Driven on by the brilliance and passion of the late Sir Frank Williams, Williams grew from humble beginnings to become a Formula 1 behemoth, unrivalled by all except Ferrari and McLaren in terms of enduring success. Over the past four decades the team has racked up Grand Prix wins and championship glory, and in the process nurtured some of the greatest talents in the sport, both in and out the cockpit. Now, following the Williams family`s decision to step aside after the sale of the team to Dorilton Capital, a new era begins...</p>'
}

// Create teams

class Team {
    #teamTitle
    #firstPilotName;
    #secondPilotName;
    #firstPilotFlagImage;
    #secondPilotFlagImage;
    #firstPilotImage;
    #secondPilotImage;
    #teamInfo;
    #html;

    constructor(teamTitle, firstPilotName, secondPilotName, firstPilotFlagImage, secondPilotFlagImage, firstPilotImage, secondPilotImage, teamInfo) {
        this.#teamTitle = teamTitle;
        this.#firstPilotName = firstPilotName;
        this.#secondPilotName = secondPilotName;
        this.#firstPilotFlagImage = firstPilotFlagImage;
        this.#secondPilotFlagImage = secondPilotFlagImage;
        this.#firstPilotImage = firstPilotImage;
        this.#secondPilotImage = secondPilotImage;
        this.#teamInfo = teamInfo;
        this.#html = `<div class="pilots-container">
                    <div class="pilot-wrapper">
                        <span id="first-pilot-name" class="pilot-name"><h3>${this.#firstPilotName}</h3></span>
                        <span id="first-pilot-flag"><img class="flag-img" src="${this.#firstPilotFlagImage}" alt=""></span>
                        <img id="first-pilot" class="pilot-img" src="${this.#firstPilotImage}" alt="">
                    </div>
                    <div class="pilot-wrapper">
                        <span id="second-pilot-name" class="pilot-name"><h3>${this.#secondPilotName}</h3></span>
                        <span id="second-pilot-flag"><img class="flag-img" src="${this.#secondPilotFlagImage}" alt=""></span>
                        <img id="second-pilot" class="pilot-img" src="${this.#secondPilotImage}" alt="">
                    </div>
                    <div class="team-info-container">${this.#teamInfo}</div>
                </div>`
    }

    get htmlRender() {
        const placeholder = document.querySelector('#main-container');
        const menu = document.querySelector('#menu');
        
        menu.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.dataset.action === this.#teamTitle ) {
                placeholder.innerHTML = '';
                return placeholder.innerHTML = this.#html; 
            }
        });
        popupMenu.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.dataset.action === this.#teamTitle) {
                placeholder.innerHTML = '';
                return placeholder.innerHTML = this.#html;
            }
            function hambClose() { 
                popup.classList.toggle('open');
                hamb.classList.toggle('active');
                body.classList.toggle('noscroll')
            }
            setTimeout(hambClose, 800);
        }); 
    }
}

new Team('alfa-romeo', 'Valtteri Bottas', 'Zhou Guanyu', './teams_img/flags/finland.gif', './teams_img/flags/china.jpg', './teams_img/teams_pilots/alfa-romeo/Valtteri-Bottas.jpg', './teams_img/teams_pilots/alfa-romeo/Zhou-Guanyu.jpg', teamsInfoObj.alfaRomeoInfo).htmlRender;

new Team('alphatauri', 'Pierre Gasly', 'Yuki Tsunoda', './teams_img/flags/france.gif', './teams_img/flags/japan.jpg', './teams_img/teams_pilots/alphatauri/Pierre-Gasly.jpg', './teams_img/teams_pilots/alphatauri/Yuki-Tsunoda.jpg', teamsInfoObj.alphaTauriInfo).htmlRender;

new Team('alpine', 'Fernando Alonso', 'Esteban Ocon', './teams_img/flags/spain.jpg', './teams_img/flags/france.gif', './teams_img/teams_pilots/alpine/Fernando-Alonso.jpg', './teams_img/teams_pilots/alpine/Esteban-Ocon.jpg', teamsInfoObj.alpineInfo).htmlRender;

new Team('aston-martin', 'Sebastian Vettel', 'Lance Stroll', './teams_img/flags/germany.jpg', './teams_img/flags/canada.jpg', './teams_img/teams_pilots/aston-martin/Sebastian-Vettel.jpg', './teams_img/teams_pilots/aston-martin/Lance-Stroll.jpg', teamsInfoObj.astonMartinInfo).htmlRender;

new Team('ferrari', 'Charles Leclerc', 'Carlos Sainz', './teams_img/flags/monaco.jpg', './teams_img/flags/spain.jpg', './teams_img/teams_pilots/ferrari/Charles-Leclerc.jpg', './teams_img/teams_pilots/ferrari/Carlos-Sainz.jpg', teamsInfoObj.ferrariInfo).htmlRender;

new Team('haas', 'Mick Schumacher', 'Kevin Magnussen', './teams_img/flags/germany.jpg', './teams_img/flags/denmark.jpg', './teams_img/teams_pilots/haas/Mick-Schumacher.jpg', './teams_img/teams_pilots/haas/Kevin-Magnussen.jpg', teamsInfoObj.haasInfo).htmlRender;

new Team('mclaren', 'Daniel Ricciardo', 'Lando Norris', './teams_img/flags/australia.jpg', './teams_img/flags/gb.jpg', './teams_img/teams_pilots/mclaren/Daniel-Ricciardo.jpg', './teams_img/teams_pilots/mclaren/Lando-Norris.jpg', teamsInfoObj.mcLarenInfo).htmlRender;

new Team('mercedes', 'Lewis Hamilton', 'George Russell', './teams_img/flags/gb.jpg', './teams_img/flags/gb.jpg', './teams_img/teams_pilots/mercedes/Lewis-Hamilton.jpg', './teams_img/teams_pilots/mercedes/George-Russell.jpg', teamsInfoObj.mercedesInfo).htmlRender;

new Team('red-bull', 'Max Verstappen', 'Sergio Perez', './teams_img/flags/netherlands.gif', './teams_img/flags/mexico.gif', './teams_img/teams_pilots/red-bull/Max-Verstappen.jpg', './teams_img/teams_pilots/red-bull/Sergio-Perez.jpg', teamsInfoObj.redBullInfo).htmlRender;

new Team('williams', 'Nicholas Latifi', 'Alexander Albon', './teams_img/flags/canada.jpg', './teams_img/flags/thailand.png', './teams_img/teams_pilots/villiams/Nicholas-Latifi.jpg', './teams_img/teams_pilots/villiams/Alexander-Albon.jpg', teamsInfoObj.williamsInfo).htmlRender;
